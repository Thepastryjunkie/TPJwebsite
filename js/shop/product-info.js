(function (root, factory) {
    const data = factory();

    if (typeof module === "object" && module.exports) {
        module.exports = data;
    } else {
        root.TPJShopProductInfo = data;
    }
})(
    typeof globalThis !== "undefined" ? globalThis : this,

    function () {
        "use strict";

        const STANDARD = ["milk", "egg", "wheat", "soy"];

        const labels = {
            milk: "milk",
            egg: "eggs",
            wheat: "wheat",
            soy: "soy",
            peanut: "peanuts",
            treeNut: "tree nuts"
        };

        function entry(
            storage,
            notes = "",
            contains = STANDARD,
            mayContain = []
        ) {
            return {
                storage,
                notes,
                contains: [...contains],
                mayContain: [...mayContain]
            };
        }

        const care = {
            cupcakes: {
                cookies: entry(
                    "Keep refrigerated because of the loaded dairy-based frosting and filling. For the softest cake texture, let sit at room temperature for about 20–30 minutes before serving. Keep away from heat.",
                    "OREO cookies contain wheat and soy."
                ),

                strawberry: entry(
                    "Keep refrigerated, especially because of the strawberry components and dairy-based frosting. Keep covered to prevent the crunch from softening. Best served slightly cool.",
                    "Strawberry crunch components may contain wheat and soy depending on the cookie products used."
                ),

                biscoff: entry(
                    "Keep refrigerated because of the dairy-based frosting and filling. Allow to soften slightly at room temperature before serving. Store covered so the Biscoff crumbs stay crisp.",
                    "Lotus Biscoff cookies contain wheat and soy."
                ),

                chocolate: entry(
                    "Keep refrigerated because of the chocolate frosting, ganache, and loaded toppings. Allow to sit at room temperature for about 20–30 minutes before serving for the best chocolate texture."
                ),

                snickers: entry(
                    "Keep refrigerated because of the dairy-based frosting, chocolate, and caramel components. Let soften slightly before serving.",
                    "SNICKERS contains peanuts, milk, egg, and soy and may contain tree nuts.",
                    ["peanut", ...STANDARD],
                    ["treeNut"]
                ),

                banana: entry(
                    "Keep refrigerated at all times because of the banana-pudding and dairy-based components. Keep covered and enjoy promptly for the best banana and wafer texture.",
                    "NILLA Wafers contain egg, milk, wheat, and soy."
                ),

                redvelvet: entry(
                    "Keep refrigerated because of the cream-cheese-style frosting and loaded dairy components. Allow to soften slightly before serving."
                ),

                birthday: entry(
                    "Keep refrigerated because of the buttercream and loaded cake toppings. Allow to soften slightly before serving. Keep covered to protect the sprinkles and cake pieces from moisture.",
                    "Sprinkle and white-chocolate ingredients may also contain soy depending on brand."
                ),

                cinnamon: entry(
                    "Keep refrigerated because of the cream-cheese-style icing/frosting and loaded cinnamon-roll components. Warm spices are best enjoyed once the cupcake has softened slightly at room temperature."
                ),

                peach: entry(
                    "Keep refrigerated because of the peach filling and dairy-based frosting. Keep covered and upright to protect the cobbler topping and fruit components."
                )
            },

            jars: {
                cookies: entry(
                    "Keep refrigerated. Keep the lid tightly closed so the cheesecake stays creamy and the Oreo layers stay as fresh as possible.",
                    "Eggs may be present depending on the cake/cheesecake components used. OREO cookies contain wheat and soy.",
                    ["milk", "wheat", "soy"],
                    ["egg"]
                ),

                strawberry: entry(
                    "Keep refrigerated. Because this jar contains strawberry components, do not leave it sitting at room temperature for extended periods."
                ),

                biscoff: entry(
                    "Keep refrigerated. Keep tightly covered to protect the creamy layers and Biscoff crumbs.",
                    "Eggs may be present from cake/cheesecake components. Lotus Biscoff contains wheat and soy.",
                    ["milk", "wheat", "soy"],
                    ["egg"]
                ),

                chocolate: entry(
                    "Keep refrigerated. Let sit for a few minutes before eating if you prefer a softer chocolate and ganache texture."
                ),

                snickers: entry(
                    "Keep refrigerated. Keep tightly covered to protect the cheesecake, caramel, chocolate, and candy pieces.",
                    "SNICKERS may contain tree nuts.",
                    ["peanut", ...STANDARD],
                    ["treeNut"]
                ),

                banana: entry(
                    "Keep refrigerated at all times. Keep tightly covered; banana and vanilla-wafer components are best enjoyed fresh.",
                    "NILLA Wafers contain egg, milk, wheat, and soy."
                ),

                redvelvet: entry(
                    "Keep refrigerated because of the cheesecake and cream-cheese-style components."
                ),

                birthday: entry(
                    "Keep refrigerated. Keep tightly covered to protect the cheesecake layers, cake pieces, and sprinkles."
                ),

                cinnamon: entry(
                    "Keep refrigerated because of the cheesecake and cream-cheese-style components. Keep covered to prevent the cinnamon crumble from becoming overly soft."
                ),

                peach: entry(
                    "Keep refrigerated because of the cheesecake and peach filling. Keep tightly covered and chilled until serving."
                ),

                strawberrybanana: entry(
                    "Keep refrigerated at all times because of the fresh fruit, pudding, and dairy components. Keep tightly covered and enjoy promptly for the best fruit and wafer texture.",
                    "NILLA Wafers contain egg, milk, wheat, and soy."
                )
            },

            apples: {
                cookies: entry(
                    "Keep refrigerated and upright in its individual box. Do not freeze. Keep the apple secured to its base and allow only a short sit at room temperature before eating.",
                    "OREO cookies contain wheat and soy."
                ),

                strawberry: entry(
                    "Keep refrigerated and upright. Because of the strawberry topping and cheesecake, keep chilled until shortly before serving."
                ),

                biscoff: entry(
                    "Keep refrigerated and upright. Keep covered to protect the cheesecake topper and cookie crumb coating.",
                    "Lotus Biscoff contains wheat and soy."
                ),

                snickers: entry(
                    "Keep refrigerated and upright. Keep away from heat so the chocolate and caramel coatings remain stable.",
                    "May contain tree nuts from SNICKERS ingredients.",
                    ["peanut", ...STANDARD],
                    ["treeNut"]
                ),

                banana: entry(
                    "Keep refrigerated and upright at all times. Keep covered and chilled to protect the cheesecake, pudding, and banana components.",
                    "NILLA Wafers contain egg, milk, wheat, and soy."
                ),

                redvelvet: entry(
                    "Keep refrigerated and upright. Keep covered to protect the cheesecake topper and red velvet crumb coating."
                ),

                birthday: entry(
                    "Keep refrigerated and upright. Keep covered to protect the cheesecake topper, cake pieces, and sprinkle coating."
                )
            },

            cakes: {
                cookies: entry(
                    "Keep refrigerated. For the best cake and buttercream texture, remove from the refrigerator about 30–60 minutes before serving. Keep covered to protect the Oreo crumb finish.",
                    "OREO cookies contain wheat and soy."
                ),

                strawberry: entry(
                    "Keep refrigerated because of the strawberry filling and fresh strawberry garnish. Remove shortly before serving so the cake can soften slightly while the fruit remains fresh."
                ),

                biscoff: entry(
                    "Keep refrigerated. Allow to soften slightly before serving. Keep covered so the cookie coating and Biscoff toppings stay crisp.",
                    "Lotus Biscoff contains wheat and soy."
                ),

                chocolate: entry(
                    "Keep refrigerated because of the ganache, chocolate filling, and loaded toppings. Allow to sit at room temperature for about 30–60 minutes before serving for the softest cake and ganache texture."
                ),

                redvelvet: entry(
                    "Keep refrigerated because of the cream-cheese-style frosting and filling. Remove about 30–60 minutes before serving for the best cake texture."
                ),

                birthday: entry(
                    "Keep refrigerated. Allow to soften slightly before serving. Keep covered to prevent cake pieces and sprinkle coating from absorbing excess moisture."
                ),

                banana: entry(
                    "Keep refrigerated at all times because of the banana-pudding filling, dairy components, and banana garnish. Remove only shortly before serving.",
                    "NILLA Wafers contain egg, milk, wheat, and soy."
                )
            },

            chocolate: {
                strawberry: entry(
                    "Keep refrigerated. Store in a single layer and keep away from excess moisture. Do not freeze. Enjoy promptly for the best strawberry and chocolate texture.",
                    "Chocolate coating contains milk and soy based on the Ghirardelli coatings currently being used. Current Ghirardelli white and dark melting wafers list milk ingredients and soy lecithin.",
                    ["milk", "soy"]
                ),

                oreo: entry(
                    "Store in a cool, dry place away from heat and direct sunlight. Refrigeration is not required under normal cool conditions and may soften the cookie texture. Keep airtight.",
                    "OREO itself contains wheat and soy.",
                    ["milk", "wheat", "soy"]
                ),

                pretzel: entry(
                    "Store in a cool, dry place in an airtight container or sealed box. Do not refrigerate unless necessary for extreme heat, because humidity can soften the pretzel.",
                    "Contains wheat from the pretzel and milk/soy from the chocolate coating. Additional allergens depend on topping.",
                    ["milk", "wheat", "soy"]
                ),

                rice: entry(
                    "Store tightly covered in a cool, dry place. Keep away from heat so the chocolate remains firm. Refrigeration is generally unnecessary and may make the treat firmer or less chewy.",
                    "Contains milk and soy from the Rice Krispies Treat and chocolate coating. Current Rice Krispies Treats Original lists milk and soy.",
                    ["milk", "soy"]
                )
            }
        };

        function combine(category, flavors) {
            const records = [...new Set(flavors)]
                .map(id => care[category]?.[id])
                .filter(Boolean);

            const contains = [
                ...new Set(
                    records.flatMap(record => record.contains)
                )
            ];

            const mayContain = [
                ...new Set(
                    records.flatMap(record => record.mayContain)
                )
            ].filter(id => !contains.includes(id));

            const notes = [
                ...new Set(
                    records
                        .map(record => record.notes)
                        .filter(Boolean)
                )
            ];

            return {
                contains,
                mayContain,
                notes
            };
        }

        return {
            care,
            labels,
            combine,

            toppingNotice:
                "May add milk, egg, wheat and soy depending on components.",

            notice:
                "Ingredient brands and formulas may change. Please contact The Pastry Junkie before ordering if you have a food allergy. Products are prepared in a shared kitchen, and cross-contact with other allergens is possible."
        };
    }
);