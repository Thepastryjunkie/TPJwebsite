/* TPJ branded customer emails, verification delivery and signed PDF archive. */
function tpjSigningDelivery_(event) {
  let envelope;
  try { envelope=JSON.parse(event.postData.contents); } catch (_) { return null; }
  if(envelope.signingDelivery!==2)return null;
  const reply=function(data){return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);};
  let lock;
  try {
    const secret=PropertiesService.getScriptProperties().getProperty('TPJ_BRIDGE_SECRET')||'';
    if(secret.length<40||typeof envelope.payload!=='string'||envelope.payload.length>10000||!Number.isSafeInteger(envelope.timestamp)||Math.abs(Date.now()-envelope.timestamp)>60000)throw Error('Invalid verification delivery.');
    const expected=tpjHex_(Utilities.computeHmacSha256Signature(envelope.timestamp+'\n'+envelope.payload,secret,Utilities.Charset.UTF_8));
    const a=tpjSHA_(expected),b=tpjSHA_(String(envelope.signature||''));let different=0;
    for(let i=0;i<a.length;i++)different|=a.charCodeAt(i)^b.charCodeAt(i);
    if(different)throw Error('Invalid verification delivery.');
    const data=JSON.parse(envelope.payload);
    if(data.action!=='signing_code'||!/^[A-Za-z0-9_-]{16,80}$/.test(data.id||'')||!/^\d{6}$/.test(data.code||'')||!isValidEmail_(data.customer?.email)||Date.parse(data.expiresAt)<=Date.now())throw Error('Invalid code request.');
    lock=LockService.getUserLock();if(!lock.tryLock(1000))throw Error('Email service busy.');
    const folder=tpjFolder_(tpjRoot_(),'TPJ Verification Receipts'),name=data.id+'.json';
    const prior=tpjFile_(folder,name);if(prior){const r=JSON.parse(prior.getBlob().getDataAsString());if(r.state==='sent')return reply({ok:true});throw Error('Email delivery needs a new code request.');}
    if(MailApp.getRemainingDailyQuota()<1)throw Error('Email quota exhausted.');
    tpjValidateSender_();
    const file=tpjWrite_(folder,name,{state:'sending',at:new Date().toISOString()});
    const subject=(data.sandbox?'[SANDBOX] ':'')+'Your verification code — The Pastry Junkie';
    tpjSendMail_({to:data.customer.email,replyTo:TPJ_CONFIG.NOTIFICATION_EMAIL,name:TPJ_CONFIG.BUSINESS_NAME,subject,body:'Your verification code is '+data.code+'. It expires in 10 minutes. Enter it only on your private order page. If you did not request it, contact baked@thepastryjunkie.com.',htmlBody:tpjEmailShell_('Verify your email','Use this code to finish signing your order agreement.','<p style="font-size:38px;font-weight:bold;letter-spacing:8px;text-align:center">'+escapeHtml_(data.code)+'</p><p>This code expires in 10 minutes. Enter it only on your private order page. We will never ask you to send it to someone else.</p><p>If you did not request this code, reply to this email.</p>',data.sandbox,data.businessContact)});
    file.setContent(JSON.stringify({state:'sent',at:new Date().toISOString()}));return reply({ok:true});
  } catch (_) { return reply({ok:false,message:'Verification delivery could not be confirmed.'}); }
  finally {if(lock)try{lock.releaseLock();}catch(_){} }
}
function tpjSigningSetup() {
  const folder=tpjFolder_(tpjRoot_(),'TPJ Signed Agreements');
  if(folder.getSharingAccess()!==DriveApp.Access.PRIVATE)throw Error('The signed agreement folder must be private.');
  const test=DocumentApp.create('TPJ signing setup authorization');DriveApp.getFileById(test.getId()).setTrashed(true);
  console.log('Signing PDF storage authorized. Customer delivery uses your existing queue.');
}
function tpjHumanDate_(value) {
  if(!value)return '';
  const s=String(value);
  if(/^\d{4}-\d{2}-\d{2}$/.test(s))return Utilities.formatDate(new Date(s+'T12:00:00Z'),'UTC','MMMM d, yyyy');
  if(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(s))return tpjHumanDate_(s.slice(0,10))+' at '+Utilities.formatDate(new Date('2000-01-01T'+s.slice(11)+':00Z'),'UTC','h:mm a')+' Central';
  const d=new Date(s);return isNaN(d.getTime())?s:Utilities.formatDate(d,'America/Chicago','MMMM d, yyyy \'at\' h:mm a z');
}
function tpjEmailShell_(title,message,body,sandbox,contact) {
 const phone=String(contact?.phone||'(682) 373-8842');
 const h=escapeHtml_,logo='https://www.thepastryjunkie.com/images/brand/TPJMascotNameApron.png';
 return '<!doctype html><html><body style="margin:0;padding:0;background:#f5f2f1"><div style="display:none;max-height:0;overflow:hidden">'+h(title)+'</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 10px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;font-family:Arial,sans-serif;color:#292525">'+(sandbox?'<tr><td style="padding:12px;background:#fff0c7;text-align:center;font-size:14px">SANDBOX TEST — no real charge or booking</td></tr>':'')+'<tr><td align="center" style="padding:28px;background:#efcfeb"><img width="88" height="88" src="'+logo+'" alt="The Pastry Junkie" style="display:block;background:white;border-radius:16px;object-fit:contain"></td></tr><tr><td style="padding:30px 28px 10px;text-align:center"><p style="margin:0 0 18px;font-size:19px;font-weight:bold">The Pastry Junkie LLC</p><h1 style="font-size:28px;line-height:1.25;margin:0 0 15px">'+h(title)+'</h1><p style="font-size:16px;line-height:1.6;margin:0">'+h(message).replace(/\n/g,'<br>')+'</p></td></tr><tr><td style="padding:20px 28px;font-size:16px;line-height:1.65">'+body+'</td></tr><tr><td style="padding:22px 28px;border-top:1px solid #e5dfe1;text-align:center;font-size:13px;color:#686065">Automated order notification. Replies reach customer support. For questions or assistance, email <a href="mailto:baked@thepastryjunkie.com" style="color:#9f1b59">baked@thepastryjunkie.com</a> or call '+h(phone)+'.<br><a href="https://www.thepastryjunkie.com" style="color:#9f1b59">www.thepastryjunkie.com</a><br>There’s a piece of love in every crumb.<br>Keep your private order links confidential.</td></tr></table></td></tr></table></body></html>';
}
function tpjMoney_(v){return '$'+(Number(v||0)/100).toFixed(2);}
function tpjSummaryHTML_(snapshot) {
 const h=escapeHtml_;snapshot=snapshot||{};
 let html=(snapshot.items||[]).map(function(i){return '<p style="margin:12px 0"><strong>'+h(i.title)+'</strong> · Quantity '+h(i.quantity)+'<br>'+(i.details||[]).map(h).join('<br>')+'</p>';}).join('');
 if(snapshot.approvedDescription)html+='<p>'+h(snapshot.approvedDescription).replace(/\n/g,'<br>')+'</p>';
 else if(snapshot.inquirySummary)html+=Object.keys(snapshot.inquirySummary).map(function(k){return '<p><strong>'+h(k)+':</strong> '+h(snapshot.inquirySummary[k])+'</p>';}).join('');
 if(snapshot.quote){const q=snapshot.quote;html+='<p>Delivery: '+tpjMoney_(q.deliveryCents)+'<br>Rush fee: '+tpjMoney_(q.rushFeeCents)+'<br>Sales tax: '+tpjMoney_(q.taxCents)+'</p>';}
 return html;
}
function tpjBuildMail_(job) {
 job=tpjDisplayMailJob_(job);
 if(job.recipientType==='owner'){
  if(job.data?.event==='owner_new_request')return tpjNewOrderAlert_(job);
  throw Error('Owner notifications are disabled.');
 }
 if(job.data?.event==='inquiry_declined')return tpjDeclinedMail_(job);
 if(job.data&&[1,2].includes(job.data.workflowVersion))return tpjBuildWorkflowMail_(job);
 const mail=tpjBuildLegacyMail_(job),d=job.data||{},cake=d.source==='cake_builder';
 const snapshot=d.order||{inquirySummary:d.inquirySummary};
 const message='Thank you for choosing The Pastry Junkie. Your '+(cake?'custom cake inquiry':'Shop order request')+' has been received. Please allow 24–48 hours for review. Your order is not confirmed yet; approval and the required payment are needed to secure it.';
 mail.htmlBody=tpjEmailShell_('Your request is received',message,'<h2 style="font-size:18px">Your order request</h2><p><strong>Reference:</strong> '+escapeHtml_(d.requestId)+'</p>'+tpjSummaryHTML_(snapshot)+'<p>We’ll email your approved details and next steps after review.</p>',false,d.businessContact);
 return mail;
}
function tpjBuildWorkflowMail_(job) {
 job=tpjDisplayMailJob_(job);
 const d=job.data||{},customer=d.customer||{},h=escapeHtml_,url=String(d.orderURL||'');
 if(job.recipientType==='owner')throw Error('Owner notifications are disabled.');
 if(!/^https:\/\/www\.thepastryjunkie\.com\/pages\/order\.html#[A-Za-z0-9_-]+\.[a-f0-9]{64}$/.test(url)||!isValidEmail_(customer.email))throw Error('Invalid private customer delivery.');
 const title=String(d.title||'Your order update').replace(/[\r\n]/g,' '),snapshot=d.snapshot||d.record?.evidence?.order||{},invoiceURL=url.replace('order.html#','order.html?view=invoice#'),agreementURL=url.replace('order.html#','order.html?view=agreement#');
 const paidKnown=typeof d.paidTotalCents==='number';
 const paid=Math.min(Number(d.totalCents||0),Number(d.paidTotalCents||0)),balance=Math.max(0,Number(d.totalCents||0)-paid);
 let html=(d.paidCents?'<p style="font-size:38px;font-weight:bold;text-align:center;margin:10px 0">'+tpjMoney_(d.paidCents)+'</p><p style="text-align:center;color:#297547">Payment received</p>':'')+'<h2 style="font-size:19px">Your order</h2><p><strong>Reference:</strong> '+h(d.requestId)+'<br><strong>Customer:</strong> '+h(customer.name)+'<br><strong>Pickup / delivery:</strong> '+h(tpjHumanDate_(d.fulfillmentDate+'T'+d.fulfillmentTime))+'</p>'+tpjSummaryHTML_(snapshot)+'<table role="presentation" width="100%" cellpadding="8" style="border:1px solid #e2dce0;border-collapse:collapse"><tr><td>Approved order total</td><td align="right"><strong>'+tpjMoney_(d.totalCents)+'</strong></td></tr><tr><td>Total paid</td><td align="right">'+(paidKnown?tpjMoney_(paid):'View current status')+'</td></tr><tr><td>Remaining balance</td><td align="right">'+(paidKnown?tpjMoney_(balance):'View current status')+'</td></tr>'+(paidKnown&&d.balanceDueDate&&balance>0?'<tr><td>Balance payment deadline</td><td align="right">'+h(tpjHumanDate_(d.balanceDueDate))+'</td></tr>':'')+'</table><p style="text-align:center;margin:26px 0"><a href="'+h(url)+'" style="display:inline-block;background:#421c15;color:#ffd0e6;padding:14px 22px;text-decoration:none;border-radius:7px;font-weight:bold">View Your Order</a></p><p style="text-align:center"><a href="'+h(invoiceURL)+'" style="color:#9f1b59">View Invoice</a> &nbsp;·&nbsp; <a href="'+h(agreementURL)+'" style="color:#9f1b59">'+(d.record?'View Signed Agreement':'Review & Sign Agreement')+'</a></p>';
 const mail={to:customer.email,replyTo:TPJ_CONFIG.NOTIFICATION_EMAIL,name:TPJ_CONFIG.BUSINESS_NAME,subject:(d.sandbox?'[SANDBOX] ':'')+title+' — '+d.requestId,body:title+'\n'+String(d.message||'')+'\nOrder: '+d.requestId+'\nApproved total: '+tpjMoney_(d.totalCents)+'\nTotal paid: '+(paidKnown?tpjMoney_(paid):'View current status')+'\nRemaining: '+(paidKnown?tpjMoney_(balance):'View current status')+'\nFulfillment: '+tpjHumanDate_(d.fulfillmentDate+'T'+d.fulfillmentTime)+'\nView order: '+url+'\nView invoice: '+invoiceURL+'\nView agreement: '+agreementURL+'\nFor questions or assistance, email baked@thepastryjunkie.com or call (682) 373-8842.',htmlBody:tpjEmailShell_(title,String(d.message||''),html,d.sandbox,d.businessContact)};
 if(d.attachAgreement&&d.record)mail.attachments=[tpjArchiveAgreement_(d)];
 return mail;
}
function tpjArchiveAgreement_(data) {
 const r=data.record,e=r.evidence,hash=tpjSHA_(JSON.stringify(e));
 if(hash!==r.hash||e.offerId!==data.offerId)throw Error('Signed evidence fingerprint mismatch.');
 const root=tpjFolder_(tpjRoot_(),'TPJ Signed Agreements');
 if(root.getSharingAccess()!==DriveApp.Access.PRIVATE)throw Error('Signed agreement storage must remain private.');
 const folder=tpjFolder_(root,e.offerId),name='Signed-Agreement-'+e.offerId+'.pdf',metadata=tpjFile_(folder,'archive.json');let pdfFile,pdfHash;
 if(metadata){const m=JSON.parse(metadata.getBlob().getDataAsString());if(m.evidenceHash!==hash)throw Error('A different signed agreement already exists.');pdfFile=DriveApp.getFileById(m.fileId);pdfHash=tpjHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,pdfFile.getBlob().getBytes()));if(pdfHash!==m.pdfHash)throw Error('Archived PDF changed; review required.');}
 else {
  // Recover a previous archive before retrying; never replace an existing signed PDF.
  pdfFile=tpjFile_(folder,name);
  if(pdfFile&&pdfFile.getDescription()!=='TPJ signed evidence SHA-256: '+hash)throw Error('An unverified PDF needs manual review.');
  if(!pdfFile){
   const doc=DocumentApp.create('TPJ agreement '+e.offerId),body=doc.getBody();let temp;
   try {
    temp=DriveApp.getFileById(doc.getId());body.setAttributes({[DocumentApp.Attribute.FONT_FAMILY]:'Arial',[DocumentApp.Attribute.FONT_SIZE]:10,[DocumentApp.Attribute.FOREGROUND_COLOR]:'#292525'});
    try{const logo=UrlFetchApp.fetch('https://www.thepastryjunkie.com/images/brand/TPJMascotNameApron.png').getBlob();body.appendImage(logo).setWidth(60).setHeight(60);}catch(_){}
    body.appendParagraph('THE PASTRY JUNKIE LLC').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('baked@thepastryjunkie.com • '+(e.order.business?.phone||'(682) 373-8842')+' • www.thepastryjunkie.com').editAsText().setForegroundColor('#9f1b59');
    body.appendHorizontalRule();
    if(e.environment==='sandbox')body.appendParagraph('SANDBOX TEST — no real payment or booking');
    body.appendParagraph(e.terms.title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Order reference: '+(data.reference || e.requestId)+'\nCustomer: '+e.order.customer.name+'\nCustomer email: '+e.order.customer.email+'\nFulfillment: '+tpjHumanDate_(e.fulfillmentDate+'T'+e.fulfillmentTime));
    body.appendParagraph('Approved order').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    (e.order.items||[]).forEach(function(i){body.appendParagraph(i.title+' × '+i.quantity+'\n'+(i.details||[]).join('\n'));});
    if(e.order.inquirySummary)Object.keys(e.order.inquirySummary).forEach(function(k){body.appendParagraph(k+': '+e.order.inquirySummary[k]);});
    if(e.order.approvedDescription)body.appendParagraph('Final approved details: '+e.order.approvedDescription);
    if(e.order.quote){const q=e.order.quote;body.appendParagraph('Itemized charges').setHeading(DocumentApp.ParagraphHeading.HEADING2);q.lines.forEach(l=>body.appendParagraph(l.title+' × '+l.quantity+' — '+tpjMoney_(l.totalCents)));body.appendParagraph('Delivery: '+tpjMoney_(q.deliveryCents)+'\nRush fee: '+tpjMoney_(q.rushFeeCents)+'\nSales tax: '+tpjMoney_(q.taxCents));const d=q.disclosure;body.appendParagraph('Product information').setHeading(DocumentApp.ParagraphHeading.HEADING2);body.appendParagraph(d.notice+'\nContains across this order: '+(d.contains.length?d.contains.join(', '):'No listed major allergens declared; shared-kitchen cross-contact is possible.')+(d.additionalInfo?'\nAdditional allergen information: '+d.additionalInfo:'')+(d.refrigerated?'\n'+d.safe:''));}
    body.appendParagraph('Payment schedule').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Approved total: '+tpjMoney_(e.totalCents)+'\nInitial payment: '+tpjMoney_(e.initialCents)+'\nRush fee included in total: '+tpjMoney_(e.rushFeeCents)+(e.balanceDueDate?'\nRemaining balance: '+tpjMoney_(e.totalCents-e.initialCents)+' due '+tpjHumanDate_(e.balanceDueDate):'\nFull payment required to confirm.'));
    e.terms.sections.forEach(function(t,i){body.appendParagraph((i+1)+'. '+t.title).setHeading(DocumentApp.ParagraphHeading.HEADING2);body.appendParagraph(t.text);if(e.signature.initials?.[i])body.appendParagraph('Customer initials: '+e.signature.initials[i]);});
    if(e.terms.addendum){body.appendParagraph('Contract clarifications').setHeading(DocumentApp.ParagraphHeading.HEADING2);body.appendParagraph(e.terms.addendum);}
    body.appendParagraph('Related documents').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('View your invoice online').editAsText().setLinkUrl(data.orderURL.replace('order.html#','order.html?view=invoice#'));
    body.appendParagraph('Keep your private order link confidential.');
    body.appendParagraph('Electronic signatures').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    if(e.order.businessAcceptance){const b=e.order.businessAcceptance;body.appendParagraph('Business signer: '+b.name+'\nAuthorized and electronically signed: '+tpjHumanDate_(b.signedAt));}
    body.appendParagraph('Customer: '+e.signature.name+'\nElectronically signed: '+tpjHumanDate_(e.signature.signedAt)+'\nCustomer agreed to electronic records and signatures and confirmed authority to sign.');
    if(e.signature.signature?.method==='drawn')body.appendImage(Utilities.newBlob(Utilities.base64Decode(e.signature.signature.png.split(',')[1]),'image/png','signature.png')).setWidth(300).setHeight(100);
    else body.appendParagraph(e.signature.name).editAsText().setItalic(true).setFontSize(24);
    body.appendParagraph('Signing record').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Footprint reference: '+(data.footprint || data.record.hash)+'\nEmail verified: '+e.signature.verification.email+'\nVerified at: '+tpjHumanDate_(e.signature.verification.verifiedAt)+'\nElectronically signed: '+tpjHumanDate_(e.signature.signedAt)+'\nVerification method: email code\nSignature method: '+e.signature.signature.method+'\nThe full technical signing record is retained privately by The Pastry Junkie.');
    doc.saveAndClose();pdfFile=folder.createFile(temp.getAs(MimeType.PDF).setName(name));pdfFile.setDescription('TPJ signed evidence SHA-256: '+hash);
   }finally{if(temp)temp.setTrashed(true);}
  }
  pdfHash=tpjHex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,pdfFile.getBlob().getBytes()));
  tpjWrite_(folder,'archive.json',{fileId:pdfFile.getId(),pdfHash,evidenceHash:hash,createdAt:new Date().toISOString()});
  if(!tpjFile_(folder,'signed-evidence.json'))tpjWrite_(folder,'signed-evidence.json',e);
 }
 tpjBridgeCall_('signed_document_ack',{offerId:e.offerId,fileId:pdfFile.getId(),evidenceHash:hash,pdfHash});
 return pdfFile.getBlob().setName(data.reference ? 'Agreement-'+data.reference+'.pdf' : name);
}

function tpjDisplayMailJob_(job) {
  if (!job.data?.reference) return job;
  return {...job, data: {...job.data, requestId: job.data.reference}};
}
function tpjNewOrderAlert_(job) {
  const d=job.data||{},h=escapeHtml_;
  const url='https://www.thepastryjunkie.com/pages/orders-admin.html';
  const title='The Pastry Junkie has a new order';
  const message=(d.sandbox?'Sandbox test: ':'')+'A new '+(d.source==='cake_builder'?'custom cake inquiry':'Shop order request')+' is ready to review.';
  return {to:'orders@thepastryjunkie.com',replyTo:TPJ_CONFIG.NOTIFICATION_EMAIL,
    name:TPJ_CONFIG.BUSINESS_NAME,subject:title,
    body:message+'\nOrder: '+d.reference+'\nOpen dashboard: '+url,
    htmlBody:tpjEmailShell_(title,message,'<p><strong>Order:</strong> '+h(d.reference)+'</p><p><a href="'+url+'" style="display:inline-block;background:#421c15;color:#ffd0e6;padding:14px 22px;text-decoration:none;border-radius:7px">Open dashboard</a></p>',d.sandbox,d.businessContact)};
}
