/*
 * THE PASTRY JUNKIE — SHOP PRICING AND VALIDATION
 *
 * Uses:
 * js/shop/catalog.js
 * js/delivery.js
 *
 * Prices are calculated in integer cents.
 */
(function (root, factory) {
    if (
        typeof module === "object" &&
        module.exports
    ) {
        module.exports = factory(
            require("./catalog.js"),
            require("../delivery.js")
        );
    } else {
        root.TPJShopModel = factory(
            root.TPJShopCatalog,
            root.TPJDelivery
        );
    }
})(
    typeof globalThis !== "undefined"
        ? globalThis
        : this,

    function buildModel(C, D) {
        function money(cents) {
            return new Intl.NumberFormat(
                "en-US",
                {
                    style: "currency",
                    currency: "USD"
                }
            ).format(cents / 100);
        }

        function fail(message) {
            throw new Error(message);
        }

        function integer(
            value,
            minimum,
            maximum,
            message
        ) {
            if (
                !Number.isInteger(value) ||
                value < minimum ||
                value > maximum
            ) {
                fail(message);
            }

            return value;
        }

        function enabled(
            availability,
            key
        ) {
            return !(
                availability?.disabled || []
            ).includes(key);
        }

        function available(
            category,
            flavor,
            availability = {}
        ) {
            return (
                enabled(
                    availability,
                    "category:" + category
                ) &&
                enabled(
                    availability,
                    "product:" +
                        category +
                        ":" +
                        flavor
                ) &&
                enabled(
                    availability,
                    "flavor:" + flavor
                )
            );
        }

        function cakeName(id) {
            return C.flavors[id];
        }

        /*
         * Validate and price one cart line.
         *
         * quantity = number of packs, boxes,
         * cakes, or individual-product orders.
         *
         * size = number of pieces within
         * each pack or chocolate box.
         */
        function quote(
            item,
            availability = {}
        ) {
            if (
                !item ||
                typeof item !== "object"
            ) {
                fail("Choose a product.");
            }

            const count = integer(
                item.quantity,
                1,
                99,
                "Choose a quantity between 1 and 99."
            );

            const category = item.category;
            if(category==='custom'){
                const p=C.customProducts?.[item.product];
                if(!p||!enabled(availability,'custom:'+item.product)||!enabled(availability,'category:'+p.category))fail('This product is no longer available.');
                return {id:typeof item.id==='string'?item.id:undefined,category:'custom',product:item.product,quantity:count,title:p.name,details:p.description?[p.description]:[],unitCents:p.price,totalCents:p.price*count};
            }

            let unit = 0;
            let title = "";
            let details = [];
            let config = {};

            /*
             * CUPCAKES, JARS AND APPLES
             */
            if (
                [
                    "cupcakes",
                    "jars",
                    "apples"
                ].includes(category)
            ) {
                const cat =
                    C.categories[category];

                if (
                    !Object.hasOwn(
                        cat.prices,
                        item.size
                    )
                ) {
                    fail(
                        "Choose a pack quantity."
                    );
                }

                if (
                    !available(
                        category,
                        item.flavor,
                        availability
                    )
                ) {
                    fail(
                        "Your starting flavor is unavailable. Choose another item."
                    );
                }

                if (
                    !cat.flavors.includes(
                        item.flavor
                    )
                ) {
                    fail(
                        "Choose a valid starting flavor."
                    );
                }

                const mix = item.mix;

                if (
                    !mix ||
                    typeof mix !== "object" ||
                    Array.isArray(mix)
                ) {
                    fail(
                        "Choose your flavors."
                    );
                }

                let sum = 0;

                const normalized = {};

                for (
                    const [flavor, amount]
                    of Object.entries(mix)
                ) {
                    if (
                        !cat.flavors.includes(
                            flavor
                        )
                    ) {
                        fail(
                            "Choose valid " +
                            cat.singular +
                            " flavors."
                        );
                    }

                    integer(
                        amount,
                        0,
                        Number(item.size),
                        "Enter whole flavor quantities within your pack size."
                    );

                    if (
                        amount &&
                        !available(
                            category,
                            flavor,
                            availability
                        )
                    ) {
                        fail(
                            C.flavors[flavor] +
                            " is unavailable."
                        );
                    }

                    if (amount) {
                        normalized[flavor] =
                            amount;

                        sum += amount;

                        details.push(
                            amount +
                            " × " +
                            C.flavors[flavor]
                        );
                    }
                }

                const missing =
                    Number(item.size) - sum;

                if (missing > 0) {
                    fail(
                        "Choose " +
                        missing +
                        " more " +
                        cat.singular +
                        (
                            missing === 1
                                ? ""
                                : "s"
                        ) +
                        " to complete your " +
                        item.size +
                        "-pack."
                    );
                }

                if (missing < 0) {
                    fail(
                        "Remove " +
                        (-missing) +
                        " " +
                        cat.singular +
                        (
                            missing === -1
                                ? ""
                                : "s"
                        ) +
                        " to complete your " +
                        item.size +
                        "-pack."
                    );
                }

                unit =
                    cat.prices[item.size];

                title =
                    (
                        Number(item.size) === 1
                            ? "1 "
                            : item.size + "-Pack "
                    ) +
                    cat.name;

                config = {
                    flavor: item.flavor,
                    size: Number(item.size),
                    mix: normalized
                };

            /*
             * STANDARD SIGNATURE CAKES
             */
            } else if (
                category === "cakes"
            ) {
                if (
                    !C.categories.cakes.flavors
                        .includes(item.flavor) ||
                    !available(
                        "cakes",
                        item.flavor,
                        availability
                    )
                ) {
                    fail(
                        "This Signature Cake is unavailable."
                    );
                }

                if (
                    !Object.hasOwn(
                        C.categories.cakes.prices,
                        item.layers
                    )
                ) {
                    fail(
                        "Choose 2 or 3 cake layers."
                    );
                }

                unit =
                    C.categories.cakes.prices[
                        item.layers
                    ];

                title =
                    cakeName(item.flavor) +
                    " Signature Cake";

                details = [
                    "6-inch round",

                    item.layers + " Layers",

                    "Fixed flavor-matched Signature design"
                ];

                config = {
                    flavor: item.flavor,
                    layers: Number(item.layers)
                };

            /*
             * HALF & HALF SIGNATURE CAKE
             */
            } else if (
                category === "half"
            ) {
                if (
                    !enabled(
                        availability,
                        "category:cakes"
                    ) ||
                    !enabled(
                        availability,
                        "product:cakes:half"
                    )
                ) {
                    fail(
                        "Half & Half is unavailable."
                    );
                }

                if (
                    !Object.hasOwn(
                        C.half.prices,
                        item.layers
                    )
                ) {
                    fail(
                        "Choose 2 or 3 cake layers."
                    );
                }

                if (
                    !C.categories.cakes.flavors
                        .includes(item.one) ||
                    !C.categories.cakes.flavors
                        .includes(item.two)
                ) {
                    fail(
                        "Choose both Half & Half flavors."
                    );
                }

                if (
                    item.one === item.two
                ) {
                    fail(
                        "Your two Half & Half flavors must be different."
                    );
                }

                for (
                    const flavor of [
                        item.one,
                        item.two
                    ]
                ) {
                    if (
                        !available(
                            "cakes",
                            flavor,
                            availability
                        )
                    ) {
                        fail(
                            cakeName(flavor) +
                            " is unavailable."
                        );
                    }
                }

                unit =
                    C.half.prices[
                        item.layers
                    ];

                title = C.half.name;

                details = [
                    "6-inch round",

                    item.layers + " Layers",

                    "Flavor One: " +
                        cakeName(item.one),

                    "Flavor Two: " +
                        cakeName(item.two),

                    "Every layer and the exterior are split evenly by flavor."
                ];

                config = {
                    layers: Number(item.layers),
                    one: item.one,
                    two: item.two
                };

            /*
             * LOADED CHOCOLATE BOXES
             */
            } else if (
                category === "chocolate"
            ) {
                if (
                    !enabled(
                        availability,
                        "category:chocolate"
                    )
                ) {
                    fail(
                        "Chocolate Treats are unavailable."
                    );
                }

                if (
                    !Object.hasOwn(
                        C.chocolate.discounts,
                        item.size
                    )
                ) {
                    fail(
                        "Choose a 4, 6 or 12-piece box."
                    );
                }

                if (
                    !Array.isArray(
                        item.pieces
                    ) ||
                    item.pieces.length !==
                        Number(item.size)
                ) {
                    fail(
                        "Complete all " +
                        item.size +
                        " treats in your box."
                    );
                }

                let base = 0;

                const pieces =
                    item.pieces.map(
                        function (piece, index) {
                            const number =
                                index + 1;

                            if (
                                !piece ||
                                !Object.hasOwn(
                                    C.chocolate.treats,
                                    piece.type
                                )
                            ) {
                                fail(
                                    "Select a treat type for Treat #" +
                                    number +
                                    "."
                                );
                            }

                            if (
                                !Object.hasOwn(
                                    C.chocolate.bases,
                                    piece.base
                                )
                            ) {
                                fail(
                                    "Select a chocolate base for Treat #" +
                                    number +
                                    "."
                                );
                            }

                            if (
                                !Object.hasOwn(
                                    C.chocolate.toppings,
                                    piece.topping
                                )
                            ) {
                                fail(
                                    "Select a topping for Treat #" +
                                    number +
                                    "."
                                );
                            }

                            if (
                                !enabled(
                                    availability,
                                    "treat:" +
                                        piece.type
                                ) ||
                                !enabled(
                                    availability,
                                    "base:" +
                                        piece.base
                                ) ||
                                !enabled(
                                    availability,
                                    "topping:" +
                                        piece.topping
                                ) ||
                                !enabled(
                                    availability,
                                    "flavor:" +
                                        piece.topping
                                )
                            ) {
                                fail(
                                    "Treat #" +
                                    number +
                                    " contains an unavailable selection."
                                );
                            }

                            base +=
                                C.chocolate.treats[
                                    piece.type
                                ].price;

                            /*
                             * Preserve every
                             * individual piece.
                             */
                            return {
                                type: piece.type,
                                base: piece.base,
                                topping:
                                    piece.topping
                            };
                        }
                    );

                const discount =
                    C.chocolate.discounts[
                        item.size
                    ];

                /*
                 * Round once, to the nearest cent,
                 * after applying the box discount.
                 */
                unit = Math.round(
                    base *
                    (100 - discount) /
                    100
                );

                title =
                    item.size +
                    "-Piece Loaded Chocolate Box";

                /*
                 * Group matching pieces only
                 * for the readable summary.
                 *
                 * The full pieces array is
                 * still retained below.
                 */
                const groups = new Map();

                for (
                    const piece of pieces
                ) {
                    const key =
                        JSON.stringify(piece);

                    groups.set(
                        key,
                        (
                            groups.get(key) || 0
                        ) + 1
                    );
                }

                for (
                    const [key, amount]
                    of groups
                ) {
                    const piece =
                        JSON.parse(key);

                    details.push(
                        amount +
                        " × " +
                        C.chocolate.treats[
                            piece.type
                        ].name +
                        " · " +
                        C.chocolate.bases[
                            piece.base
                        ] +
                        " · " +
                        C.chocolate.toppings[
                            piece.topping
                        ]
                    );
                }

                if (discount) {
                    details.push(
                        discount +
                        "% box discount: −" +
                        money(base - unit)
                    );
                }

                config = {
                    size: Number(item.size),
                    pieces
                };

            } else {
                fail(
                    "Choose a valid Shop category."
                );
            }

            return {
                id:
                    typeof item.id === "string"
                        ? item.id
                        : undefined,

                category,

                quantity: count,

                ...config,

                title,
                details,

                unitCents: unit,

                totalCents:
                    unit * count
            };
        }

        /*
         * Calendar date in the business's
         * America/Chicago timezone.
         */
        function dateKey(
            date = new Date()
        ) {
            return new Intl.DateTimeFormat(
                "en-CA",
                {
                    timeZone: C.timeZone,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                }
            ).format(date);
        }

        /*
         * Convert a requested Dallas date/time
         * into a real timestamp.
         *
         * Reject nonexistent spring-forward
         * daylight-saving times.
         */
        function localInstant(
            date,
            time
        ) {
            if (
                !/^\d{4}-\d{2}-\d{2}$/
                    .test(date || "") ||
                !/^([01]\d|2[0-3]):[0-5]\d$/
                    .test(time || "")
            ) {
                fail(
                    "Choose a requested date and time."
                );
            }

            const desired =
                new Date(
                    date +
                    "T" +
                    time +
                    ":00Z"
                );

            if (
                !Number.isFinite(
                    +desired
                ) ||
                desired.toISOString()
                    .slice(0, 10) !== date
            ) {
                fail(
                    "Choose a valid requested date."
                );
            }

            let stamp = +desired;

            for (
                let attempt = 0;
                attempt < 4;
                attempt++
            ) {
                const formatter =
                    new Intl.DateTimeFormat(
                        "en-CA",
                        {
                            timeZone:
                                C.timeZone,

                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hourCycle: "h23"
                        }
                    );

                const parts =
                    Object.fromEntries(
                        formatter
                            .formatToParts(
                                new Date(stamp)
                            )
                            .map(
                                part => [
                                    part.type,
                                    part.value
                                ]
                            )
                    );

                const represented =
                    Date.UTC(
                        +parts.year,
                        +parts.month - 1,
                        +parts.day,
                        +parts.hour,
                        +parts.minute,
                        +parts.second
                    );

                const delta =
                    +desired - represented;

                if (!delta) {
                    return new Date(stamp);
                }

                stamp += delta;
            }

            fail(
                "That local time does not exist because of daylight saving time. Choose another requested time."
            );
        }

        function clean(
            value,
            label,
            maximum = 200,
            required = true
        ) {
            if (
                typeof value !== "string" ||
                value.length > maximum ||
                (
                    required &&
                    !value.trim()
                )
            ) {
                fail(
                    "Complete " +
                    label +
                    "."
                );
            }

            return value.trim();
        }

        /*
         * Validate the full order request.
         *
         * The backend also calls this function.
         * Browser-provided prices are not trusted.
         */
        function validateOrder(
            body,
            availability = {},
            now = new Date()
        ) {
            if (
                !body ||
                !Array.isArray(body.items) ||
                !body.items.length
            ) {
                fail(
                    "Add at least one item to your cart."
                );
            }

            if (
                body.items.length > 100
            ) {
                fail(
                    "Your cart has too many items."
                );
            }

            const items =
                body.items.map(
                    item =>
                        quote(
                            item,
                            availability
                        )
                );

            const customer = {
                name: clean(
                    body.customer?.name,
                    "your full name",
                    100
                ),

                email: clean(
                    body.customer?.email,
                    "your email address",
                    254
                ),

                phone: clean(
                    body.customer?.phone,
                    "your phone number",
                    40
                )
            };

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(customer.email)
            ) {
                fail(
                    "Enter a valid email address."
                );
            }

            if (
                customer.phone
                    .replace(/\D/g, "")
                    .length < 10
            ) {
                fail(
                    "Enter a phone number with at least 10 digits."
                );
            }

            const f =
                body.fulfillment || {};

            if (
                ![
                    "pickup",
                    "delivery"
                ].includes(f.method)
            ) {
                fail(
                    "Choose Pickup or Delivery."
                );
            }

            const when =
                localInstant(
                    f.date,
                    f.time
                );

            if (
                +when <
                +now +
                C.preorderHours *
                    3600000
            ) {
                fail(
                    "Choose a requested date and time at least " + C.preorderHours + " hours from now."
                );
            }

            if (
                (
                    availability.blockedDates ||
                    []
                ).includes(f.date) ||
                (availability.dateRules||[]).some(r=>r.date===f.date && (r.windows||[]).some(w=>f.time>=w.start&&f.time<w.end))
            ) {
                fail(
                    "That requested date is unavailable. Choose another date."
                );
            }

            const fulfillment = {
                method: f.method,
                date: f.date,
                time: f.time,

                timeZone:
                    C.timeZone,

                requestedAt:
                    when.toISOString()
            };

            let deliveryCents = 0;

            if (
                f.method === "delivery"
            ) {
                const address = {};

                const requiredAddressFields = [
                    [
                        "street",
                        "street address"
                    ],
                    [
                        "city",
                        "city"
                    ],
                    [
                        "state",
                        "state"
                    ],
                    [
                        "zip",
                        "ZIP code"
                    ]
                ];

                for (
                    const [key, label]
                    of requiredAddressFields
                ) {
                    address[key] = clean(
                        f.address?.[key],

                        "the delivery " +
                            label,

                        key === "street"
                            ? 200
                            : 80
                    );
                }

                if(!['TX','TEXAS'].includes(address.state.trim().toUpperCase()))fail('Texas delivery only. We do not ship or deliver outside Texas.');
                address.state='TX';
                if(!/^(733\d{2}|73960|7[5-9]\d{3}|885\d{2})(-\d{4})?$/.test(address.zip))fail('Enter a delivery ZIP code consistent with Texas. We do not ship or deliver outside Texas.');

                address.unit = clean(
                    f.address?.unit || "",
                    "apartment/unit",
                    80,
                    false
                );

                if (
                    !/^\d{5}(-\d{4})?$/
                        .test(address.zip)
                ) {
                    fail(
                        "Enter a valid delivery ZIP code."
                    );
                }

                const recipient = {
                    name: clean(
                        f.recipient?.name,
                        "the recipient name",
                        100
                    ),

                    phone: clean(
                        f.recipient?.phone,
                        "the recipient phone",
                        40
                    )
                };

                if (
                    recipient.phone
                        .replace(/\D/g, "")
                        .length < 10
                ) {
                    fail(
                        "Enter a valid recipient phone number."
                    );
                }

                if (
                    f.miles === "" ||
                    f.miles === null ||
                    typeof f.miles ===
                        "undefined" ||
                    !Number.isFinite(
                        Number(f.miles)
                    ) ||
                    Number(f.miles) < 0
                ) {
                    fail(
                        "Enter valid estimated delivery miles."
                    );
                }

                fulfillment.address =
                    address;

                fulfillment.recipient =
                    recipient;

                fulfillment.miles =
                    Number(f.miles);

                fulfillment.instructions =
                    clean(
                        f.instructions,
                        "delivery instructions / handoff notes",
                        2000
                    );

                /*
                 * Reuse the shared delivery
                 * calculation from delivery.js.
                 */
                deliveryCents =
                    Math.round(
                        D.calculate(
                            fulfillment.miles
                        ) * 100
                    );
            }

            if (
                body.acknowledged !== true
            ) {
                fail(
                    "Acknowledge the order request, handling and allergen notices."
                );
            }

            const subtotalCents =
                items.reduce(
                    (sum, item) =>
                        sum +
                        item.totalCents,

                    0
                );

            if (
                !Number.isSafeInteger(
                    subtotalCents
                ) ||
                subtotalCents > 100000000
            ) {
                fail(
                    "Please contact The Pastry Junkie for this order."
                );
            }

            return {
                customer,
                items,
                fulfillment,

                notes: clean(
                    body.notes || "",
                    "order notes",
                    3000,
                    false
                ),

                acknowledged: true,

                subtotalCents,

                deliveryCents,

                totalCents:
                    subtotalCents +
                    deliveryCents
            };
        }

        /*
         * Build admin availability controls
         * from the same central catalog.
         */
        function availabilityTargets() {
            const targets = [];

            for (
                const [id, category]
                of Object.entries(
                    C.categories
                )
            ) {
                targets.push([
                    "category:" + id,
                    category.name
                ]);

                for (
                    const flavor
                    of category.flavors
                ) {
                    targets.push([
                        "product:" +
                            id +
                            ":" +
                            flavor,

                        category.name +
                            " — " +
                            (
                                id === "cakes"
                                    ? cakeName(
                                        flavor
                                    )
                                    : C.flavors[
                                        flavor
                                    ]
                            )
                    ]);
                }
            }

            for(const [id,p]of Object.entries(C.customProducts||{}))targets.push(['custom:'+id,p.name]);
            targets.push(
                [
                    "product:cakes:half",
                    C.half.name
                ],
                [
                    "category:chocolate",
                    C.chocolate.name
                ]
            );

            for (
                const [id, name]
                of Object.entries(
                    C.flavors
                )
            ) {
                targets.push([
                    "flavor:" + id,
                    name + " — all products"
                ]);
            }

            for (
                const [id, treat]
                of Object.entries(
                    C.chocolate.treats
                )
            ) {
                targets.push([
                    "treat:" + id,
                    treat.name
                ]);
            }

            for (
                const [id, name]
                of Object.entries(
                    C.chocolate.bases
                )
            ) {
                targets.push([
                    "base:" + id,
                    name
                ]);
            }

            for (
                const [id, name]
                of Object.entries(
                    C.chocolate.toppings
                )
            ) {
                targets.push([
                    "topping:" + id,
                    name + " topping"
                ]);
            }

            return targets;
        }

        return {
            money,
            enabled,
            available,
            quote,
            dateKey,
            localInstant,
            validateOrder,
            cakeName,
            availabilityTargets,
            withCatalog: catalog => buildModel(catalog, D)
        };
    }
);
