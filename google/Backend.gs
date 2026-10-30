/* TPJ BACKEND CONNECTION */

function tpjBridgeCall_(action, data) {
  const properties =
    PropertiesService.getScriptProperties();

  const base =
    String(
      properties.getProperty("TPJ_API_BASE") || ""
    ).replace(/\/$/, "");

  const secret =
    properties.getProperty("TPJ_BRIDGE_SECRET") || "";

  if (
    !/^https:\/\/[A-Za-z0-9.-]+\.workers\.dev$/.test(base) ||
    secret.length < 40
  ) {
    throw new Error(
      "Check TPJ_API_BASE and TPJ_BRIDGE_SECRET " +
      "in Script Properties."
    );
  }

  const timestamp = Date.now();

  const payload = JSON.stringify({
    action: action,
    data: data || {}
  });

  const signature = tpjHex_(
    Utilities.computeHmacSha256Signature(
      timestamp + "\n" + payload,
      secret,
      Utilities.Charset.UTF_8
    )
  );

  const response = UrlFetchApp.fetch(
    base + "/api/bridge",
    {
      method: "post",
      contentType: "application/json",

      payload: JSON.stringify({
        timestamp: timestamp,
        payload: payload,
        signature: signature
      }),

      muteHttpExceptions: true
    }
  );

  let result;

  try {
    result = JSON.parse(
      response.getContentText()
    );
  } catch (_) {
    throw new Error(
      "The backend did not return a valid response."
    );
  }

  if (
    response.getResponseCode() >= 300 ||
    !result.ok
  ) {
    const error = new Error(
      result.error ||
      "The backend rejected this request."
    );

    error.status =
      response.getResponseCode();

    throw error;
  }

  return result;
}

function tpjHex_(bytes) {
  return bytes.map(function(b) {
    return ((b + 256) % 256)
      .toString(16)
      .padStart(2, "0");
  }).join("");
}

function tpjSHA_(value) {
  return tpjHex_(
    Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      value,
      Utilities.Charset.UTF_8
    )
  );
}

function tpjRoot_() {
  const root =
    DriveApp.getFolderById(
      TPJ_CONFIG.ROOT_FOLDER_ID
    );

  if (
    root.getSharingAccess() !==
      DriveApp.Access.PRIVATE
  ) {
    throw new Error(
      "The inquiry root folder must have " +
      "Restricted/private link access."
    );
  }

  return root;
}

function tpjFolder_(parent, name) {
  const folders =
    parent.getFoldersByName(name);

  return folders.hasNext()
    ? folders.next()
    : parent.createFolder(name);
}

function tpjFile_(parent, name) {
  const files =
    parent.getFilesByName(name);

  return files.hasNext()
    ? files.next()
    : null;
}

function tpjWrite_(parent, name, value) {
  const content =
    typeof value === "string"
      ? value
      : JSON.stringify(value, null, 2);

  const existing =
    tpjFile_(parent, name);

  return existing
    ? existing.setContent(content)
    : parent.createFile(
        name,
        content,
        MimeType.PLAIN_TEXT
      );
}

function tpjConnectBackend() {
  const lock =
    LockService.getScriptLock();

  lock.waitLock(30000);

  try {
    const root = tpjRoot_();

    tpjFolder_(root, "TPJ Pending Imports");
    tpjFolder_(root, "TPJ Failed Imports");
    tpjFolder_(root, "TPJ Mail Receipts");

    tpjBridgeCall_("connect");

    ScriptApp.getProjectTriggers()
      .forEach(function(trigger) {
        if (
          trigger.getHandlerFunction() ===
            "tpjProcessBackendQueue"
        ) {
          ScriptApp.deleteTrigger(trigger);
        }
      });

    ScriptApp.newTrigger(
      "tpjProcessBackendQueue"
    )
      .timeBased()
      .everyMinutes(1)
      .create();

    console.log(
      "Google bridge verified. " +
      "The one-minute queue trigger is installed."
    );
  } finally {
    lock.releaseLock();
  }
}

function doPost(event) {
  const businessDelivery=tpjBusinessDelivery_(event);
  if(businessDelivery)return businessDelivery;
  const special=tpjSigningDelivery_(event);
  if(special)return special;
  try {
    const payload =
      JSON.parse(event.postData.contents);

    if (payload.deliveryVersion !== 2) {
      return ContentService.createTextOutput(JSON.stringify({ok:false,message:"Please reload the Cake Builder and submit using the current form."})).setMimeType(ContentService.MimeType.JSON);
    }

    return tpjReceiveCake_(payload);

  } catch (error) {
    console.error(
      "Inquiry could not be completed: " +
      error.message
    );

    return createJsonResponse_({
      ok: false,
      message:
        "The inquiry could not be confirmed."
    });
  }
}

function tpjReceiveCake_(payload) {
  if (
    String(payload.website || "").trim()
  ) {
    return createJsonResponse_({
      ok: false
    });
  }

  if (
    payload.formToken !== TPJ_CONFIG.FORM_TOKEN ||

    !/^[A-Za-z0-9_-]{16,128}$/
      .test(payload.submissionKey || "") ||

    !/^[a-f0-9]{64}$/
      .test(payload.receiptToken || "")
  ) {
    throw new Error(
      "Invalid submission reference."
    );
  }

  const state =
    payload.builderState || {};

  if (
    !String(state.customerName || "").trim() ||

    !isValidEmail_(state.customerEmail) ||

    String(state.customerPhone || "")
      .replace(/\D/g, "").length < 10
  ) {
    throw new Error(
      "Valid contact information is required."
    );
  }

  [
    "inquiryOnly",
    "estimatedPrice",
    "depositRequired",
    "termsAccepted"
  ].forEach(function(key) {
    if (
      !payload.acknowledgments ||
      payload.acknowledgments[key] !== true
    ) {
      throw new Error(
        "All inquiry acknowledgments are required."
      );
    }
  });

  const incoming =
    Array.isArray(payload.files)
      ? payload.files
      : [];

  if (
    incoming.length > TPJ_CONFIG.MAX_FILES
  ) {
    throw new Error(
      "Too many uploaded files."
    );
  }

  const lock =
    LockService.getScriptLock();

  lock.waitLock(30000);

  try {
    const root = tpjRoot_();

    const folder = tpjFolder_(
      root,
      "TPJ-CAKE-" + payload.submissionKey
    );

    const receiptHash =
      tpjSHA_(payload.receiptToken);

    const receiptFile =
      tpjFile_(folder, "_receipt-hash.txt");

    if (
      receiptFile &&
      receiptFile.getBlob().getDataAsString() !==
        receiptHash
    ) {
      throw new Error(
        "This inquiry reference is already in use."
      );
    }

    tpjWrite_(
      folder,
      "_receipt-hash.txt",
      receiptHash
    );

    const saved = [];
    let total = 0;

    incoming.forEach(function(item, index) {
      const prepared =
        prepareUploadedFile_(item, index);

      total += prepared.size;

      if (
        prepared.size >
          TPJ_CONFIG.MAX_FILE_SIZE_BYTES ||

        total >
          TPJ_CONFIG.MAX_TOTAL_FILE_SIZE_BYTES
      ) {
        throw new Error(
          "The uploaded files are too large."
        );
      }

      const digest = tpjHex_(
        Utilities.computeDigest(
          Utilities.DigestAlgorithm.SHA_256,
          prepared.blob.getBytes()
        )
      );

      const name =
        String(index + 1).padStart(2, "0") +
        "-" +
        sanitizeFileName_(
          item.name || "upload"
        );

      let file =
        tpjFile_(folder, name);

      if (file) {
        const oldDigest = tpjHex_(
          Utilities.computeDigest(
            Utilities.DigestAlgorithm.SHA_256,
            file.getBlob().getBytes()
          )
        );

        if (oldDigest !== digest) {
          throw new Error(
            "An upload changed. " +
            "Submit it as a new inquiry."
          );
        }

      } else {
        prepared.blob.setName(name);

        file =
          folder.createFile(
            prepared.blob
          );
      }

      saved.push({
        role:
          String(
            item.role || "Customer upload"
          ).slice(0, 100),

        name:
          file.getName(),

        mimeType:
          prepared.mimeType,

        size:
          prepared.size,

        driveFileId:
          file.getId(),

        url:
          file.getUrl(),

        sha256:
          digest
      });
    });

    const summary =
      getReadableInquiry_(payload);

    const data = {
      submissionKey:
        payload.submissionKey,

      receiptHash:
        receiptHash,

      customer: {
        name: state.customerName,
        email: state.customerEmail,
        phone: state.customerPhone
      },

      fulfillment: {
        method:
          String(
            state.fulfillmentMethod || ""
          ).toLowerCase(),

        date:
          state.fulfillmentDate ||
          state.eventDate,

        eventDate:
          state.eventDate || "",

        address: {
          street: state.deliveryStreet || "",
          city: state.deliveryCity || "",
          state: state.deliveryState || "",
          zip: state.deliveryZip || ""
        },

        estimatedMiles:
          state.deliveryMiles || 0
      },

      inquirySummary:
        summary,

      builderState:
        state,

      pricing:
        payload.pricing,

      acknowledgments:
        payload.acknowledgments,

      edibleLayout:
        state.edibleImageEnabled
          ? {
              placement: state.edibleImagePlacement,
              tier: state.edibleImageTier,
              shape: state.edibleImageShape,
              scale: state.edibleImageScale,
              x: state.edibleImageX,
              y: state.edibleImageY,
              rotation: state.edibleImageRotation
            }
          : null,

      files:
        saved,

      driveFolder:
        folder.getUrl()
    };

    tpjWrite_(
      folder,
      "00-OPEN - Cake Vision Inquiry.txt",

      Object.entries(summary)
        .map(function(entry) {
          return entry[0] + ": " + entry[1];
        })
        .join("\n")
    );

    tpjWrite_(
      folder,
      "Full Inquiry.json",
      data
    );

    const pending =
      tpjFolder_(
        root,
        "TPJ Pending Imports"
      );

    const job = tpjWrite_(
      pending,
      payload.submissionKey + ".json",
      {
        data: data,
        attempts: 0
      }
    );

    const result =
      tpjBridgeCall_(
        "cake_import",
        data
      );

    tpjWrite_(
      folder,
      "_backend-result.json",
      result
    );

    job.setTrashed(true);

    return createJsonResponse_({
      ok: true,
      id: result.id
    });

  } finally {
    lock.releaseLock();
  }
}

function tpjProcessBackendQueue() {
  const lock =
    LockService.getScriptLock();

  if (!lock.tryLock(1000)) return;

  try {
    const root = tpjRoot_();

    const pending =
      tpjFolder_(
        root,
        "TPJ Pending Imports"
      ).getFiles();

    let processed = 0;

    while (
      pending.hasNext() &&
      processed++ < 5
    ) {
      const file = pending.next();
      let entry;

      try {
        entry = JSON.parse(
          file.getBlob().getDataAsString()
        );

        tpjBridgeCall_(
          "cake_import",
          entry.data
        );

        file.setTrashed(true);

      } catch (error) {
        entry = entry || {
          data: {},
          attempts: 0
        };

        entry.attempts =
          (entry.attempts || 0) + 1;

        entry.lastError =
          String(error.message).slice(0, 500);

        file.setContent(
          JSON.stringify(entry)
        );

        if (
          entry.attempts >= 8 ||
          [400, 409, 422].includes(error.status)
        ) {
          file.moveTo(
            tpjFolder_(
              root,
              "TPJ Failed Imports"
            )
          );
        }

        console.error(
          "Pending inquiry import: " +
          error.message
        );
      }
    }

    const ledger =
      tpjFolder_(
        root,
        "TPJ Mail Receipts"
      );

    try {
      tpjBridgeCall_("workflow_tick");
    } catch (error) {
      console.error("Workflow scheduling: " + error.message);
    }

    const jobs =
      tpjBridgeCall_("mail_claim").jobs || [];

    jobs.forEach(function(job) {
      if(job.recipientType === "owner" && job.data?.event !== "owner_new_request") {
        tpjBridgeCall_("mail_ack", {id:job.id,leaseUntil:job.leaseUntil,success:false,uncertain:true,error:"Owner notifications disabled; manage the request in the dashboard."});
        return;
      }
      const name =
        job.id + ".json";

      let receipt =
        tpjFile_(ledger, name);

      const status = receipt
        ? JSON.parse(
            receipt.getBlob().getDataAsString()
          )
        : null;

      let ack;

      if (
        status &&
        status.state === "sent"
      ) {
        ack = {
          success: true
        };

      } else if (status) {
        ack = {
          success: false,
          uncertain: true,

          error:
            "Delivery may have occurred. " +
            "Review the inbox before resending."
        };

      } else {
        try {
          if (
            MailApp.getRemainingDailyQuota() < 1
          ) {
            throw new Error(
              "Google email quota is exhausted."
            );
          }

          tpjValidateSender_();
          const mail =
            tpjBuildMail_(job);

          receipt = tpjWrite_(
            ledger,
            name,
            {
              state: "sending",
              at: new Date().toISOString()
            }
          );

          tpjSendMail_(mail);

          receipt.setContent(
            JSON.stringify({
              state: "sent",
              at: new Date().toISOString()
            })
          );

          ack = {
            success: true
          };

        } catch (error) {
          ack = {
            success: false,
            uncertain: Boolean(receipt),
            error: error.message
          };
        }
      }

      tpjBridgeCall_(
        "mail_ack",

        Object.assign(
          {
            id: job.id,
            leaseUntil: job.leaseUntil
          },
          ack
        )
      );
    });

  } finally {
    lock.releaseLock();
  }
}

function tpjBuildLegacyMail_(job) {
  if (job.data && [1, 2].includes(job.data.workflowVersion)) {
    return tpjBuildWorkflowMail_(job);
  }
  const data = job.data;

  const owner =
    job.recipientType === "owner";

  const cake =
    data.source === "cake_builder";

  const customer =
    data.customer;

  const kind = cake
    ? "Cake Vision inquiry"
    : "Shop order request";

  const heading = owner
    ? "New " + kind
    : "We received your " + kind;

  let rows;

  if (cake) {
    rows =
      Object.entries(
        data.inquirySummary || {}
      );

    rows.push([
      "Estimated total",
      "$" +
        (
          data.estimatedTotalCents / 100
        ).toFixed(2)
    ]);

  } else {
    rows =
      data.order.items.map(function(item) {
        return [
          item.quantity + " × " + item.title,

          item.details.join("; ") +
          " — $" +
          (item.totalCents / 100).toFixed(2)
        ];
      });

    rows.push([
      "Delivery estimate",
      "$" +
        (
          data.order.deliveryCents / 100
        ).toFixed(2)
    ]);

    rows.push([
      "Estimated total",
      "$" +
        (
          data.order.totalCents / 100
        ).toFixed(2)
    ]);

    if (data.order.notes) {
      rows.push([
        "Order notes",
        data.order.notes
      ]);
    }
  }

  const fulfillment = cake
    ? data.fulfillment
    : data.order.fulfillment;

  rows.push([
    "Requested fulfillment",

    fulfillment.method +
    " — " +
    fulfillment.date +

    (
      fulfillment.time
        ? " at " +
          fulfillment.time +
          " Central Time"
        : ""
    )
  ]);

  if (
    fulfillment.method === "delivery"
  ) {
    const address =
      fulfillment.address || {};

    rows.push([
      "Delivery address",

      [
        address.street,
        address.unit,
        address.city,
        address.state,
        address.zip
      ].filter(Boolean).join(", ")
    ]);

    if (fulfillment.recipient) {
      rows.push([
        "Recipient",

        fulfillment.recipient.name +
        " — " +
        fulfillment.recipient.phone
      ]);
    }

    if (fulfillment.instructions) {
      rows.push([
        "Handoff instructions",
        fulfillment.instructions
      ]);
    }
  }

  const notice =
    "Please allow 24–48 hours for The Pastry Junkie " +
    "to review availability and fulfillment details. " +
    "This email acknowledges receipt of your request. " +
    "Your order is not confirmed until The Pastry Junkie " +
    "approves it and the required payment is received.";

  if (owner) {
    rows.unshift(
      ["Customer", customer.name],
      ["Email", customer.email],
      ["Phone", customer.phone]
    );
  }

  rows = rows.map(function(row) {
    return [
      String(row[0]).slice(0, 200),
      String(row[1]).slice(0, 1500)
    ];
  }).slice(0, 110);

  const text = [
    heading,
    "Request ID: " + data.requestId,
    "",

    rows.map(function(row) {
      return row[0] + ": " + row[1];
    }).join("\n"),

    "",
    notice
  ];

  if (owner && cake) {
    text.push(
      "",
      "Private files: " + data.driveFolder
    );
  }

  const htmlRows =
    rows.map(function(row) {
      const value =
        /^#[0-9a-f]{6}$/i.test(row[1])
          ? (
              '<span style="display:inline-block;' +
              'width:18px;height:18px;background:' +
              row[1] +
              ';border:1px solid #421a12;' +
              'vertical-align:middle"></span> '
            )
          : "";

      return (
        '<tr><th style="text-align:left;padding:9px;' +
        'border-bottom:1px solid #eadbd4">' +

        escapeHtml_(row[0]) +

        '</th><td style="padding:9px;' +
        'border-bottom:1px solid #eadbd4">' +

        value +
        escapeHtml_(row[1]) +

        "</td></tr>"
      );
    }).join("");

  const privateLink =
    owner &&
    cake &&
    /^https:\/\/drive\.google\.com\/drive\/folders\/[A-Za-z0-9_-]+$/
      .test(data.driveFolder || "")
      ? (
          '<p><a href="' +
          escapeHtml_(data.driveFolder) +
          '">Open private preview and uploads</a></p>'
        )
      : "";

  return {
    to:
      owner
        ? TPJ_CONFIG.NOTIFICATION_EMAIL
        : customer.email,

    replyTo:
      owner
        ? customer.email
        : TPJ_CONFIG.NOTIFICATION_EMAIL,

    name:
      TPJ_CONFIG.BUSINESS_NAME,

    subject:
      heading + " — " + data.requestId,

    body:
      text.join("\n"),

    htmlBody:
      '<div style="font-family:Arial,sans-serif;' +
      'color:#421a12;max-width:760px;margin:auto">' +

      '<div style="padding:22px;background:#f8dce5">' +
      "<strong>THE PASTRY JUNKIE</strong><h2>" +

      escapeHtml_(heading) +

      "</h2><p>Request ID: " +

      escapeHtml_(data.requestId) +

      '</p></div><div style="padding:22px;background:#fff8f3">' +
      "<p>Hi " +

      escapeHtml_(
        owner
          ? "The Pastry Junkie"
          : customer.name
      ) +

      ',</p><table style="width:100%;border-collapse:collapse">' +

      htmlRows +

      "</table>" +
      privateLink +

      "<p>" +
      escapeHtml_(notice) +
      "</p></div></div>"
  };
}

function tpjSendReceiptTest() {
  const mail = tpjBuildMail_({
    recipientType: "customer",

    data: {
      source: "cake_builder",
      requestId: "TPJ-EMAIL-TEST",

      customer: {
        name: "Erykah",
        email: TPJ_CONFIG.NOTIFICATION_EMAIL
      },

      inquirySummary: {
        Test:
          "This is a sample customer receipt " +
          "sent only to your business inbox."
      },

      estimatedTotalCents: 0,

      fulfillment: {
        method: "pickup",
        date: "TEST ONLY"
      }
    }
  });

  tpjSendMail_(mail);

  console.log(
    "Sample customer receipt sent to " +
    TPJ_CONFIG.NOTIFICATION_EMAIL
  );
}