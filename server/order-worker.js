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

    function (C, D) {
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
            return id === "chocolate"
                ? "Triple Chocolate Brownie"
                : C.flavors[id];
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
                    "Choose a requested date and time at least 72 hours from now."
                );
            }

            if (
                (
                    availability.blockedDates ||
                    []
                ).includes(f.date)
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
            availabilityTargets
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
  const value =
    await tpjSetting(
      env,
      "availability",
      {}
    );

  return {
    disabled:
      Array.isArray(value.disabled)
        ? value.disabled
        : [],

    blockedDates:
      Array.isArray(value.blockedDates)
        ? value.blockedDates
        : [],

    revision:
      Number.isInteger(value.revision)
        ? value.revision
        : 1,

    serverTime:
      new Date().toISOString(),

    catalogVersion:
      TPJ_C.version
  };
}

async function tpjAccepting(env) {
  return (
    await tpjSetting(
      env,
      "accepting_requests",
      false
    ) === true &&

    await tpjSetting(
      env,
      "google_bridge_verified",
      false
    ) === true
  );
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
  if (!await tpjAccepting(env)) {
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
      TPJ_C.version ||

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
      TPJ_M.validateOrder(
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
      catalogVersion: TPJ_C.version
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

    ...["customer", "owner"].map(
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
    )
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

async function tpjRoute(request, env) {
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
        await tpjAccepting(env)
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

    return tpjJSON({
      ok: true,

      jobs: rows.results.map(row => ({
        id: row.id,
        leaseUntil: row.lease_until,
        recipientType: row.recipient_type,
        data: JSON.parse(row.payload_json)
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

  const availability =
    await tpjAvailability(env);

  if (
    availability.blockedDates.includes(
      fulfillment.date
    )
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

    ...["customer", "owner"].map(
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
    )
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