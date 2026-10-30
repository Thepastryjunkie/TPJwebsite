/*
 * Shared delivery pricing for the Shop and Cake Builder.
 * Prices are in dollars.
 */
(function (root, factory) {
    const api = factory();

    root.TPJDelivery = api;
})(
    typeof globalThis !== "undefined"
        ? globalThis
        : this,

    function () {
        const tiers = Object.freeze([
            { through: 5, fee: 10 },
            { through: 10, fee: 15 },
            { through: 15, fee: 20 },
            { through: 20, fee: 25 },
            { through: 25, fee: 30 },
            { through: Infinity, fee: 35 }
        ]);

        function calculate(
            miles,
            method = "delivery"
        ) {
            if (
                String(method).toLowerCase() ===
                "pickup"
            ) {
                return 0;
            }

            if (
                !Number.isFinite(Number(miles)) ||
                Number(miles) < 0 ||
                String(miles).trim() === ""
            ) {
                throw new Error(
                    "Enter valid estimated delivery miles."
                );
            }

            return tiers.find(
                tier =>
                    Number(miles) <= tier.through
            ).fee;
        }

        return Object.freeze({
            tiers,
            calculate
        });
    }
);



/*
 * THE PASTRY JUNKIE — SHOP CATALOG
 *
 * All prices are stored in cents.
 *
 * Examples:
 * 900 = $9.00
 * 8500 = $85.00
 *
 * This same catalog is used by the browser
 * and the Shop backend.
 */
(function (root, factory) {
    const data = factory();

    root.TPJShopCatalog = data;
})(
    typeof globalThis !== "undefined"
        ? globalThis
        : this,

    function () {
        const flavors = {
            cookies: "Cookies & Cream",
            strawberry: "Strawberry Crunch",
            biscoff: "Biscoff Cookie Butter",
            chocolate: "Triple Chocolate",
            snickers: "Snickers",
            banana: "Banana Pudding",
            redvelvet: "Red Velvet",
            birthday: "Birthday Cake",
            cinnamon: "Cinnamon Roll",
            peach: "Peach Cobbler",
            strawberrybanana:
                "Strawberry Banana Pudding"
        };

        const regular = [
            "cookies",
            "strawberry",
            "biscoff",
            "chocolate",
            "snickers",
            "banana",
            "redvelvet",
            "birthday",
            "cinnamon",
            "peach"
        ];

        const cakeFlavors = [
            "cookies",
            "strawberry",
            "biscoff",
            "chocolate",
            "redvelvet",
            "birthday",
            "banana"
        ];

        const categories = {
            cupcakes: {
                name: "Loaded Jumbo Cupcakes",

                singular: "cupcake",

                section: "loadedCupcakes",

                flavors: regular,

                prices: {
                    1: 900,
                    2: 1700,
                    4: 3300,
                    6: 4800
                },

                description:
                    "Jumbo cupcakes. Choose one or mix your favorites."
            },

            jars: {
                name: "Loaded Cheesecake Jars",

                singular: "jar",

                section: "cheesecakeJars",

                flavors: [
                    ...regular,
                    "strawberrybanana"
                ],

                prices: {
                    1: 1000,
                    2: 1900,
                    4: 3700,
                    6: 5400
                },

                description:
                    "6 oz of loaded cheesecake. Keep Refrigerated."
            },

            apples: {
                name: "Loaded Cheesecake Apples",

                singular: "apple",

                section: "cheesecakeApples",

                flavors: [
                    "cookies",
                    "strawberry",
                    "biscoff",
                    "snickers",
                    "banana",
                    "redvelvet",
                    "birthday"
                ],

                prices: {
                    1: 1500,
                    2: 2900,
                    4: 5600
                },

                description:
                    "Cheesecake-stuffed apples. Keep Refrigerated."
            },

            cakes: {
                name: "Signature Cakes",

                singular: "cake",

                section: "signatureCakes",

                flavors: cakeFlavors,

                prices: {
                    2: 8500,
                    3: 11500
                },

                description:
                    "6-inch round. A fixed, flavor-matched Signature design."
            }
        };

        const half = {
            name: "Half & Half Signature Cake",

            prices: {
                2: 10000,
                3: 13500
            },

            explanation:
                "Two Signature flavors. One cake. Every layer is split evenly between your selected flavors, and each side of the finished cake is decorated to match its flavor."
        };

        const treats = {
            pretzel: {
                name: "Pretzel Rod",
                price: 325
            },

            oreo: {
                name: "Chocolate-Covered Oreo",
                price: 350
            },

            strawberry: {
                name: "Chocolate-Covered Strawberry",
                price: 425
            },

            rice: {
                name:
                    "Chocolate-Covered Rice Krispie Treat",

                price: 450
            }
        };

        const chocolate = {
            name: "Loaded Chocolate Treats",

            treats,

            bases: {
                milk: "Milk Chocolate",
                white: "White Chocolate",
                dark: "Dark Chocolate"
            },

            toppings: {
                strawberry: "Strawberry Crunch",
                biscoff: "Biscoff Cookie Butter",
                cookies: "Cookies & Cream",
                birthday: "Birthday Cake"
            },

            /*
             * Discount percentages by box size.
             *
             * 4 pieces: 0%
             * 6 pieces: 5%
             * 12 pieces: 8%
             */
            discounts: {
                4: 0,
                6: 5,
                12: 8
            }
        };

        const builds = {
            cookies: [
                "Vanilla/cookies-and-cream cake profile",
                "Cookies-and-cream buttercream",
                "Dark chocolate drip",
                "Oreo crumb coating",
                "Buttercream swirls",
                "Oreo pieces",
                "Cookie crumbs"
            ],

            strawberry: [
                "Vanilla/strawberry cake profile",
                "Strawberry buttercream",
                "Strawberry filling",
                "Glossy strawberry drip",
                "Strawberry crunch coating",
                "Buttercream swirls",
                "Fresh strawberries"
            ],

            biscoff: [
                "Vanilla cake with cookie-butter flavor",
                "Cookie-butter buttercream/filling",
                "Biscoff spread drip",
                "Biscoff crumb coating",
                "Buttercream swirls",
                "Biscoff cookies"
            ],

            chocolate: [
                "Chocolate cake",
                "Chocolate buttercream",
                "Chocolate filling/ganache",
                "Dark chocolate drip",
                "Brownie crumb/chocolate coating",
                "Chocolate swirls",
                "Brownie chunks",
                "Chocolate pieces"
            ],

            redvelvet: [
                "Red velvet cake",
                "Cream-cheese-style frosting",
                "Cream/white drip",
                "Red velvet crumb coating",
                "Cream-cheese-style swirls",
                "Red velvet cake pieces"
            ],

            birthday: [
                "Vanilla/funfetti cake",
                "Birthday-cake buttercream",
                "Birthday-style filling",
                "White vanilla/white-chocolate drip",
                "Sprinkle coating",
                "Buttercream swirls",
                "Rainbow sprinkles",
                "Birthday cake pieces"
            ],

            banana: [
                "Vanilla/banana cake profile",
                "Banana-pudding filling",
                "Vanilla/banana-pudding buttercream",
                "Creamy vanilla/white drip",
                "Vanilla-wafer crumb coating",
                "Buttercream swirls",
                "Vanilla wafers",
                "Banana-pudding elements",
                "Banana garnish where appropriate"
            ]
        };

        const statusLabels = {
            draft: "Draft Cart",

            submitted:
                "Order Request Submitted",

            review: "Under Review",

            approved:
                "Approved – Awaiting Payment",

            paid: "Paid / Confirmed",

            production: "In Production",

            ready: "Ready for Pickup",

            delivery: "Out for Delivery",

            completed: "Completed",

            declined: "Declined",

            cancelled: "Cancelled"
        };

        const messages = {
            confirmation:
                "Your order request has been received! Please allow 24–48 hours for The Pastry Junkie to review availability and fulfillment details. Your order is not confirmed until it has been approved and payment has been received.",

            request:
                "Submitting this form sends an order request. Your order is not confirmed until The Pastry Junkie approves your request and payment is received.",

            allergens:
                "Menu items may contain or come into contact with milk, eggs, wheat, soy, peanuts, and tree nuts or nut-containing ingredients. Snickers items contain peanuts. Shared equipment and preparation areas create a risk of cross-contact. We cannot guarantee allergen-free products.",

            handling:
                "Keep desserts level, protected from heat, and refrigerated when required. After handoff, you are responsible for proper transport, storage and handling. The Pastry Junkie is not responsible for damage caused by tilting, dropping, heat exposure, improper refrigeration, transportation or handling.",

            delivery:
                "Someone must be available to receive delicate or temperature-sensitive desserts. If unavailable, we may attempt contact; another delivery attempt may require another fee. Delivery fees are non-refundable once the trip begins. Customer-caused delays do not automatically qualify for refunds. Address changes require review and may change the fee; confirmed fees are never changed silently.",

            pickup:
                "Pickup location and instructions are supplied with approval. Arrive within your confirmed pickup window; contact The Pastry Junkie if you are late. Requested dates and times are subject to approval and are reserved only after approval and payment."
        };

        /*
         * Matches older labels already present
         * on your existing menu cards.
         */
        const cardAliases = {
            Strawberry: "strawberry",

            Biscoff: "biscoff",

            "Chocolate Brownie": "chocolate",

            "Triple Chocolate Brownie":
                "chocolate"
        };

        /*
         * We will insert your actual image paths
         * when the two new assets are ready.
         *
         * Leave these as null for now.
         */
const newCakeAssets = {
    banana:
        "../images/Shop/Signature Cakes/Bananna Pudding Cake.webp",

    half:
        "../images/Shop/Signature Cakes/Half-Half Cake.webp"
};

        return {
            version: 1,

            currency: "USD",

            timeZone: "America/Chicago",

            preorderHours: 72,

            flavors,
            categories,
            builds,
            half,
            chocolate,
            statusLabels,
            messages,
            newCakeAssets,
            cardAliases
        };
    }
);


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
    root.TPJShopModel = factory(
        root.TPJShopCatalog,
        root.TPJDelivery
    );
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
/* TPJ ORDERS API — PROCESSING V1
   Goes after delivery.js, catalog.js and model.js.
*/

const TPJ_C = globalThis.TPJShopCatalog;
const TPJ_M = globalThis.TPJShopModel;

const TPJ_TABLES = [
  "tpj_settings",
  "tpj_requests",
  "tpj_submission_keys",
  "tpj_request_events",
  "tpj_files",
  "tpj_notifications",
  "tpj_rate_limits"
];

const TPJ_ENCODER = new TextEncoder();

function tpjError(message, status = 400, extra = {}) {
  return Object.assign(
    new Error(message),
    { status, extra }
  );
}

function tpjJSON(data, status = 200) {
  return new Response(
    JSON.stringify(data, null, 2),
    {
      status,

      headers: {
        "Content-Type":
          "application/json; charset=utf-8",

        "Cache-Control":
          "no-store",

        "X-Content-Type-Options":
          "nosniff",

        "Referrer-Policy":
          "no-referrer"
      }
    }
  );
}

function tpjStable(value) {
  if (Array.isArray(value)) {
    return "[" +
      value.map(tpjStable).join(",") +
      "]";
  }

  if (value && typeof value === "object") {
    return "{" +
      Object.keys(value)
        .sort()
        .map(
          key =>
            JSON.stringify(key) +
            ":" +
            tpjStable(value[key])
        )
        .join(",") +
      "}";
  }

  return JSON.stringify(value);
}

async function tpjHash(value, secret = "") {
  const bytes = TPJ_ENCODER.encode(value);

  const result = secret
    ? await crypto.subtle.sign(
        "HMAC",

        await crypto.subtle.importKey(
          "raw",
          TPJ_ENCODER.encode(secret),
          {
            name: "HMAC",
            hash: "SHA-256"
          },
          false,
          ["sign"]
        ),

        bytes
      )
    : await crypto.subtle.digest(
        "SHA-256",
        bytes
      );

  return Array.from(
    new Uint8Array(result)
  )
    .map(
      byte =>
        byte.toString(16).padStart(2, "0")
    )
    .join("");
}

async function tpjAdmin(request, env) {
  const supplied =
    request.headers.get("Authorization") || "";

  if (
    String(env.ADMIN_TOKEN || "").length < 40 ||
    !supplied.startsWith("Bearer ") ||
    await tpjHash(supplied.slice(7)) !==
      await tpjHash(env.ADMIN_TOKEN)
  ) {
    throw tpjError(
      "Sign in to the private dashboard.",
      401
    );
  }
}

async function tpjReadJSON(
  request,
  maximum = 1024 * 1024
) {
  if (
    Number(
      request.headers.get("Content-Length") || 0
    ) > maximum
  ) {
    throw tpjError(
      "This request is too large.",
      413
    );
  }

  const reader =
    request.body?.getReader();

  if (!reader) {
    throw tpjError(
      "No request data was received."
    );
  }

  let size = 0;
  const parts = [];

  try {
    for (;;) {
      const { done, value } =
        await reader.read();

      if (done) break;

      size += value.byteLength;

      if (size > maximum) {
        await reader.cancel();

        throw tpjError(
          "This request is too large.",
          413
        );
      }

      parts.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(size);
  let offset = 0;

  for (const part of parts) {
    bytes.set(part, offset);
    offset += part.length;
  }

  let value;

  try {
    value = JSON.parse(
      new TextDecoder().decode(bytes)
    );
  } catch {
    throw tpjError(
      "The request data is invalid."
    );
  }

  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw tpjError(
      "The request data is invalid."
    );
  }

  return value;
}

async function tpjSetting(
  env,
  key,
  fallback
) {
  const row =
    await env.DB.prepare(
      "SELECT value_json " +
      "FROM tpj_settings " +
      "WHERE key = ?"
    )
      .bind(key)
      .first();

  return row
    ? JSON.parse(row.value_json)
    : fallback;
}

async function tpjAvailability(env) {
  const state=await TPJBusiness.load(env),legacy=await tpjSetting(env,'availability',{});
  return {disabled:[...new Set([...state.config.disabled,...(state.config.removed||[])])],blockedDates:state.config.blockedDates,dateRules:state.config.dateRules||[],
    revision:state.version+(Number.isInteger(legacy.revision)?legacy.revision:1),
    catalog:TPJBusiness.catalog(state),catalogVersion:state.version+1,
    serverTime:new Date().toISOString(),profiles:state.config.profiles,
    business:state.config.settings};
}

async function tpjAccepting(env) {
  const state=await TPJBusiness.load(env);
  const enabled=state.version>0?(state.config.settings.acceptShop||state.config.settings.acceptCake):await tpjSetting(env,'accepting_requests',false)===true;
  return enabled && await tpjSetting(env,'google_bridge_verified',false)===true;
}
async function tpjRateLimit(request, env) {
  const now = Date.now();

  const windowStart =
    Math.floor(now / 600000);

  const ip =
    request.headers.get(
      "CF-Connecting-IP"
    ) || "unknown";

  const key =
    await tpjHash(
      ip + "|" + windowStart,
      env.GOOGLE_BRIDGE_SECRET
    );

  const row =
    await env.DB.prepare(
      "INSERT INTO tpj_rate_limits " +
      "(bucket_key, hits, expires_at) " +
      "VALUES (?, 1, ?) " +

      "ON CONFLICT(bucket_key) " +
      "DO UPDATE SET hits = hits + 1 " +

      "RETURNING hits"
    )
      .bind(
        key,
        (windowStart + 1) * 600000
      )
      .first();

  if (row.hits > 20) {
    throw tpjError(
      "Too many submission attempts. " +
      "Please wait a few minutes and try again.",
      429
    );
  }

  await env.DB.prepare(
    "DELETE FROM tpj_rate_limits " +
    "WHERE expires_at < ?"
  )
    .bind(now - 3600000)
    .run();
}

async function tpjSaveShop(request, env) {
  const business=await TPJBusiness.load(env),catalog=TPJBusiness.catalog(business),model=TPJ_M.withCatalog(catalog);
  if (!await tpjAccepting(env) || !business.config.settings.acceptShop) {
    throw tpjError(
      "Order requests are temporarily unavailable. " +
      "Your cart is saved.",
      503
    );
  }

  await tpjRateLimit(request, env);

  const body =
    await tpjReadJSON(request);

  if (
    String(body.website || "").trim()
  ) {
    throw tpjError(
      "Unable to accept this request."
    );
  }

  const key =
    request.headers.get(
      "Idempotency-Key"
    ) || "";

  if (
    !/^[A-Za-z0-9_-]{16,128}$/
      .test(key)
  ) {
    throw tpjError(
      "Please reopen your order review " +
      "and try again."
    );
  }

  const hash =
    await tpjHash(
      tpjStable(body),
      env.GOOGLE_BRIDGE_SECRET
    );

  const previous =
    await env.DB.prepare(
      "SELECT request_id, payload_hash " +
      "FROM tpj_submission_keys " +
      "WHERE source = 'shop' " +
      "AND submission_key = ?"
    )
      .bind(key)
      .first();

  if (previous) {
    if (
      previous.payload_hash !== hash
    ) {
      throw tpjError(
        "This submission changed. " +
        "Reopen your order review.",
        409
      );
    }

    return tpjJSON({
      ok: true,
      id: previous.request_id,
      duplicate: true
    });
  }

  const availability =
    await tpjAvailability(env);

  if (
    body.catalogVersion !==
      catalog.version ||

    body.availabilityRevision !==
      availability.revision
  ) {
    throw tpjError(
      "The menu changed. " +
      "Please review your order again.",
      409,
      { availability }
    );
  }

  let order;

  try {
    order =
      model.validateOrder(
        body,
        availability
      );
  } catch (error) {
    throw tpjError(
      error.message,
      422,
      { availability }
    );
  }

  if (
    body.expectedTotalCents !==
      order.totalCents
  ) {
    throw tpjError(
      "Your estimated total changed. " +
      "Please review your order again.",
      409,
      { availability }
    );
  }

  order.customer.email =
    order.customer.email.toLowerCase();

  for (const item of order.items) {
    delete item.id;
  }

  const configuration =
    order.items.map((item, index) => {
      const {
        title,
        details,
        unitCents,
        totalCents,
        ...selection
      } = item;

      const slots =
        body.items[index].traySlots;

      if (
        item.mix &&
        Array.isArray(slots) &&
        slots.length === item.size &&
        slots.every(
          flavor =>
            typeof flavor === "string" &&
            Object.hasOwn(item.mix, flavor)
        )
      ) {
        const counts = {};

        for (const flavor of slots) {
          counts[flavor] =
            (counts[flavor] || 0) + 1;
        }

        if (
          tpjStable(counts) ===
            tpjStable(item.mix)
        ) {
          selection.traySlots =
            slots.slice();
        }
      }

      return selection;
    });

  const meaningful = {
    customer:
      order.customer,

    fulfillment:
      order.fulfillment,

    notes:
      order.notes,

    items:
      order.items.map(item => {
        const {
          id,
          ...configuration
        } = item;

        return configuration;
      })
  };

  const fingerprint =
    await tpjHash(
      tpjStable(meaningful),
      env.GOOGLE_BRIDGE_SECRET
    );

  const id =
    "TPJ-" + crypto.randomUUID();

  const now =
    new Date().toISOString();

  const payload =
    JSON.stringify({
      order,
      configuration,
      catalogVersion: catalog.version
    });

  const notification =
    JSON.stringify({
      source: "shop",
      event: "received",
      customer: order.customer,
      order,
      businessName: env.BUSINESS_NAME,
      ownerEmail: env.OWNER_EMAIL
    });

  const db = env.DB;

  await db.batch([
    db.prepare(
      "INSERT OR IGNORE INTO tpj_requests " +

      "(id, source, fingerprint, " +
      "customer_name, customer_email, " +
      "customer_phone, fulfillment_date, " +
      "fulfillment_method, payload_json, " +
      "estimated_total_cents, " +
      "created_at, updated_at) " +

      "SELECT ?, 'shop', ?, ?, ?, ?, " +
      "?, ?, ?, ?, ?, ? " +

      "WHERE NOT EXISTS (" +
      "SELECT 1 FROM tpj_submission_keys " +
      "WHERE source = 'shop' " +
      "AND submission_key = ?)"
    ).bind(
      id,
      fingerprint,
      order.customer.name,
      order.customer.email,
      order.customer.phone,
      order.fulfillment.date,
      order.fulfillment.method,
      payload,
      order.totalCents,
      now,
      now,
      key
    ),

    db.prepare(
      "INSERT OR IGNORE " +
      "INTO tpj_submission_keys " +

      "(source, submission_key, " +
      "payload_hash, request_id, created_at) " +

      "SELECT 'shop', ?, ?, id, ? " +
      "FROM tpj_requests " +

      "WHERE source = 'shop' " +
      "AND fingerprint = ?"
    ).bind(
      key,
      hash,
      now,
      fingerprint
    ),

    db.prepare(
      "INSERT INTO tpj_request_events " +

      "(request_id, event_type, " +
      "details_json, created_at) " +

      "SELECT r.id, 'received', '{}', ? " +
      "FROM tpj_requests r " +

      "JOIN tpj_submission_keys k " +
      "ON k.request_id = r.id " +

      "WHERE k.source = 'shop' " +
      "AND k.submission_key = ? " +
      "AND k.payload_hash = ? " +

      "AND NOT EXISTS (" +
      "SELECT 1 FROM tpj_request_events e " +
      "WHERE e.request_id = r.id " +
      "AND e.event_type = 'received')"
    ).bind(
      now,
      key,
      hash
    ),

    ...["customer"].map(
      recipient =>
        db.prepare(
          "INSERT OR IGNORE " +
          "INTO tpj_notifications " +

          "(id, request_id, event_key, " +
          "recipient_type, payload_json, " +
          "next_attempt_at, created_at) " +

          "SELECT ?, r.id, 'received', ?, " +
          "json_set(?, '$.requestId', r.id), " +
          "?, ? " +

          "FROM tpj_requests r " +

          "JOIN tpj_submission_keys k " +
          "ON k.request_id = r.id " +

          "WHERE k.source = 'shop' " +
          "AND k.submission_key = ? " +
          "AND k.payload_hash = ?"
        ).bind(
          crypto.randomUUID(),
          recipient,
          notification,
          now,
          now,
          key,
          hash
        )
    ),
    ...TPJDisplay.newRequest(env, id, now)
  ]);

  const saved =
    await db.prepare(
      "SELECT request_id, payload_hash " +
      "FROM tpj_submission_keys " +
      "WHERE source = 'shop' " +
      "AND submission_key = ?"
    )
      .bind(key)
      .first();

  if (
    !saved ||
    saved.payload_hash !== hash
  ) {
    throw tpjError(
      "This submission changed. " +
      "Reopen your order review.",
      409
    );
  }

  return tpjJSON(
    {
      ok: true,

      id:
        saved.request_id,

      duplicate:
        saved.request_id !== id,

      notificationStatus:
        "queued"
    },

    saved.request_id === id
      ? 201
      : 200
  );
}

async function tpjHealth(env) {
  const result =
    await env.DB.prepare(
      "SELECT name FROM sqlite_master " +
      "WHERE type = 'table'"
    ).all();

  const names = new Set(
    result.results.map(
      row => row.name
    )
  );

  const missingTables =
    TPJ_TABLES.filter(
      name => !names.has(name)
    );

  const schemaVersion =
    names.has("tpj_settings")
      ? await tpjSetting(
          env,
          "schema_version",
          null
        )
      : null;

  const modelsLoaded =
    Boolean(
      TPJ_C?.version &&
      TPJ_M?.validateOrder
    );

  const settingsConfigured =
    String(
      env.ADMIN_TOKEN || ""
    ).length >= 40 &&

    String(
      env.GOOGLE_BRIDGE_SECRET || ""
    ).length >= 40 &&

    Boolean(
      env.GOOGLE_SCRIPT_URL &&
      env.OWNER_EMAIL &&
      env.BUSINESS_NAME
    );

  const ok =
    !missingTables.length &&
    schemaVersion === 1 &&
    modelsLoaded &&
    settingsConfigured;

  return tpjJSON(
    {
      ok,

      service:
        "The Pastry Junkie Orders API",

      stage:
        "processing-installed",

      schemaVersion,

      modelsLoaded,

      catalogVersion:
        TPJ_C?.version || null,

      settingsConfigured,

      missingTables,

      googleBridgeVerified:
        names.has("tpj_settings")
          ? await tpjSetting(
              env,
              "google_bridge_verified",
              false
            ) === true
          : false,

      acceptingRequests:
        names.has("tpj_settings")
          ? await tpjAccepting(env)
          : false
    },

    ok ? 200 : 503
  );
}

function tpjRecord(row) {
  return {
    id:
      row.id,

    source:
      row.source,

    status:
      row.status,

    customerName:
      row.customer_name,

    customerEmail:
      row.customer_email,

    customerPhone:
      row.customer_phone,

    fulfillmentDate:
      row.fulfillment_date,

    fulfillmentMethod:
      row.fulfillment_method,

    estimatedTotalCents:
      row.estimated_total_cents,

    approvedTotalCents:
      row.approved_total_cents,

    approval:
      row.approval_json
        ? JSON.parse(row.approval_json)
        : null,

    internalNotes:
      row.internal_notes,

    version:
      row.version,

    createdAt:
      row.created_at,

    updatedAt:
      row.updated_at,

    details:
      JSON.parse(row.payload_json)
  };
}

function tpjTexasFulfillment(f){
 if(!['pickup','delivery'].includes(f?.method))throw tpjError('Only Texas pickup or personal delivery is offered. No shipping.');
 if(f.method==='delivery'&&(!['TX','TEXAS'].includes(String(f.address?.state||'').trim().toUpperCase())||!/^(733\d{2}|73960|7[5-9]\d{3}|885\d{2})(-\d{4})?$/.test(String(f.address?.zip||'').trim())))throw tpjError('Texas delivery only. Enter a Texas delivery state and ZIP code. We do not ship or deliver outside Texas.');
}

async function tpjRoute(request, env) {
  const changeResponse=await TPJChanges.route(request,env);if(changeResponse)return changeResponse;
  const managementResponse=await TPJOrderManagement.route(request,env);if(managementResponse)return managementResponse;
  const businessResponse = await TPJBusiness.route(request, env);
  if (businessResponse) return businessResponse;
  const workflowResponse = await tpjWorkflowRoute(request, env);
  if (workflowResponse) return workflowResponse;

  const squareTestPath =
    new URL(request.url).pathname;

  if (
    squareTestPath === "/api/admin/square/test-config" ||
    squareTestPath === "/api/admin/square/test-payment"
  ) {
    await tpjAdmin(request, env);

    if (!env.DB) {
      throw tpjError(
        "The database is not connected.",
        503
      );
    }

    if (
      request.method === "GET" &&
      squareTestPath.endsWith("/test-config")
    ) {
      return tpjSquareTestConfig(env);
    }

    if (
      request.method === "POST" &&
      squareTestPath.endsWith("/test-payment")
    ) {
      return tpjSquareTestPayment(request, env);
    }

    throw tpjError("Method not allowed.", 405);
  }
  if (
    request.method === "GET" &&
    new URL(request.url).pathname === "/api/admin/square/status"
  ) {
    await tpjAdmin(request, env);
    return tpjSquareSandboxStatus(env);
  }
  const url =
    new URL(request.url);

  const path =
    url.pathname;

  if (!env.DB) {
    throw tpjError(
      "The order database is not connected.",
      503
    );
  }

  if (!TPJ_C || !TPJ_M) {
    throw tpjError(
      "The pricing files are missing.",
      503
    );
  }

  if (
    request.method === "POST" &&
    path === "/api/bridge"
  ) {
    return tpjBridge(request, env);
  }

  if (
    request.method === "GET" &&
    path === "/api/cake/receipt"
  ) {
    return tpjCakeReceipt(request, env, url);
  }

  if (
    request.method === "GET" &&
    ["/", "/health"].includes(path)
  ) {
    return tpjHealth(env);
  }

  if (
    request.method === "GET" &&
    path === "/api/shop/availability"
  ) {
    return tpjJSON({
      ...await tpjAvailability(env),

      acceptingRequests:
        await tpjAccepting(env) && (await TPJBusiness.load(env)).config.settings.acceptShop
    });
  }

  if (
    request.method === "POST" &&
    path === "/api/shop/requests"
  ) {
    return tpjSaveShop(
      request,
      env
    );
  }

  if (
    path.startsWith("/api/admin/")
  ) {
    await tpjAdmin(
      request,
      env
    );

      const internalMatch = path.match(
      /^\/api\/admin\/orders\/(TPJ-[A-Za-z0-9-]+)$/
    );

    if (
      request.method === "PATCH" &&
      internalMatch
    ) {
      return tpjUpdateInternalRequest(
        request,
        env,
        internalMatch[1]
      );
    }

    if (
      request.method !== "GET"
    ) {
      throw tpjError(
        "This dashboard action is not installed yet.",
        405
      );
    }

    if (
      path === "/api/admin/orders"
    ) {
      const source =
        url.searchParams.get("source") || "";

      if (
        source &&
        ![
          "shop",
          "cake_builder"
        ].includes(source)
      ) {
        throw tpjError(
          "Choose a valid request type."
        );
      }

      const offset =
        Math.max(
          0,

          Math.min(
            Number.parseInt(
              url.searchParams.get("offset") || "0",
              10
            ) || 0,

            1000000
          )
        );

      const rows =
        await env.DB.prepare(
          "SELECT * FROM tpj_requests " +
          "WHERE (? = '' OR source = ?) " +
          "ORDER BY created_at DESC, id DESC " +
          "LIMIT 51 OFFSET ?"
        )
          .bind(
            source,
            source,
            offset
          )
          .all();

      return tpjJSON({
        orders:
          rows.results
            .slice(0, 50)
            .map(tpjRecord),

        nextOffset:
          rows.results.length > 50
            ? offset + 50
            : null
      });
    }

    const match =
      path.match(
        /^\/api\/admin\/orders\/(TPJ-[A-Za-z0-9-]+)$/
      );

    if (match) {
      const row =
        await env.DB.prepare(
          "SELECT * FROM tpj_requests " +
          "WHERE id = ?"
        )
          .bind(match[1])
          .first();

      if (!row) {
        throw tpjError(
          "Request not found.",
          404
        );
      }

      const events =
        await env.DB.prepare(
          "SELECT event_type, " +
          "details_json, created_at " +
          "FROM tpj_request_events " +
          "WHERE request_id = ? " +
          "ORDER BY id"
        )
          .bind(row.id)
          .all();

      const files =
        await env.DB.prepare(
          "SELECT role, name, mime_type, " +
          "size_bytes, private_url " +
          "FROM tpj_files " +
          "WHERE request_id = ?"
        )
          .bind(row.id)
          .all();

      return tpjJSON({
        order:
          tpjRecord(row),

        events:
          events.results,

        files:
          files.results
      });
    }

    if (
      path === "/api/admin/notifications"
    ) {
      const rows =
        await env.DB.prepare(
          "SELECT id, request_id, " +
          "recipient_type, state, attempts, " +
          "last_error, created_at, sent_at " +
          "FROM tpj_notifications " +
          "ORDER BY created_at DESC " +
          "LIMIT 100"
        ).all();

      return tpjJSON({
        notifications:
          rows.results
      });
    }

    if (
      path === "/api/admin/availability"
    ) {
      return tpjJSON(
        await tpjAvailability(env)
      );
    }
  }

  throw tpjError(
    "Not found.",
    404
  );
}

export default {
  async fetch(request, env) {
    const origin =
      request.headers.get("Origin");

    const allowed =
      String(
        env.ALLOWED_ORIGINS || ""
      )
        .split(",")
        .map(
          value => value.trim()
        );

    let response;

    try {
      if (
        origin &&
        !allowed.includes(origin) &&
        origin !==
          new URL(request.url).origin
      ) {
        throw tpjError(
          "This website is not allowed " +
          "to use this connection.",
          403
        );
      }

      response =
        request.method === "OPTIONS"
          ? new Response(
              null,
              { status: 204 }
            )
          : await tpjRoute(
              request,
              env
            );

    } catch (error) {
      if (!error.status) {
        console.error(
          "TPJ backend error",
          error.name
        );
      }

      response = tpjJSON(
        {
          ok: false,

          error:
            error.status
              ? error.message
              : "The service is temporarily unavailable.",

          ...(error.extra || {})
        },

        error.status || 503
      );
    }
    response = await TPJDisplay.decorate(response, env);
    const headers =
      new Headers(
        response.headers
      );

    if (
      origin &&
      (
        allowed.includes(origin) ||
        origin ===
          new URL(request.url).origin
      )
    ) {
      headers.set(
        "Access-Control-Allow-Origin",
        origin
      );

      headers.set(
        "Vary",
        "Origin"
      );

      headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, OPTIONS"
      );

      headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Idempotency-Key, Authorization"
      );
    }

    return new Response(
      response.body,
      {
        status:
          response.status,

        headers
      }
    );
  }
};

/* TPJ GOOGLE BRIDGE — V1 */

async function tpjBridge(request, env) {
  const envelope = await tpjReadJSON(request);

  if (
    String(env.GOOGLE_BRIDGE_SECRET || "").length < 40 ||
    !Number.isSafeInteger(envelope.timestamp) ||
    Math.abs(Date.now() - envelope.timestamp) > 300000 ||
    typeof envelope.payload !== "string" ||
    !/^[a-f0-9]{64}$/.test(envelope.signature || "")
  ) {
    throw tpjError("Invalid bridge request.", 401);
  }

  const expected = await tpjHash(
    envelope.timestamp + "\n" + envelope.payload,
    env.GOOGLE_BRIDGE_SECRET
  );

  if (
    await tpjHash(expected) !==
    await tpjHash(envelope.signature)
  ) {
    throw tpjError("Invalid bridge signature.", 401);
  }

  let command;

  try {
    command = JSON.parse(envelope.payload);
  } catch {
    throw tpjError("Invalid bridge data.");
  }

  if (command.action === "workflow_tick") {
    return tpjWorkflowTick(env);
  }

  if (command.action === "signed_document_ack") return TPJSigning.documentAck(env, command.data || {});
  const data = command.data || {};
  const now = new Date().toISOString();

  if (command.action === "connect") {
    await env.DB.prepare(
      "INSERT INTO tpj_settings " +
      "VALUES ('google_bridge_verified', 'true', ?) " +
      "ON CONFLICT(key) DO UPDATE SET " +
      "value_json='true', updated_at=excluded.updated_at"
    ).bind(now).run();

    return tpjJSON({
      ok: true,
      verified: true
    });
  }

  if (command.action === "mail_claim") {
    await env.DB.prepare("UPDATE tpj_notifications SET state='failed',last_error='Owner email disabled; manage this event in the dashboard.',lease_until=NULL WHERE recipient_type='owner' AND event_key!='owner_new_request' AND state IN ('pending','processing')").run();
    await env.DB.prepare(
      "UPDATE tpj_notifications SET state='failed', " +
      "last_error='Retry limit reached; review this notification.' " +
      "WHERE state='processing' " +
      "AND lease_until < ? AND attempts >= 8"
    ).bind(now).run();

    const lease =
      new Date(Date.now() + 600000).toISOString();

    const rows = await env.DB.prepare(
      "UPDATE tpj_notifications SET " +
      "state='processing', attempts=attempts+1, lease_until=? " +

      "WHERE id IN (" +
      "SELECT id FROM tpj_notifications " +
      "WHERE attempts < 8 AND (" +
      "(state='pending' AND next_attempt_at <= ?) OR " +
      "(state='processing' AND lease_until < ?)) " +
      "ORDER BY created_at LIMIT 5) " +

      "RETURNING *"
    ).bind(lease, now, now).all();

    const businessContact=(await TPJBusiness.load(env)).config.settings;
    return tpjJSON({
      ok: true,

      jobs: rows.results.map(row => ({
        id: row.id,
        leaseUntil: row.lease_until,
        recipientType: row.recipient_type,
        data: {...JSON.parse(row.payload_json),businessContact}
      }))
    });
  }

  if (command.action === "mail_ack") {
    const row = await env.DB.prepare(
      "SELECT * FROM tpj_notifications " +
      "WHERE id=? AND state='processing' AND lease_until=?"
    ).bind(
      String(data.id || ""),
      String(data.leaseUntil || "")
    ).first();

    if (!row) {
      throw tpjError(
        "This email lease has expired.",
        409
      );
    }

    const sent = data.success === true;

    const state = sent
      ? "sent"
      : (
          data.uncertain === true ||
          row.attempts >= 8
            ? "failed"
            : "pending"
        );

    await env.DB.prepare(
      "UPDATE tpj_notifications SET " +
      "state=?, sent_at=?, last_error=?, " +
      "lease_until=NULL, next_attempt_at=? " +
      "WHERE id=? AND lease_until=?"
    ).bind(
      state,
      sent ? now : null,

      sent
        ? null
        : String(
            data.error || "Email delivery failed."
          ).slice(0, 400),

      new Date(Date.now() + 300000).toISOString(),
      row.id,
      row.lease_until
    ).run();

    return tpjJSON({
      ok: true,
      state
    });
  }

  if (command.action === "cake_import") {
    return tpjImportCake(data, env);
  }

  throw tpjError("Unknown bridge action.");
}

async function tpjImportCake(data, env) {
  const key =
    String(data.submissionKey || "");

  const receiptHash =
    String(data.receiptHash || "");

  if (
    !/^[A-Za-z0-9_-]{16,128}$/.test(key) ||
    !/^[a-f0-9]{64}$/.test(receiptHash)
  ) {
    throw tpjError("Invalid inquiry reference.");
  }

  const customer = {
    name:
      String(data.customer?.name || "")
        .trim()
        .slice(0, 100),

    email:
      String(data.customer?.email || "")
        .trim()
        .toLowerCase()
        .slice(0, 254),

    phone:
      String(data.customer?.phone || "")
        .trim()
        .slice(0, 40)
  };

  if (
    !customer.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) ||
    customer.phone.replace(/\D/g, "").length < 10
  ) {
    throw tpjError(
      "Valid customer contact details are required."
    );
  }

  const fulfillment =
    data.fulfillment || {};

  if (
    !["pickup", "delivery"].includes(
      fulfillment.method
    )
  ) {
    throw tpjError("Choose Pickup or Delivery.");
  }

  TPJ_M.localInstant(
    fulfillment.date,
    "12:00"
  );
  if((await TPJBusiness.load(env)).config.dateRules?.some(r=>r.date===fulfillment.date)&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(fulfillment.time||''))throw tpjError('Choose a requested pickup/delivery time for this date.');

  for (
    const name of [
      "inquiryOnly",
      "estimatedPrice",
      "depositRequired",
      "termsAccepted"
    ]
  ) {
    if (
      data.acknowledgments?.[name] !== true
    ) {
      throw tpjError(
        "All inquiry acknowledgments are required."
      );
    }
  }

  const summary = Object.fromEntries(
    Object.entries(
      data.inquirySummary || {}
    )
      .filter(
        ([label, value]) =>
          label &&
          typeof value === "string"
      )
      .slice(0, 100)
      .map(
        ([label, value]) => [
          label.slice(0, 150),
          value.slice(0, 10000)
        ]
      )
  );

  if (!Object.keys(summary).length) {
    throw tpjError(
      "The inquiry summary is missing."
    );
  }

  const files = data.files;

  if (
    !Array.isArray(files) ||
    files.length > 12
  ) {
    throw tpjError("Invalid inquiry files.");
  }

  const driveFolder =
    String(data.driveFolder || "");

  if (
    !/^https:\/\/drive\.google\.com\/drive\/folders\/[A-Za-z0-9_-]+$/
      .test(driveFolder)
  ) {
    throw tpjError(
      "The saved Drive folder is missing."
    );
  }

  let totalBytes = 0;

  for (const file of files) {
    if (
      !/^[A-Za-z0-9_-]{10,150}$/
        .test(file.driveFileId || "") ||

      !/^[a-f0-9]{64}$/
        .test(file.sha256 || "") ||

      !Number.isSafeInteger(file.size) ||
      file.size < 0 ||
      file.size > 15728640 ||

      !/^https:\/\/drive\.google\.com\//
        .test(file.url || "")
    ) {
      throw tpjError(
        "An inquiry file is invalid."
      );
    }

    totalBytes += file.size;
  }

  if (totalBytes > 31457280) {
    throw tpjError(
      "The combined files are too large."
    );
  }

  const dollars =
    Number(data.pricing?.estimatedTotal);

  if (
    !Number.isFinite(dollars) ||
    dollars < 0 ||
    dollars > 1000000
  ) {
    throw tpjError(
      "The cake estimate is invalid."
    );
  }

  const estimated =
    Math.round(dollars * 100);

  const meaningful = {
    customer,
    fulfillment,
    summary,

    edibleLayout:
      data.edibleLayout || null,

    files:
      files
        .filter(
          file =>
            file.role !==
              "Cake Builder Preview"
        )
        .map(
          file => ({
            role: file.role,
            name: file.name,
            sha256: file.sha256
          })
        )
  };

  const fingerprint =
    await tpjHash(
      tpjStable(meaningful),
      env.GOOGLE_BRIDGE_SECRET
    );

  const combinedHash =
    receiptHash + "." + fingerprint;

  const existingKey =
    await env.DB.prepare(
      "SELECT request_id, payload_hash " +
      "FROM tpj_submission_keys " +
      "WHERE source='cake_builder' " +
      "AND submission_key=?"
    ).bind(key).first();

  if (
    existingKey &&
    existingKey.payload_hash !== combinedHash
  ) {
    throw tpjError(
      "This inquiry reference was already " +
      "used for different details.",
      409
    );
  }

  if (existingKey) {
    return tpjJSON({
      ok: true,
      id: existingKey.request_id,
      duplicate: true
    });
  }

  if (
    fulfillment.date < TPJ_M.dateKey()
  ) {
    throw tpjError(
      "The requested fulfillment date has passed."
    );
  }

  if(!await tpjAccepting(env) || !(await TPJBusiness.load(env)).config.settings.acceptCake)throw tpjError('Custom cake inquiries are temporarily paused. Your selections are saved.',503);

  tpjTexasFulfillment(fulfillment);

  const availability =
    await tpjAvailability(env);

  if (
    TPJMenuTools.blocked(availability,fulfillment.date,fulfillment.time)
  ) {
    throw tpjError(
      "The requested fulfillment date is unavailable."
    );
  }

  const id =
    "TPJ-" + crypto.randomUUID();

  const now =
    new Date().toISOString();

  const savedData = {
    ...data,
    customer,
    inquirySummary: summary
  };

  delete savedData.receiptHash;
  delete savedData.submissionKey;

  const message =
    JSON.stringify({
      source: "cake_builder",
      event: "received",
      customer,
      fulfillment,
      inquirySummary: summary,
      estimatedTotalCents: estimated,
      driveFolder,
      businessName: env.BUSINESS_NAME,
      ownerEmail: env.OWNER_EMAIL
    });

  const db = env.DB;

  await db.batch([
    db.prepare(
      "INSERT OR IGNORE INTO tpj_requests " +

      "(id,source,fingerprint,customer_name," +
      "customer_email,customer_phone," +
      "fulfillment_date,fulfillment_method," +
      "payload_json,estimated_total_cents," +
      "created_at,updated_at) " +

      "SELECT ?,'cake_builder',?,?,?,?,?,?,?,?,?,? " +

      "WHERE NOT EXISTS (" +
      "SELECT 1 FROM tpj_submission_keys " +
      "WHERE source='cake_builder' " +
      "AND submission_key=?)"
    ).bind(
      id,
      fingerprint,
      customer.name,
      customer.email,
      customer.phone,
      fulfillment.date,
      fulfillment.method,
      JSON.stringify(savedData),
      estimated,
      now,
      now,
      key
    ),

    db.prepare(
      "INSERT OR IGNORE INTO tpj_submission_keys " +
      "SELECT 'cake_builder',?,?,id,? " +
      "FROM tpj_requests " +
      "WHERE source='cake_builder' " +
      "AND fingerprint=?"
    ).bind(
      key,
      combinedHash,
      now,
      fingerprint
    ),

    db.prepare(
      "INSERT INTO tpj_request_events " +
      "(request_id,event_type,details_json,created_at) " +

      "SELECT r.id,'received','{}',? " +
      "FROM tpj_requests r " +

      "JOIN tpj_submission_keys k " +
      "ON k.request_id=r.id " +

      "WHERE k.source='cake_builder' " +
      "AND k.submission_key=? " +
      "AND k.payload_hash=? " +

      "AND NOT EXISTS (" +
      "SELECT 1 FROM tpj_request_events e " +
      "WHERE e.request_id=r.id " +
      "AND e.event_type='received')"
    ).bind(
      now,
      key,
      combinedHash
    ),

    ...files.map(
      file =>
        db.prepare(
          "INSERT OR IGNORE INTO tpj_files " +

          "(id,request_id,role,name,mime_type," +
          "size_bytes,drive_file_id,private_url,created_at) " +

          "SELECT ?,r.id,?,?,?,?,?,?,? " +
          "FROM tpj_requests r " +

          "JOIN tpj_submission_keys k " +
          "ON k.request_id=r.id " +

          "WHERE r.id=? " +
          "AND k.source='cake_builder' " +
          "AND k.submission_key=? " +
          "AND k.payload_hash=?"
        ).bind(
          crypto.randomUUID(),
          file.role,
          file.name,
          file.mimeType,
          file.size,
          file.driveFileId,
          file.url,
          now,
          id,
          key,
          combinedHash
        )
    ),

    ...["customer"].map(
      recipient =>
        db.prepare(
          "INSERT OR IGNORE INTO tpj_notifications " +

          "(id,request_id,event_key,recipient_type," +
          "payload_json,next_attempt_at,created_at) " +

          "SELECT ?,r.id,'received',?," +
          "json_set(?,'$.requestId',r.id),?,? " +
          "FROM tpj_requests r " +

          "JOIN tpj_submission_keys k " +
          "ON k.request_id=r.id " +

          "WHERE k.source='cake_builder' " +
          "AND k.submission_key=? " +
          "AND k.payload_hash=?"
        ).bind(
          crypto.randomUUID(),
          recipient,
          message,
          now,
          now,
          key,
          combinedHash
        )
    ),
    ...TPJDisplay.newRequest(env, id, now)
  ]);

  const saved =
    await db.prepare(
      "SELECT request_id,payload_hash " +
      "FROM tpj_submission_keys " +
      "WHERE source='cake_builder' " +
      "AND submission_key=?"
    ).bind(key).first();

  if (
    !saved ||
    saved.payload_hash !== combinedHash
  ) {
    throw tpjError(
      "This inquiry reference changed.",
      409
    );
  }

  return tpjJSON({
    ok: true,
    id: saved.request_id,
    duplicate: saved.request_id !== id
  });
}

async function tpjCakeReceipt(
  request,
  env,
  url
) {
  const key =
    url.searchParams.get("key") || "";

  const token =
    (
      request.headers.get("Authorization") || ""
    ).replace(/^Bearer /, "");

  if (
    !/^[A-Za-z0-9_-]{16,128}$/.test(key) ||
    !/^[a-f0-9]{64}$/.test(token)
  ) {
    throw tpjError(
      "Invalid inquiry receipt."
    );
  }

  const row =
    await env.DB.prepare(
      "SELECT request_id,payload_hash " +
      "FROM tpj_submission_keys " +
      "WHERE source='cake_builder' " +
      "AND submission_key=?"
    ).bind(key).first();

  if (
    row &&
    row.payload_hash.split(".")[0] ===
      await tpjHash(token)
  ) {
    return tpjJSON({
      ok: true,
      id: row.request_id
    });
  }

  return tpjJSON(
    {
      ok: false,
      pending: true
    },
    202
  );
}
/* TPJ INTERNAL REQUEST MANAGEMENT */
async function tpjUpdateInternalRequest(request, env, id) {
  const body = await tpjReadJSON(request);

  const statuses = [
    "submitted",
    "reviewing",
    "awaiting_customer",
    "awaiting_payment",
    "confirmed",
    "preparing",
    "ready",
    "completed",
    "declined",
    "cancelled"
  ];
  statuses.push("awaiting_contract", "payment_review", "cancellation_requested", "sandbox_test");

  if (
    !Number.isSafeInteger(body.version) ||
    body.version < 1 ||
    !statuses.includes(body.status) ||
    typeof body.internalNotes !== "string" ||
    body.internalNotes.length > 10000
  ) {
    throw tpjError(
      "Choose a valid status and keep notes under 10,000 characters.",
      422
    );
  }

  const current = await env.DB.prepare(
    "SELECT * FROM tpj_requests WHERE id = ?"
  ).bind(id).first();

  if (!current) {
    throw tpjError("Request not found.", 404);
  }

  if (current.version !== body.version) {
    throw tpjError(
      "This request changed in another window. Reload it before saving.",
      409
    );
  }

  if(body.status!==current.status)throw tpjError('Use Accept inquiry, Cancel order or the fulfillment form to change an order stage. This action saves private notes only.',422);

  const notes = body.internalNotes.trim();

  if (
    current.status === body.status &&
    current.internal_notes === notes
  ) {
    return tpjJSON({
      ok: true,
      order: tpjRecord(current)
    });
  }

  const now = new Date().toISOString();

  const result = await env.DB.batch([
    env.DB.prepare(
      "UPDATE tpj_requests SET status = ?, internal_notes = ?, " +
      "version = version + 1, updated_at = ? " +
      "WHERE id = ? AND version = ? RETURNING id"
    ).bind(
      body.status,
      notes,
      now,
      id,
      body.version
    ),

    env.DB.prepare(
      "INSERT INTO tpj_request_events " +
      "(request_id,event_type,details_json,created_at) " +
      "SELECT ?,'internal_updated',?,? WHERE changes() = 1"
    ).bind(
      id,
      JSON.stringify({
        previousStatus: current.status,
        status: body.status,
        notesChanged: current.internal_notes !== notes,
        previousVersion: body.version,
        version: body.version + 1
      }),
      now
    )
  ]);

  if (!result[0].results?.length) {
    throw tpjError(
      "This request changed in another window. Reload it before saving.",
      409
    );
  }

  const updated = await env.DB.prepare(
    "SELECT * FROM tpj_requests WHERE id = ?"
  ).bind(id).first();

  return tpjJSON({
    ok: true,
    order: tpjRecord(updated)
  });
}
/* TPJ SQUARE SANDBOX CONNECTION CHECK */
async function tpjSquareSandboxStatus(env) {
  const checks = {
    sandboxSelected:
      String(env.SQUARE_ENVIRONMENT || "")
        .trim()
        .toLowerCase() === "sandbox",

    applicationIdConfigured:
      Boolean(
        String(env.SQUARE_APPLICATION_ID || "").trim()
      ),

    accessTokenConfigured:
      Boolean(
        String(env.SQUARE_ACCESS_TOKEN || "").trim()
      ),

    locationIdConfigured:
      Boolean(
        String(env.SQUARE_LOCATION_ID || "").trim()
      ),

    squareReachable: false,
    tokenAccepted: false,
    locationFound: false,
    locationActive: false,
    locationInUS: false,
    locationUsesUSD: false,
    cardProcessingSupported: false
  };

  const reply = message => tpjJSON({
    ok: Object.values(checks).every(Boolean),
    stage: "square-sandbox-connection",
    paymentsEnabled: false,
    checks,
    message
  });

  if (
    !checks.sandboxSelected ||
    !checks.applicationIdConfigured ||
    !checks.accessTokenConfigured ||
    !checks.locationIdConfigured
  ) {
    return reply(
      "Check the four Square Sandbox settings in Cloudflare."
    );
  }

  const controller = new AbortController();

  const timer = setTimeout(
    () => controller.abort(),
    15000
  );

  try {
    const response = await fetch(
      "https://connect.squareupsandbox.com/v2/locations",
      {
        method: "GET",
        redirect: "manual",

        headers: {
          Authorization:
            "Bearer " +
            String(env.SQUARE_ACCESS_TOKEN).trim(),

          "Square-Version": "2026-09-16",
          Accept: "application/json"
        },

        signal: controller.signal
      }
    );

    checks.squareReachable = true;

    if (!response.ok) {
      return reply(
        response.status === 401 ||
        response.status === 403
          ? "Square did not accept this Sandbox access token. Check its environment and permissions."
          : "Square returned HTTP " +
            response.status +
            ". Try again shortly."
      );
    }

    const data = await response.json();

    checks.tokenAccepted = true;

    const location = Array.isArray(data.locations)
      ? data.locations.find(
          item =>
            item.id ===
            String(env.SQUARE_LOCATION_ID).trim()
        )
      : null;

    checks.locationFound = Boolean(location);

    checks.locationActive =
      location?.status === "ACTIVE";

    checks.locationInUS =
      location?.country === "US";

    checks.locationUsesUSD =
      location?.currency === "USD";

    checks.cardProcessingSupported =
      Array.isArray(location?.capabilities) &&
      location.capabilities.includes(
        "CREDIT_CARD_PROCESSING"
      );

    return reply(
      Object.values(checks).every(Boolean)
        ? "Sandbox token and location verified. Application ID is configured; card-entry testing comes next."
        : "The token connected. Check the location settings marked false."
    );

  } catch (error) {
    return reply(
      error.name === "AbortError"
        ? "Square's connection check timed out. Try again."
        : "The Square Sandbox check could not be completed. Try again."
    );

  } finally {
    clearTimeout(timer);
  }
}
/* TPJ SANDBOX CARD TEST — NO CUSTOMER ORDERS */

function tpjRequireSquareSandbox(env) {
  if (
    String(env.SQUARE_ENVIRONMENT || "")
      .trim()
      .toLowerCase() !== "sandbox"
  ) {
    throw tpjError(
      "This test is available only in Sandbox.",
      409
    );
  }

  for (const name of [
    "SQUARE_ACCESS_TOKEN",
    "SQUARE_APPLICATION_ID",
    "SQUARE_LOCATION_ID"
  ]) {
    if (!String(env[name] || "").trim()) {
      throw tpjError(
        "A Square Sandbox setting is missing.",
        503
      );
    }
  }
}

async function tpjSquareTestConfig(env) {
  tpjRequireSquareSandbox(env);

  await env.DB.prepare(
    "SELECT test_key " +
    "FROM tpj_square_sandbox_tests LIMIT 1"
  ).all();

  const response =
    await tpjSquareSandboxStatus(env);

  const status = await response.json();

  if (!status.ok) {
    throw tpjError(status.message, 503);
  }

  return tpjJSON({
    ok: true,
    environment: "sandbox",
    amountCents: 100,
    currency: "USD",

    applicationId:
      String(env.SQUARE_APPLICATION_ID).trim(),

    locationId:
      String(env.SQUARE_LOCATION_ID).trim()
  });
}

async function tpjSquareSandboxCall(
  env,
  path,
  body
) {
  tpjRequireSquareSandbox(env);

  const controller = new AbortController();

  const timer = setTimeout(
    () => controller.abort(),
    15000
  );

  try {
    const response = await fetch(
      "https://connect.squareupsandbox.com/v2" + path,
      {
        method: body ? "POST" : "GET",
        redirect: "manual",

        headers: {
          Authorization:
            "Bearer " +
            String(env.SQUARE_ACCESS_TOKEN).trim(),

          "Square-Version": "2026-09-16",
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        ...(body
          ? { body: JSON.stringify(body) }
          : {}),

        signal: controller.signal
      }
    );

    let data = null;

    try {
      data = await response.json();
    } catch {}

    return {
      ok: response.ok,
      status: response.status,
      data
    };

  } catch {
    throw tpjError(
      "Square did not return a confirmed result. Retry the same test.",
      503
    );

  } finally {
    clearTimeout(timer);
  }
}

async function tpjSquareTestPayment(
  request,
  env
) {
  tpjRequireSquareSandbox(env);

  const body = await tpjReadJSON(request);

  if (
    !/^[A-Za-z0-9_-]{16,45}$/.test(
      body.testKey || ""
    ) ||
    typeof body.sourceId !== "string" ||
    !/^cnon:[A-Za-z0-9:_-]{1,4000}$/.test(
      body.sourceId
    )
  ) {
    throw tpjError(
      "A valid test reference and Square card token are required.",
      422
    );
  }

  const key = body.testKey;

  const location =
    String(env.SQUARE_LOCATION_ID).trim();

  const hash = await tpjHash(body.sourceId);
  const now = new Date().toISOString();

  await env.DB.prepare(
    "INSERT OR IGNORE INTO tpj_square_sandbox_tests " +
    "(test_key,source_hash,location_id,created_at,updated_at) " +
    "VALUES (?,?,?,?,?)"
  ).bind(
    key,
    hash,
    location,
    now,
    now
  ).run();

  const previous = await env.DB.prepare(
    "SELECT * FROM tpj_square_sandbox_tests " +
    "WHERE test_key = ?"
  ).bind(key).first();

  if (
    previous.source_hash !== hash ||
    previous.location_id !== location
  ) {
    throw tpjError(
      "This test reference belongs to a different attempt.",
      409
    );
  }

  const success = id => tpjJSON({
    ok: true,
    environment: "sandbox",
    paymentId: id,
    amountCents: 100,
    currency: "USD",
    saved: true
  });

  if (previous.status === "COMPLETED") {
    return success(previous.square_payment_id);
  }

  if (previous.status === "FAILED") {
    return tpjJSON({
      ok: false,
      retryable: false,
      error:
        "This test failed. Start a new card attempt."
    }, 422);
  }

  const result = previous.square_payment_id
    ? await tpjSquareSandboxCall(
        env,
        "/payments/" +
        encodeURIComponent(
          previous.square_payment_id
        )
      )
    : await tpjSquareSandboxCall(
        env,
        "/payments",
        {
          source_id: body.sourceId,
          idempotency_key: key,
          location_id: location,

          amount_money: {
            amount: 100,
            currency: "USD"
          },

          autocomplete: true,
          accept_partial_authorization: false,
          reference_id: "TPJ-SANDBOX-TEST",

          note:
            "TPJ Sandbox integration test — no customer order"
        }
      );

  if (!result.ok) {
    const codes =
      Array.isArray(result.data?.errors)
        ? result.data.errors
            .map(error => error.code)
            .filter(code =>
              typeof code === "string" &&
              /^[A-Z0-9_]{1,80}$/.test(code)
            )
        : [];

    if (
      result.status >= 400 &&
      result.status < 500 &&
      ![401, 403, 408, 429].includes(
        result.status
      )
    ) {
      await env.DB.prepare(
        "UPDATE tpj_square_sandbox_tests " +
        "SET status='FAILED'," +
        "error_codes_json=?,updated_at=? " +
        "WHERE test_key=? " +
        "AND status='PENDING' " +
        "AND square_payment_id IS NULL"
      ).bind(
        JSON.stringify(codes),
        new Date().toISOString(),
        key
      ).run();

      return tpjJSON({
        ok: false,
        retryable: false,

        error:
          "Square rejected the test: " +
          (
            codes.join(", ") ||
            "payment declined"
          )
      }, 422);
    }

    throw tpjError(
      "Square returned HTTP " +
      result.status +
      ". Retry the same test after checking the connection.",
      503
    );
  }

  const payment = result.data?.payment;

  if (
    !payment?.id ||
    payment.location_id !== location ||
    payment.amount_money?.amount !== 100 ||
    payment.amount_money?.currency !== "USD" ||
    payment.source_type !== "CARD"
  ) {
    throw tpjError(
      "Square returned an unexpected test result. Retry the same test.",
      503
    );
  }

  const state =
    payment.status === "COMPLETED"
      ? "COMPLETED"
      : ["FAILED", "CANCELED"].includes(
          payment.status
        )
        ? "FAILED"
        : "PENDING";

  await env.DB.prepare(
    "UPDATE tpj_square_sandbox_tests " +
    "SET square_payment_id=?,status=?,updated_at=? " +
    "WHERE test_key=? AND status='PENDING'"
  ).bind(
    payment.id,
    state,
    new Date().toISOString(),
    key
  ).run();

  const saved = await env.DB.prepare(
    "SELECT * FROM tpj_square_sandbox_tests " +
    "WHERE test_key=?"
  ).bind(key).first();

  if (saved.status === "COMPLETED") {
    return success(saved.square_payment_id);
  }

  return tpjJSON({
    ok: false,
    retryable: saved.status === "PENDING",

    error:
      saved.status === "PENDING"
        ? "Square is still processing the test. Retry the same test."
        : "The test payment failed. Start a new card attempt."

  }, saved.status === "PENDING" ? 202 : 422);
}

/* TPJ ORDER WORKFLOW — append after the existing Worker */
const TPJWorkflow = (() => {
 const SITE='https://www.thepastryjunkie.com';
 const API='https://tpj-orders-api.business-c3f.workers.dev';
 const TABLES=['tpj_offers','tpj_payment_intents','tpj_payment_attempts','tpj_square_events','tpj_cancellation_requests','tpj_store_credits','tpj_payment_disputes','tpj_credit_uses'];
 const now=()=>new Date().toISOString();
 const uuid=()=>crypto.randomUUID();
 const validID=x=>typeof x==='string' && /^[A-Za-z0-9_-]{16,80}$/.test(x);
 const error=(m,s=422)=>tpjError(m,s);
 const get=(env,sql,...v)=>env.DB.prepare(sql).bind(...v).first();
 const all=async(env,sql,...v)=>(await env.DB.prepare(sql).bind(...v).all()).results;
 const run=(env,sql,...v)=>env.DB.prepare(sql).bind(...v).run();
 const stmt=(env,sql,...v)=>env.DB.prepare(sql).bind(...v);
 const dollars=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n/100);
 function day(ms=Date.now()){
  const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(ms);
  const f=k=>p.find(x=>x.type===k).value;return f('year')+'-'+f('month')+'-'+f('day');
 }
 function dateMS(s){
  if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))throw error('Choose a valid date.');
  const n=Date.parse(s+'T00:00:00Z');if(!Number.isFinite(n)||new Date(n).toISOString().slice(0,10)!==s)throw error('Choose a valid date.');return n;
 }
 function localMS(d,t='00:00'){
  dateMS(d);if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))throw error('Choose a valid Central time.');
  const target=Date.parse(d+'T'+t+':00Z');let value=target;
  for(let i=0;i<4;i++){
   const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(value);
   const f=k=>p.find(x=>x.type===k).value;
   const actual=Date.parse(f('year')+'-'+f('month')+'-'+f('day')+'T'+f('hour')+':'+f('minute')+':00Z');
   if(actual===target)return value;value+=target-actual;
  }throw error('This time does not exist in Central time. Choose another time.');
 }
 const shiftDay=(d,n)=>new Date(dateMS(d)+n*86400000).toISOString().slice(0,10);
 const envName=env=>{
  const name=String(env.SQUARE_ENVIRONMENT||'').trim().toLowerCase();
  if(!['sandbox','production'].includes(name))throw error('Square environment is not configured.',503);return name;
 };
 function enabled(env){
  if(String(env.PAYMENTS_ENABLED||'').trim()!=='true')throw error('Payment requests are not enabled yet.',503);
  envName(env);
  for(const k of ['SQUARE_ACCESS_TOKEN','SQUARE_APPLICATION_ID','SQUARE_LOCATION_ID','SQUARE_WEBHOOK_SIGNATURE_KEY'])if(!String(env[k]||'').trim())throw error('A required Square setting is missing.',503);
  if(String(env.SQUARE_WEBHOOK_URL||'')!==API+'/api/square/webhook')throw error('Check SQUARE_WEBHOOK_URL in Cloudflare.',503);
 }
 async function square(env,path,body){
  const environment=envName(env),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  try{
   const response=await fetch((environment==='sandbox'?'https://connect.squareupsandbox.com':'https://connect.squareup.com')+'/v2'+path,{
    method:body?'POST':'GET',redirect:'manual',signal:controller.signal,
    headers:{Authorization:'Bearer '+String(env.SQUARE_ACCESS_TOKEN).trim(),'Square-Version':'2026-09-16','Content-Type':'application/json',Accept:'application/json'},
    ...(body?{body:JSON.stringify(body)}:{})
   });
   let data;try{data=await response.json();}catch{data={};}
   return {ok:response.ok,status:response.status,data};
  }catch{throw error('Square did not return a verified result. Retry the same payment; do not start another payment.',503);}
  finally{clearTimeout(timer);}
 }
 async function link(env,o){
  const token=await tpjHash('TPJ-WORKFLOW-LINK:'+o.id,env.GOOGLE_BRIDGE_SECRET);
  return SITE+'/pages/order.html#'+o.id+'.'+token;
 }
 async function loadOffer(env,id){
  const o=await get(env,'SELECT * FROM tpj_offers WHERE id=?',id);if(!o)throw error('Order link not found.',404);await TPJOrderManagement.guard(env,o.request_id);return o;
 }
 async function customerAuth(request,env,id){
  const token=(request.headers.get('Authorization')||'').replace(/^Bearer /,'');
  if(!/^[a-f0-9]{64}$/.test(token))throw error('This private order link is invalid.',401);
  const o=await loadOffer(env,id);
  if(await tpjHash(token)!==o.token_hash)throw error('This private order link is invalid.',401);return o;
 }
 function audit(env,requestID,type,details){
  return stmt(env,'INSERT INTO tpj_request_events (request_id,event_type,details_json,created_at) VALUES (?,?,?,?)',requestID,type,JSON.stringify(details),now());
 }
 async function mail(env,o,eventKey,title,message,recipients=['customer'],extras={}){
  if((await env.DB.prepare('SELECT purging FROM tpj_order_management WHERE request_id=?').bind(o.request_id).first())?.purging)return [];
  recipients=recipients.filter(x=>x==='customer');
  if(!recipients.length)return [stmt(env,"INSERT INTO tpj_request_events(request_id,event_type,details_json,created_at) SELECT ?,'workflow_alert',?,? WHERE NOT EXISTS(SELECT 1 FROM tpj_request_events WHERE request_id=? AND event_type='workflow_alert' AND json_extract(details_json,'$.eventKey')=?)",o.request_id,JSON.stringify({eventKey,title,message}),now(),o.request_id,eventKey)];
  const paymentRow=await get(env,'SELECT COALESCE(SUM(paid_cents),0) total FROM tpj_payment_intents WHERE offer_id=?',o.id);
  const record=await get(env,'SELECT evidence_json,evidence_hash FROM tpj_signed_records WHERE offer_id=?',o.id);
  const snap=JSON.parse(o.snapshot_json);
  const data={workflowVersion:2,snapshot:snap,offerId:o.id,eventKey,paidTotalCents:paymentRow.total,record:record?{evidence:JSON.parse(record.evidence_json),hash:record.evidence_hash}:null,event:'workflow',source:snap.source,requestId:o.request_id,customer:snap.customer,businessName:env.BUSINESS_NAME,ownerEmail:env.OWNER_EMAIL,
   sandbox:o.environment==='sandbox',title,message,orderURL:await link(env,o),initialCents:o.initial_cents,balanceDueDate:o.balance_due_date,totalCents:o.total_cents,fulfillmentDate:o.fulfillment_date,fulfillmentTime:o.fulfillment_time,...extras};
  const when=now();return recipients.map(recipient=>stmt(env,
   'INSERT OR IGNORE INTO tpj_notifications (id,request_id,event_key,recipient_type,payload_json,next_attempt_at,created_at) VALUES (?,?,?,?,?,?,?)',
   uuid(),o.request_id,'wf:'+eventKey,recipient,JSON.stringify(data),when,when));
 }
 async function view(env,o,admin=false){
  const intents=await all(env,'SELECT id,phase,amount_cents,status,paid_cents,paid_at FROM tpj_payment_intents WHERE offer_id=? ORDER BY phase DESC',o.id);
  const attempts=admin?await all(env,'SELECT a.id,a.intent_id,a.square_payment_id,a.status,a.refunded_cents,a.error_codes_json,a.created_at FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE i.offer_id=? ORDER BY a.created_at DESC',o.id):undefined;
  const cancel=await get(env,'SELECT reason,within_credit_window,received_at FROM tpj_cancellation_requests WHERE offer_id=?',o.id);
  const credits=await all(env,'SELECT id,code,environment,amount_cents,remaining_cents,conditions,expires_on,created_at FROM tpj_store_credits WHERE request_id=? AND environment=?',o.request_id,o.environment);
  const initial=intents.find(x=>x.phase==='initial');
  const snapshot=JSON.parse(o.snapshot_json),orderTotals=await TPJChanges.summary(env,o);
  return {change:snapshot.change||null,orderTotals,businessContact:(await TPJBusiness.load(env)).config.settings,id:o.id,requestId:o.request_id,environment:o.environment,status:o.status,totalCents:o.total_cents,initialCents:o.initial_cents,rushFeeCents:o.rush_fee_cents,
   fulfillmentDate:o.fulfillment_date,fulfillmentTime:o.fulfillment_time,balanceDueDate:o.balance_due_date,contractRequired:!!o.contract_required,
   terms:JSON.parse(o.terms_json),termsHash:await tpjHash(o.terms_json),snapshot:JSON.parse(o.snapshot_json),signature:o.signature_json?JSON.parse(o.signature_json):null,
   signingVersion:2,documentRecord:await get(env,'SELECT evidence_hash,pdf_sha256,archived_at FROM tpj_signed_records WHERE offer_id=?',o.id),expiresAt:o.expires_at,expired:!initial?.paid_at&&Date.parse(o.expires_at)<=Date.now()&&!(snapshot.change&&o.status==='SIGNED'),confirmedAt:o.confirmed_at,paymentReview:orderTotals.paymentReview,intents,cancellation:cancel,credits,
   ...(admin?{attempts,orderURL:await link(env,o),signingRecord:await get(env,'SELECT * FROM tpj_signed_records WHERE offer_id=?',o.id)}:{}),
   canPay:o.status==='SIGNED'&&!orderTotals.paymentReview&&Date.parse(o.fulfillment_at)>Date.now()&&o.environment===envName(env)&&String(env.PAYMENTS_ENABLED)==='true',
   applicationId:o.environment===envName(env)?String(env.SQUARE_APPLICATION_ID||'').trim():null,locationId:String(env.SQUARE_LOCATION_ID||'').trim()};
 }
 async function status(env){
  const names=await all(env,"SELECT name FROM sqlite_master WHERE type='table'");const have=new Set(names.map(x=>x.name));
  let environment;try{environment=envName(env);}catch{environment='not configured';}
  const missing=[...TABLES,'tpj_signing_challenges','tpj_signed_records'].filter(x=>!have.has(x));
  let locationVerified=false;
  if(['sandbox','production'].includes(environment)&&env.SQUARE_ACCESS_TOKEN&&env.SQUARE_LOCATION_ID){try{const r=await square(env,'/locations');locationVerified=r.ok&&Array.isArray(r.data.locations)&&r.data.locations.some(x=>x.id===String(env.SQUARE_LOCATION_ID).trim()&&x.status==='ACTIVE'&&x.currency==='USD'&&x.country==='US'&&x.capabilities?.includes('CREDIT_CARD_PROCESSING'));}catch{}}
  const lastWebhook=missing.length?null:await get(env,'SELECT event_type,processed_at FROM tpj_square_events WHERE environment=? ORDER BY processed_at DESC LIMIT 1',environment);
  return tpjJSON({ok:missing.length===0,environment,locationVerified,lastWebhook,missingTables:missing,paymentsEnabled:String(env.PAYMENTS_ENABLED)==='true',
   webhookConfigured:Boolean(env.SQUARE_WEBHOOK_SIGNATURE_KEY)&&env.SQUARE_WEBHOOK_URL===API+'/api/square/webhook',
   testEmailConfigured:!!String(env.PAYMENT_TEST_EMAIL||'').trim(),ownerDashboard:SITE+'/pages/orders-admin.html'});
 }
 async function issue(request,env,id){
  enabled(env);const b=await tpjReadJSON(request),environment=envName(env);
  const configuration=await (await status(env)).json();
  if(!configuration.ok||!configuration.locationVerified||!configuration.webhookConfigured||!configuration.lastWebhook)throw error('Verify the Square location and send a signed webhook test for this environment before issuing approvals.',503);
  if(!validID(b.operationKey)||!Number.isSafeInteger(b.version))throw error('Reload the request and try again.');
  if(!Number.isSafeInteger(b.totalCents)||b.totalCents<1||b.totalCents>5000000||!Number.isSafeInteger(b.rushFeeCents)||b.rushFeeCents<0||b.rushFeeCents>=b.totalCents)throw error('Enter valid final prices. The final total must already include any rush fee.');
  const row=await get(env,'SELECT * FROM tpj_requests WHERE id=?',id);if(!row)throw error('Request not found.',404);
  const existingID=await get(env,'SELECT * FROM tpj_offers WHERE id=?',b.operationKey);
  if(existingID){if(b.quote&&JSON.stringify(JSON.parse(existingID.snapshot_json).quote)!==JSON.stringify(TPJBusiness.quote(b)))throw error('This approval reference was already used with a different itemized quote.',409);if(existingID.total_cents!==b.totalCents||existingID.rush_fee_cents!==b.rushFeeCents||existingID.fulfillment_date!==b.fulfillmentDate||existingID.fulfillment_time!==b.fulfillmentTime||existingID.terms_json!==JSON.stringify(b.terms))throw error('This approval reference was already used with different details.',409);if(existingID.request_id!==id)throw error('Approval reference conflict.',409);return tpjJSON({ok:true,offer:await view(env,existingID,true)});}
  if(await get(env,"SELECT i.id FROM tpj_payment_intents i JOIN tpj_offers o ON o.id=i.offer_id WHERE o.request_id=? AND i.paid_cents>0 LIMIT 1",id))throw error('This request already has a recorded payment. Keep its existing agreement and resolve any changes with the customer; do not issue a second payment schedule.',409);
  if(row.version!==b.version)throw error('This request changed. Reload it before issuing an approval.',409);
  if(['completed','cancelled','declined'].includes(row.status))throw error('Reopen the request before issuing an approval.');
  if(await get(env,"SELECT id FROM tpj_offers WHERE request_id=? AND status!='CLOSED'",id))throw error('An approval already exists. Open it or close it before issuing another.',409);
  const customer={name:row.customer_name,email:row.customer_email,phone:row.customer_phone};
  if(environment==='sandbox'){
   const test=String(env.PAYMENT_TEST_EMAIL||'').trim().toLowerCase();
   if(!test||![test,String(env.OWNER_EMAIL||'').toLowerCase()].includes(customer.email.toLowerCase()))throw error('Sandbox approvals may be sent only to PAYMENT_TEST_EMAIL or your owner email. Use your own test inquiry.');
  }
  const terms=b.terms;
  if(!terms||typeof terms.version!=='string'||typeof terms.title!=='string'||!Array.isArray(terms.sections)||terms.sections.length!==(row.source==='cake_builder'?20:11)||JSON.stringify(terms).length>100000)throw error('The complete order terms are required.');
  if(!terms.sections.every(x=>x&&typeof x.title==='string'&&typeof x.text==='string'&&x.text.trim()))throw error('A terms section is empty.');
  if(row.source==='cake_builder' && JSON.stringify(terms.initialSectionIndexes)!=='[3,4,5]')throw error('Reload the dashboard to load the current cake initials requirements.');
  const itemized=TPJBusiness.quote(b),businessInfo=(await TPJBusiness.load(env)).config.settings;
  if(b.businessConsent!==true||String(b.businessSigner||'').trim().length<2)throw error('Confirm your business signature before sending the agreement.');
  if(b.priceConfirmed!==true && b.termsReviewed!==true)throw error('Confirm the final price and fulfillment details before issuing the approval.');
  const fulfillment=localMS(b.fulfillmentDate,b.fulfillmentTime);
  if(fulfillment<=Date.now())throw error('The approved fulfillment time must be in the future.');
  const days=(dateMS(b.fulfillmentDate)-dateMS(day()))/86400000,cake=row.source==='cake_builder';
  const rush=cake&&(days<=7||b.rushOrder===true);
  // The owner may adjust or waive the proposed rush fee before approval.
  if(!rush&&b.rushFeeCents!==0)throw error('Select cake rush order before entering a rush fee.');
  const initial=!cake||days<=7?b.totalCents:Math.ceil(b.totalCents/2);
  const due=initial<b.totalCents?shiftDay(b.fulfillmentDate,-7):null;
  const expires=Math.min(Date.now()+86400000,fulfillment,due?localMS(due):Infinity);
  if(expires<=Date.now()+60000)throw error('The payment deadline is too close. Review the fulfillment date and price before approving.');
  const details=JSON.parse(row.payload_json),order=details.order||{};tpjTexasFulfillment(order.fulfillment||details.fulfillment);
  const snapshot={quote:itemized,business:businessInfo,businessAcceptance:{name:String(b.businessSigner).trim().slice(0,150),consent:true,signedAt:now()},source:row.source,customer,fulfillment:{...(order.fulfillment||details.fulfillment||{}),date:b.fulfillmentDate,time:b.fulfillmentTime},items:itemized.lines,inquirySummary:details.inquirySummary||{},
   approvedDescription:String(b.approvedDescription||'').trim().slice(0,10000),customerNotes:order.notes||''};
  const created=now(),token=await tpjHash('TPJ-WORKFLOW-LINK:'+b.operationKey,env.GOOGLE_BRIDGE_SECRET);
  const o={id:b.operationKey,request_id:id,environment,status:'OPEN',token_hash:await tpjHash(token),total_cents:b.totalCents,initial_cents:initial,rush_fee_cents:b.rushFeeCents,
   fulfillment_date:b.fulfillmentDate,fulfillment_time:b.fulfillmentTime,fulfillment_at:new Date(fulfillment).toISOString(),balance_due_date:due,
   contract_required:cake?1:0,terms_json:JSON.stringify(terms),snapshot_json:JSON.stringify(snapshot),expires_at:new Date(expires).toISOString(),created_at:created,updated_at:created};
  const notification=await mail(env,o,o.id+':offer','Your order is ready for review',
   cake?'Review your approved cake details, initial the three marked sections and sign the complete agreement before paying. Your date is secured only after the required initial payment is verified.':'Review your approved Shop order and terms, then pay in full to confirm.');
  const fields=Object.keys(o),values=Object.values(o);
  const initialID=uuid(),balanceID=uuid();
  await env.DB.batch([
   stmt(env,'UPDATE tpj_requests SET version=CASE WHEN version=? AND NOT EXISTS(SELECT 1 FROM tpj_payment_intents i JOIN tpj_offers o ON o.id=i.offer_id WHERE o.request_id=tpj_requests.id AND i.paid_cents>0) THEN version+1 ELSE NULL END,approval_json=?,approved_total_cents=?,status=?,updated_at=? WHERE id=?',b.version,JSON.stringify({stage:'issued',offerId:o.id}),o.total_cents,cake?'awaiting_contract':'awaiting_payment',created,id),
   stmt(env,'INSERT INTO tpj_offers ('+fields.join(',')+') SELECT '+fields.map(()=>'?').join(',')+' WHERE changes()=1',...values),
   stmt(env,"INSERT INTO tpj_payment_intents (id,offer_id,phase,amount_cents,created_at,updated_at) SELECT ?,?,'initial',?,?,? WHERE EXISTS(SELECT 1 FROM tpj_offers WHERE id=?)",initialID,o.id,initial,created,created,o.id),
   stmt(env,"INSERT INTO tpj_payment_intents (id,offer_id,phase,amount_cents,created_at,updated_at) SELECT ?,?,'balance',?,?,? WHERE ?>0 AND EXISTS(SELECT 1 FROM tpj_offers WHERE id=?)",balanceID,o.id,b.totalCents-initial,created,created,b.totalCents-initial,o.id),
   audit(env,id,'approval_issued',{offerId:o.id,environment,totalCents:b.totalCents,initialCents:initial,balanceDueDate:due,termsVersion:terms.version}),...notification
  ]);
  return tpjJSON({ok:true,offer:await view(env,await loadOffer(env,o.id),true)});
 }
 async function accept(request,env,o){
  if(o.status==='CLOSED')throw error('This approval has been closed.',409);
  if(Date.parse(o.expires_at)<=Date.now())throw error('This approval has expired. Ask The Pastry Junkie to review and reissue it.',409);
  const b=await tpjReadJSON(request),terms=JSON.parse(o.terms_json);
  if(b.termsHash!==await tpjHash(o.terms_json)||b.agree!==true||b.electronicConsent!==true||b.authorized!==true)throw error('Review the complete current terms and check all acknowledgments.');
  const name=String(b.name||'').trim();if(name.length<2||name.length>150)throw error('Enter your full name.');
  const initials=o.contract_required?b.initials:[];
  const initialSections=terms.initialSectionIndexes || terms.sections.map((_,i)=>i);
  if(o.contract_required&&(!Array.isArray(initials)||initials.length!==terms.sections.length||!initials.every((x,i)=>initialSections.includes(i)?typeof x==='string'&&/^[A-Za-z]{1,6}$/.test(x):x==='')))throw error('Initial each marked contract section using letters only.');
  const signed={name,initials,termsHash:b.termsHash,termsVersion:terms.version,electronicConsent:true,authorized:true,signedAt:now(),userAgent:String(request.headers.get('User-Agent')||'').slice(0,300),signingIP:String(request.headers.get('CF-Connecting-IP')||'').slice(0,60)};
  if(o.status==='SIGNED')return tpjJSON({ok:true,offer:await view(env,o)});
  const prepared=await TPJSigning.prepare(request,env,o,b,signed);
  const email=await mail(env,o,o.id+':signed',o.contract_required?'Your cake agreement is signed':'Your Shop agreement is accepted','Your signed agreement is attached for your records. Complete the required payment to secure your order.',['customer'],{record:{evidence:prepared.evidence,hash:prepared.hash},attachAgreement:true});
  await env.DB.batch([
   ...prepared.queries,
   stmt(env,"UPDATE tpj_offers SET status='SIGNED',signature_json=?,accepted_at=?,updated_at=? WHERE id=? AND status='OPEN'",JSON.stringify(signed),signed.signedAt,signed.signedAt,o.id),
   ...TPJChanges.acceptQueries(env,o,signed),
   stmt(env,"INSERT INTO tpj_request_events (request_id,event_type,details_json,created_at) SELECT ?,'terms_accepted',?,? WHERE EXISTS(SELECT 1 FROM tpj_offers WHERE id=? AND signature_json=?)",o.request_id,JSON.stringify({offerId:o.id,termsVersion:terms.version,signer:name}),now(),o.id,JSON.stringify(signed)),...email
  ]);
  return tpjJSON({ok:true,offer:await view(env,await loadOffer(env,o.id))});
 }
 async function reconcile(env,a,payment){
  const intent=await get(env,'SELECT * FROM tpj_payment_intents WHERE id=?',a.intent_id),o=await loadOffer(env,intent.offer_id);
  if(o.environment!==envName(env))throw error('Payment environment mismatch.',409);
  if(!payment||payment.reference_id!==a.id||payment.location_id!==String(env.SQUARE_LOCATION_ID).trim()||payment.amount_money?.currency!=='USD'||payment.amount_money?.amount!==intent.amount_cents||payment.source_type!=='CARD')throw error('Square payment details could not be verified.',503);
  const refunded=Number(payment.refunded_money?.amount||0);
  if(!Number.isSafeInteger(refunded)||refunded<0||refunded>intent.amount_cents)throw error('Unexpected refunded amount.',503);
  const badDispute=await get(env,"SELECT d.id FROM tpj_payment_disputes d JOIN tpj_payment_attempts a ON a.id=d.attempt_id JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE i.offer_id=? AND d.state NOT IN ('WON','INQUIRY_CLOSED') LIMIT 1",o.id);
  const otherRefund=await get(env,'SELECT a.id FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE i.offer_id=? AND a.id!=? AND a.refunded_cents>0 LIMIT 1',o.id,a.id);
  const review=refunded>0||!!badDispute||!!otherRefund||o.status==='CLOSED';
  const paid=payment.status==='COMPLETED'&&!review;
  const state=paid?'COMPLETED':review?'REVIEW':['FAILED','CANCELED'].includes(payment.status)?'FAILED':'PENDING';
  const timestamp=now(),paidAt=payment.updated_at||timestamp;
  const queries=[
   stmt(env,'UPDATE tpj_payment_attempts SET square_payment_id=?,status=?,refunded_cents=?,updated_at=? WHERE id=?',payment.id,state,refunded,timestamp,a.id)
  ];
  if(paid){
   queries.push(stmt(env,'UPDATE tpj_offers SET payment_review=0,updated_at=? WHERE id=?',timestamp,o.id));
   queries.push(stmt(env,"UPDATE tpj_payment_intents SET status='PAID',paid_cents=amount_cents,paid_at=COALESCE(paid_at,?),updated_at=? WHERE id=?",paidAt,timestamp,intent.id));
   if(intent.phase==='initial')queries.push(stmt(env,'UPDATE tpj_offers SET confirmed_at=COALESCE(confirmed_at,?),updated_at=? WHERE id=?',paidAt,timestamp,o.id));
   queries.push(stmt(env,"UPDATE tpj_requests SET status=CASE WHEN status IN ('submitted','reviewing','awaiting_payment','awaiting_contract','payment_review','sandbox_test') THEN ? ELSE status END,version=version+1,updated_at=? WHERE id=? AND status NOT IN ('cancelled','declined') AND NOT EXISTS(SELECT 1 FROM tpj_request_events WHERE request_id=? AND event_type='payment_verified' AND json_extract(details_json,'$.paymentId')=?)",o.environment==='sandbox'?'sandbox_test':'confirmed',timestamp,o.request_id,o.request_id,payment.id));
   queries.push(stmt(env,"INSERT INTO tpj_request_events (request_id,event_type,details_json,created_at) SELECT ?,'payment_verified',?,? WHERE NOT EXISTS(SELECT 1 FROM tpj_request_events WHERE request_id=? AND event_type='payment_verified' AND json_extract(details_json,'$.paymentId')=?)",o.request_id,JSON.stringify({offerId:o.id,paymentId:payment.id,phase:intent.phase,amountCents:intent.amount_cents,environment:o.environment}),timestamp,o.request_id,payment.id));
   const summary=await TPJChanges.summary(env,o),remaining=Math.max(0,summary.outstandingCents-(intent.status==='PAID'?0:intent.amount_cents));const message='Your '+(JSON.parse(o.snapshot_json).change?'additional payment':intent.phase==='initial'&&o.initial_cents<o.total_cents?'deposit':'payment')+' of '+dollars(intent.amount_cents)+' is verified. '+(remaining?'The current order has '+dollars(remaining)+' remaining. View your private order page for each payment and its due date.':'All accepted order charges are paid. Thank you!');
   queries.push(...await mail(env,o,o.id+':paid:'+intent.phase,'Payment received',message,['customer','owner'],{paymentId:payment.id,paidCents:intent.amount_cents,paidTotalCents:(await get(env,'SELECT COALESCE(SUM(paid_cents),0) total FROM tpj_payment_intents WHERE offer_id=?',o.id)).total+(intent.status==='PAID'?0:intent.amount_cents)}));
  }else if(review){
   queries.push(stmt(env,"UPDATE tpj_payment_intents SET status='REVIEW',paid_cents=?,updated_at=? WHERE id=?",Math.max(0,intent.amount_cents-refunded),timestamp,intent.id));
   queries.push(stmt(env,'UPDATE tpj_offers SET payment_review=1,updated_at=? WHERE id=?',timestamp,o.id));
   queries.push(stmt(env,"UPDATE tpj_requests SET status='payment_review',version=version+1,updated_at=? WHERE id=? AND status!='cancelled'",timestamp,o.request_id));
   queries.push(...await mail(env,o,o.id+':review:'+payment.id+':'+refunded,'Payment requires review','A refund, dispute or payment on a closed order requires your review in Square. No additional customer charge was created.',['owner']));
  }else if(state==='FAILED'){
   queries.push(stmt(env,"UPDATE tpj_payment_intents SET status='READY',updated_at=? WHERE id=? AND status='PROCESSING'",timestamp,intent.id));
  }
  await env.DB.batch(queries);
  return {paid,state,paymentId:payment.id};
 }
 async function charge(request,env,o){
  tpjTexasFulfillment(JSON.parse(o.snapshot_json).fulfillment);
  const isChange=!!JSON.parse(o.snapshot_json).change;if((await TPJChanges.summary(env,o)).paymentReview)throw error('Resolve payment review for this order before any further payment.',409);if(Date.parse(o.fulfillment_at)<=Date.now())throw error('The fulfillment deadline has passed. Contact the business before paying.',409);
  enabled(env);const b=await tpjReadJSON(request);
  if(!['initial','balance'].includes(b.phase)||!validID(b.attemptKey)||b.attemptKey.length>45||typeof b.sourceId!=='string'||!/^cnon:[A-Za-z0-9:_-]{1,4000}$/.test(b.sourceId))throw error('Valid payment details and an attempt reference are required.');
  if(o.environment!==envName(env))throw error('This link belongs to a different payment environment.',409);
  const intent=await get(env,'SELECT * FROM tpj_payment_intents WHERE offer_id=? AND phase=?',o.id,b.phase);if(!intent)throw error('This payment is not due.',409);
  if(intent.status==='PAID')return tpjJSON({ok:true,paid:true,offer:await view(env,o)});
  const hash=await tpjHash(b.sourceId);
  let a=await get(env,'SELECT * FROM tpj_payment_attempts WHERE idempotency_key=?',b.attemptKey);
  if(a&&(a.intent_id!==intent.id||a.source_hash!==hash))throw error('This attempt reference belongs to a different payment.',409);
  if(!a){
   if(o.status!=='SIGNED'||o.payment_review)throw error('The current agreement must be accepted and payment review resolved before paying.',409);
   if(b.phase==='initial'&&!isChange&&Date.parse(o.expires_at)<=Date.now())throw error('This approval expired before payment. Ask the business to reissue it.',409);
   if(b.phase==='balance'){
    const initial=await get(env,"SELECT status FROM tpj_payment_intents WHERE offer_id=? AND phase='initial'",o.id);if(initial?.status!=='PAID')throw error('The initial payment must be verified first.',409);
   }
   const timestamp=now(),id=uuid();
   await env.DB.batch([
    stmt(env,"UPDATE tpj_payment_intents SET status='PROCESSING',updated_at=? WHERE id=? AND status='READY' AND EXISTS(SELECT 1 FROM tpj_offers WHERE id=? AND status='SIGNED' AND payment_review=0 AND (?='balance' OR ?=1 OR expires_at>?))",timestamp,intent.id,o.id,b.phase,isChange?1:0,timestamp),
    stmt(env,"INSERT INTO tpj_payment_attempts (id,intent_id,idempotency_key,source_hash,created_at,updated_at) SELECT ?,?,?,?,?,? WHERE changes()=1",id,intent.id,b.attemptKey,hash,timestamp,timestamp)
   ]);
   a=await get(env,'SELECT * FROM tpj_payment_attempts WHERE idempotency_key=?',b.attemptKey);
   if(!a)throw error('Another payment attempt is processing. Retry that same attempt or contact the business.',409);
  }
  if(a.status==='FAILED')return tpjJSON({ok:false,retryable:false,error:'This card attempt failed. Try again with updated card details.'},422);
  if(a.status==='REVIEW')throw error('This payment requires the business to review it in Square.',409);
  if(!a.square_payment_id&&b.phase==='initial'&&!isChange&&Date.parse(o.expires_at)<=Date.now())throw error('This approval expired while the result was unresolved. Contact the business to check Square before starting another payment.',409);
  const result=a.square_payment_id?await square(env,'/payments/'+encodeURIComponent(a.square_payment_id)):await square(env,'/payments',{
   source_id:b.sourceId,idempotency_key:a.idempotency_key,location_id:String(env.SQUARE_LOCATION_ID).trim(),amount_money:{amount:intent.amount_cents,currency:'USD'},autocomplete:true,accept_partial_authorization:false,
   reference_id:a.id,note:'TPJ '+o.request_id+' '+intent.phase,buyer_email_address:JSON.parse(o.snapshot_json).customer.email
  });
  if(!result.ok){
   const codes=(result.data.errors||[]).map(x=>x.code).filter(x=>typeof x==='string'&&/^[A-Z0-9_]{1,80}$/.test(x));
   if(result.status>=400&&result.status<500&&![401,403,408,409,429].includes(result.status)){
    await env.DB.batch([
     stmt(env,"UPDATE tpj_payment_attempts SET status='FAILED',error_codes_json=?,updated_at=? WHERE id=? AND status='PENDING'",JSON.stringify(codes),now(),a.id),
     stmt(env,"UPDATE tpj_payment_intents SET status='READY',updated_at=? WHERE id=? AND status='PROCESSING' AND EXISTS(SELECT 1 FROM tpj_payment_attempts WHERE id=? AND status='FAILED')",now(),intent.id,a.id)
    ]);
    return tpjJSON({ok:false,retryable:false,error:'Square declined this attempt: '+(codes.join(', ')||'payment rejected')},422);
   }throw error('Square returned HTTP '+result.status+'. Retry the same attempt after checking the connection.',503);
  }
  const outcome=await reconcile(env,a,result.data.payment);
  if(!outcome.paid)return tpjJSON({ok:false,retryable:outcome.state==='PENDING',error:outcome.state==='PENDING'?'The payment is still processing. Retry this same attempt.':'The payment needs review. Contact the business.'},outcome.state==='PENDING'?202:409);
  return tpjJSON({ok:true,paid:true,paymentId:outcome.paymentId,offer:await view(env,await loadOffer(env,o.id))});
 }
 async function cancellation(request,env,o){
  if(JSON.parse(o.snapshot_json).change)return TPJChanges.cancelRequest(request,env,o);
  const b=await tpjReadJSON(request),reason=String(b.reason||'').trim();if(reason.length<3||reason.length>2000)throw error('Enter a cancellation reason between 3 and 2,000 characters.');
  const prior=await get(env,'SELECT * FROM tpj_cancellation_requests WHERE offer_id=?',o.id);if(prior)return tpjJSON({ok:true,received:true});
  const paid=Date.parse(o.confirmed_at||''),within=JSON.parse(o.snapshot_json).source==='shop'&&Number.isFinite(paid)&&Date.now()<=paid+86400000&&Date.parse(o.fulfillment_at)-Date.now()>=48*3600000;
  const timestamp=now();
  await env.DB.batch([
   stmt(env,'INSERT OR IGNORE INTO tpj_cancellation_requests (id,offer_id,reason,within_credit_window,received_at) VALUES (?,?,?,?,?)',uuid(),o.id,reason,within?1:0,timestamp),
   stmt(env,"UPDATE tpj_requests SET status='cancellation_requested',version=version+1,updated_at=? WHERE id=? AND status NOT IN ('cancelled','completed')",timestamp,o.request_id),
   audit(env,o.request_id,'cancellation_requested',{offerId:o.id,reason,withinShopCreditWindow:within}),
   ...await mail(env,o,o.id+':cancel-request','Cancellation request received','Your cancellation request has been received for review. No refund or store credit has been promised or issued. The business will confirm the outcome in writing.')
  ]);return tpjJSON({ok:true,received:true});
 }
 async function close(request,env,o){
  if(JSON.parse(o.snapshot_json).change)return TPJChanges.close(request,env,o);
  if(await get(env,"SELECT a.id FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id JOIN tpj_order_changes c ON c.offer_id=i.offer_id WHERE c.parent_offer_id=? AND a.status='PENDING' LIMIT 1",o.id))throw error('Reconcile the pending additional payment before canceling the order.',409);
  const b=await tpjReadJSON(request),reason=String(b.reason||'').trim();if(reason.length<3||reason.length>2000||b.acknowledged!==true)throw error('Enter a reason and acknowledge that this action does not issue a refund.');
  const pending=await get(env,"SELECT a.id FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE i.offer_id=? AND a.status='PENDING' LIMIT 1",o.id);
  if(pending)throw error('A payment is still processing. Reconcile it before closing this order.',409);
  if(o.status==='CLOSED')return tpjJSON({ok:true});
  await env.DB.batch([
   stmt(env,"UPDATE tpj_offers SET status=CASE WHEN NOT EXISTS(SELECT 1 FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE i.offer_id=tpj_offers.id AND a.status='PENDING') THEN 'CLOSED' ELSE NULL END,updated_at=? WHERE id=?",now(),o.id),
   stmt(env,"UPDATE tpj_requests SET status='cancelled',version=version+1,updated_at=? WHERE id=?",now(),o.request_id),
   stmt(env,"UPDATE tpj_offers SET status='CLOSED',updated_at=? WHERE id IN (SELECT offer_id FROM tpj_order_changes WHERE parent_offer_id=?)",now(),o.id),
   audit(env,o.request_id,'approval_closed',{offerId:o.id,reason}),
   stmt(env,"INSERT INTO tpj_order_management(request_id,manual_stage,updated_at) VALUES(?,'canceled',?) ON CONFLICT(request_id) DO UPDATE SET manual_stage='canceled',updated_at=excluded.updated_at",o.request_id,now()),
   ...await mail(env,o,o.id+':closed','Order canceled',reason+' Any agreed financial resolution will be confirmed separately.')
  ]);return tpjJSON({ok:true});
 }
 async function credit(request,env,o){
  if((await TPJChanges.summary(env,o)).paymentReview)throw error('Resolve payment review before issuing credit.',409);
  const b=await tpjReadJSON(request);
  if(!validID(b.operationKey)||!Number.isSafeInteger(b.amountCents)||b.amountCents<1||String(b.conditions||'').trim().length<3||String(b.conditions).length>3000)throw error('Enter a credit amount, written conditions and a valid reference.');
  if(b.expiresOn){dateMS(b.expiresOn);if(b.expiresOn<day())throw error('Credit expiration cannot be in the past.');}
  const old=await get(env,'SELECT * FROM tpj_store_credits WHERE id=?',b.operationKey);if(old){if(old.request_id!==o.request_id||old.amount_cents!==b.amountCents||old.conditions!==String(b.conditions).trim()||(old.expires_on||'')!==(b.expiresOn||''))throw error('This credit reference was already used with different details.',409);return tpjJSON({ok:true,code:old.code});}
  const paid=await get(env,'SELECT COALESCE(SUM(i.paid_cents),0) total FROM tpj_payment_intents i JOIN tpj_offers p ON p.id=i.offer_id WHERE p.request_id=? AND p.environment=?',o.request_id,o.environment),issued=await get(env,'SELECT COALESCE(SUM(amount_cents),0) total FROM tpj_store_credits WHERE request_id=? AND environment=?',o.request_id,o.environment);
  if(b.amountCents>paid.total-issued.total)throw error('The credit exceeds the uncredited recorded payment. Review the payment records.');
  const customer=JSON.parse(o.snapshot_json).customer,code='TPJ-'+uuid().slice(0,8).toUpperCase(),timestamp=now();
  await env.DB.batch([
   stmt(env,'INSERT INTO tpj_store_credits (id,request_id,environment,code,customer_email,amount_cents,remaining_cents,conditions,expires_on,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',b.operationKey,o.request_id,o.environment,code,customer.email,b.amountCents,b.amountCents,String(b.conditions).trim(),b.expiresOn||null,timestamp,timestamp),
   audit(env,o.request_id,'store_credit_issued',{code,amountCents:b.amountCents,conditions:b.conditions,expiresOn:b.expiresOn||null}),
   ...await mail(env,o,o.id+':credit:'+b.operationKey,'Store credit issued','Store credit '+code+' for '+dollars(b.amountCents)+' has been issued. '+b.conditions+(b.expiresOn?' Expires '+b.expiresOn+'.':'')+' Contact the business before placing an order to arrange its use.')
  ]);return tpjJSON({ok:true,code});
 }
 async function useCredit(request,env,id){
  const b=await tpjReadJSON(request);if(!validID(b.operationKey)||!Number.isSafeInteger(b.amountCents)||b.amountCents<1||String(b.reference||'').trim().length<3||String(b.reference).length>500)throw error('Enter the amount used and a written order reference.');
  const c=await get(env,'SELECT * FROM tpj_store_credits WHERE id=?',id);if(!c)throw error('Credit not found.',404);
  const prior=await get(env,'SELECT * FROM tpj_credit_uses WHERE id=?',b.operationKey);if(prior){if(prior.credit_id!==id||prior.amount_cents!==b.amountCents||prior.reference!==String(b.reference).trim())throw error('This redemption reference belongs to different details.',409);return tpjJSON({ok:true});}
  if(b.amountCents>c.remaining_cents)throw error('The credit balance is insufficient. Reload the record.',409);
  if(c.environment!==envName(env))throw error('This credit belongs to a different environment.');
  if(await get(env,'SELECT id FROM tpj_offers WHERE request_id=? AND environment=? AND payment_review=1 LIMIT 1',c.request_id,c.environment))throw error('Resolve the original payment review before recording credit use.',409);
  if(c.expires_on&&c.expires_on<day())throw error('This credit has expired.');
  const r=await env.DB.batch([
   stmt(env,'INSERT INTO tpj_credit_uses (id,credit_id,amount_cents,reference,created_at) VALUES (?,?,?,?,?)',b.operationKey,id,b.amountCents,String(b.reference).trim(),now()),
   stmt(env,'UPDATE tpj_store_credits SET remaining_cents=CASE WHEN remaining_cents>=? AND NOT EXISTS(SELECT 1 FROM tpj_offers o WHERE o.request_id=tpj_store_credits.request_id AND o.environment=tpj_store_credits.environment AND o.payment_review=1) THEN remaining_cents-? ELSE NULL END,updated_at=? WHERE id=? RETURNING id',b.amountCents,b.amountCents,now(),id),
   stmt(env,"INSERT INTO tpj_request_events (request_id,event_type,details_json,created_at) SELECT ?,'store_credit_used',?,? WHERE changes()=1",c.request_id,JSON.stringify({creditCode:c.code,amountCents:b.amountCents,reference:b.reference}),now())
  ]);if(!r[1].results?.length)throw error('Credit balance changed or is insufficient. Reload it.',409);return tpjJSON({ok:true});
 }
 async function verifyPayment(env,id){
  const result=await square(env,'/payments/'+encodeURIComponent(id));if(!result.ok)throw error('Square payment verification failed. Try again.',503);
  const p=result.data.payment;if(!p?.reference_id)return false;
  const a=await get(env,'SELECT * FROM tpj_payment_attempts WHERE id=?',p.reference_id);if(!a)return false;
  await reconcile(env,a,p);return true;
 }
 async function webhook(request,env){
  if(request.method!=='POST')throw error('Method not allowed.',405);
  const secret=String(env.SQUARE_WEBHOOK_SIGNATURE_KEY||''),url=String(env.SQUARE_WEBHOOK_URL||'');
  if(!secret||url!==API+'/api/square/webhook')throw error('Webhook verification is not configured.',503);
  const reader=request.body?.getReader();if(!reader)throw error('Missing webhook body.',400);
  const chunks=[];let length=0;
  while(true){const part=await reader.read();if(part.done)break;length+=part.value.length;if(length>262144){await reader.cancel();throw error('Webhook body too large.',413);}chunks.push(part.value);}
  const bytes=new Uint8Array(length);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}const raw=new TextDecoder().decode(bytes);
  let valid=false;
  try{
   const header=request.headers.get('x-square-hmacsha256-signature')||'';
   const signature=Uint8Array.from(atob(header),c=>c.charCodeAt(0));
   const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['verify']);
   valid=await crypto.subtle.verify('HMAC',key,signature,new TextEncoder().encode(url+raw));
  }catch{}
  if(!valid)throw error('Invalid Square signature.',403);
  let event;try{event=JSON.parse(raw);}catch{throw error('Invalid webhook JSON.',400);}
  if(typeof event.event_id!=='string'||event.event_id.length>200)throw error('Invalid event reference.',400);
  const eventKey=envName(env)+':'+event.event_id;
  if(await get(env,'SELECT id FROM tpj_square_events WHERE id=?',eventKey))return tpjJSON({ok:true,duplicate:true});
  const object=event.data?.object||{};
  if(['payment.created','payment.updated'].includes(event.type)&&object.payment?.id)await verifyPayment(env,object.payment.id);
  if(['refund.created','refund.updated'].includes(event.type)&&object.refund?.id){
   const r=await square(env,'/refunds/'+encodeURIComponent(object.refund.id));if(!r.ok)throw error('Refund verification failed.',503);
   if(r.data.refund?.payment_id)await verifyPayment(env,r.data.refund.payment_id);
  }
  if(['dispute.created','dispute.state.updated'].includes(event.type)&&object.dispute?.id){
   const r=await square(env,'/disputes/'+encodeURIComponent(object.dispute.id));if(!r.ok)throw error('Dispute verification failed.',503);
   const d=r.data.dispute,pid=d?.disputed_payment?.payment_id;
   if(pid){
    const p=await square(env,'/payments/'+encodeURIComponent(pid));if(!p.ok)throw error('Disputed payment verification failed.',503);
    const a=await get(env,'SELECT * FROM tpj_payment_attempts WHERE id=?',p.data.payment?.reference_id||'');
    if(a){
     await run(env,'INSERT INTO tpj_payment_disputes (id,attempt_id,state,updated_at) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET state=excluded.state,updated_at=excluded.updated_at',d.id,a.id,d.state,now());
     await reconcile(env,a,p.data.payment);
    }
   }
  }
  await run(env,'INSERT OR IGNORE INTO tpj_square_events (id,event_type,environment,processed_at) VALUES (?,?,?,?)',eventKey,String(event.type||''),envName(env),now());
  return tpjJSON({ok:true});
 }
 async function tick(env){
  if(String(env.PAYMENTS_ENABLED)!=='true')return tpjJSON({ok:true,disabled:true});
  const timestamp=now();let reconciled=0;
  const pending=await all(env,"SELECT a.* FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id JOIN tpj_offers o ON o.id=i.offer_id WHERE a.status='PENDING' AND o.environment=? ORDER BY a.updated_at LIMIT 5",envName(env));
  for(const a of pending){
   try{
    if(a.square_payment_id){await verifyPayment(env,a.square_payment_id);reconciled++;}
    else if(Date.parse(a.created_at)<Date.now()-15*60000){
     const i=await get(env,'SELECT offer_id FROM tpj_payment_intents WHERE id=?',a.intent_id),o=await loadOffer(env,i.offer_id);
     await env.DB.batch(await mail(env,o,'unresolved:'+a.id,'Unresolved payment attempt','A payment attempt has no verified result yet. Check Square before asking for a new payment. Use Reconcile payment with the Square payment ID if one exists.',['owner']));
    }
   }catch{ /* Leave unresolved work for the next trigger and Square webhooks. */ }
  }
  const offers=await all(env,"SELECT o.* FROM tpj_offers o JOIN tpj_payment_intents i ON i.offer_id=o.id AND i.phase='balance' WHERE o.status='SIGNED' AND o.payment_review=0 AND o.environment=? AND o.confirmed_at IS NOT NULL AND (i.status!='PAID' OR EXISTS(SELECT 1 FROM tpj_order_changes c JOIN tpj_payment_intents ci ON ci.offer_id=c.offer_id JOIN tpj_offers co ON co.id=c.offer_id WHERE c.parent_offer_id=o.id AND c.voided_at IS NULL AND co.status='SIGNED' AND ci.status!='PAID')) AND NOT EXISTS(SELECT 1 FROM tpj_cancellation_requests c WHERE c.offer_id=o.id) AND NOT EXISTS(SELECT 1 FROM tpj_requests r WHERE r.id=o.request_id AND r.status IN ('cancelled','completed','declined')) ORDER BY o.balance_due_date LIMIT 100",envName(env));
  const today=day();let reminders=0;
  for(const o of offers){
   if(!o.balance_due_date)continue;
   if(today===shiftDay(o.balance_due_date,-7)||today===shiftDay(o.balance_due_date,-1)){
    await env.DB.batch(await mail(env,o,o.id+':balance:'+today,'Cake balance reminder','Your remaining cake balance is due '+o.balance_due_date+'. Please use your private order page to pay. No card will be charged automatically.'));reminders++;
   }else if(today>o.balance_due_date){
    await env.DB.batch(await mail(env,o,o.id+':overdue','Cake balance overdue','The remaining balance is overdue. Review this order before preparation or handoff. No late fee or cancellation was applied automatically.',['owner']));
   }
  }
  return tpjJSON({ok:true,reconciled,reminders,checkedAt:timestamp});
 }
 async function adminDetail(env,id){
  const offers=await all(env,"SELECT * FROM tpj_offers WHERE request_id=? ORDER BY CASE WHEN json_extract(snapshot_json,'$.change') IS NOT NULL THEN 1 ELSE 0 END,created_at DESC",id);
  return tpjJSON({ok:true,offers:await Promise.all(offers.map(o=>view(env,o,true)))});
 }
 async function route(request,env){
  const path=new URL(request.url).pathname;
  if(path==='/api/square/webhook')return webhook(request,env);
  if(path==='/api/admin/workflow/status'){await tpjAdmin(request,env);if(request.method!=='GET')throw error('Method not allowed.',405);return status(env);}
  const admin=path.match(/^\/api\/admin\/workflow\/(requests|offers|credits)\/([A-Za-z0-9_-]+)(?:\/(issue|close|remind|reconcile|credit|use))?$/);
  if(admin){
   await tpjAdmin(request,env);const [,kind,id,action]=admin;
   if(kind==='requests'&&!action&&request.method==='GET')return adminDetail(env,id);
   if(request.method!=='POST')throw error('Method not allowed.',405);
   if(kind==='requests'&&action==='issue')return issue(request,env,id);
   if(kind==='credits'&&action==='use')return useCredit(request,env,id);
   if(kind==='offers'){
    const o=await loadOffer(env,id);
    if(action==='close')return close(request,env,o);
    if(action==='credit')return credit(request,env,o);
    if(action==='remind'){
     const b=await tpjReadJSON(request);if(!validID(b.operationKey))throw error('Invalid reminder reference.');
     await env.DB.batch(await mail(env,o,o.id+':manual:'+b.operationKey,'Order reminder','Please review the current details and payment status on your private order page. If you have questions, reply to this email.'));return tpjJSON({ok:true});
    }
    if(action==='reconcile'){
     const b=await tpjReadJSON(request);
     if(typeof b.paymentId!=='string'||!/^[A-Za-z0-9_-]{5,150}$/.test(b.paymentId))throw error('Enter the Square payment ID.');
     const p=await square(env,'/payments/'+encodeURIComponent(b.paymentId));if(!p.ok)throw error('Square payment could not be retrieved.',503);
     const a=await get(env,'SELECT a.* FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE a.id=? AND i.offer_id=?',p.data.payment?.reference_id||'',o.id);
     if(!a)throw error('That Square payment does not belong to this approval.');await reconcile(env,a,p.data.payment);return tpjJSON({ok:true});
    }
   }throw error('Action not found.',404);
  }
  const publicMatch=path.match(/^\/api\/workflow\/offers\/([A-Za-z0-9_-]+)(?:\/(accept|pay|cancel|verification-start|verification-check|evidence))?$/);
  if(publicMatch){
   const o=await customerAuth(request,env,publicMatch[1]),action=publicMatch[2];
   if(action==='evidence'&&request.method==='GET')return TPJSigning.evidence(env,o);
   if(!action&&request.method==='GET')return tpjJSON({ok:true,offer:await view(env,o)});
   if(request.method!=='POST')throw error('Method not allowed.',405);
   if(action==='verification-start')return TPJSigning.start(request,env,o);
   if(action==='verification-check')return TPJSigning.verify(request,env,o);
   if(action==='accept')return accept(request,env,o);
   if(action==='pay')return charge(request,env,o);
   if(action==='cancel')return cancellation(request,env,o);
  }
  return null;
 }
 return {route,tick,plan:{day,dateMS,localMS,shiftDay},internal:{enabled,view,loadOffer,link,mail,audit,status}};
})();
async function tpjWorkflowRoute(request,env){return TPJWorkflow.route(request,env);}
async function tpjWorkflowTick(env){return TPJWorkflow.tick(env);}

/* TPJ signing verification. No card data or ID photographs are collected. */
const TPJSigning = (() => {
 const iso=()=>new Date().toISOString(), enc=new TextEncoder();
 const get=(e,s,...v)=>e.DB.prepare(s).bind(...v).first();
 const st=(e,s,...v)=>e.DB.prepare(s).bind(...v);
 const err=(s,c=422)=>tpjError(s,c);
 const hex=()=>Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
 async function limit(e,key,max,period){
  const slot=Math.floor(Date.now()/period),bucket=await tpjHash('signing:'+key+':'+slot,e.GOOGLE_BRIDGE_SECRET);
  const r=await st(e,'INSERT INTO tpj_rate_limits(bucket_key,hits,expires_at) VALUES (?,1,?) ON CONFLICT(bucket_key) DO UPDATE SET hits=hits+1 RETURNING hits',bucket,(slot+1)*period).first();
  if(r.hits>max)throw err('Please wait before requesting or trying another verification code.',429);
 }
 async function google(e,data){
  const timestamp=Date.now(),payload=JSON.stringify(data),signature=await tpjHash(timestamp+'\n'+payload,e.GOOGLE_BRIDGE_SECRET);
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
  try{
   let r=await fetch(e.GOOGLE_SCRIPT_URL,{method:'POST',redirect:'manual',signal:controller.signal,headers:{'Content-Type':'application/json'},body:JSON.stringify({signingDelivery:2,timestamp,payload,signature})});
   if([301,302,303].includes(r.status)){
    const target=new URL(r.headers.get('Location')||'');
    if(target.origin!=='https://script.googleusercontent.com')throw Error('Unexpected Google redirect');
    r=await fetch(target.href,{method:'GET',redirect:'manual',signal:controller.signal});
   }
   const result=await r.json();if(!r.ok||!result.ok)throw Error('Email delivery not confirmed');return result;
  }catch{throw err('The verification email could not be confirmed. Wait one minute, then request a new code.',503);}
  finally{clearTimeout(timer);}
 }
 async function start(request,e,o){
  if(o.status!=='OPEN'||Date.parse(o.expires_at)<=Date.now())throw err('This approval is already signed, closed or expired.',409);
  if(o.environment!==String(e.SQUARE_ENVIRONMENT).trim().toLowerCase())throw err('This approval belongs to another environment.',409);
  await limit(e,'ip:'+String(request.headers.get('CF-Connecting-IP')||'unknown'),10,3600000);
  await limit(e,'offer:'+o.id,3,3600000);
  await limit(e,'minute:'+o.id,1,60000);
  const last=await get(e,'SELECT created_at FROM tpj_signing_challenges WHERE offer_id=? ORDER BY created_at DESC LIMIT 1',o.id);
  if(last&&Date.parse(last.created_at)>Date.now()-60000)throw err('Wait one minute before requesting another code.',429);
  const id=crypto.randomUUID();let number;
  do{number=crypto.getRandomValues(new Uint32Array(1))[0];}while(number>=4294000000);
  const code=String(number%1000000).padStart(6,'0'),termsHash=await tpjHash(o.terms_json),expires=new Date(Date.now()+600000).toISOString();
  await e.DB.batch([
   st(e,'UPDATE tpj_signing_challenges SET expires_at=? WHERE offer_id=? AND consumed_at IS NULL',iso(),o.id),
   st(e,'INSERT INTO tpj_signing_challenges(id,offer_id,code_hash,terms_hash,created_at,expires_at) VALUES(?,?,?,?,?,?)',id,o.id,await tpjHash(id+':'+code,e.GOOGLE_BRIDGE_SECRET),termsHash,iso(),expires)
  ]);
  const customer=JSON.parse(o.snapshot_json).customer;
  await google(e,{action:'signing_code',businessContact:(await TPJBusiness.load(e)).config.settings,id,offerId:o.id,requestId:o.request_id,customer,code,expiresAt:expires,sandbox:o.environment==='sandbox'});
  await st(e,'UPDATE tpj_signing_challenges SET delivered=1 WHERE id=?',id).run();
  await st(e,"INSERT INTO tpj_request_events(request_id,event_type,details_json,created_at) VALUES(?,'verification_code_sent',?,?)",o.request_id,JSON.stringify({offerId:o.id,challengeId:id}),iso()).run();
  const parts=customer.email.split('@');return tpjJSON({ok:true,challengeId:id,expiresAt:expires,emailHint:parts[0].slice(0,2)+'…@'+parts[1]});
 }
 async function verify(request,e,o){
  const b=await tpjReadJSON(request);
  if(!/^[A-Za-z0-9_-]{16,80}$/.test(b.challengeId||'')||!/^\d{6}$/.test(b.code||''))throw err('Enter the six-digit code.');
  await limit(e,'verify:'+o.id,15,3600000);
  const row=await get(e,'SELECT * FROM tpj_signing_challenges WHERE id=? AND offer_id=?',b.challengeId,o.id);
  if(!row||!row.delivered||row.consumed_at||row.verified_at||Date.parse(row.expires_at)<=Date.now()||row.attempts>=5)throw err('This code has expired or was used. Request a new code.',409);
  const latest=await get(e,'SELECT id FROM tpj_signing_challenges WHERE offer_id=? ORDER BY created_at DESC,id DESC LIMIT 1',o.id);
  if(latest.id!==row.id)throw err('Use the most recent verification code.',409);
  const hit=await st(e,'UPDATE tpj_signing_challenges SET attempts=attempts+1 WHERE id=? AND attempts<5 AND verified_at IS NULL AND consumed_at IS NULL AND expires_at>? RETURNING id',row.id,iso()).first();
  if(!hit)throw err('Request a new verification code.',409);
  if(await tpjHash(await tpjHash(row.id+':'+b.code,e.GOOGLE_BRIDGE_SECRET))!==await tpjHash(row.code_hash))throw err('That code does not match. Check your email and try again.');
  const proof=hex(),time=iso();const r=await st(e,'UPDATE tpj_signing_challenges SET verified_at=?,proof_hash=? WHERE id=? AND verified_at IS NULL AND expires_at>? RETURNING id',time,await tpjHash(proof),row.id,time).first();
  if(!r)throw err('This verification was already used. Request another code.',409);
  return tpjJSON({ok:true,verificationId:row.id,verificationProof:proof,verifiedAt:time});
 }
 function signature(b){
  const method=b.signatureMethod;
  if(method==='typed')return {method,displayName:String(b.name).trim()};
  if(method!=='drawn')throw err('Choose a typed or drawn signature.');
  const png=String(b.signaturePNG||'');
  if(!/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(png)||png.length>100000)throw err('Draw a smaller signature and try again.');
  let bytes;try{bytes=Uint8Array.from(atob(png.split(',')[1]),c=>c.charCodeAt(0));}catch{throw err('Invalid signature image.');}
  if(bytes.length<100||bytes.slice(0,8).join(',')!=='137,80,78,71,13,10,26,10')throw err('Invalid signature image.');
  const dv=new DataView(bytes.buffer);if(dv.getUint32(16)!==900||dv.getUint32(20)!==300)throw err('Please redraw your signature in the signing box.');
  return {method,png};
 }
 async function prepare(request,e,o,b,signed){
  const v=await get(e,'SELECT * FROM tpj_signing_challenges WHERE id=? AND offer_id=?',String(b.verificationId||''),o.id);
  if(!v||!v.verified_at||v.consumed_at||Date.parse(v.expires_at)<=Date.now()||!v.proof_hash||v.terms_hash!==signed.termsHash||await tpjHash(String(b.verificationProof||''))!==v.proof_hash)throw err('Verify your email before signing. If verification expired, request a new code.',409);
  signed.verification={id:v.id,email:JSON.parse(o.snapshot_json).customer.email,verifiedAt:v.verified_at,method:'email-code'};
  signed.signature=signature(b);
  const evidence={version:2,offerId:o.id,requestId:o.request_id,environment:o.environment,order:JSON.parse(o.snapshot_json),terms:JSON.parse(o.terms_json),totalCents:o.total_cents,initialCents:o.initial_cents,rushFeeCents:o.rush_fee_cents,fulfillmentDate:o.fulfillment_date,fulfillmentTime:o.fulfillment_time,balanceDueDate:o.balance_due_date,signature:signed};
  const raw=JSON.stringify(evidence),hash=await tpjHash(raw);
  const conditions='verified_at IS NOT NULL AND consumed_at IS NULL AND proof_hash=? AND expires_at>?';
  return {evidence,hash,queries:[
   // The signed-record trigger rejects an expired/consumed challenge and rolls back the batch.
   st(e,'UPDATE tpj_signing_challenges SET consumed_at=CASE WHEN '+conditions+' THEN ? ELSE NULL END WHERE id=?',v.proof_hash,iso(),signed.signedAt,v.id),
   st(e,'INSERT INTO tpj_signed_records(offer_id,evidence_json,evidence_hash,created_at) VALUES(?,?,?,?)',o.id,raw,hash,signed.signedAt)
  ]};
 }
 async function documentAck(e,b){
  if(!/^[A-Za-z0-9_-]{10,150}$/.test(b.fileId||'')||!/^[a-f0-9]{64}$/.test(b.pdfHash||'')||!/^[a-f0-9]{64}$/.test(b.evidenceHash||''))throw err('Invalid signed document acknowledgment.');
  const row=await get(e,'SELECT * FROM tpj_signed_records WHERE offer_id=?',b.offerId);
  if(!row||row.evidence_hash!==b.evidenceHash)throw err('Signed evidence does not match.',409);
  if(row.drive_file_id&&(row.drive_file_id!==b.fileId||row.pdf_sha256!==b.pdfHash))throw err('The signed PDF is already archived with different details.',409);
  await st(e,'UPDATE tpj_signed_records SET drive_file_id=?,pdf_sha256=?,archived_at=COALESCE(archived_at,?) WHERE offer_id=?',b.fileId,b.pdfHash,iso(),b.offerId).run();return tpjJSON({ok:true});
 }
 async function evidence(e,o){const row=await get(e,'SELECT * FROM tpj_signed_records WHERE offer_id=?',o.id);if(!row)throw err('No enhanced signing record is available for this agreement.',404);return tpjJSON({ok:true,evidence:JSON.parse(row.evidence_json),evidenceHash:row.evidence_hash,pdfSHA256:row.pdf_sha256,archivedAt:row.archived_at});}
 return {start,verify,prepare,documentAck,evidence};
})();
/* TPJ DISPLAY REFERENCES — internal IDs and signed evidence stay unchanged. */
const TPJDisplay = (() => {
  function newRequest(env, id, createdAt) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(new Date(createdAt));

    const part = key => parts.find(p => p.type === key).value;
    const prefix = 'TPJ' + part('year') + part('day') + part('month');
    const sql = (text, ...values) => env.DB.prepare(text).bind(...values);

    return [
      sql(
        "UPDATE tpj_display_counters SET sequence=sequence+1 " +
        "WHERE scope IN ('footprint',(SELECT source FROM tpj_requests WHERE id=?)) " +
        "AND EXISTS(SELECT 1 FROM tpj_requests WHERE id=? AND source IN ('shop','cake_builder')) " +
        "AND NOT EXISTS(SELECT 1 FROM tpj_display_references WHERE request_id=?)",
        id, id, id
      ),
      sql(
        "INSERT INTO tpj_display_references(request_id,reference,footprint,created_at) " +
        "SELECT r.id,CASE r.source WHEN 'cake_builder' THEN 'TPJCAKE' ELSE 'TPJSHOP' END " +
        "||printf('%03d',c.sequence),?||printf('%02d',f.sequence),r.created_at " +
        "FROM tpj_requests r JOIN tpj_display_counters c ON c.scope=r.source " +
        "JOIN tpj_display_counters f ON f.scope='footprint' " +
        "WHERE r.id=? AND NOT EXISTS(SELECT 1 FROM tpj_display_references WHERE request_id=r.id)",
        prefix, id
      ),
      sql(
        "INSERT OR IGNORE INTO tpj_notifications " +
        "(id,request_id,event_key,recipient_type,payload_json,next_attempt_at,created_at) " +
        "SELECT ?,r.id,'owner_new_request','owner'," +
        "json_object('event','owner_new_request','source',r.source,'requestId',r.id," +
        "'reference',p.reference,'footprint',p.footprint,'sandbox',json(?)),?,? " +
        "FROM tpj_requests r JOIN tpj_display_references p ON p.request_id=r.id WHERE r.id=?",
        crypto.randomUUID(),
        JSON.stringify(
          String(env.SQUARE_ENVIRONMENT).trim().toLowerCase() !== 'production'
        ),
        createdAt, createdAt, id
      )
    ];
  }

  async function decorate(response, env) {
    if (
      !response.ok ||
      !response.headers.get('Content-Type')?.includes('application/json')
    ) return response;

    const excluded = new Set([
      'record', 'evidence', 'signature', 'terms',
      'snapshot', 'details', 'signingRecord'
    ]);
    const cache = new Map();

    async function visit(value) {
      if (!value || typeof value !== 'object') return;

      if (Array.isArray(value)) {
        for (const item of value) await visit(item);
        return;
      }

      const id = value.requestId || value.id;

      if (typeof id === 'string' && /^TPJ-[a-f0-9-]{36}$/i.test(id)) {
        if (!cache.has(id)) {
          let labels=await env.DB.prepare('SELECT reference,footprint FROM tpj_display_references WHERE request_id=?').bind(id).first();
          if(!labels){const row=await env.DB.prepare('SELECT created_at,source FROM tpj_requests WHERE id=?').bind(id).first();if(row&&['shop','cake_builder'].includes(row.source)){await env.DB.batch(newRequest(env,id,row.created_at).slice(0,2));labels=await env.DB.prepare('SELECT reference,footprint FROM tpj_display_references WHERE request_id=?').bind(id).first();}}
          cache.set(id,labels);
        }

        const labels = cache.get(id);
        if (labels) Object.assign(value, labels);if(value.change){value.reference=value.change.reference;value.footprint=value.change.footprint;}else if(value.snapshot?.change){value.reference=value.snapshot.change.reference;value.footprint=value.snapshot.change.footprint;}
      }

      for (const [key, child] of Object.entries(value)) {
        if (!excluded.has(key)) await visit(child);
      }
    }

    try {
      const data = await response.clone().json();
      await visit(data);

      const headers = new Headers(response.headers);
      headers.delete('Content-Length');

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers
      });
    } catch (_) {
      console.error('TPJ display labels unavailable; original response retained.');
      return response;
    }
  }

  return {newRequest, decorate};
})();
/* TPJ OWNER OPERATIONS. All mutations require the existing private admin key. */
const TPJBusiness=(()=>{
 const now=()=>new Date().toISOString(),clone=x=>JSON.parse(JSON.stringify(x));
 const stmt=(e,s,...v)=>e.DB.prepare(s).bind(...v);
 const get=(e,s,...v)=>stmt(e,s,...v).first();
 const all=async(e,s,...v)=>(await stmt(e,s,...v).all()).results;
 const fail=(m,s=422)=>{throw tpjError(m,s);};
 const allergens=['milk','eggs','wheat','soy','peanuts','tree nuts','sesame','fish','crustacean shellfish'];
 const notice='THIS PRODUCT WAS PRODUCED IN A PRIVATE RESIDENCE THAT IS NOT SUBJECT TO GOVERNMENTAL LICENSING OR INSPECTION.';
 const safe='SAFE HANDLING INSTRUCTIONS: To prevent illness from bacteria, keep this food refrigerated or frozen until the food is prepared for consumption.';
 const text=(v,max=500)=>typeof v==='string'&&v.trim().length<=max?v.trim():fail('A text field is invalid or too long.');
 const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max?v:fail('Enter a valid whole-number amount.');
 function defaults(){
  const prices={};for(const [k,v]of Object.entries(TPJ_C.categories))for(const [size,n]of Object.entries(v.prices))prices[k+':'+size]=n;
  for(const [size,n]of Object.entries(TPJ_C.half.prices))prices['half:'+size]=n;
  for(const [k,v]of Object.entries(TPJ_C.chocolate.treats))prices['treat:'+k]=v.price;
  const names={...Object.fromEntries(Object.entries(TPJ_C.categories).map(([k,v])=>['category:'+k,v.name])),'category:chocolate':TPJ_C.chocolate.name,'product:cakes:half':TPJ_C.half.name,...Object.fromEntries(Object.entries(TPJ_C.chocolate.treats).map(([k,v])=>['treat:'+k,v.name]))};
  return {settings:{businessName:'The Pastry Junkie LLC',supportEmail:'baked@thepastryjunkie.com',phone:'(682) 373-8842',registrationId:'',ownerEmail:'orders@thepastryjunkie.com',acceptShop:true,acceptCake:true,shopLeadHours:72,defaultTaxBps:0,defaultContains:[],defaultAllergenInfo:''},prices,names,flavors:clone(TPJ_C.flavors),descriptions:Object.fromEntries(Object.entries(TPJ_C.categories).map(([k,v])=>[k,v.description])),disabled:[],blockedDates:[],dateRules:[],customProducts:{},extraFlavors:{},removed:[],profiles:{}};
 }
 async function load(e){const row=await get(e,'SELECT * FROM tpj_business_config WHERE id=1');if(row)return {version:row.version,config:JSON.parse(row.config_json)};const config=defaults(),legacy=await tpjSetting(e,'availability',{});config.disabled=Array.isArray(legacy.disabled)?legacy.disabled:[];config.blockedDates=Array.isArray(legacy.blockedDates)?legacy.blockedDates:[];return {version:0,config};}
 function catalog(state){const c=clone(TPJ_C),v=state.config;c.version=state.version+1;c.preorderHours=v.settings.shopLeadHours;c.flavors={...c.flavors,...v.flavors};for(const [key,n]of Object.entries(v.prices)){const [category,size]=key.split(':');if(category==='half')c.half.prices[size]=n;else if(category==='treat')c.chocolate.treats[size].price=n;else c.categories[category].prices[size]=n;}c.ownerDescriptions={};for(const [k,d]of Object.entries(v.descriptions)){if(d!==TPJ_C.categories[k].description)c.ownerDescriptions[k]=d;c.categories[k].description=d;}for(const [k,n]of Object.entries(v.names||{})){const [kind,id]=k.split(':');if(kind==='category'&&id==='chocolate')c.chocolate.name=n;else if(kind==='category')c.categories[id].name=n;else if(kind==='treat')c.chocolate.treats[id].name=n;else c.half.name=n;}return TPJMenuTools.apply(c,v);}
 async function publicConfig(e){const state=await load(e),c=state.config,accepting=await tpjAccepting(e);return {version:state.version,catalog:catalog(state),settings:c.settings,disabled:[...new Set([...c.disabled,...(c.removed||[])])],blockedDates:c.blockedDates,dateRules:c.dateRules||[],profiles:c.profiles,acceptShop:accepting&&c.settings.acceptShop,acceptCake:accepting&&c.settings.acceptCake,allergens,notice,safe};}
 function validate(body){
  const d=defaults(),v=body.config;if(!v||typeof v!=='object')fail('Missing menu settings.');
  const s=v.settings||{};d.settings={businessName:text(s.businessName,150),supportEmail:'baked@thepastryjunkie.com',phone:text(s.phone,40),registrationId:text(s.registrationId||'',100),ownerEmail:'orders@thepastryjunkie.com',acceptShop:s.acceptShop===true,acceptCake:s.acceptCake===true,shopLeadHours:integer(s.shopLeadHours,72,720),defaultTaxBps:integer(s.defaultTaxBps,0,825)};
  if(!Array.isArray(s.defaultContains||[])||!(s.defaultContains||[]).every(x=>allergens.includes(x)))fail('Select valid standard allergens.');
  d.settings.defaultContains=[...new Set(s.defaultContains||[])];d.settings.defaultAllergenInfo=text(s.defaultAllergenInfo||'',1500);
  if(!d.settings.businessName||d.settings.phone.replace(/\D/g,'').length!==10)fail('Enter the business name and ten-digit phone number.');
  for(const key of Object.keys(d.prices))d.prices[key]=integer(v.prices?.[key],1,5000000);
  for(const key of Object.keys(d.flavors))d.flavors[key]=text(v.flavors?.[key],100)||fail('Flavor names cannot be blank.');
  for(const key of Object.keys(d.names))d.names[key]=text(v.names?.[key]||d.names[key],150)||fail('Product names cannot be blank.');
  for(const key of Object.keys(d.descriptions))d.descriptions[key]=text(v.descriptions?.[key],1500);
  const proposed=TPJMenuTools.validate(v,d);const validTargets=new Set(TPJ_M.withCatalog(TPJMenuTools.apply(clone(TPJ_C),proposed)).availabilityTargets().map(x=>x[0]));
  if(!Array.isArray(v.disabled)||v.disabled.length>500||!v.disabled.every(k=>validTargets.has(k)))fail('An availability setting is invalid.');d.disabled=[...new Set(v.disabled)];
  if(!Array.isArray(v.blockedDates)||v.blockedDates.length>730||!v.blockedDates.every(k=>/^\d{4}-\d{2}-\d{2}$/.test(k)&&Number.isFinite(Date.parse(k+'T12:00:00Z'))&&new Date(k+'T12:00:00Z').toISOString().slice(0,10)===k))fail('A blocked date is invalid.');d.blockedDates=[...new Set(v.blockedDates)].sort();
  const allowed=new Set([...validTargets].filter(k=>/^(product|treat|base|topping|custom):/.test(k)));
  for(const [key,p]of Object.entries(v.profiles||{})){if(!allowed.has(key)||!p||!Array.isArray(p.contains)||!p.contains.every(x=>allergens.includes(x)))fail('An allergen profile is invalid.');d.profiles[key]={contains:[...new Set(p.contains)],additionalInfo:text(p.additionalInfo||'',2000),refrigerated:p.refrigerated===true,reviewed:p.reviewed===true};}
  Object.assign(d,TPJMenuTools.validate(v,d));
  return d;
 }
 async function save(e,body){
  const version=integer(body.version,0,1000000000),config=validate(body),created=now();
  const result=await e.DB.batch([
   stmt(e,'INSERT INTO tpj_business_config(id,version,config_json,updated_at) SELECT 1,1,?,? WHERE ?=0 AND NOT EXISTS(SELECT 1 FROM tpj_business_config WHERE id=1) ON CONFLICT(id) DO NOTHING',JSON.stringify(config),created,version),
   stmt(e,'UPDATE tpj_business_config SET version=version+1,config_json=?,updated_at=? WHERE id=1 AND version=? AND ?>0 RETURNING version',JSON.stringify(config),created,version,version)
  ]);
  if(!(result[0].meta?.changes||result[1].results?.length))fail('Settings changed in another window. Reload before saving.',409);
  return tpjJSON({ok:true,...await load(e)});
 }
 function quote(body){
  const q=body.quote;if(!q||!Array.isArray(q.lines)||!q.lines.length||q.lines.length>100||q.reviewed!==true)fail('Review the itemized quote and product disclosures.');
  const lines=q.lines.map(x=>({labelProduct:x.labelProduct!==false,title:text(x.title,300)||fail('Name each quote item.'),quantity:integer(x.quantity,1,1000),unitCents:integer(x.unitCents,0,5000000),details:Array.isArray(x.details)?x.details.slice(0,30).map(s=>text(s,500)):[]}));
  const productsCents=lines.reduce((n,x)=>n+x.quantity*x.unitCents,0),deliveryCents=integer(q.deliveryCents,0,5000000),rushFeeCents=integer(body.rushFeeCents,0,5000000),taxRateBps=integer(q.taxRateBps,0,825);
  lines.forEach((line,i)=>{line.totalCents=line.quantity*line.unitCents;line.taxable=q.lines[i].taxable===true;});
  const taxableCents=lines.reduce((n,x)=>n+(x.taxable?x.totalCents:0),0)+(q.deliveryTaxable?deliveryCents:0)+(q.rushTaxable?rushFeeCents:0),taxCents=Math.round(taxableCents*taxRateBps/10000),totalCents=productsCents+deliveryCents+rushFeeCents+taxCents;
  if(!Number.isSafeInteger(totalCents)||totalCents<1||totalCents>5000000||body.totalCents!==totalCents)fail('The itemized quote does not match the approved total.');
  const p=q.disclosure;if(!p||p.reviewed!==true||!Array.isArray(p.contains)||!p.contains.every(x=>allergens.includes(x)))fail('Confirm the actual allergens and storage instructions for this order.');
  return {lines,productsCents,deliveryCents,rushFeeCents,taxRateBps,taxCents,totalCents,deliveryTaxable:q.deliveryTaxable===true,rushTaxable:q.rushTaxable===true,reviewed:true,disclosure:{contains:[...new Set(p.contains)],additionalInfo:text(p.additionalInfo||'',2000),refrigerated:p.refrigerated===true,reviewed:true,notice,safe:p.refrigerated?safe:''}};
 }
 const stageSQL=`COALESCE(m.manual_stage,CASE WHEN r.status IN ('cancelled','declined') THEN 'canceled' WHEN f.request_id IS NOT NULL OR r.status='completed' THEN 'fulfilled' WHEN EXISTS(SELECT 1 FROM tpj_offers o JOIN tpj_payment_intents i ON i.offer_id=o.id AND i.phase='initial' WHERE o.request_id=r.id AND o.status='SIGNED' AND o.payment_review=0 AND i.status='PAID' AND i.paid_cents>=i.amount_cents) THEN 'confirmed' WHEN EXISTS(SELECT 1 FROM tpj_offers o WHERE o.request_id=r.id AND o.status!='CLOSED') OR r.status IN ('awaiting_customer','awaiting_payment','awaiting_contract','payment_review','cancellation_requested') THEN 'pending' ELSE 'new' END)`;
 const paidSQL=`EXISTS(SELECT 1 FROM tpj_offers o WHERE o.request_id=r.id AND NOT EXISTS(SELECT 1 FROM tpj_order_changes c WHERE c.offer_id=o.id) AND NOT EXISTS(SELECT 1 FROM tpj_order_changes c JOIN tpj_offers a ON a.id=c.offer_id WHERE c.parent_offer_id=o.id AND c.voided_at IS NULL AND a.status!='CLOSED' AND (a.payment_review=1 OR (a.status='OPEN' AND julianday(a.expires_at)>julianday('now')) OR (a.status='SIGNED' AND EXISTS(SELECT 1 FROM tpj_payment_intents x WHERE x.offer_id=a.id AND (x.status!='PAID' OR x.paid_cents<x.amount_cents))))) AND o.status='SIGNED' AND o.payment_review=0 AND (SELECT COALESCE(SUM(i.paid_cents),0) FROM tpj_payment_intents i WHERE i.offer_id=o.id)>=o.total_cents AND NOT EXISTS(SELECT 1 FROM tpj_payment_intents i WHERE i.offer_id=o.id AND (i.status!='PAID' OR i.paid_cents<i.amount_cents)) AND NOT EXISTS(SELECT 1 FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE i.offer_id=o.id AND a.status='PENDING'))`;
 async function list(e,url){
  const q=(url.searchParams.get('q')||'').slice(0,200),source=url.searchParams.get('source')||'',stage=url.searchParams.get('stage')||'',from=url.searchParams.get('from')||'',to=url.searchParams.get('to')||'',offset=Math.max(0,Math.min(1000000,Number.parseInt(url.searchParams.get('offset')||'0')||0));
  if(source&&!['shop','cake_builder'].includes(source)||stage&&!['new','pending','confirmed','fulfilled','canceled'].includes(stage)||[from,to].some(d=>d&&!/^\d{4}-\d{2}-\d{2}$/.test(d)))fail('Invalid order filter.');
  const sql=`SELECT r.*,d.reference,d.footprint,${stageSQL} AS stage,m.archived_at,COALESCE(m.is_test,0) AS is_test,CASE WHEN COALESCE(m.seen_version,0)>=r.version THEN 1 ELSE 0 END AS is_read,CASE WHEN EXISTS(SELECT 1 FROM tpj_notifications n WHERE n.request_id=r.id AND n.recipient_type='customer' AND n.state='failed') THEN 1 ELSE 0 END AS failed_email,CASE WHEN EXISTS(SELECT 1 FROM tpj_offers o JOIN tpj_payment_intents i ON i.offer_id=o.id AND i.phase='initial' WHERE o.request_id=r.id AND o.status!='CLOSED' AND julianday(o.expires_at)<=julianday('now') AND i.status!='PAID') THEN 1 ELSE 0 END AS expired_approval,CASE WHEN EXISTS(SELECT 1 FROM tpj_cancellation_requests cr JOIN tpj_offers co ON co.id=cr.offer_id WHERE co.request_id=r.id AND co.status!='CLOSED') THEN 1 ELSE 0 END AS cancellation_attention,CASE WHEN ${paidSQL} THEN 1 ELSE 0 END AS fully_paid,(SELECT MIN(due) FROM (SELECT o.balance_due_date AS due FROM tpj_offers o JOIN tpj_payment_intents i ON i.offer_id=o.id AND i.phase='balance' WHERE o.request_id=r.id AND o.status='SIGNED' AND i.status!='PAID' UNION ALL SELECT c.due_date AS due FROM tpj_order_changes c JOIN tpj_offers o ON o.id=c.offer_id JOIN tpj_payment_intents i ON i.offer_id=o.id WHERE o.request_id=r.id AND c.voided_at IS NULL AND o.status='SIGNED' AND i.status!='PAID')) AS balance_due FROM tpj_requests r LEFT JOIN tpj_display_references d ON d.request_id=r.id LEFT JOIN tpj_fulfillments f ON f.request_id=r.id LEFT JOIN tpj_order_management m ON m.request_id=r.id`;
  const mode=url.searchParams.get('view')||'';const received=mode==='records';
  const condition=" WHERE (?='' OR source=?) AND (?='' OR stage=?) AND (?='' OR "+(received?'created_at':'fulfillment_date')+">=?) AND (?='' OR "+(received?'created_at<':'fulfillment_date<=')+"?) AND (?='' OR lower(customer_name||' '||customer_email||' '||customer_phone||' '||COALESCE(reference,'')||' '||id||' '||fulfillment_date||' '||created_at) LIKE ?)";
  const active=url.searchParams.get('active')==='1',attention=url.searchParams.get('attention')==='1';
  const archive=url.searchParams.get('archive')||'',unread=url.searchParams.get('unread')==='1',day=TPJWorkflow.plan.day();
  const records=mode==='orders'?" AND archived_at IS NULL AND stage NOT IN ('fulfilled','canceled')":'';
  const archiveFilter=archive==='archived'?' AND archived_at IS NOT NULL':archive==='not_archived'?' AND archived_at IS NULL':'';
  const extra=records+archiveFilter+(unread?' AND is_read=0':'')+" AND (?=0 OR stage NOT IN ('fulfilled','canceled')) AND (?=0 OR stage='new' OR status IN ('payment_review','cancellation_requested') OR (balance_due IS NOT NULL AND balance_due<=?) OR cancellation_attention=1 OR failed_email=1 OR expired_approval=1 OR (fulfillment_date<? AND stage NOT IN ('fulfilled','canceled')))";
  const args=[source,source,stage,stage,from,received&&from?new Date(TPJWorkflow.plan.localMS(from,'00:00')).toISOString():from,to,received&&to?new Date(TPJWorkflow.plan.localMS(TPJWorkflow.plan.shiftDay(to,1),'00:00')).toISOString():to,q,'%'+q.toLowerCase()+'%',active?1:0,attention?1:0,day,day];
  const rows=await all(e,'SELECT * FROM ('+sql+')'+condition+extra+(received?' ORDER BY created_at DESC,id DESC':' ORDER BY fulfillment_date,created_at,id')+' LIMIT 51 OFFSET ?',...args,offset);
  const counts=await all(e,'SELECT stage,COUNT(*) count FROM ('+sql+') WHERE 1=1'+records+archiveFilter+' GROUP BY stage');
  return tpjJSON({ok:true,orders:rows.slice(0,50).map(r=>({...tpjRecord(r),reference:r.reference,footprint:r.footprint,stage:r.stage,read:!!r.is_read,archivedAt:r.archived_at,isTest:!!r.is_test,attentionReasons:[r.stage==='new'?'New inquiry':null,r.status==='payment_review'?'Payment review required':null,r.status==='cancellation_requested'||r.cancellation_attention?'Cancellation requested':null,r.balance_due&&r.balance_due<=day?'Balance due / overdue':null,r.failed_email?'Customer email failed':null,r.expired_approval?'Unpaid approval expired':null,r.fulfillment_date<day&&!['fulfilled','canceled'].includes(r.stage)?'Fulfillment date passed; order unfinished':null].filter(Boolean),fullyPaid:!!r.fully_paid,balanceDue:r.balance_due})),nextOffset:rows.length>50?offset+50:null,counts:Object.fromEntries(counts.map(r=>[r.stage,r.count]))});
 }
 async function packet(e,id){
  const row=await get(e,`SELECT r.*,d.reference,d.footprint,${stageSQL} AS stage FROM tpj_requests r LEFT JOIN tpj_display_references d ON d.request_id=r.id LEFT JOIN tpj_fulfillments f ON f.request_id=r.id LEFT JOIN tpj_order_management m ON m.request_id=r.id WHERE r.id=?`,id);if(!row)fail('Order not found.',404);
  const offers=await all(e,"SELECT * FROM tpj_offers WHERE request_id=? ORDER BY CASE WHEN json_extract(snapshot_json,'$.change') IS NOT NULL THEN 1 ELSE 0 END,created_at DESC,id DESC",id);
  for(const o of offers){o.snapshot=JSON.parse(o.snapshot_json);o.terms=JSON.parse(o.terms_json);o.signature=o.signature_json?JSON.parse(o.signature_json):null;o.intents=await all(e,'SELECT phase,amount_cents,paid_cents,status,paid_at FROM tpj_payment_intents WHERE offer_id=?',o.id);o.signingRecord=await get(e,'SELECT evidence_json,evidence_hash,pdf_sha256,drive_file_id,archived_at FROM tpj_signed_records WHERE offer_id=?',o.id);delete o.token_hash;delete o.snapshot_json;delete o.terms_json;delete o.signature_json;}
  const rootOffer=offers.find(o=>!o.snapshot.change&&o.status!=='CLOSED')||offers.find(o=>!o.snapshot.change),orderTotals=rootOffer?await TPJChanges.summary(e,{...rootOffer,snapshot_json:JSON.stringify(rootOffer.snapshot)}):null;
  return {orderTotals,effectiveQuote:orderTotals?.effectiveQuote,management:await TPJOrderManagement.state(e,row),order:{...tpjRecord(row),stage:row.stage,reference:row.reference,footprint:row.footprint},offers,notifications:await all(e,'SELECT event_key,recipient_type,state,attempts,next_attempt_at,sent_at,last_error FROM tpj_notifications WHERE request_id=? ORDER BY created_at',id),fulfillment:await get(e,'SELECT * FROM tpj_fulfillments WHERE request_id=?',id),events:await all(e,'SELECT event_type,details_json,created_at FROM tpj_request_events WHERE request_id=? ORDER BY id',id),files:await all(e,'SELECT role,name,mime_type,private_url FROM tpj_files WHERE request_id=?',id),business:(await load(e)).config.settings,exportedAt:now()};
 }
 async function google(e,data){
  const payload=JSON.stringify(data),timestamp=Date.now(),signature=await tpjHash(timestamp+'\n'+payload,e.GOOGLE_BRIDGE_SECRET),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),20000);
  try{
   let response=await fetch(e.GOOGLE_SCRIPT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({businessDelivery:1,timestamp,payload,signature}),redirect:'manual',signal:controller.signal});
   if([301,302,303].includes(response.status)){const target=new URL(response.headers.get('Location')||'');if(target.origin!=='https://script.googleusercontent.com')fail('Unexpected document-service redirect.',503);response=await fetch(target.href,{redirect:'manual',signal:controller.signal});}
   const result=await response.json();if(!response.ok||!result.ok)fail(result.message||'The private file could not be saved.',503);return result;
  }finally{clearTimeout(timer);}
 }
 async function fulfill(request,e,id){
  const b=await tpjReadJSON(request),operationKey=String(b.operationKey||'');if(!/^[A-Za-z0-9_-]{16,80}$/.test(operationKey)||b.handedOver!==true)fail('Confirm the actual pickup or delivery.');
  const prior=await get(e,'SELECT * FROM tpj_fulfillments WHERE request_id=?',id);if(prior){const old=JSON.parse(prior.record_json),at=new Date(b.handedOverLocal?TPJWorkflow.plan.localMS(b.handedOverLocal.date,b.handedOverLocal.time):b.handedOverAt);if(!Number.isFinite(at.getTime()))fail('Enter a valid handoff date and time.');if(prior.operation_key!==operationKey||old.recipient!==String(b.recipient||'').trim()||old.method!==b.method||old.productionDate!==b.productionDate||old.notes!==String(b.notes||'').trim()||(old.receipt&&(b.signedCopiesConfirmed!==true||b.customerCopyProvided!==true||old.receipt.businessRepresentative!==String(b.businessRepresentative||'').trim()))||old.handedOverAt!==at.toISOString()||old.photoHash!==(b.photo?await tpjHash(b.photo.base64):null))fail('A different fulfillment record already exists. Add a correction to the order history.',409);return tpjJSON({ok:true,fulfillment:prior});}
  const row=await get(e,`SELECT r.* FROM tpj_requests r WHERE r.id=? AND r.status NOT IN ('cancelled','declined','completed') AND ${paidSQL}`,id);if(!row)fail('Fulfillment requires a fully paid active agreement with no payment review or processing payment.',409);
  if(row.version!==b.version)fail('The order changed. Refresh before recording fulfillment.',409);
  if(!['pickup','delivery'].includes(b.method))fail('Choose pickup or delivery.');
  const at=new Date(b.handedOverLocal?TPJWorkflow.plan.localMS(b.handedOverLocal.date,b.handedOverLocal.time):b.handedOverAt);if(!Number.isFinite(at.getTime())||at.getTime()>Date.now()+300000||at.getTime()<Date.parse(row.created_at)-86400000)fail('Enter the actual handoff date and time.');
  const made=text(b.productionDate||'',10);if(!/^\d{4}-\d{2}-\d{2}$/.test(made)||!Number.isFinite(Date.parse(made+'T12:00:00Z'))||new Date(made+'T12:00:00Z').toISOString().slice(0,10)!==made||made>TPJWorkflow.plan.day(at.getTime()))fail('Enter a valid production date on or before handoff.');
  const recipient=text(b.recipient,150);if(recipient.length<2)fail('Enter who received the order.');
  if(b.signedCopiesConfirmed!==true||b.customerCopyProvided!==true||!b.photo||typeof b.businessRepresentative!=='string'||b.businessRepresentative.trim().length<2)fail('Both receipt copies must be signed, the customer must receive their copy, and a legible photo of the signed business copy is required.');
  const businessRepresentative=text(b.businessRepresentative,150);
  let photo=null;if(b.photo){const p=b.photo;if(!['image/jpeg','image/png'].includes(p.mime)||typeof p.base64!=='string'||p.base64.length>450000||!/^[A-Za-z0-9+/]+=*$/.test(p.base64))fail('Use a JPG or PNG image under 330 KB after resizing.');const bytes=Uint8Array.from(atob(p.base64),c=>c.charCodeAt(0));if(p.mime==='image/jpeg'?(bytes[0]!==255||bytes[1]!==216||bytes[2]!==255):bytes.slice(0,8).join(',')!=='137,80,78,71,13,10,26,10')fail('Invalid image file.');photo=await google(e,{action:'fulfillment_photo',requestId:id,operationKey,mime:p.mime,base64:p.base64});if(!/^[A-Za-z0-9_-]{10,200}$/.test(String(photo.fileId||''))||photo.url!=='https://drive.google.com/file/d/'+photo.fileId+'/view')fail('The document service returned an invalid private photo reference.',503);}
  const record={version:2,receipt:{method:'paper',bothCopiesSigned:true,customerCopyProvided:true,businessRepresentative},requestId:id,operationKey,method:b.method,recipient,productionDate:made,handedOverAt:at.toISOString(),notes:text(b.notes||'',3000),photo:photo?{fileId:photo.fileId,url:photo.url}:null,photoHash:b.photo?await tpjHash(b.photo.base64):null,recordedAt:now()},raw=JSON.stringify(record),hash=await tpjHash(raw);
  const results=await e.DB.batch([
   stmt(e,`UPDATE tpj_requests AS r SET status='completed',version=version+1,updated_at=? WHERE id=? AND version=? AND status NOT IN ('cancelled','declined','completed') AND ${paidSQL} RETURNING id`,record.recordedAt,id,b.version),
   stmt(e,'INSERT INTO tpj_fulfillments(request_id,operation_key,record_json,record_hash,created_at) SELECT ?,?,?,?,? WHERE changes()=1',id,operationKey,raw,hash,record.recordedAt),
   stmt(e,"INSERT INTO tpj_request_events(request_id,event_type,details_json,created_at) SELECT ?,'fulfilled',?,? WHERE changes()=1",id,JSON.stringify({recordHash:hash,recipient,method:b.method}),record.recordedAt),
   stmt(e,"INSERT INTO tpj_order_management(request_id,manual_stage,seen_version,updated_at) SELECT ?,'fulfilled',(SELECT version FROM tpj_requests WHERE id=?),? WHERE changes()=1 ON CONFLICT(request_id) DO UPDATE SET manual_stage='fulfilled',seen_version=excluded.seen_version,updated_at=excluded.updated_at",id,id,record.recordedAt)
  ]);if(!results[0].results?.length)fail('The order changed during fulfillment. Refresh and review the saved record.',409);return tpjJSON({ok:true,fulfillment:record,recordHash:hash});
 }
 async function change(request,e,id,action){
  const b=await tpjReadJSON(request),row=await get(e,'SELECT * FROM tpj_requests WHERE id=?',id);if(!row)fail('Inquiry not found.',404);if(row.version!==b.version)fail('Refresh this inquiry before saving.',409);
  const active=await get(e,"SELECT id FROM tpj_offers WHERE request_id=? AND status!='CLOSED'",id),paid=await get(e,'SELECT i.id FROM tpj_payment_intents i JOIN tpj_offers o ON o.id=i.offer_id WHERE o.request_id=? AND i.paid_cents>0 LIMIT 1',id);
  if(active||paid||row.status==='completed')fail('Use the active order controls. Paid or fulfilled records cannot be restarted as a new quote.',409);
  if(action==='reopen'&&!['cancelled','declined'].includes(row.status))fail('Only a canceled inquiry can be reopened.');
  const reason=action==='decline'?text(b.reason,2000):'Reopened for a new review';if(reason.length<3)fail('Enter the reason to send to the customer.');
  const status=action==='decline'?'cancelled':'reviewing',at=now(),key=crypto.randomUUID();
  const statements=[stmt(e,'UPDATE tpj_requests SET status=?,version=version+1,updated_at=? WHERE id=? AND version=? RETURNING id',status,at,id,b.version),stmt(e,"INSERT INTO tpj_request_events(request_id,event_type,details_json,created_at) SELECT ?,?,?,? WHERE changes()=1",id,action==='decline'?'inquiry_declined':'inquiry_reopened',JSON.stringify({reason}),at)];
  statements.push(stmt(e,"INSERT INTO tpj_order_management(request_id,manual_stage,seen_version,updated_at) SELECT ?,?,(SELECT version FROM tpj_requests WHERE id=?),? WHERE EXISTS(SELECT 1 FROM tpj_request_events WHERE request_id=? AND created_at=? AND event_type=?) ON CONFLICT(request_id) DO UPDATE SET manual_stage=excluded.manual_stage,seen_version=excluded.seen_version,updated_at=excluded.updated_at",id,action==='decline'?'canceled':'new',id,at,id,at,action==='decline'?'inquiry_declined':'inquiry_reopened'));
  if(action==='decline')statements.push(stmt(e,"INSERT INTO tpj_notifications(id,request_id,event_key,recipient_type,payload_json,next_attempt_at,created_at) SELECT ?,?,?,'customer',?,?,? WHERE EXISTS(SELECT 1 FROM tpj_request_events WHERE request_id=? AND event_type='inquiry_declined' AND created_at=?)",key,id,'declined:'+b.version,JSON.stringify({event:'inquiry_declined',requestId:id,customer:{name:row.customer_name,email:row.customer_email},reason}),at,at,id,at));
  const result=await e.DB.batch(statements);if(!result[0].results?.length)fail('The inquiry changed. Refresh before continuing.',409);return tpjJSON({ok:true});
 }
 async function route(request,e){
  const url=new URL(request.url),p=url.pathname;
  if(p==='/api/business/public'){if(request.method!=='GET')fail('Method not allowed.',405);return tpjJSON({ok:true,...await publicConfig(e)});}
  if(!p.startsWith('/api/admin/business/'))return null;
  await tpjAdmin(request,e);
  if(p==='/api/admin/business/config'){if(request.method==='GET'){const state=await load(e);return tpjJSON({ok:true,...state,targets:TPJ_M.withCatalog(catalog(state)).availabilityTargets(),allergens});}if(request.method==='PUT')return save(e,await tpjReadJSON(request));}
  if(p==='/api/admin/business/orders'&&request.method==='GET')return list(e,url);
  const m=p.match(/^\/api\/admin\/business\/orders\/(TPJ-[A-Za-z0-9-]+)\/(packet|fulfill|decline|reopen|correction)$/);
  if(m){if(m[2]==='packet'&&request.method==='GET')return tpjJSON({ok:true,...await packet(e,m[1])});if(request.method==='POST'){if(m[2]==='fulfill')return fulfill(request,e,m[1]);if(['decline','reopen'].includes(m[2]))return change(request,e,m[1],m[2]);if(m[2]==='correction'){const b=await tpjReadJSON(request),note=text(b.note,3000);if(note.length<3)fail('Enter the correction to preserve in the order history.');const at=now(),result=await e.DB.batch([stmt(e,'UPDATE tpj_requests SET version=version+1,updated_at=? WHERE id=? AND version=? RETURNING id',at,m[1],b.version),stmt(e,"INSERT INTO tpj_request_events(request_id,event_type,details_json,created_at) SELECT ?,'record_correction',?,? WHERE changes()=1",m[1],JSON.stringify({note}),at)]);if(!result[0].results?.length)fail('The order changed. Refresh before adding a correction.',409);return tpjJSON({ok:true});}}}
  fail('Action not found.',404);
 }
 return {route,load,catalog,publicConfig,quote,allergens,notice,safe,paidSQL};
})();

/* Versioned owner menu additions and scoped date rules. */
const TPJMenuTools=(()=>{
 const groups=['cupcakes','jars','apples','cakes','chocolate'];
 const validDay=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isFinite(Date.parse(d+'T12:00:00Z'))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;
 const bad=m=>{throw tpjError(m);};
 const str=(v,max=300)=>typeof v==='string'&&v.trim().length<=max?v.trim():bad('A menu text field is invalid.');
 const image=v=>{const s=str(v||'',500);if(s&&!/^(?:\/?images\/|\.\.\/images\/|https:\/\/www\.thepastryjunkie\.com\/images\/)[A-Za-z0-9_./% -]+$/.test(s))bad('Use an image path from your website images folder.');return s;};
 const id=v=>/^[a-z][a-z0-9_-]{1,60}$/.test(v)&&!['__proto__','constructor','prototype'].includes(v);
 function validate(input,base){
  const out={customProducts:{},extraFlavors:{},removed:[],dateRules:[]};
  for(const [key,p]of Object.entries(input.customProducts||{})){if(!id(key)||!p||!groups.includes(p.category)||!Number.isSafeInteger(p.price)||p.price<1||p.price>5000000)bad('A new product needs a category and valid price.');out.customProducts[key]={name:str(p.name,150)||bad('Name the product.'),description:str(p.description||'',1500),category:p.category,price:p.price,image:image(p.image)};}
  if(Object.keys(out.customProducts).length>200)bad('Keep the custom menu under 200 products.');
  for(const [key,p]of Object.entries(input.extraFlavors||{})){if(!id(key)||Object.hasOwn(TPJ_C.flavors,key)||!p||!Array.isArray(p.categories)||!p.categories.length||!p.categories.every(k=>groups.includes(k)&&k!=='chocolate'))bad('A new flavor needs a unique ID and supported category.');out.extraFlavors[key]={name:str(p.name,100)||bad('Name the flavor.'),categories:[...new Set(p.categories)],image:image(p.image)};}
  if(Object.keys(out.extraFlavors).length>100)bad('Keep the added flavor list under 100.');
  const targets=new Set(TPJ_M.availabilityTargets().map(x=>x[0]));for(const k of Object.keys(out.extraFlavors)){targets.add('flavor:'+k);for(const g of out.extraFlavors[k].categories)targets.add('product:'+g+':'+k);}for(const k of Object.keys(out.customProducts))targets.add('custom:'+k);
  if(!Array.isArray(input.removed||[])||!(input.removed||[]).every(k=>targets.has(k)))bad('A removed menu item is invalid.');out.removed=[...new Set(input.removed||[])];
  if(!Array.isArray(input.dateRules||[])||(input.dateRules||[]).length>730)bad('Use up to 730 calendar dates.');const dates=new Set();
  for(const v of input.dateRules||[]){if(!validDay(v.date)||dates.has(v.date)||!Array.isArray(v.windows)||v.windows.length>30)bad('A calendar date or time range is invalid.');dates.add(v.date);const windows=v.windows.map(w=>{if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(w.start)||!/^([01]\d|2[0-3]):[0-5]\d$|^24:00$/.test(w.end)||w.start>=w.end)bad('Enter a same-day start and end time; end must be later.');return {start:w.start,end:w.end};});out.dateRules.push({date:v.date,windows});}
  return out;
 }
 function apply(c,config){
  c.customProducts=config.customProducts||{};c.ownerExtraFlavors=config.extraFlavors||{};
  for(const [id,p]of Object.entries(config.extraFlavors||{})){c.flavors[id]=p.name;if(p.image){c.newCakeAssets[id]=p.image;}for(const g of p.categories)if(!c.categories[g].flavors.includes(id))c.categories[g].flavors.push(id);}
  c.removed=config.removed||[];return c;
 }
 function blocked(availability,date,time){
  if((availability.blockedDates||[]).includes(date))return true;
  const r=(availability.dateRules||[]).find(r=>r.date===date);
  return !!r?.windows?.some(w=>time>=w.start&&time<w.end);
 }

 return {validate,apply,blocked,groups};
})();

/* Owner organization is separate from verified payments and fulfillment evidence. */
const TPJOrderManagement=(()=>{
 const stages=['new','pending','confirmed','fulfilled','canceled'];
 const at=()=>new Date().toISOString(),sql=(e,s,...args)=>e.DB.prepare(s).bind(...args),get=(e,s,...a)=>sql(e,s,...a).first(),all=async(e,s,...a)=>(await sql(e,s,...a).all()).results;
 const fail=(s,n=422)=>{throw tpjError(s,n);};
 async function state(e,row){const m=await get(e,'SELECT * FROM tpj_order_management WHERE request_id=?',row.id);return {manualStage:m?.manual_stage||null,read:(m?.seen_version||0)>=row.version,archivedAt:m?.archived_at||null,isTest:m?.is_test===1,purging:m?.purging===1};}
 async function guard(e,id){if((await get(e,'SELECT purging FROM tpj_order_management WHERE request_id=?',id))?.purging)fail('This test record is being removed. Its links and payments are disabled.',410);}
 async function google(e,payload){const timestamp=Date.now(),raw=JSON.stringify(payload),signature=await tpjHash(timestamp+'\n'+raw,e.GOOGLE_BRIDGE_SECRET),controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);try{let r=await fetch(e.GOOGLE_SCRIPT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({businessDelivery:1,timestamp,payload:raw,signature}),redirect:'manual',signal:controller.signal});if([301,302,303].includes(r.status)){const u=new URL(r.headers.get('Location')||'');if(u.origin!=='https://script.googleusercontent.com')fail('Unexpected archive-service redirect.',503);r=await fetch(u.href,{redirect:'manual',signal:controller.signal});}const result=await r.json();if(!r.ok||!result.ok)fail('Test file cleanup did not finish. Retry the same record; it remains locked.',503);return result;}finally{clearTimeout(timer);}}
 async function route(request,e){
  const p=new URL(request.url).pathname,m=p.match(/^\/api\/admin\/business\/orders\/(TPJ-[a-f0-9-]{36})\/(manage|purge)$/i);if(!m)return null;await tpjAdmin(request,e);if(request.method!=='POST')fail('Method not allowed.',405);
  const id=m[1],b=await tpjReadJSON(request),row=await get(e,'SELECT * FROM tpj_requests WHERE id=?',id);if(!row)fail('Order not found.',404);
  await sql(e,'INSERT OR IGNORE INTO tpj_order_management(request_id,updated_at) VALUES(?,?)',id,at()).run();
  if(m[2]==='purge')return purge(e,row,b);
  await guard(e,id);
  if(b.action==='read'||b.action==='unread'){if(!Number.isSafeInteger(b.version)||b.version<1)fail('Reload the order first.');await sql(e,'UPDATE tpj_order_management SET seen_version=?,updated_at=? WHERE request_id=?',b.action==='read'?Math.min(row.version,b.version):0,at(),id).run();return tpjJSON({ok:true});}
  if(row.version!==b.version)fail('The order changed. Reload before changing its organization.',409);
  let column,value;
  if(b.action==='stage'){if(b.stage!==null&&!stages.includes(b.stage))fail('Choose an order stage.');column='manual_stage';value=b.stage;}
  else if(b.action==='archive'||b.action==='restore'){column='archived_at';value=b.action==='archive'?at():null;}
  else if(b.action==='test'){
   if(String(e.SQUARE_ENVIRONMENT).trim()!=='sandbox'||await get(e,"SELECT id FROM tpj_offers WHERE request_id=? AND environment!='sandbox' LIMIT 1",id))fail('Only Sandbox records can be marked as tests.',409);column='is_test';value=b.isTest===true?1:0;
  }else fail('Unknown organization action.');
  const results=await e.DB.batch([sql(e,'UPDATE tpj_requests SET version=version+1,updated_at=? WHERE id=? AND version=? RETURNING id',at(),id,b.version),sql(e,'UPDATE tpj_order_management SET '+column+'=?,updated_at=? WHERE request_id=? AND changes()=1',value,at(),id),sql(e,"INSERT INTO tpj_request_events(request_id,event_type,details_json,created_at) SELECT ?,'owner_organization_changed',?,? WHERE changes()=1",id,JSON.stringify({action:b.action,value}),at())]);if(!results[0].results?.length)fail('The order changed; reload first.',409);return tpjJSON({ok:true});
 }
 async function purge(e,row,b){
  const id=row.id,m=await get(e,'SELECT * FROM tpj_order_management WHERE request_id=?',id),reference=(await get(e,'SELECT reference FROM tpj_display_references WHERE request_id=?',id))?.reference||id;
  if(String(e.SQUARE_ENVIRONMENT).trim()!=='sandbox'||m?.is_test!==1||b.confirmation!==reference)fail('Permanent deletion requires a marked Sandbox test and its exact displayed order number.',409);
  if(await get(e,"SELECT id FROM tpj_offers WHERE request_id=? AND environment!='sandbox' LIMIT 1",id))fail('Production records cannot use test deletion.',409);
  if(await get(e,"SELECT a.id FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id JOIN tpj_offers o ON o.id=i.offer_id WHERE o.request_id=? AND a.status='PENDING' LIMIT 1",id))fail('Reconcile the pending test payment before deleting this test.',409);
  if(await get(e,"SELECT id FROM tpj_notifications WHERE request_id=? AND state='processing' AND lease_until>? LIMIT 1",id,at()))fail('A test email is processing. Let its lease finish, then retry deletion.',409);
  const lease=await e.DB.batch([sql(e,'UPDATE tpj_order_management SET purging=1,updated_at=? WHERE request_id=? AND EXISTS(SELECT 1 FROM tpj_requests WHERE id=? AND version=?) RETURNING request_id',at(),id,id,b.version),sql(e,"UPDATE tpj_notifications SET state='failed',last_error='Test deletion in progress',lease_until=NULL WHERE request_id=? AND changes()>0",id)]);if(!lease[0].results?.length)fail('Reload the test before deleting it.',409);
  const offers=await all(e,'SELECT id FROM tpj_offers WHERE request_id=?',id),jobs=await all(e,'SELECT id FROM tpj_notifications WHERE request_id=?',id),challenges=await all(e,'SELECT c.id FROM tpj_signing_challenges c JOIN tpj_offers o ON o.id=c.offer_id WHERE o.request_id=?',id),files=await all(e,'SELECT drive_file_id FROM tpj_files WHERE request_id=?',id),fulfillment=await get(e,'SELECT record_json FROM tpj_fulfillments WHERE request_id=?',id);
  const fileIds=files.map(x=>x.drive_file_id).filter(Boolean);if(fulfillment){const f=JSON.parse(fulfillment.record_json);if(f.photo?.fileId)fileIds.push(f.photo.fileId);}
  const artifactCount=offers.length+fileIds.length+jobs.length+challenges.length;
  if(artifactCount)await google(e,{action:'purge_test_records',sandbox:true,requestId:id,offerIds:offers.map(x=>x.id),jobIds:jobs.map(x=>x.id),challengeIds:challenges.map(x=>x.id),fileIds});
  const queries=[sql(e,'INSERT OR REPLACE INTO tpj_test_purge_guard(request_id,expires_at) VALUES(?,?)',id,Math.floor(Date.now()/1000)+60)];
  const offerWhere='SELECT id FROM tpj_offers WHERE request_id=?',intentWhere='SELECT i.id FROM tpj_payment_intents i JOIN tpj_offers o ON o.id=i.offer_id WHERE o.request_id=?',attemptWhere='SELECT a.id FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id JOIN tpj_offers o ON o.id=i.offer_id WHERE o.request_id=?';
  for(const [table,where]of [['tpj_payment_disputes','attempt_id IN ('+attemptWhere+')'],['tpj_payment_attempts','intent_id IN ('+intentWhere+')'],['tpj_payment_intents','offer_id IN ('+offerWhere+')'],['tpj_signing_challenges','offer_id IN ('+offerWhere+')'],['tpj_signed_records','offer_id IN ('+offerWhere+')'],['tpj_cancellation_requests','offer_id IN ('+offerWhere+')'],['tpj_credit_uses','credit_id IN (SELECT id FROM tpj_store_credits WHERE request_id=?)'],['tpj_store_credits','request_id=?'],['tpj_order_changes','offer_id IN ('+offerWhere+')'],['tpj_offers','request_id=?'],['tpj_fulfillments','request_id=?'],['tpj_files','request_id=?'],['tpj_notifications','request_id=?'],['tpj_submission_keys','request_id=?'],['tpj_request_events','request_id=?'],['tpj_display_references','request_id=?'],['tpj_order_management','request_id=?'],['tpj_requests','id=?'],['tpj_test_purge_guard','request_id=?']])queries.push(sql(e,'DELETE FROM '+table+' WHERE '+where,id));
  await e.DB.batch(queries);return tpjJSON({ok:true,deleted:true,externalCopies:'Square history, previously delivered emails and Google Trash are outside the dashboard deletion.'});
 }
 return {route,state,guard};
})();

/* Signed supplemental approvals reuse the existing verified Square payment engine. */
const TPJChanges=(()=>{
 const st=(e,s,...a)=>e.DB.prepare(s).bind(...a),get=(e,s,...a)=>st(e,s,...a).first(),all=async(e,s,...a)=>(await st(e,s,...a).all()).results;
 const now=()=>new Date().toISOString(),fail=(m,s=422)=>{throw tpjError(m,s);},money=n=>'$'+(n/100).toFixed(2);
 const W=()=>TPJWorkflow.internal;
 async function root(e,o){const c=await get(e,'SELECT parent_offer_id FROM tpj_order_changes WHERE offer_id=?',o.id);return c?await W().loadOffer(e,c.parent_offer_id):o;}
 async function summary(e,offer){
  const parent=await root(e,offer),changes=await all(e,'SELECT c.*,o.status,o.signature_json,o.total_cents,o.payment_review,o.expires_at,o.snapshot_json FROM tpj_order_changes c JOIN tpj_offers o ON o.id=c.offer_id WHERE c.parent_offer_id=? ORDER BY c.change_number',parent.id);
  const initial=await get(e,'SELECT COALESCE(SUM(paid_cents),0) total FROM tpj_payment_intents WHERE offer_id=?',parent.id);let added=0,paid=Number(initial.total),pending=false,review=!!parent.payment_review;const details=[];
  for(const c of changes){const intent=await get(e,"SELECT status,paid_cents,paid_at FROM tpj_payment_intents WHERE offer_id=? AND phase='initial'",c.offer_id),accepted=!!c.signature_json&&!c.voided_at;
   if(accepted)added+=c.total_cents;paid+=Number(intent?.paid_cents||0);if(c.status!=='CLOSED'&&(c.status==='SIGNED'&&intent?.status!=='PAID'||c.status==='OPEN'&&Date.parse(c.expires_at)>Date.now()))pending=true;if(c.payment_review)review=true;
   const cancellation=await get(e,'SELECT reason,received_at FROM tpj_cancellation_requests WHERE offer_id=?',c.offer_id);details.push({cancellation,id:c.offer_id,number:c.change_number,footprint:c.footprint,description:c.description,amountCents:c.total_cents,dueDate:c.due_date,status:c.voided_at?'VOID':c.status==='OPEN'&&Date.parse(c.expires_at)<=Date.now()?'EXPIRED':c.status,accepted,paidCents:intent?.paid_cents||0,paymentStatus:intent?.status||'READY',paymentReview:!!c.payment_review,orderURL:await W().link(e,{id:c.offer_id}),snapshot:JSON.parse(c.snapshot_json)});
  }
  const base=JSON.parse(parent.snapshot_json),effectiveQuote=structuredClone(base.quote);if(effectiveQuote){for(const c of details.filter(c=>c.accepted)){const q=c.snapshot.quote;effectiveQuote.lines.push(...q.lines);for(const key of ['productsCents','deliveryCents','rushFeeCents','taxCents','totalCents'])effectiveQuote[key]+=q[key]||0;effectiveQuote.disclosure.contains=[...new Set([...effectiveQuote.disclosure.contains,...q.disclosure.contains])];effectiveQuote.disclosure.refrigerated||=q.disclosure.refrigerated;if(q.disclosure.safe)effectiveQuote.disclosure.safe=q.disclosure.safe;if(q.disclosure.additionalInfo&&!effectiveQuote.disclosure.additionalInfo?.includes(q.disclosure.additionalInfo))effectiveQuote.disclosure.additionalInfo=[effectiveQuote.disclosure.additionalInfo,q.disclosure.additionalInfo].filter(Boolean).join('\n');}}
  return {rootOfferId:parent.id,rootURL:await W().link(e,parent),originalTotalCents:parent.total_cents,additionalCents:added,revisedTotalCents:parent.total_cents+added,paidTotalCents:paid,outstandingCents:Math.max(0,parent.total_cents+added-paid),changes:details,pendingChanges:pending,paymentReview:review,effectiveQuote};
 }
 async function route(request,e){const p=new URL(request.url).pathname,m=p.match(/^\/api\/admin\/business\/orders\/(TPJ-[a-f0-9-]{36})\/changes(?:\/([A-Za-z0-9_-]+)\/void)?$/i);if(!m)return null;await tpjAdmin(request,e);const row=await get(e,'SELECT * FROM tpj_requests WHERE id=?',m[1]);if(!row)fail('Order not found.',404);await TPJOrderManagement.guard(e,row.id);if(request.method==='GET'&&!m[2]){const parent=await get(e,'SELECT o.* FROM tpj_offers o WHERE o.request_id=? AND NOT EXISTS(SELECT 1 FROM tpj_order_changes c WHERE c.offer_id=o.id) ORDER BY o.created_at DESC LIMIT 1',row.id);return tpjJSON({ok:true,summary:parent?await summary(e,parent):null});}if(request.method!=='POST')fail('Method not allowed.',405);if(m[2]){const child=await W().loadOffer(e,m[2]);if(child.request_id!==row.id)fail('Change not found.',404);return close(request,e,child);}return create(request,e,row);}
 async function create(request,e,row){
  W().enabled(e);const b=await tpjReadJSON(request);if(!/^[a-f0-9-]{36}$/i.test(b.operationKey||'')||typeof b.description!=='string'||b.description.trim().length<3||b.description.length>5000||b.authorized!==true||typeof b.businessSigner!=='string'||b.businessSigner.trim().length<2||b.businessSigner.length>150)fail('Describe the agreed changes and authorize your business signature.');
  const q=TPJBusiness.quote(b),prior=await get(e,'SELECT o.*,c.description FROM tpj_offers o JOIN tpj_order_changes c ON c.offer_id=o.id WHERE o.id=?',b.operationKey);
  if(prior){if(prior.request_id!==row.id||prior.description!==b.description.trim()||JSON.stringify(JSON.parse(prior.snapshot_json).quote)!==JSON.stringify(q))fail('This change reference belongs to different details.',409);return tpjJSON({ok:true,offer:await W().view(e,prior,true)});}
  if(row.version!==b.version)fail('The order changed. Reload before issuing a change.',409);
  const parent=await get(e,"SELECT o.* FROM tpj_offers o WHERE o.request_id=? AND o.status='SIGNED' AND NOT EXISTS(SELECT 1 FROM tpj_order_changes c WHERE c.offer_id=o.id) ORDER BY o.created_at DESC LIMIT 1",row.id);
  if(!parent||parent.payment_review||parent.environment!==String(e.SQUARE_ENVIRONMENT).trim()||['cancelled','declined','completed'].includes(row.status)||Date.parse(parent.fulfillment_at)<=Date.now())fail('Additional charges require an active signed order before handoff, with no payment review.',409);
  const first=await get(e,"SELECT status FROM tpj_payment_intents WHERE offer_id=? AND phase='initial'",parent.id);if(first?.status!=='PAID')fail('Verify the original deposit or full payment before requesting an additional charge.',409);
  const totals=await summary(e,parent);if(totals.paymentReview)fail('Resolve payment review before requesting another change.',409);if(totals.changes.some(c=>['OPEN','EXPIRED'].includes(c.status)))fail('Close or resolve the existing proposed change before issuing another.',409);if(totals.revisedTotalCents+q.totalCents>5000000)fail('The revised order total exceeds the supported limit.');
  const original=JSON.parse(parent.snapshot_json);tpjTexasFulfillment(original.fulfillment);const day=TPJWorkflow.plan.day(),due=original.source==='cake_builder'&&parent.balance_due_date&&parent.balance_due_date>day?parent.balance_due_date:day;
  const expires=Math.min(Date.parse(parent.fulfillment_at),due>day?TPJWorkflow.plan.localMS(due,'23:59'):Date.now()+86400000);if(expires<=Date.now()+60000)fail('The fulfillment deadline is too close for another online approval.');
  const created=now(),token=await tpjHash('TPJ-WORKFLOW-LINK:'+b.operationKey,e.GOOGLE_BRIDGE_SECRET),number=(await get(e,'SELECT COALESCE(MAX(change_number),0)+1 n FROM tpj_order_changes WHERE parent_offer_id=?',parent.id)).n;
  const seq=(await get(e,"SELECT sequence FROM tpj_display_counters WHERE scope='footprint'")).sequence+1,parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()),f=k=>parts.find(x=>x.type===k).value,footprint='TPJ'+f('year')+f('day')+f('month')+String(seq).padStart(2,'0');
  const rootRef=(await get(e,'SELECT reference FROM tpj_display_references WHERE request_id=?',row.id))?.reference||row.id;
  const change={parentOfferId:parent.id,reference:rootRef+'-C'+String(number).padStart(2,'0'),number,footprint,description:b.description.trim(),dueDate:due,originalTotalCents:parent.total_cents,previousApprovedTotalCents:totals.revisedTotalCents,revisedTotalCents:totals.revisedTotalCents+q.totalCents,paidAtIssueCents:totals.paidTotalCents,originalAgreementHash:await tpjHash(parent.terms_json)};
  const terms={version:'2026-10-30-change-1',title:'Order Change Agreement',sections:[{title:'Changes and additional charges',text:'This amendment supplements the original agreement for '+rootRef+'. Approved changes: '+change.description+' Additional charge: '+money(q.totalCents)+'. Revised order total if accepted: '+money(change.revisedTotalCents)+'. Previously received payments remain credited. '+(due>day?'This additional cake payment is due '+due+', on the original final balance deadline.':'The additional payment is due upon approval and before pickup or delivery.')+' The original payment schedule and other terms remain in effect except as expressly changed here. No card will be charged automatically. The customer must accept this amendment and initiate its payment. Unaccepted changes do not amend the original order.'}],initialSectionIndexes:[]};
  const snapshot={business:original.business,businessAcceptance:{name:b.businessSigner.trim(),consent:true,signedAt:created},source:original.source,customer:original.customer,fulfillment:original.fulfillment,items:q.lines,quote:q,change,inquirySummary:{},approvedDescription:change.description};
  const o={id:b.operationKey,request_id:row.id,environment:parent.environment,status:'OPEN',token_hash:await tpjHash(token),total_cents:q.totalCents,initial_cents:q.totalCents,rush_fee_cents:b.rushFeeCents,fulfillment_date:parent.fulfillment_date,fulfillment_time:parent.fulfillment_time,fulfillment_at:parent.fulfillment_at,balance_due_date:null,contract_required:0,terms_json:JSON.stringify(terms),snapshot_json:JSON.stringify(snapshot),expires_at:new Date(expires).toISOString(),created_at:created,updated_at:created},keys=Object.keys(o);
  await e.DB.batch([
   st(e,'UPDATE tpj_requests SET version=CASE WHEN version=? THEN version+1 ELSE NULL END,updated_at=? WHERE id=?',b.version,created,row.id),
   st(e,"UPDATE tpj_display_counters SET sequence=CASE WHEN sequence=? THEN sequence+1 ELSE NULL END WHERE scope='footprint'",seq-1),
   st(e,'INSERT INTO tpj_offers('+keys.join(',')+') VALUES('+keys.map(()=>'?').join(',')+')',...Object.values(o)),
   st(e,'INSERT INTO tpj_order_changes(offer_id,parent_offer_id,change_number,footprint,description,due_date,created_at) VALUES(?,?,?,?,?,?,?)',o.id,parent.id,number,footprint,change.description,due,created),
   st(e,"INSERT INTO tpj_payment_intents(id,offer_id,phase,amount_cents,created_at,updated_at) VALUES(?,?,'initial',?,?,?)",crypto.randomUUID(),o.id,q.totalCents,created,created),
   W().audit(e,row.id,'change_approval_issued',{offerId:o.id,parentOfferId:parent.id,amountCents:o.total_cents,dueDate:due}),
   ...await W().mail(e,o,o.id+':offer','Review your order changes',change.description+' Additional amount: '+money(q.totalCents)+'. '+(due>day?'Payment is due '+due+'.':'Payment is due upon approval, before handoff.')+' Your original payments remain credited.')
  ]);return tpjJSON({ok:true,offer:await W().view(e,o,true)});
 }
 function acceptQueries(e,o,signed){
  const c=JSON.parse(o.snapshot_json).change;if(!c)return [st(e,"UPDATE tpj_requests SET approval_json=?,approved_total_cents=?,status='awaiting_payment',version=version+1,updated_at=? WHERE id=? AND EXISTS(SELECT 1 FROM tpj_offers WHERE id=? AND signature_json=?)",JSON.stringify({stage:'accepted',offerId:o.id}),o.total_cents,now(),o.request_id,o.id,JSON.stringify(signed))];
  return [st(e,"UPDATE tpj_requests SET approved_total_cents=(SELECT p.total_cents+COALESCE((SELECT SUM(a.total_cents) FROM tpj_order_changes c JOIN tpj_offers a ON a.id=c.offer_id WHERE c.parent_offer_id=p.id AND c.voided_at IS NULL AND a.signature_json IS NOT NULL),0) FROM tpj_offers p WHERE p.id=?),version=version+1,updated_at=? WHERE id=?",c.parentOfferId,now(),o.request_id)];
 }
 async function close(request,e,o){
  const b=await tpjReadJSON(request),c=await get(e,'SELECT * FROM tpj_order_changes WHERE offer_id=?',o.id);if(!c)fail('Change not found.',404);if(b.acknowledged!==true||typeof b.reason!=='string'||b.reason.trim().length<3||b.reason.length>2000)fail('Record the written reason for withdrawing this change.');
  if(await get(e,"SELECT a.id FROM tpj_payment_attempts a JOIN tpj_payment_intents i ON i.id=a.intent_id WHERE i.offer_id=? AND a.status='PENDING'",o.id))fail('Reconcile the pending change payment first.',409);
  const paid=await get(e,'SELECT COALESCE(SUM(paid_cents),0) total FROM tpj_payment_intents WHERE offer_id=?',o.id);if(paid.total||o.payment_review)fail('A paid or disputed change requires a separately recorded financial resolution. It cannot be erased.',409);
  if(c.voided_at)return tpjJSON({ok:true});const time=now();await e.DB.batch([st(e,"UPDATE tpj_offers SET status='CLOSED',updated_at=? WHERE id=?",time,o.id),st(e,'UPDATE tpj_order_changes SET voided_at=? WHERE offer_id=?',time,o.id),st(e,"UPDATE tpj_requests SET approved_total_cents=(SELECT p.total_cents+COALESCE((SELECT SUM(a.total_cents) FROM tpj_order_changes c JOIN tpj_offers a ON a.id=c.offer_id WHERE c.parent_offer_id=p.id AND c.voided_at IS NULL AND a.signature_json IS NOT NULL),0) FROM tpj_offers p WHERE p.id=?),version=version+1,updated_at=? WHERE id=?",c.parent_offer_id,time,o.request_id),W().audit(e,o.request_id,'change_withdrawn',{offerId:o.id,reason:b.reason.trim()}),...await W().mail(e,o,o.id+':void','Order change withdrawn','This change approval has been withdrawn: '+b.reason.trim()+'. The original order and other accepted changes remain in place. No refund was processed.')]);return tpjJSON({ok:true});
 }
 async function cancelRequest(request,e,o){
  const b=await tpjReadJSON(request),reason=String(b.reason||'').trim();if(reason.length<3||reason.length>2000)fail('Describe the change cancellation request.');if(o.status==='CLOSED')fail('This change approval is already closed.',409);const time=now();await e.DB.batch([st(e,'INSERT OR IGNORE INTO tpj_cancellation_requests(id,offer_id,reason,within_credit_window,received_at) VALUES(?,?,?,0,?)',crypto.randomUUID(),o.id,reason,time),st(e,'UPDATE tpj_requests SET version=version+1,updated_at=? WHERE id=?',time,o.request_id),W().audit(e,o.request_id,'change_cancellation_requested',{offerId:o.id,reason}),...await W().mail(e,o,o.id+':cancel-request','Change cancellation request received','Your request to cancel this change was received for business review. The original order has not been canceled. No refund or store credit has been promised.')]);return tpjJSON({ok:true});
 }
 return {route,summary,root,acceptQueries,close,cancelRequest};
})();
