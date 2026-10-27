/*
 * Shared delivery pricing for the Shop and Cake Builder.
 * Prices are in dollars.
 */
(function (root, factory) {
    const api = factory();

    if (
        typeof module === "object" &&
        module.exports
    ) {
        module.exports = api;
    } else {
        root.TPJDelivery = api;
    }
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