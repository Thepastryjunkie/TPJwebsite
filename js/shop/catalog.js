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

    if (
        typeof module === "object" &&
        module.exports
    ) {
        module.exports = data;
    } else {
        root.TPJShopCatalog = data;
    }
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