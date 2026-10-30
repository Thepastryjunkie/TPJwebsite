/* THE PASTRY JUNKIE — SHOP INTERFACE */
(function () {
"use strict";

const C = window.TPJShopCatalog;
const M = window.TPJShopModel;
const D = window.TPJDelivery;

const API = (
    window.TPJShopSettings?.apiBase || ""
).replace(/\/$/, "");

const KEY = "tpj.shop.cart.v1";

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

const esc = value =>
    String(value ?? "").replace(
        /[&<>"']/g,
        character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character])
    );

const clone = value =>
    JSON.parse(JSON.stringify(value));

const uid = () => crypto.randomUUID();

let cart = [];

let availability = {
    revision: 0,
    disabled: [],
    blockedDates: []
};

let online = false;
let clockOffset = 0;
let config = null;
let editing = null;
let returnFocus = null;
let requestKey = null;
let requestBody = null;


/* =====================================================
   SAVED CART
===================================================== */

try {
    const saved = JSON.parse(
        localStorage.getItem(KEY)
    );

    if (Array.isArray(saved?.items)) {
        cart = saved.items.slice(0, 100);
    }
} catch {
    /* A missing or unreadable saved cart starts empty. */
}

function persist() {
    try {
        localStorage.setItem(
            KEY,
            JSON.stringify({
                status: "Draft Cart",
                items: cart
            })
        );
    } catch {
        /* The current cart still works if storage is unavailable. */
    }

    requestKey = null;
    requestBody = null;

    updateCount();
}

function updateCount() {
    $$(".cart-count").forEach(element => {
        element.textContent = cart.reduce(
            (total, item) =>
                total + (Number(item.quantity) || 1),
            0
        );
    });
}


/* =====================================================
   AVAILABILITY CONNECTION
===================================================== */

async function refreshAvailability() {
    try {
        const response = await fetch(
            API + "/api/shop/availability",
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error();
        }

        availability = await response.json();

        if (
            !Number.isInteger(
                availability.revision
            )
        ) {
            throw new Error();
        }

        online = true;

        clockOffset =
            Date.parse(
                availability.serverTime
            ) - Date.now();

        refreshCards();

        return true;
    } catch {
        online = false;
        return false;
    }
}

const now = () =>
    new Date(
        Date.now() + clockOffset
    );

function isCardAvailable(category, flavor) {
    if (category === "half") {
        return (
            M.enabled(
                availability,
                "category:cakes"
            ) &&
            M.enabled(
                availability,
                "product:cakes:half"
            )
        );
    }

    if (category === "chocolate") {
        return (
            M.enabled(
                availability,
                "category:chocolate"
            ) &&
            M.enabled(
                availability,
                "treat:" + flavor
            )
        );
    }

    return M.available(
        category,
        flavor,
        availability
    );
}

function refreshCards() {
    $$("[data-shop-category]").forEach(card => {
        const available = isCardAvailable(
            card.dataset.shopCategory,
            card.dataset.shopFlavor
        );

        card.classList.toggle(
            "shop-is-unavailable",
            !available
        );

        const button = $(
            ".shop-select",
            card
        );

        if (button) {
            button.disabled = !available;

button.innerHTML = available
    ? shoppingBagIcon()
    : '<span aria-hidden="true">—</span>';

button.setAttribute(
    "aria-label",

    available
        ? "Choose options for " + displayName(
            card.dataset.shopCategory,
            card.dataset.shopFlavor
        )
        : displayName(
            card.dataset.shopCategory,
            card.dataset.shopFlavor
        ) + " — Unavailable"
);

button.title = available
    ? "Choose options"
    : "Unavailable";
        }

        const entry = $(
            "[data-shop-entry]",
            card
        );

        if (entry) {
            entry.setAttribute(
                "aria-disabled",
                String(!available)
            );

            entry.tabIndex = available
                ? 0
                : -1;
        }
    });
}


/* =====================================================
   SHARED PRODUCT / CART DIALOG

   Appended outside the existing scaled Shop main.
===================================================== */

const dialog =
    document.createElement("dialog");

dialog.className = "shop-dialog";

dialog.setAttribute(
    "aria-labelledby",
    "shopDialogTitle"
);

document.body.append(dialog);

function openDialog(title, content) {
        dialog.classList.remove(
    "shop-product-dialog",
    "tpj-tray-dialog"
);
    if (!dialog.open) {
        returnFocus =
            document.activeElement;

        dialog.showModal();
    }

    dialog.innerHTML = `
        <div class="shop-dialog-header">
            <h2 id="shopDialogTitle">
                ${esc(title)}
            </h2>

            <button
                class="shop-close"
                type="button"
                aria-label="Close"
            >×</button>
        </div>

        <div class="shop-dialog-content">
            ${content}
        </div>
    `;

    $(".shop-close", dialog).onclick =
        () => dialog.close();

    dialog.scrollTop = 0;

    $(".shop-close", dialog).focus({
        preventScroll: true
    });
}

dialog.addEventListener(
    "close",
    () => {
        config = null;
        editing = null;

        returnFocus?.focus?.();
    }
);

function safeQuote(item) {
    try {
        return M.quote(
            item,
            availability
        );
    } catch {
        return null;
    }
}

function imageFor(category, flavor) {
    const card = $(
        `[data-shop-category="${category}"][data-shop-flavor="${flavor}"]`
    );

    const image = $(
        "img",
        card ||
            document.createElement("div")
    );

    return image?.getAttribute("src") ||
        null;
}

function displayName(category, flavor) {
    if (category === "half") {
        return C.half.name;
    }

    if (category === "cakes") {
        return M.cakeName(flavor);
    }

    if (category === "chocolate") {
        return C.chocolate.treats[
            flavor
        ]?.name;
    }

    return C.flavors[flavor];
}

function radioOptions(
    name,
    entries,
    selected
) {
    return `
        <div class="shop-choice-grid">
            ${entries.map(
                ([value, text]) => `
                    <label class="shop-choice">
                        <input
                            type="radio"
                            name="${name}"
                            value="${esc(value)}"
                            ${
                                String(selected) ===
                                String(value)
                                    ? "checked"
                                    : ""
                            }
                        >
                        ${esc(text)}
                    </label>
                `
            ).join("")}
        </div>
    `;
}

function selectOptions(
    entries,
    selected,
    disabled = () => false
) {
    return (
        '<option value="">Choose…</option>' +

        entries.map(([value, text]) => `
            <option
                value="${esc(value)}"
                ${
                    value === selected
                        ? "selected"
                        : ""
                }
                ${
                    disabled(value)
                        ? "disabled"
                        : ""
                }
            >
                ${esc(text)}${
                    disabled(value)
                        ? " — Unavailable"
                        : ""
                }
            </option>
        `).join("")
    );
}


/* =====================================================
   OPEN PRODUCT FROM ITS EXISTING IMAGE CARD
===================================================== */

function openProduct(
    category,
    flavor,
    item = null
) {
    config = item
        ? clone(item)
        : {
            category,
            flavor,
            quantity: 1,
            size: null,
            layers: null,
            mix: {},
            pieces: [],
            one: "",
            two: ""
        };

    editing = item?.id || null;

    if (
        category === "chocolate" &&
        !config.flavor
    ) {
        config.flavor = flavor;
    }

    renderProduct();

    const revision =
        availability.revision;

    refreshAvailability().then(() => {
        if (!config) {
            return;
        }

        if (
            availability.revision !==
            revision
        ) {
            renderProduct();
        } else {
            updateProductTotal();
        }
    });
}


/* =====================================================
   PRODUCT PANEL CONTENT
===================================================== */
const SHOP_COPY = {
    cupcakes: {
        cookies: [
            "Oreo-packed, creamy, chocolatey goodness.",
            "A jumbo vanilla cookies-and-cream cupcake loaded with Oreo flavor, finished with cookies-and-cream frosting, Oreo crumbs, chocolate drizzle, and cookie pieces."
        ],
        strawberry: [
            "Sweet strawberry flavor with an irresistible crunch.",
            "A jumbo strawberry-inspired cupcake layered with sweet strawberry flavor, creamy frosting, strawberry sauce, and our signature strawberry crunch coating."
        ],
        biscoff: [
            "Warm spiced cookie butter in every bite.",
            "A jumbo cookie-butter cupcake finished with creamy Biscoff frosting, cookie butter drizzle, crushed Biscoff cookies, and plenty of caramelized cookie crunch."
        ],
        chocolate: [
            "Rich chocolate stacked on even more chocolate.",
            "A jumbo chocolate cupcake loaded with rich chocolate flavor, finished with chocolate frosting, silky chocolate drizzle, brownie pieces, and chocolate crumbs."
        ],
        snickers: [
            "Chocolate, caramel, peanuts, and pure indulgence.",
            "A jumbo chocolate cupcake loaded with caramel, chocolate, and peanut flavor, topped with creamy frosting, caramel and chocolate drizzle, chopped peanuts, and Snickers pieces."
        ],
        banana: [
            "Creamy banana pudding meets jumbo cupcake.",
            "A jumbo vanilla-banana cupcake inspired by classic banana pudding, topped with creamy pudding-style frosting, vanilla wafer crumbs, banana pudding, and vanilla wafer pieces."
        ],
        redvelvet: [
            "Velvety cocoa flavor with creamy richness.",
            "A jumbo red velvet cupcake finished with creamy cream-cheese-style frosting, red velvet cake crumbs, a smooth drizzle, and loaded red velvet pieces."
        ],
        birthday: [
            "Sprinkles, vanilla, and birthday-cake nostalgia.",
            "A jumbo funfetti-style cupcake topped with creamy birthday-cake frosting, colorful sprinkles, cake crumbs, white drizzle, and chunks of birthday cake."
        ],
        cinnamon: [
            "Warm cinnamon-sugar flavor, cupcake style.",
            "A jumbo cinnamon-inspired cupcake layered with brown sugar and warm spice, finished with creamy frosting, cinnamon crumble, vanilla glaze, and cinnamon-roll pieces."
        ],
        peach: [
            "Juicy peach flavor with buttery cobbler crunch.",
            "A jumbo peach cobbler cupcake layered with sweet peach filling, creamy frosting, cinnamon-spiced cobbler crumble, peach drizzle, and peach pieces."
        ]
    },

    jars: {
        cookies: [
            "Creamy cheesecake layered with Oreo overload.",
            "A 6 oz layered dessert packed with creamy cheesecake filling, Oreo crumbs, cookies-and-cream layers, chocolate drizzle, and crushed Oreo pieces."
        ],
        strawberry: [
            "Creamy strawberry layers with signature crunch.",
            "A 6 oz layered strawberry cheesecake dessert with creamy filling, strawberry sauce, cake and crumb layers, and our signature strawberry crunch."
        ],
        biscoff: [
            "Cookie butter, cheesecake, and Biscoff crunch.",
            "A 6 oz layered dessert featuring creamy cheesecake filling, Biscoff cookie butter, crushed Biscoff cookies, cake layers, and rich cookie-butter drizzle."
        ],
        chocolate: [
            "Deep chocolate layers for serious chocolate cravings.",
            "A 6 oz chocolate-loaded dessert layered with creamy chocolate filling, chocolate cake or brownie pieces, chocolate sauce, and rich chocolate crumbs."
        ],
        snickers: [
            "Cheesecake layered with caramel, chocolate, and peanuts.",
            "A 6 oz layered Snickers dessert packed with creamy cheesecake filling, chocolate cake, caramel, chocolate sauce, peanuts, and chopped Snickers pieces."
        ],
        banana: [
            "Classic banana pudding with a loaded twist.",
            "A 6 oz layered banana pudding dessert with creamy banana filling, vanilla wafers, soft cake layers, wafer crumbs, and a rich whipped finish."
        ],
        redvelvet: [
            "Red velvet cake layered with creamy cheesecake.",
            "A 6 oz red velvet dessert layered with creamy cheesecake filling, red velvet cake pieces, smooth cream-cheese-style layers, and red velvet crumbs."
        ],
        birthday: [
            "Funfetti layers packed with birthday-cake flavor.",
            "A 6 oz birthday-cake dessert layered with creamy cheesecake filling, funfetti cake, sprinkles, cake crumbs, and sweet vanilla birthday-cake flavor."
        ],
        cinnamon: [
            "Creamy cinnamon layers with warm brown sugar flavor.",
            "A 6 oz cinnamon-roll-inspired dessert layered with creamy filling, cinnamon cake pieces, brown sugar crumble, vanilla glaze, and cinnamon-roll pieces."
        ],
        peach: [
            "Peach cobbler layered with creamy cheesecake.",
            "A 6 oz peach cobbler dessert layered with creamy cheesecake filling, sweet peaches, cake or crumble layers, cinnamon-spiced cobbler topping, and peach sauce."
        ],
        strawberrybanana: [
            "Strawberry and banana pudding in one loaded jar.",
            "A 6 oz layered dessert combining creamy banana pudding with strawberries, vanilla wafers, strawberry sauce, and soft cake and crumb layers."
        ]
    },

    apples: {
        cookies: [
            "Crunchy apple, creamy cheesecake, Oreo everything.",
            "A crisp Granny Smith apple stuffed and loaded with creamy cheesecake filling, coated in cookies-and-cream crunch, drizzled with white chocolate, and topped with cheesecake and Oreo pieces."
        ],
        strawberry: [
            "Strawberry crunch outside, cheesecake chaos inside.",
            "A crisp Granny Smith apple filled with creamy cheesecake, coated in strawberry crunch, finished with strawberry sauce and white drizzle, and crowned with cheesecake and strawberry topping."
        ],
        biscoff: [
            "Tart apple meets rich cookie-butter cheesecake.",
            "A crisp Granny Smith apple loaded with creamy cheesecake, coated in Biscoff crumbs, drizzled with cookie butter, and topped with cheesecake and Biscoff cookies."
        ],
        snickers: [
            "Caramel, chocolate, peanuts, cheesecake, and crunch.",
            "A crisp Granny Smith apple stuffed with cheesecake filling, covered in chocolate-peanut crunch, finished with caramel and chocolate drizzle, and topped with cheesecake and Snickers pieces."
        ],
        banana: [
            "Banana pudding meets cheesecake-stuffed apple.",
            "A crisp Granny Smith apple filled with creamy cheesecake, coated in vanilla wafer crumbs, topped with banana-pudding flavor, cheesecake, wafers, and a creamy vanilla drizzle."
        ],
        redvelvet: [
            "Cheesecake-stuffed apple with red velvet richness.",
            "A crisp Granny Smith apple filled with creamy cheesecake, coated in red velvet crumbs, finished with a sweet cream drizzle, and topped with cheesecake and red velvet cake pieces."
        ],
        birthday: [
            "Sprinkles, cheesecake, and celebration in every bite.",
            "A crisp Granny Smith apple stuffed with creamy cheesecake, coated in birthday-cake crumbs and sprinkles, finished with white drizzle, and topped with cheesecake and colorful cake pieces."
        ]
    },

    cakes: {
        cookies: [
            "Oreo-packed from top to crumb-coated bottom.",
            "A 6-inch Signature Cake with a cookies-and-cream cake profile, Oreo buttercream, rich chocolate drip, Oreo crumb coating, piped swirls, cookie crumbs, and Oreo pieces. Available in 2 or 3 full cake layers."
        ],
        strawberry: [
            "Strawberry sweetness wrapped in signature crunch.",
            "A 6-inch Signature Cake featuring strawberry cake flavor, strawberry buttercream and filling, glossy strawberry drip, strawberry crunch coating, piped swirls, and fresh strawberries. Available in 2 or 3 full cake layers."
        ],
        biscoff: [
            "Cookie butter from the inside out.",
            "A 6-inch Signature Cake featuring Biscoff-flavored cake, cookie-butter buttercream and filling, Biscoff spread drip, cookie crumb coating, piped swirls, and Biscoff cookies. Available in 2 or 3 full cake layers."
        ],
        chocolate: [
            "Chocolate cake pushed all the way overboard.",
            "A 6-inch chocolate Signature Cake layered with chocolate buttercream and ganache, finished with dark chocolate drip, brownie-chocolate crumb coating, chocolate swirls, brownie chunks, and chocolate pieces. Available in 2 or 3 full cake layers."
        ],
        redvelvet: [
            "Classic red velvet with a loaded finish.",
            "A 6-inch red velvet Signature Cake paired with cream-cheese-style frosting, a creamy white drip, red velvet crumb coating, piped swirls, and red velvet cake pieces. Available in 2 or 3 full cake layers."
        ],
        birthday: [
            "Funfetti celebration baked into every layer.",
            "A 6-inch funfetti Signature Cake with birthday-cake buttercream and filling, white vanilla drip, colorful sprinkle coating, piped swirls, rainbow sprinkles, and birthday cake pieces. Available in 2 or 3 full cake layers."
        ],
        banana: [
            "Banana pudding transformed into a loaded cake.",
            "A 6-inch banana-pudding Signature Cake layered with creamy banana-pudding filling and vanilla-banana buttercream, finished with a creamy vanilla drip, vanilla-wafer crumb coating, piped swirls, wafers, banana pudding, and banana garnish. Available in 2 or 3 full cake layers."
        ]
    },

    half: {
        half: [
            "Two Signature flavors. One seriously loaded cake.",
            "Can't choose just one? Pick two Signature flavors and get both in one 6-inch cake. Every cake layer is split evenly between your two selections, while each half of the exterior receives its own matching frosting, drip, crunch, and toppings."
        ]
    },

    chocolate: {
        strawberry: [
            "Fresh strawberries dressed for dessert.",
            "Fresh strawberries dipped in your choice of milk, white, or dark chocolate, then finished with your choice of Strawberry Crunch, Biscoff Cookie Butter, Cookies & Cream, or Birthday Cake topping."
        ],
        oreo: [
            "Classic Oreos dipped, drizzled, and loaded.",
            "Oreo cookies coated in your choice of milk, white, or dark chocolate and finished with your choice of Strawberry Crunch, Biscoff Cookie Butter, Cookies & Cream, or Birthday Cake topping."
        ],
        pretzel: [
            "Salty crunch covered in loaded chocolate.",
            "Crisp pretzel rods dipped in your choice of milk, white, or dark chocolate and finished with your choice of Strawberry Crunch, Biscoff Cookie Butter, Cookies & Cream, or Birthday Cake topping."
        ],
        rice: [
            "Crispy, chewy, chocolate-covered goodness.",
            "Classic crispy marshmallow treats coated in your choice of milk, white, or dark chocolate and finished with your choice of Strawberry Crunch, Biscoff Cookie Butter, Cookies & Cream, or Birthday Cake topping."
        ]
    }
};

function productDescription(category, flavor, popup = false) {
    const key = category === "half" ? "half" : flavor;

    return SHOP_COPY[category]?.[key]?.[popup ? 1 : 0] || "";
}

function shoppingBagIcon() {
    return `
        <svg
            class="shop-bag-icon"
            viewBox="0 0 32 36"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            <path
                d="M6 11h20l2 21H4L6 11Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
            />
            <path
                d="M11 13V8a5 5 0 0 1 10 0v5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />
            <path
                d="M16 19v8m-4-4h8"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
            />
        </svg>
    `;
}

function cheesecakeDrizzle(position) {
    const top = position === "top";

    const file = top
        ? "white-drip-03.png"
        : "white-drip-05.png";

    const path =
        "../images/Shop/Chocolate%20Drip/" + file;

const viewBox = top
    ? "28 155 1996 445"
    : "27 175 1726 621";

    const width = top ? 2048 : 1774;
    const height = top ? 682 : 887;

    return Array.from(
        { length: top ? 4 : 6 },

        () => `
            <svg
                class="shop-icing"
                viewBox="${viewBox}"
                aria-hidden="true"
                focusable="false"
            >
                <image
                    href="${path}"
                    x="0"
                    y="0"
                    width="${width}"
                    height="${height}"
                />
            </svg>
        `
    ).join("");
}

function popupImageFor(category, flavor) {
    const source = imageFor(category, flavor);

    if (
        !source ||
        !["cupcakes", "jars", "apples"].includes(category)
    ) {
        return source;
    }

    const url = new URL(source, document.baseURI);
    const slash = url.pathname.lastIndexOf("/");

    let filename = decodeURIComponent(
        url.pathname.slice(slash + 1)
    );

filename = filename.replace(
    /\.(webp|png|jpe?g)$/i,
    ".webp"
);

    if (!filename.startsWith("1")) {
        filename = "1" + filename;
    }

    url.pathname =
        url.pathname.slice(0, slash + 1) +
        encodeURIComponent(filename);

    url.search = "";
    url.hash = "";

    return url.href;
}

function renderDessertAbout() {
    const root = $("#shopAboutContent", dialog);

    if (!root || !config) {
        return;
    }

    const P = window.TPJShopProductInfo;

if (!P?.care || typeof P.combine !== "function") {
    root.innerHTML = `
        <p>
            Please contact The Pastry Junkie for storage
            and allergen information before ordering.
        </p>
    `;

    return;
}
    const x = config;

    const category = x.category === "half"
        ? "cakes"
        : x.category;

    let selected;

    if (x.category === "half") {
        selected = [x.one, x.two].filter(Boolean);

    } else if (
        ["cupcakes", "jars", "apples"].includes(x.category) &&
        x.mixing
    ) {
        selected = Object.keys(x.mix || {}).filter(
            id => Number(x.mix[id]) > 0
        );

    } else if (
        x.category === "chocolate" &&
        x.mixing
    ) {
        selected = (x.pieces || [])
            .map(piece => piece.type)
            .filter(Boolean);

    } else {
        selected = [x.flavor];
    }

    selected = [...new Set(selected)].filter(
        id => P.care[category]?.[id]
    );

    const name = id => {
        if (category === "cakes") {
            return M.cakeName(id);
        }

        if (category === "chocolate") {
            return C.chocolate.treats[id].name;
        }

        return C.flavors[id];
    };

    const allergenLabels = ids =>
        ids.map(id => P.labels[id] || id).join(", ");

    const combined = P.combine(category, selected);

    const storage = selected.map(id => `
        <div class="shop-care-item">
            ${
                selected.length > 1 ||
                x.category === "half"
                    ? `<h4>${esc(name(id))}</h4>`
                    : ""
            }

            <p>
                <strong>Storage:</strong>
                ${esc(P.care[category][id].storage)}
            </p>
        </div>
    `).join("");

    const build = x.category === "cakes" ? `
        <p><strong>Signature finish:</strong></p>

        <ul>
            ${
                (C.builds[x.flavor] || []).map(
                    text => `<li>${esc(text)}</li>`
                ).join("")
            }
        </ul>

        <p>
            For custom designs, use the
            <a href="cake-builder.html">Cake Builder</a>.
        </p>
    ` : "";

    const refrigeration =
        x.category === "chocolate" &&
        selected.includes("strawberry") &&
        selected.length > 1

            ? `
                <p>
                    <strong>Mixed-box storage:</strong>
                    Keep a box containing fresh strawberries
                    refrigerated. The cool, dry storage
                    instructions for other treat types apply
                    when those treats are stored separately.
                </p>
            `
            : "";

    root.innerHTML = `
        ${
            selected.length
                ? storage
                : `
                    <p>
                        Choose your flavors or treat types
                        to see their storage and allergen
                        information.
                    </p>
                `
        }

        ${
            x.category === "half" && selected.length < 2
                ? `
                    <p>
                        Choose both flavors to see the complete
                        combined allergen information.
                    </p>
                `
                : ""
        }

        ${refrigeration}
        ${build}

        ${
            combined.contains.length
                ? `
                    <p>
                        <strong>
                            ${
                                x.category === "chocolate"
                                    ? "Base Allergens"
                                    : "Allergens"
                            }:
                        </strong>

                        Contains
                        ${esc(
                            allergenLabels(combined.contains)
                        )}.
                    </p>
                `
                : ""
        }

        ${
            combined.mayContain.length
                ? `
                    <p>
                        May contain
                        ${esc(
                            allergenLabels(combined.mayContain)
                        )}.
                    </p>
                `
                : ""
        }

        ${
            combined.notes.map(
                note => `<p>${esc(note)}</p>`
            ).join("")
        }

        ${
            x.category === "chocolate" && selected.length
                ? `
                    <p>
                        <strong>Topping Additions:</strong>
                        ${esc(P.toppingNotice)}
                    </p>
                `
                : ""
        }

        <p class="shop-allergy-notice">
            <strong>Allergy Notice:</strong>
            ${esc(P.notice)}
        </p>
    `;
}

function ensureSignatureCards() {
    const grid = $(
        "#signatureCakes .signature-cake-grid"
    );

    if (!grid) {
        return;
    }

    const definitions = [
        {
            category: "cakes",
            flavor: "banana",
            name: "Banana Pudding"
        },
        {
            category: "half",
            flavor: "half",
            name: C.half.name
        }
    ];

    definitions.forEach(item => {
        let card = $$("article", grid).find(article =>
            article.dataset.shopFlavor === item.flavor ||
            $("h3", article)?.textContent.trim() === item.name
        );

        if (!card) {
            card = document.createElement("article");
        }

        card.classList.add("signature-cake-product");

        card.dataset.shopCategory = item.category;
        card.dataset.shopFlavor = item.flavor;

        card.innerHTML = `
            <div
                class="signature-cake-image-wrap"
                data-shop-art
            >
                <img
                    src="${esc(
                        C.newCakeAssets[item.flavor]
                    )}"
                    alt="${esc(item.name)} Signature Cake"
                    class="signature-cake-image"
                >
            </div>

            <h3>${esc(item.name)}</h3>
        `;

        grid.append(card);
    });
}

function customerDetails(item) {
    return item.details.filter(
        detail =>
            !detail.includes("% box discount:")
    );
}
function renderDesktopTray() {
    const compactTray = !matchMedia(
        '(min-width: 1200px) and (hover: hover) and (pointer: fine)'
    ).matches;

    const x = config;
    const category = x.category;

    const pack = [
        'cupcakes', 'jars', 'apples'
    ].includes(category);

    const treats = category === 'chocolate';
    const cake = category === 'cakes' || category === 'half';

    if (!pack && !treats && !cake) return false;

    const body = $('.shop-dialog-content', dialog);
    const about = $('.shop-about', body);
    const add = $('#shopAdd', body);
    const error = $('#shopConfigError', body);
    const drip = $('.shop-drizzle-top', body);

    const host = document.createElement('div');
    host.className = 'tpj-tray-builder';

    dialog.classList.add('tpj-tray-dialog');
    dialog.dataset.trayKind = cake
    ? 'cake'
    : treats
        ? 'treats'
        : 'pack';
    body.replaceChildren(host);

    const copy = value => JSON.parse(JSON.stringify(value));

    const blank = () => ({
        type: '',
        base: '',
        topping: ''
    });

    const complete = piece => Boolean(
        piece &&
        C.chocolate.treats[piece.type] &&
        C.chocolate.bases[piece.base] &&
        C.chocolate.toppings[piece.topping]
    );

    const enabled = key => M.enabled(availability, key);

    const allowed = id => treats
        ? enabled('category:chocolate') &&
          enabled('treat:' + id)
        : M.available(category, id, availability);

    const label = id => treats
        ? C.chocolate.treats[id]?.name || ''
        : C.flavors[id] || '';

    const ids = treats
        ? Object.keys(C.chocolate.treats)
        : C.categories[
            category === 'half' ? 'cakes' : category
        ].flavors;

    const prices = treats
        ? C.chocolate.discounts
        : category === 'half'
            ? C.half.prices
            : C.categories[category].prices;

    const name = pack
        ? 'Build your ' + ({
            cupcakes: 'cupcake',
            jars: 'jar',
            apples: 'apple'
        }[category]) + ' box'
        : treats
            ? 'Build your treat box'
           : category === 'half'
    ? 'Half & Half Cake'
    : 'Signature Cake';

    $('#shopDialogTitle', dialog).textContent = name;

    let selected = null;
    let draft = null;
    let message = '';
    let slots = [];

    if (pack) {
        const counts = {};
        const saved = x.traySlots;

        if (Array.isArray(saved)) {
            saved.filter(Boolean).forEach(id => {
                counts[id] = (counts[id] || 0) + 1;
            });
        }

        const same = (
            Array.isArray(saved) &&
            saved.length === Number(x.size) &&
            saved.every(id => id === null || ids.includes(id)) &&
            ids.every(id =>
                (counts[id] || 0) === Number(x.mix?.[id] || 0)
            )
        );

        slots = same
            ? saved.slice()
            : ids.flatMap(id =>
                Array(Number(x.mix?.[id] || 0)).fill(id)
            );

        while (slots.length < Number(x.size || 0)) {
            slots.push(null);
        }

        x.mixing = true;
    }

    if (treats) {
        x.pieces = x.pieces || [];
        x.mixing = true;
    }

    function sync() {
        if (!pack) return;

        x.mix = {};

        slots.filter(Boolean).forEach(id => {
            x.mix[id] = (x.mix[id] || 0) + 1;
        });

        x.traySlots = slots.slice();
    }

function art(cat, id, piece = null) {
    if (cat === 'chocolate') {
        const kinds = {
            pretzel: 'Pretzel',
            oreo: 'Oreo',
            strawberry: 'Strawberries',
            rice: 'Rice-Krispy'
        };

        const featured = {
            birthday: 'Birthday',
            biscoff: 'Biscoff',
            cookies: 'Oreo',
            strawberry: 'Strawberry'
        };

        const bases = {
            white: 'White',
            milk: 'Milk',
            dark: 'Dark'
        };

        const kind = kinds[id];

        if (!kind) {
            return `
                <span class="tpj-art-fallback">
                    Choose a treat
                </span>
            `;
        }

        const base = bases[piece?.base]
            ? piece.base
            : 'white';

        const finishedFlavor = base === 'white'
            ? featured[piece?.topping]
            : null;

        const variant = finishedFlavor || bases[base];

        const src = encodeURI(
            '../images/Shop/Chocolate Treats/' +
            `Chocolate-${variant}-${kind}.png`
        );

        let note = '';

        if (piece && !piece.base) {
            note = 'White chocolate preview';
        } else if (piece?.topping && !finishedFlavor) {
            note = 'Base preview';
        }

        return `
            <img
                src="${esc(src)}"
                alt=""
                loading="lazy"
            >

            ${note ? `
                <small class="tpj-preview-note">
                    ${esc(note)}
                </small>
            ` : ''}
        `;
    }

    const src = popupImageFor(cat, id) || imageFor(cat, id);

    if (src) {
        return `
            <img
                src="${esc(src)}"
                alt=""
                loading="lazy"
            >
        `;
    }

    const fallback = cat === 'half'
        ? 'Half & Half'
        : cat === 'cakes'
            ? M.cakeName(id)
            : label(id);

    return `
        <span class="tpj-art-fallback">
            ${esc(fallback)}
        </span>
    `;
}

    function choice(action, value, text, active, disabled = false) {
        return `
            <button
                type="button"
                data-action="${action}"
                data-value="${esc(value)}"
                aria-pressed="${Boolean(active)}"
                ${disabled ? 'disabled' : ''}
            >${esc(text)}</button>
        `;
    }

    function select(field, title, entries, value, unavailable) {
        return `
            <label class="tpj-tray-field">
                ${esc(title)}

                <select data-field="${field}">
                    <option value="">Choose…</option>

                    ${entries.map(([id, text]) => `
                        <option
                            value="${esc(id)}"
                            ${id === value ? 'selected' : ''}
                            ${unavailable(id) ? 'disabled' : ''}
                        >
                            ${esc(text)}
                            ${unavailable(id) ? ' — Unavailable' : ''}
                        </option>
                    `).join('')}
                </select>
            </label>
        `;
    }

    function editor() {
if (selected === null) {
    return '';
}

        return `
            <section class="tpj-piece-editor">
                <h3>Treat #${selected + 1}</h3>
                <div class="tpj-piece-preview">
    ${draft.type
        ? art('chocolate', draft.type, draft)
        : ''
    }
</div>

                <p>
                    Choose all three options,
                    then save this spot.
                </p>

                ${select(
                    'type',
                    'Treat type',
                    Object.entries(C.chocolate.treats).map(
                        ([id, item]) => [id, item.name]
                    ),
                    draft.type,
                    id => !allowed(id)
                )}

                ${select(
                    'base',
                    'Chocolate',
                    Object.entries(C.chocolate.bases),
                    draft.base,
                    id => !enabled('base:' + id)
                )}

                ${select(
                    'topping',
                    'Topping',
                    Object.entries(C.chocolate.toppings),
                    draft.topping,
                    id =>
                        !enabled('topping:' + id) ||
                        !enabled('flavor:' + id)
                )}

                <button
                    class="tpj-tray-save"
                    type="button"
                    data-action="save"
                >Save this spot</button>

                <button
                    type="button"
                    data-action="cancel"
                >Cancel editing</button>
            </section>
        `;
    }
function sizeButtons() {
    return `
        <div
            class="tpj-tray-sizes"
            role="group"
            aria-label="${cake ? 'Cake layers' : 'Pack size'}"
        >
            ${Object.keys(prices).map(number =>
                choice(
                    'size',
                    number,
                    number + (cake ? ' layers' : ''),
                    Number(cake ? x.layers : x.size) ===
                        Number(number)
                )
            ).join('')}
        </div>
    `;
}
    function draw(focus = '') {
        sync();

        const items = treats ? x.pieces : slots;

        const count = pack
            ? slots.filter(Boolean).length
            : treats
                ? x.pieces.filter(complete).length
                : 0;

        let main = '';

        if (cake) {
            const options = C.categories.cakes.flavors.map(
                id => [id, M.cakeName(id)]
            );

            main = `
                <div class="tpj-cake-choices">
                    <figure>
                        ${art(category, x.flavor)}

<figcaption>Example appearance.</figcaption>
                    </figure>

<div>
    ${sizeButtons()}

    ${category === 'half'
                            ? select(
                                'one',
                                'Flavor one',
                                options,
                                x.one,
                                id => !M.available(
                                    'cakes', id, availability
                                )
                            ) + select(
                                'two',
                                'Flavor two',
                                options,
                                x.two,
                                id =>
                                    id === x.one ||
                                    !M.available(
                                        'cakes', id, availability
                                    )
                            )
                            : select(
                                'flavor',
                                'Cake flavor',
                                options,
                                x.flavor,
                                id => !M.available(
                                    'cakes', id, availability
                                )
                            )
                        }

                        <p class="tpj-tray-hint">
                            6-inch round.
                            ${category === 'half'
                                ? 'Every layer is split evenly between two different flavors.'
                                : 'Flavor-matched Signature design.'
                            }
                        </p>
                    </div>
                </div>
            `;
        } else {
            const columns = treats
                ? x.size === 6 ? 3 : 4
                : x.size;

            const tray = !x.size
                ? `
                    <p class="tpj-tray-hint">
                        Choose a pack size to open your tray.
                    </p>
                `
                : `
                    <div
                        class="tpj-tray-slots ${
                            treats ? 'tpj-treat-slots' : ''
                        }"
                        style="--tray-columns:${columns}"
                    >
                        ${items.map((item, index) => {
                            const filled = treats
                                ? complete(item)
                                : Boolean(item);

                            const title = filled
                                ? treats
                                    ? [
                                        label(item.type),
                                        C.chocolate.bases[item.base],
                                        C.chocolate.toppings[item.topping]
                                    ].join(' · ')
                                    : label(item)
                                : 'Choose a flavor';

                            return `
                                <div
                                    class="tpj-tray-slot ${
                                        selected === index
                                            ? 'is-active'
                                            : ''
                                    }"
                                    data-slot="${index}"
                                >
                                    <button
                                        class="tpj-slot-open"
                                        type="button"
                                        data-action="slot"
                                        data-value="${index}"
                                        aria-label="Spot ${index + 1}: ${
                                            esc(
                                                filled
                                                    ? title
                                                    : treats
                                                        ? 'Choose a treat'
                                                        : title
                                            )
                                        }"
                                    >
                                        <span class="tpj-slot-number">
                                            ${index + 1}
                                        </span>

                                        ${filled
? art(
    category,
    treats ? item.type : item,
    treats ? item : null
)
                                            : `
                                                <span class="tpj-slot-plus">
                                                    +
                                                </span>
                                            `
                                        }

                                        <span>
                                            ${esc(
                                                filled
                                                    ? title
                                                    : treats
                                                        ? 'Choose a treat'
                                                        : title
                                            )}
                                        </span>
                                    </button>

                                    ${filled ? `
                                        <button
                                            class="tpj-slot-remove"
                                            type="button"
                                            data-action="remove"
                                            data-value="${index}"
                                            aria-label="Remove ${
                                                esc(title)
                                            } from spot ${index + 1}"
                                        >×</button>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;

            const palette = `
                <section class="tpj-tray-palette">
                    <h3>
                        ${treats
                            ? 'Choose a treat type'
                           : compactTray ? 'Tap a flavor' : 'Click or drag a flavor'
                        }
                    </h3>

                    <p>
                        Repeats are welcome.
                        ${treats
                            ? 'Images represent treat types; labels show your exact choices.'
                            : compactTray
    ? 'Tap a filled spot to choose its replacement.'
    : 'Click a filled spot to choose its replacement.'
                        }
                    </p>

<div
    class="tpj-tray-picks ${
        category === 'jars'
            ? 'tpj-jar-picks'
            : category === 'apples'
                ? 'tpj-apple-picks'
                : ''
    }"
    style="--pick-columns:${treats ? 4 : 5}"
>
                        ${ids.map(id => `
                            <button
                                type="button"
                                class="tpj-tray-pick"
                                draggable="${
                                Boolean(!compactTray && x.size && allowed(id))    
                                }"
                                data-action="pick"
                                data-value="${id}"
                                ${!x.size || !allowed(id)
                                    ? 'disabled'
                                    : ''
                                }
                            >
                                ${art(category, id)}

                                <span>
                                    ${esc(label(id))}
                                    ${allowed(id)
                                        ? ''
                                        : ' — Unavailable'
                                    }
                                </span>
                            </button>
                        `).join('')}
                    </div>
                </section>
            `;

            main = `
                <p
                    class="tpj-tray-count"
                    id="${
                        treats
                            ? 'shopChocolateCount'
                            : 'shopPackCount'
                    }"
                    aria-live="polite"
                >
                    ${count} of ${x.size || '—'} selected
                </p>

                <div class="${
                    treats
                        ? 'tpj-treat-layout'
                        : 'tpj-pack-layout'
                }">
                    <div>${tray}${palette}</div>
                    ${treats ? editor() : ''}
                </div>
            `;
        }

        host.innerHTML = `
<header class="tpj-tray-heading">
    <div>
        <p>THE PASTRY JUNKIE</p>
        <h2>${esc(name)}</h2>
    </div>

    ${cake ? '' : sizeButtons()}
</header>

            <p
                class="tpj-tray-message"
                role="status"
                aria-live="polite"
            >${esc(message)}</p>

            ${main}

            <div class="tpj-tray-about"></div>

            <footer class="tpj-tray-footer">
                <div class="tpj-tray-errors"></div>
                <div class="tpj-tray-add"></div>
            </footer>
        `;

        if (drip) host.prepend(drip);
        if (about) $('.tpj-tray-about', host).append(about);

        $('.tpj-tray-errors', host).append(error);
        $('.tpj-tray-add', host).append(add);

        add.className = 'shop-button tpj-tray-add-button';

        add.innerHTML = `
            ${editing ? 'Save Changes' : 'Add to Cart'} ·
            <span id="shopLivePrice"></span>
        `;

        updateProductTotal();

        if (treats && selected !== null) {
            add.disabled = true;
            error.textContent =
                'Save or cancel the open treat before adding your box.';
        }

        if (focus) {
            const target = [
                ...host.querySelectorAll(
                    '[data-action], [data-field]'
                )
            ].find(element =>
                `${
                    element.dataset.action || 'field'
                }:${
                    element.dataset.value ||
                    element.dataset.field ||
                    ''
                }` === focus
            );

            (
                target ||
                host.querySelector(
                    '[data-action="slot"], [data-action="size"]'
                )
            )?.focus({ preventScroll: true });
        }
    }

    function editSpot(index, type) {
        if (
            selected !== null &&
            selected !== index &&
            JSON.stringify(draft) !==
                JSON.stringify(x.pieces[selected])
        ) {
            message =
                'Save or cancel your current treat before opening another spot.';

            draw('save:');
            return;
        }

        selected = index;
        draft = copy(x.pieces[index] || blank());

        if (type) draft.type = type;

        draw(treats ? 'field:type' : '');
                if (compactTray && treats) {
            $('.tpj-piece-editor', host)?.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }

    function pick(id, target = null) {
        if (
            !x.size ||
            !ids.includes(id) ||
            !allowed(id)
        ) return;

        const items = treats ? x.pieces : slots;

        const index = target ??
            selected ??
            items.findIndex(item =>
                treats ? !complete(item) : !item
            );

        if (index < 0 || index >= Number(x.size)) {
            message =
                'Your box is full. Remove an item or select a spot to edit.';

            draw('pick:' + id);
            return;
        }

        if (treats) return editSpot(index, id);

        slots[index] = id;
        selected = null;

        message =
            label(id) + ' added to spot ' + (index + 1) + '.';

        draw('pick:' + id);
    }

    host.onclick = event => {
        const button = event.target.closest('[data-action]');

        if (!button || button.disabled) return;

        const action = button.dataset.action;
        const value = button.dataset.value;

        message = '';

        if (action === 'size') {
            const number = Number(value);

            if (cake) {
                x.layers = number;
            } else if (number !== Number(x.size)) {
                if (
                    treats &&
                    selected !== null &&
                    JSON.stringify(draft) !==
                        JSON.stringify(x.pieces[selected])
                ) {
                    message =
                        'Save or cancel the open treat before changing pack size.';

                    draw('save:');
                    return;
                }

                const kept = (
                    treats ? x.pieces : slots
                ).filter(item =>
                    treats
                        ? Boolean(
                            item.type ||
                            item.base ||
                            item.topping
                        )
                        : Boolean(item)
                );

                if (kept.length > number) {
                    message =
                        'Remove ' +
                        (kept.length - number) +
                        ' item(s) before choosing this smaller pack.';

                    draw('size:' + value);
                    return;
                }

                x.size = number;

                if (treats) {
                    x.pieces = Array.from(
                        { length: number },
                        (_, index) => kept[index] || blank()
                    );
                } else {
                    slots = Array.from(
                        { length: number },
                        (_, index) => kept[index] || null
                    );
                }

                selected = null;
                draft = null;
            }
        } else if (action === 'pick') {
            return pick(value);
        } else if (action === 'slot') {
            if (treats) return editSpot(Number(value));

            selected = Number(value);

            message =
                'Choose a flavor for spot ' +
                (selected + 1) +
                '.';
        } else if (action === 'remove') {
            if (treats) {
                x.pieces[Number(value)] = blank();
            } else {
                slots[Number(value)] = null;
            }

            selected = null;
            draft = null;

            message =
                'Spot ' + (Number(value) + 1) + ' cleared.';
        } else if (action === 'cancel') {
            selected = null;
            draft = null;
        } else if (action === 'save') {
            if (
                !complete(draft) ||
                !allowed(draft.type) ||
                !enabled('base:' + draft.base) ||
                !enabled('topping:' + draft.topping) ||
                !enabled('flavor:' + draft.topping)
            ) {
                message =
                    'Choose an available treat type, chocolate, and topping.';

                draw('field:type');
                return;
            }

            x.pieces[selected] = copy(draft);

            message =
                'Treat #' + (selected + 1) + ' saved.';

            selected = null;
            draft = null;
        }

        draw(action + ':' + (value || ''));

        if (action === 'slot' && pack) {
            $('.tpj-tray-pick:not(:disabled)', host)
                ?.focus({ preventScroll: true });
        }
    };

    host.onchange = event => {
        const field = event.target.dataset.field;

        if (!field) return;

if (treats) {
    draft[field] = event.target.value;

    const preview = $('.tpj-piece-preview', host);

    if (preview) {
        preview.innerHTML = draft.type
            ? art('chocolate', draft.type, draft)
            : '';
    }

    return;
}

        x[field] = event.target.value;

        if (field === 'one' && x.one === x.two) {
            x.two = '';
        }

        draw('field:' + field);
    };

    host.ondragstart = event => {
        const item = event.target.closest('.tpj-tray-pick');

        if (!item || item.disabled) {
            event.preventDefault();
            return;
        }

        event.dataTransfer.setData(
            'application/x-tpj-dessert',
            category + ':' + item.dataset.value
        );

        event.dataTransfer.effectAllowed = 'copy';
    };

    host.ondragover = event => {
        const slot = event.target.closest('[data-slot]');

        if (
            slot &&
            [...event.dataTransfer.types].includes(
                'application/x-tpj-dessert'
            )
        ) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        }
    };

    host.ondrop = event => {
        const slot = event.target.closest('[data-slot]');

        if (!slot) return;

        event.preventDefault();

        const [cat, id] = event.dataTransfer.getData(
            'application/x-tpj-dessert'
        ).split(':');

        if (cat !== category || !ids.includes(id)) return;

        const index = Number(slot.dataset.slot);

        const filled = treats
            ? complete(x.pieces[index])
            : Boolean(slots[index]);

        if (filled) {
            message =
                'That spot is filled. Click it to edit, or remove its item first.';

            draw('slot:' + index);
            return;
        }

        pick(id, index);
    };

    host.addEventListener('error', event => {
        if (event.target.tagName === 'IMG') {
            event.target.hidden = true;
        }
    }, true);

    draw();
    return true;
}

matchMedia(
    '(min-width: 1200px) and (hover: hover) and (pointer: fine)'
).addEventListener('change', () => {
    if (
        config &&
        dialog.open &&
        dialog.classList.contains('shop-product-dialog')
    ) {
        renderProduct();
    }
});
function renderProduct() {
    const x = config;
    const category = x.category;
    const flavor = x.flavor;

    const source = popupImageFor(category, flavor);
    const name = displayName(category, flavor);

    const splitDetails = category === "half" ? `
        <div class="shop-split-explanation">
            <p>
                This is a true split cake. Every layer is
                half Flavor One and half Flavor Two, so your
                two flavors run through the entire cake
                from top to bottom.
            </p>
        </div>
    ` : "";

    openDialog(name, `
        <div class="shop-drizzle-top">
            ${cheesecakeDrizzle("top")}
        </div>

        <div class="shop-product-layout">
            <div class="shop-product-visual ${
                source ? "" : "shop-no-image"
            }">
                ${
                    source
                        ? `
                            <img
                                src="${esc(source)}"
                                alt="${esc(name)}"
                            >
                        `
                        : ""
                }
            </div>

            <div class="shop-product-panel">
                <div class="shop-product-intro">
                    <h3 class="shop-product-name">
                        ${esc(name)}
                    </h3>

                    <p>
                        ${esc(
                            productDescription(
                                category,
                                flavor,
                                true
                            )
                        )}
                    </p>
                </div>

                ${splitDetails}

                <div id="shopProductOptions"></div>

                <div class="shop-product-information">
                    <details class="shop-about">
                        <summary>About this dessert</summary>

                        <div id="shopAboutContent"></div>
                    </details>
                </div>
            </div>
        </div>

        <div class="shop-dialog-footer shop-product-footer">
            <div
                class="shop-error"
                id="shopConfigError"
                role="status"
                aria-live="polite"
            ></div>

            <button
                type="button"
                class="shop-button shop-add-dessert"
                id="shopAdd"
            >
                <span class="shop-button-drizzle">
                    ${cheesecakeDrizzle("button")}
                </span>

                <span class="shop-add-content">
                    <span>
                        ${editing ? "Save Changes" : "Add to Cart"}
                        <span aria-hidden="true"> · </span>
                        <strong id="shopLivePrice"></strong>
                    </span>

                    <span aria-hidden="true">›</span>
                </span>
            </button>
        </div>
    `);

    dialog.classList.add("shop-product-dialog");

    const options = $("#shopProductOptions", dialog);



    if (["cupcakes", "jars", "apples"].includes(category)) {
        options.innerHTML = `
            <label class="shop-field">
                Choose Quantity

                <select id="shopPackSize">
                    <option value="">Choose a quantity…</option>

                    ${
                        Object.entries(
                            C.categories[category].prices
                        ).map(([number, price]) => `
                            <option
                                value="${number}"
                                ${
                                    Number(x.size) === Number(number)
                                        ? "selected"
                                        : ""
                                }
                            >
                                ${number}
                                ${C.categories[category].singular}${
                                    Number(number) === 1 ? "" : "s"
                                }
                                — ${M.money(price)}
                            </option>
                        `).join("")
                    }
                </select>
            </label>

            <div id="shopPackMix"></div>
        `;

        $("#shopPackSize", options).onchange = event => {
            x.size = Number(event.target.value) || null;

            x.mix = x.size
                ? { [flavor]: x.size }
                : {};

            x.mixing = false;

            renderPackMix();
            updateProductTotal();
        };

        x.mixing = x.mixing ??
            Object.keys(x.mix || {}).some(
                key => key !== flavor
            );

        renderPackMix();

    } else if (
        category === "cakes" ||
        category === "half"
    ) {
        options.innerHTML = `
            <fieldset>
                <legend>Choose Your Layers</legend>

                ${
                    radioOptions(
                        "shopLayers",

                        Object.entries(
                            category === "half"
                                ? C.half.prices
                                : C.categories.cakes.prices
                        ).map(([number, price]) => [
                            number,
                            number + " Layers — " + M.money(price)
                        ]),

                        x.layers
                    )
                }
            </fieldset>
        `;

        $$("[name=shopLayers]", options).forEach(radio => {
            radio.onchange = () => {
                x.layers = Number(radio.value);
                updateProductTotal();
            };
        });

        if (category === "half") {
            options.insertAdjacentHTML("beforeend", `
                <label class="shop-field">
                    Flavor One
                    <select id="shopHalfOne"></select>
                </label>

                <label class="shop-field">
                    Flavor Two
                    <select id="shopHalfTwo"></select>
                </label>

                <p
                    id="shopHalfSummary"
                    aria-live="polite"
                ></p>
            `);

            renderHalfOptions();
        }

    } else if (category === "chocolate") {
        options.innerHTML = `
            <label class="shop-field">
                Chocolate Base

                <select id="shopStartBase">
                    ${
                        selectOptions(
                            Object.entries(C.chocolate.bases),

                            x.startBase || "",

                            id => !M.enabled(
                                availability,
                                "base:" + id
                            )
                        )
                    }
                </select>
            </label>

            <label class="shop-field">
                Topping

                <select id="shopStartTopping">
                    ${
                        selectOptions(
                            Object.entries(C.chocolate.toppings),

                            x.startTopping || "",

                            id =>
                                !M.enabled(
                                    availability,
                                    "topping:" + id
                                ) ||
                                !M.enabled(
                                    availability,
                                    "flavor:" + id
                                )
                        )
                    }
                </select>
            </label>

            <label class="shop-field">
                Choose Box Size

                <select id="shopBoxSize">
                    ${
                        selectOptions(
                            Object.keys(
                                C.chocolate.discounts
                            ).map(number => [
                                number,
                                number + " pieces"
                            ]),

                            x.size ? String(x.size) : ""
                        )
                    }
                </select>
            </label>

            <p
                class="shop-live"
                id="shopChocolateCount"
                aria-live="polite"
            ></p>

            <div id="shopChocolatePieces"></div>
        `;

        $("#shopStartBase", options).onchange = event => {
            x.startBase = event.target.value;

            if (!x.mixing) {
                x.pieces = x.pieces.map(piece => ({
                    ...piece,
                    base: x.startBase
                }));
            }

            renderChocolatePieces();
            updateProductTotal();
        };

        $("#shopStartTopping", options).onchange = event => {
            x.startTopping = event.target.value;

            if (!x.mixing) {
                x.pieces = x.pieces.map(piece => ({
                    ...piece,
                    topping: x.startTopping
                }));
            }

            renderChocolatePieces();
            updateProductTotal();
        };

        $("#shopBoxSize", options).onchange = event => {
            x.size = Number(event.target.value) || null;

            x.pieces = Array.from(
                { length: x.size || 0 },

                () => ({
                    type: flavor,
                    base: x.startBase || "",
                    topping: x.startTopping || ""
                })
            );

            x.mixing = false;

            renderChocolatePieces();
            updateProductTotal();
        };

        renderChocolatePieces();
    }

    $("#shopAdd", dialog).onclick = () => {
        try {
            const quoted = M.quote(x, availability);
            const wasEditing = Boolean(editing);

            const value = {
                ...clone(x),
                id: editing || uid()
            };

            if (editing) {
                cart = cart.map(item =>
                    item.id === editing ? value : item
                );
            } else {
                cart.push(value);
            }

            persist();

            openDialog(
                wasEditing ? "Cart Updated" : "Added to Cart",

                `
                    <p role="status">
                        ${esc(quoted.title)}
                        ${wasEditing ? "updated" : "added"}.
                    </p>

                    <p>${M.money(quoted.totalCents)}</p>

                    <div class="shop-cart-actions">
                        <button
                            type="button"
                            class="shop-button"
                            id="shopViewCart"
                        >View Cart</button>

                        <button
                            type="button"
                            class="shop-button secondary"
                            id="shopKeepShopping"
                        >Keep Shopping</button>
                    </div>
                `
            );

            config = null;
            editing = null;

            $("#shopViewCart", dialog).onclick = openCart;

            $("#shopKeepShopping", dialog).onclick =
                () => dialog.close();

        } catch (error) {
            $("#shopConfigError", dialog).textContent =
                error.message;
        }
    };

    if (renderDesktopTray()) return;

updateProductTotal();
}


/* =====================================================
   OPTIONAL PACK MIXING
===================================================== */

function renderPackMix() {
    const x = config;
    const root = $("#shopPackMix", dialog);
["#shopStartBase", "#shopStartTopping"].forEach(selector => {
    const control = $(selector, dialog);

    if (control) {
        control.disabled = Boolean(x.mixing);
    }
});
    if (!x.size) {
        root.innerHTML = "";
        return;
    }

    function remainingFor(flavor) {
        const otherCount = Object.entries(x.mix).reduce(
            (sum, [key, count]) =>
                sum + (
                    key === flavor
                        ? 0
                        : Math.max(0, Number(count) || 0)
                ),
            0
        );

        return Math.max(0, x.size - otherCount);
    }

    const source = popupImageFor(x.category, x.flavor);

    const thumbnail = source
        ? `<img src="${esc(source)}" alt="">`
        : "";

    root.innerHTML = `
        ${
            x.size > 1
                ? `
                    <fieldset class="shop-mix-picker">
                        <legend>Want to mix flavors?</legend>

                        <div class="shop-mix-choices">
                            <button
                                type="button"
                                class="shop-mix-choice"
                                id="shopKeepFlavor"
                                aria-pressed="${!x.mixing}"
                            >
                                ${thumbnail}

                                <span>
                                    Keep all
                                    <strong>
                                        ${esc(C.flavors[x.flavor])}
                                    </strong>
                                </span>
                            </button>

                            <button
                                type="button"
                                class="shop-mix-choice"
                                id="shopMixFlavors"
                                aria-pressed="${!!x.mixing}"
                            >
                                <span
                                    class="shop-mix-thumbnails"
                                    aria-hidden="true"
                                >
                                    ${thumbnail}
                                    ${thumbnail}
                                </span>

                                <span>Mix Flavors</span>
                            </button>
                        </div>
                    </fieldset>
                `
                : ""
        }

        <div
            id="shopFlavorCounts"
            ${x.mixing ? "" : "hidden"}
        >
<p>
    Start with any flavors you like.
    Once your pack is full, decrease a count
    before adding another.
</p>

            ${
                C.categories[x.category].flavors.map(flavor => `
                    <label class="shop-flavor-row">
                        <span>
                            ${esc(C.flavors[flavor])}${
                                M.available(
                                    x.category,
                                    flavor,
                                    availability
                                )
                                    ? ""
                                    : " — Unavailable"
                            }
                        </span>

                        <input
                            aria-label="${esc(
                                C.flavors[flavor]
                            )} count"
                            data-flavor="${flavor}"
                            type="number"
                            inputmode="numeric"
                            min="0"
                            max="${remainingFor(flavor)}"
                            step="1"
                            value="${x.mix[flavor] || 0}"
                            ${
                                M.available(
                                    x.category,
                                    flavor,
                                    availability
                                )
                                    ? ""
                                    : "disabled"
                            }
                        >
                    </label>
                `).join("")
            }
        </div>

        <p
            id="shopPackCount"
            class="shop-live"
            aria-live="polite"
        ></p>
    `;

    const keep = $("#shopKeepFlavor", root);
    const mix = $("#shopMixFlavors", root);

    if (keep) {
        keep.onclick = () => {
            x.mixing = false;
            x.mix = { [x.flavor]: x.size };

            renderPackMix();
            updateProductTotal();

            $("#shopKeepFlavor", root)?.focus({
                preventScroll: true
            });
        };
    }

if (mix) {
    mix.onclick = () => {
        if (!x.mixing) {
            x.mix = {};
        }

        x.mixing = true;

        renderPackMix();
        updateProductTotal();

        $("#shopMixFlavors", root)?.focus({
            preventScroll: true
        });
    };
}

    const inputs = $$("[data-flavor]", root);

    inputs.forEach(input => {
        input.oninput = () => {
            const entered = Number(input.value);

            const whole = Number.isFinite(entered)
                ? Math.floor(entered)
                : 0;

            x.mix[input.dataset.flavor] = Math.min(
                remainingFor(input.dataset.flavor),
                Math.max(0, whole)
            );

            input.value = String(
                x.mix[input.dataset.flavor]
            );

            inputs.forEach(other => {
                other.max = String(
                    remainingFor(other.dataset.flavor)
                );
            });

            updateProductTotal();
        };
    });
}


/* =====================================================
   HALF & HALF FLAVORS
===================================================== */

function renderHalfOptions() {
    const x = config;

    const entries =
        C.categories.cakes.flavors.map(
            flavor => [
                flavor,
                M.cakeName(flavor)
            ]
        );

    const one = $(
        "#shopHalfOne",
        dialog
    );

    const two = $(
        "#shopHalfTwo",
        dialog
    );

    one.innerHTML =
        selectOptions(
            entries,
            x.one,

            flavor =>
                !M.available(
                    "cakes",
                    flavor,
                    availability
                )
        );

    two.innerHTML =
        selectOptions(
            entries,
            x.two,

            flavor =>
                flavor === x.one ||
                !M.available(
                    "cakes",
                    flavor,
                    availability
                )
        );

    one.onchange = () => {
        x.one = one.value;

        if (x.one === x.two) {
            x.two = "";
        }

        renderHalfOptions();
        updateProductTotal();
    };

    two.onchange = () => {
        x.two = two.value;

        updateProductTotal();
    };
}


/* =====================================================
   CHOCOLATE BOX CONFIGURATION
===================================================== */

function renderChocolatePieces() {
    const x = config;

    const root = $(
        "#shopChocolatePieces",
        dialog
    );

    if (!x.size) {
        root.innerHTML = "";
        return;
    }

    root.innerHTML = `
        <label class="shop-mix-toggle">
            <input
                type="checkbox"
                id="shopChocolateMix"
                ${
                    x.mixing
                        ? "checked"
                        : ""
                }
            >
            Mix Your Box
        </label>

        ${
            x.mixing
                ? `
                    <p>
                        Configure each treat, or duplicate
                        a combination into the next position.
                        Changing a piece keeps all your
                        other choices.
                    </p>

                    ${x.pieces.map(
                        (piece, index) => `
                            <fieldset
                                class="shop-piece"
                                data-piece="${index}"
                            >
                                <legend>
                                    Treat #${index + 1}
                                </legend>

                                <label>
                                    Treat Type

                                    <select data-key="type">
                                        ${selectOptions(
                                            Object.entries(
                                                C.chocolate.treats
                                            ).map(
                                                ([id, treat]) => [
                                                    id,

                                                    treat.name +
                                                    " · " +
                                                    M.money(
                                                        treat.price
                                                    )
                                                ]
                                            ),

                                            piece.type,

                                            id => !M.enabled(
                                                availability,
                                                "treat:" + id
                                            )
                                        )}
                                    </select>
                                </label>

                                <div class="shop-two-col">
                                    <label>
                                        Chocolate Base

                                        <select data-key="base">
                                            ${selectOptions(
                                                Object.entries(
                                                    C.chocolate.bases
                                                ),

                                                piece.base,

                                                id => !M.enabled(
                                                    availability,
                                                    "base:" + id
                                                )
                                            )}
                                        </select>
                                    </label>

                                    <label>
                                        Topping

                                        <select data-key="topping">
                                            ${selectOptions(
                                                Object.entries(
                                                    C.chocolate.toppings
                                                ),

                                                piece.topping,

                                                id =>
                                                    !M.enabled(
                                                        availability,
                                                        "topping:" + id
                                                    ) ||
                                                    !M.enabled(
                                                        availability,
                                                        "flavor:" + id
                                                    )
                                            )}
                                        </select>
                                    </label>
                                </div>

                                <div class="shop-piece-actions">
                                    <button
                                        class="shop-button secondary"
                                        type="button"
                                        data-duplicate="${index}"
                                        ${
                                            index === x.size - 1
                                                ? "disabled"
                                                : ""
                                        }
                                    >
                                        Duplicate to next treat
                                    </button>

                                    ${
                                        index === x.size - 1
                                            ? ""
                                            : `
                                                <small>
                                                    Replaces the next
                                                    treat’s choices.
                                                </small>
                                            `
                                    }
                                </div>
                            </fieldset>
                        `
                    ).join("")}
                `
                : `
                    <p>
                        All ${x.size} treats use your starting
                        treat, chocolate and topping.
                        Turn on Mix Your Box to change
                        individual pieces.
                    </p>
                `
        }
    `;

$("#shopChocolateMix", root).onchange = event => {
    const mixing = event.target.checked;

    if (mixing && !x.mixing) {
        x.pieces = Array.from(
            { length: x.size },

            () => ({
                type: "",
                base: "",
                topping: ""
            })
        );

        x.startBase = "";
        x.startTopping = "";

        const base = $("#shopStartBase", dialog);
        const topping = $("#shopStartTopping", dialog);

        if (base) {
            base.value = "";
        }

        if (topping) {
            topping.value = "";
        }
    }

    x.mixing = mixing;

    if (!x.mixing) {
        x.pieces = Array.from(
            { length: x.size },

            () => ({
                type: x.flavor,
                base: x.startBase || "",
                topping: x.startTopping || ""
            })
        );
    }

    renderChocolatePieces();
    updateProductTotal();
};

    $$(
        "[data-piece]",
        root
    ).forEach(row => {
        $$(
            "select",
            row
        ).forEach(select => {
            select.onchange = () => {
                x.pieces[
                    Number(
                        row.dataset.piece
                    )
                ][
                    select.dataset.key
                ] = select.value;

                updateProductTotal();
            };
        });
    });

    $$(
        "[data-duplicate]",
        root
    ).forEach(button => {
        button.onclick = () => {
            const index =
                Number(
                    button.dataset.duplicate
                );

            x.pieces[index + 1] =
                clone(
                    x.pieces[index]
                );

            renderChocolatePieces();
            updateProductTotal();

            $(
                `[data-piece="${index + 1}"]`,
                root
            )?.scrollIntoView({
                block: "nearest"
            });
        };
    });
}


/* =====================================================
   LIVE PRICE / VALIDATION MESSAGE
===================================================== */

function updateProductTotal() {
        renderDessertAbout();
    if (
        !config ||
        !$("#shopAdd", dialog)
    ) {
        return;
    }

    const x = config;

    let quoted = null;
    let error = "";

    try {
        quoted = M.quote(
            x,
            availability
        );
    } catch (problem) {
        error = problem.message;
    }

    $(
        "#shopAdd",
        dialog
    ).disabled = !quoted;

    $(
        "#shopConfigError",
        dialog
    ).textContent = error;

    let partial = 0;

    if (
        x.category === "chocolate"
    ) {
        const complete =
            x.pieces.filter(piece =>
                C.chocolate.treats[
                    piece.type
                ] &&
                C.chocolate.bases[
                    piece.base
                ] &&
                C.chocolate.toppings[
                    piece.topping
                ]
            ).length;

        const count = $(
            "#shopChocolateCount",
            dialog
        );

        if (count) {
            count.textContent =
                complete +
                " of " +
                (x.size || "—") +
                " treats selected";
        }

        partial =
            x.pieces.reduce(
                (total, piece) =>
                    total +
                    (
                        C.chocolate.treats[
                            piece.type
                        ]?.price || 0
                    ),

                0
            ) * (x.quantity || 1);
    }

    if (
        !partial &&
        [
            "cupcakes",
            "jars",
            "apples"
        ].includes(x.category)
    ) {
        partial =
            (
                C.categories[
                    x.category
                ].prices[x.size] || 0
            ) *
            (x.quantity || 1);
    }

    if (
        !partial &&
        [
            "cakes",
            "half"
        ].includes(x.category)
    ) {
        partial =
            (
                (
                    x.category === "half"
                        ? C.half.prices
                        : C.categories.cakes.prices
                )[x.layers] || 0
            ) *
            (x.quantity || 1);
    }

    $(
        "#shopLivePrice",
        dialog
    ).textContent =
        quoted
            ? M.money(
                quoted.totalCents
            )
: partial
    ? M.money(partial)
    : "Choose your options";

    const packCount = $(
        "#shopPackCount",
        dialog
    );

    if (packCount) {
        packCount.textContent =
            Object.values(
                x.mix || {}
            ).reduce(
                (total, value) =>
                    total +
                    (Number(value) || 0),

                0
            ) +
" of " +
(x.size || "—") +
" selected";
    }

    const halfSummary = $(
        "#shopHalfSummary",
        dialog
    );

    if (halfSummary) {
        halfSummary.textContent =
            x.one && x.two
                ? M.cakeName(x.one) +
                  " + " +
                  M.cakeName(x.two)
                : "Choose two different Signature flavors.";
    }
}


/* =====================================================
   CART DISPLAY / EDITING
===================================================== */

function cartMarkup() {
    return cart.map(item => {
        const quoted =
            safeQuote(item);

        let error = "";

        if (!quoted) {
            try {
                M.quote(
                    item,
                    availability
                );
            } catch (problem) {
                error =
                    problem.message;
            }
        }

        return `
            <article class="shop-cart-row">
                <h3>
                    ${esc(
                        quoted?.title ||
                        "Saved Shop item"
                    )}
                </h3>

                ${
                    quoted
                        ? `
                            <ul>
                                ${
                                    customerDetails(
                                        quoted
                                    ).map(detail => `
                                        <li>
                                            ${esc(detail)}
                                        </li>
                                    `).join("")
                                }
                            </ul>

                            <label class="shop-field">
                                Quantity

                                <select
                                    data-cart-quantity="${esc(
                                        item.id
                                    )}"
                                    aria-label="Quantity of ${esc(
                                        quoted.title
                                    )}"
                                >
                                    ${
                                        Array.from(
                                            { length: 99 },

                                            (_, index) =>
                                                index + 1
                                        ).map(number => `
                                            <option
                                                value="${number}"
                                                ${
                                                    number ===
                                                    quoted.quantity
                                                        ? "selected"
                                                        : ""
                                                }
                                            >
                                                ${number}
                                            </option>
                                        `).join("")
                                    }
                                </select>

                                <small>
                                    Each quantity repeats the
                                    exact selection listed above.
                                </small>
                            </label>

                            <p>
                                ${M.money(
                                    quoted.unitCents
                                )} per selection
                                ·
                                <strong>
                                    ${M.money(
                                        quoted.totalCents
                                    )}
                                </strong>
                            </p>
                        `
                        : `
                            <p class="shop-error">
                                ${esc(error)}
                            </p>
                        `
                }

                <div class="shop-cart-actions">
                    <button
                        class="shop-button secondary"
                        data-edit="${esc(item.id)}"
                    >Edit</button>

                    <button
                        class="shop-button secondary"
                        data-remove="${esc(item.id)}"
                    >Remove</button>
                </div>
            </article>
        `;
    }).join("");
}

function subtotal() {
    return cart.reduce(
        (total, item) =>
            total +
            (
                safeQuote(
                    item
                )?.totalCents || 0
            ),

        0
    );
}

function openCart() {
    config = null;
    editing = null;

    openDialog(
        "Your Dessert Cart",

        cart.length
            ? `
                ${cartMarkup()}

                <p class="shop-live">
                    Product subtotal:
                    ${M.money(subtotal())}
                </p>

                <p>
                    Delivery, if selected, is estimated next.
                    This is an order request;
                    no payment is taken here.
                </p>

                <p
                    class="shop-error"
                    id="shopConnectionNotice"
                ></p>

                <button
                    class="shop-button"
                    id="shopCheckout"
                >Continue to Order Request</button>
            `
            : `
                <p>
                    Your cart is empty.
                    Select a dessert to get started.
                </p>
            `
    );

    $$(
        "[data-edit]",
        dialog
    ).forEach(button => {
        button.onclick = () => {
            const item = cart.find(
                entry =>
                    entry.id ===
                    button.dataset.edit
            );

            if (item) {
                openProduct(
                    item.category,
                    item.flavor,
                    item
                );
            }
        };
    });

    $$(
        "[data-remove]",
        dialog
    ).forEach(button => {
        button.onclick = () => {
            cart = cart.filter(
                item =>
                    item.id !==
                    button.dataset.remove
            );

            persist();
            openCart();
        };
    });
$$(
    "[data-cart-quantity]",
    dialog
).forEach(select => {
    select.onchange = () => {
        const item = cart.find(
            entry =>
                entry.id ===
                select.dataset.cartQuantity
        );

        const chosen =
            Number(select.value);

        if (
            !item ||
            !Number.isInteger(chosen) ||
            chosen < 1 ||
            chosen > 99
        ) {
            return;
        }

        item.quantity = chosen;

        persist();
        openCart();
    };
});
    const next = $(
        "#shopCheckout",
        dialog
    );

    if (next) {
        next.onclick = async () => {
            next.disabled = true;

            const connected =
                await refreshAvailability();

            if (!connected) {
                $(
                    "#shopConnectionNotice",
                    dialog
                ).textContent =
                    "Order requests are temporarily unavailable. Your cart is saved. Please try again later.";

                next.disabled = false;
                return;
            }

            try {
                cart.forEach(item =>
                    M.quote(
                        item,
                        availability
                    )
                );

                openCheckout();

            } catch (error) {
                openCart();

                $(
                    "#shopConnectionNotice",
                    dialog
                ).textContent =
                    error.message;
            }
        };
    }

    refreshAvailability();
}


/* =====================================================
   ORDER REQUEST FORM
===================================================== */

function field(
    name,
    label,
    type = "text",
    extra = ""
) {
    return `
        <label class="shop-field">
            ${label}

            <input
                name="${name}"
                type="${type}"
                ${extra}
            >
        </label>
    `;
}

function openCheckout() {
    const dates = [];

    const start = new Date(
        now().getTime() +
        72 * 3600000
    );

    for (
        let index = 0;
        index < 366;
        index++
    ) {
        const date = new Date(
            +start +
            index * 86400000
        );

        const key =
            M.dateKey(date);

        if (
            !availability.blockedDates
                .includes(key) &&
            !dates.some(
                ([value]) =>
                    value === key
            )
        ) {
            dates.push([
                key,

                new Intl.DateTimeFormat(
                    "en-US",
                    {
                        timeZone:
                            C.timeZone,

                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    }
                ).format(date)
            ]);
        }
    }

    openDialog(
        "Request Your Order",

        `
            <form id="shopCheckoutForm">
                <p>
                    Everyday sweets, made to order.
                    At least 72 hours’ notice is required.
                    All times are Central time
                    (Dallas–Fort Worth).
                </p>

                <div class="shop-two-col">
                    ${field(
                        "name",
                        "Full Name",
                        "text",
                        'required autocomplete="name" maxlength="100"'
                    )}

                    ${field(
                        "email",
                        "Email Address",
                        "email",
                        'required autocomplete="email" maxlength="254"'
                    )}
                </div>

                ${field(
                    "phone",
                    "Phone Number",
                    "tel",
                    'required autocomplete="tel" maxlength="40"'
                )}

                <fieldset>
                    <legend>
                        Fulfillment Method
                    </legend>

                    ${radioOptions(
                        "method",
                        [
                            ["pickup", "Pickup"],
                            ["delivery", "Delivery"]
                        ],
                        ""
                    )}
                </fieldset>

                <div class="shop-two-col">
                    <label class="shop-field">
                        Requested Fulfillment Date

                        <select
                            name="date"
                            required
                        >
                            ${selectOptions(
                                dates,
                                ""
                            )}
                        </select>

                        <small>
                            Unavailable dates are omitted.
                            Your date is not reserved until
                            approval and payment.
                        </small>
                    </label>

                    <label class="shop-field">
                        <span id="shopTimeLabel">
                            Requested Fulfillment Time
                        </span>

                        <input
                            name="time"
                            type="time"
                            required
                            step="900"
                        >

                        <small>
                            Requested time is subject to
                            review and approval.
                        </small>
                    </label>
                </div>

                <fieldset
                    id="shopDeliveryFields"
                    hidden
                    disabled
                >
                    <legend>
                        Delivery Details
                    </legend>

                    ${field(
                        "street",
                        "Street Address",
                        "text",
                        'required autocomplete="street-address" maxlength="200"'
                    )}

                    ${field(
                        "unit",
                        "Apartment / Unit (if applicable)",
                        "text",
                        'autocomplete="address-line2" maxlength="80"'
                    )}

                    <div class="shop-two-col">
                        ${field(
                            "city",
                            "City",
                            "text",
                            'required autocomplete="address-level2" maxlength="80"'
                        )}

                        ${field(
                            "state",
                            "State",
                            "text",
                            'required autocomplete="address-level1" value="TX" maxlength="80"'
                        )}
                    </div>

                    ${field(
                        "zip",
                        "ZIP Code",
                        "text",
                        'required autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}(-[0-9]{4})?"'
                    )}

                    <label class="shop-field">
                        Estimated Delivery Miles

                        <input
                            name="miles"
                            type="number"
                            min="0"
                            step="0.1"
                            required
                        >

                        <small>
                            Enter the estimated one-way
                            delivery mileage, as in the
                            Cake Builder. Final distance
                            and fee are reviewed before
                            approval. There is no maximum
                            delivery radius.
                        </small>
                    </label>

                    <label class="shop-mix-toggle">
                        <input
                            type="checkbox"
                            id="shopSameCustomer"
                        >
                        Same as customer
                    </label>

                    ${field(
                        "recipientName",
                        "Recipient Name",
                        "text",
                        'required maxlength="100"'
                    )}

                    ${field(
                        "recipientPhone",
                        "Recipient Phone",
                        "tel",
                        'required maxlength="40"'
                    )}

                    <label class="shop-field">
                        Delivery Instructions / Handoff Notes

                        <textarea
                            name="instructions"
                            required
                            maxlength="2000"
                            placeholder="Entry instructions and who will receive your desserts"
                        ></textarea>
                    </label>
                </fieldset>

                <label class="shop-field">
                    Order / Fulfillment Notes (optional)

                    <textarea
                        name="notes"
                        maxlength="3000"
                    ></textarea>

                    <small>
                        Use this space for pickup, delivery,
                        or order-related notes.
                        Design changes are not guaranteed
                        through the Shop.
                    </small>
                </label>

                <div class="shop-policies">
                    <details open>
                        <summary>
                            Allergens and Cross-Contact
                        </summary>

                        <p>
                            ${esc(
                                C.messages.allergens
                            )}
                        </p>
                    </details>

                    <details>
                        <summary>
                            Handling and Storage
                        </summary>

                        <p>
                            Cheesecake jars and cheesecake
                            apples: Keep Refrigerated.
                            Keep cakes and fresh-fruit or
                            dairy-topped desserts refrigerated
                            until serving.
                        </p>

                        <p>
                            ${esc(
                                C.messages.handling
                            )}
                        </p>
                    </details>

                    <details>
                        <summary>
                            Pickup, Delivery and Handoff
                        </summary>

                        <p>
                            ${esc(
                                C.messages.pickup
                            )}
                        </p>

                        <p>
                            ${esc(
                                C.messages.delivery
                            )}
                        </p>
                    </details>
                </div>

                <label class="shop-mix-toggle">
                    <input
                        name="acknowledged"
                        type="checkbox"
                        required
                    >

                    I have read the allergen, handling
                    and fulfillment notices and understand
                    this is an order request.
                </label>

                <label
                    class="shop-honeypot"
                    aria-hidden="true"
                >
                    Website

                    <input
                        name="website"
                        tabindex="-1"
                        autocomplete="off"
                    >
                </label>

                <p
                    id="shopFulfillmentTotal"
                    class="shop-live"
                    aria-live="polite"
                ></p>

                <p
                    class="shop-error"
                    id="shopCheckoutError"
                    role="alert"
                ></p>

                <div class="shop-cart-actions">
                    <button
                        type="button"
                        class="shop-button secondary"
                        id="shopBackCart"
                    >Back to Cart</button>

                    <button
                        type="submit"
                        class="shop-button"
                    >Review Order Request</button>
                </div>
            </form>
        `
    );

    const form = $(
        "#shopCheckoutForm",
        dialog
    );

    const sync = () => {
        const method =
            form.elements.method.value;

        const delivery =
            method === "delivery";

        $(
            "#shopDeliveryFields",
            form
        ).hidden = !delivery;

        $(
            "#shopDeliveryFields",
            form
        ).disabled = !delivery;

        $(
            "#shopTimeLabel",
            form
        ).textContent =
            delivery
                ? "Requested Delivery Time"
                : "Requested Pickup Time";

        if (
            $(
                "#shopSameCustomer",
                form
            ).checked
        ) {
            form.elements
                .recipientName.value =
                    form.elements.name.value;

            form.elements
                .recipientPhone.value =
                    form.elements.phone.value;
        }

        let fee = 0;

        try {
            if (
                delivery &&
                form.elements.miles.value !== ""
            ) {
                fee = D.calculate(
                    form.elements.miles.value
                ) * 100;
            }
        } catch {
            /* Validation will explain invalid mileage. */
        }

        $(
            "#shopFulfillmentTotal",
            form
        ).textContent =
            "Product subtotal " +
            M.money(subtotal()) +
            " · " +
            (
                delivery
                    ? "Estimated delivery " +
                      M.money(fee)
                    : "Pickup " +
                      M.money(0)
            ) +
            " · Estimated total " +
            M.money(
                subtotal() + fee
            );
    };

    form.oninput = sync;
    form.onchange = sync;

    $(
        "#shopBackCart",
        form
    ).onclick = openCart;

    sync();

    form.onsubmit = event => {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const values =
            Object.fromEntries(
                new FormData(form)
            );

        const payload = {
            items: clone(cart),

            customer: {
                name: values.name,
                email: values.email,
                phone: values.phone
            },

            fulfillment: {
                method: values.method,
                date: values.date,
                time: values.time,
                miles: values.miles,

                address: {
                    street: values.street,
                    unit: values.unit || "",
                    city: values.city,
                    state: values.state,
                    zip: values.zip
                },

                recipient: {
                    name:
                        values.recipientName,

                    phone:
                        values.recipientPhone
                },

                instructions:
                    values.instructions
            },

            notes: values.notes,

            acknowledged:
                values.acknowledged === "on",

            website:
                values.website || "",

            availabilityRevision:
                availability.revision
        };

        try {
            const validated =
                M.validateOrder(
                    payload,
                    availability,
                    now()
                );

            payload.catalogVersion =
                C.version;

            payload.expectedTotalCents =
                validated.totalCents;

            showReview(
                payload,
                validated,
                clone(values)
            );

        } catch (error) {
            $(
                "#shopCheckoutError",
                form
            ).textContent =
                error.message;
        }
    };
}


/* =====================================================
   RESTORE CUSTOMER DETAILS WHEN EDITING REVIEW
===================================================== */

function restoreCheckout(values) {
    openCheckout();

    const form = $(
        "#shopCheckoutForm",
        dialog
    );

    for (
        const [key, value]
        of Object.entries(values)
    ) {
        const input =
            form.elements.namedItem(key);

        if (!input) {
            continue;
        }

        if (
            input instanceof RadioNodeList
        ) {
            input.value = value;

        } else if (
            input.type === "checkbox"
        ) {
            input.checked = true;

        } else {
            input.value = value;
        }
    }

    form.dispatchEvent(
        new Event("change")
    );
}


/* =====================================================
   FINAL REVIEW / REQUEST SUBMISSION
===================================================== */

function showReview(
    payload,
    order,
    values
) {
    openDialog(
        "Review Your Order Request",

        `
            <div class="shop-review">
                ${order.items.map(item => `
                    <article class="shop-cart-row">
                        <h3>
                            ${esc(item.title)}
                        </h3>

                                 <ul>
                            ${customerDetails(item).map(
                                detail => `
                                    <li>
                                        ${esc(detail)}
                                    </li>
                                `
                            ).join("")}
                        </ul>

                        <p>
                            Quantity ${item.quantity}
                            ·
                            ${M.money(
                                item.totalCents
                            )}
                        </p>
                    </article>
                `).join("")}

                <h3>
                    Requested Fulfillment
                </h3>

                <p>
                    ${esc(
                        order.fulfillment.method === "pickup"
                            ? "Pickup"
                            : "Delivery"
                    )}
                    ·
                    ${esc(
                        order.fulfillment.date
                    )}
                    ·
                    ${esc(
                        order.fulfillment.time
                    )}
                    Central
                </p>

                ${
                    order.fulfillment.method === "delivery"
                        ? `
                            <p>
                                ${esc(
                                    Object.values(
                                        order.fulfillment.address
                                    )
                                    .filter(Boolean)
                                    .join(", ")
                                )}

                                <br>

                                Recipient:
                                ${esc(
                                    order.fulfillment.recipient.name
                                )}
                                ·
                                ${esc(
                                    order.fulfillment.recipient.phone
                                )}

                                <br>

                                Estimated miles:
                                ${order.fulfillment.miles}

                                <br>

                                Instructions:
                                ${esc(
                                    order.fulfillment.instructions
                                )}
                            </p>
                        `
                        : ""
                }

                <p>
                    ${esc(
                        order.customer.name
                    )}

                    <br>

                    ${esc(
                        order.customer.email
                    )}

                    <br>

                    ${esc(
                        order.customer.phone
                    )}
                </p>

                ${
                    order.notes
                        ? `
                            <p>
                                Notes:
                                ${esc(order.notes)}
                            </p>
                        `
                        : ""
                }

                <p>
                    Product subtotal:
                    ${M.money(
                        order.subtotalCents
                    )}

                    <br>

                    ${
                        order.fulfillment.method === "pickup"
                            ? "Pickup"
                            : "Estimated delivery fee"
                    }:
                    ${M.money(
                        order.deliveryCents
                    )}
                </p>

                <p class="shop-live">
                    Estimated total:
                    ${M.money(
                        order.totalCents
                    )}
                </p>

                <p class="shop-notice">
                    ${esc(
                        C.messages.request
                    )}
                </p>

                <p
                    class="shop-error"
                    id="shopSubmitError"
                    role="alert"
                ></p>

                <div class="shop-cart-actions">
                    <button
                        class="shop-button secondary"
                        id="shopEditDetails"
                    >Edit Details</button>

                    <button
                        class="shop-button"
                        id="shopRequest"
                    >Request Order</button>
                </div>
            </div>
        `
    );

    $(
        "#shopEditDetails",
        dialog
    ).onclick =
        () => restoreCheckout(values);

    const button = $(
        "#shopRequest",
        dialog
    );

    button.onclick = async () => {
        button.disabled = true;

        button.textContent =
            "Sending Request…";

        $(
            "#shopSubmitError",
            dialog
        ).textContent = "";

        try {
            if (!online) {
                throw new Error(
                    "Order requests are temporarily unavailable. Your cart is saved. Please try again later."
                );
            }

            M.validateOrder(
                payload,
                availability,
                now()
            );

            const fingerprint =
                JSON.stringify(payload);

            if (
                requestBody !== fingerprint
            ) {
                requestKey = uid();

                requestBody =
                    fingerprint;
            }

            const response =
                await fetch(
                    API +
                    "/api/shop/requests",

                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Idempotency-Key":
                                requestKey
                        },

                        body: requestBody
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                if (
                    result.availability
                ) {
                    availability =
                        result.availability;

                    refreshCards();
                }

                throw new Error(
                    result.error ||
                    "Your request could not be saved. Please try again."
                );
            }

            if (!result.id) {
                throw new Error(
                    "Your request could not be verified. Your cart is saved; please retry."
                );
            }

            cart = [];

            persist();

            openDialog(
                "Request Received",

                `
                    <p role="status">
                        ${esc(
                            C.messages.confirmation
                        )}
                    </p>

                    <p>
                        Your request ID:

                        <strong>
                            ${esc(result.reference || result.id)}
                        </strong>
                    </p>

                    <p>
                        Save this ID for your records.
                        Watch your email for review
                        and payment instructions.
                    </p>

                    <button
                        class="shop-button"
                        id="shopDone"
                    >Continue Shopping</button>
                `
            );

            $(
                "#shopDone",
                dialog
            ).onclick =
                () => dialog.close();

        } catch (error) {
            $(
                "#shopSubmitError",
                dialog
            ).textContent =
                error.message;

            button.disabled = false;

            button.textContent =
                "Request Order";
        }
    };
}


/* =====================================================
   RECOGNIZE YOUR EXISTING FLAVOR CARDS

   Their original grid classes and image wrappers remain.
===================================================== */
ensureSignatureCards();

for (
    const [category, definition]
    of Object.entries(
        C.categories
    )
) {
    const section =
        document.getElementById(
            definition.section
        );

    if (!section) {
        continue;
    }

    $$(
        "article",
        section
    ).forEach(card => {
        if (
            card.dataset.shopCategory
        ) {
            return;
        }

        const name = $(
            "h3",
            card
        )?.textContent.trim();

        const flavor =
            Object.keys(
                C.flavors
            ).find(
                id =>
                    C.flavors[id] === name
            ) ||
            C.cardAliases[name];

        if (
            flavor &&
            definition.flavors
                .includes(flavor)
        ) {
            card.dataset.shopCategory =
                category;

            card.dataset.shopFlavor =
                flavor;
        }
    });
}

const treatCards = {
    Strawberries: "strawberry",
    Oreos: "oreo",
    "Pretzel Rods": "pretzel",
    "Rice Krispy Treats": "rice",
    "Rice Krispie Treats": "rice"
};

$$(
    "#chocolateTreats article"
).forEach(card => {
    const flavor = treatCards[
        $(
            "h3",
            card
        )?.textContent.trim()
    ];

    if (flavor) {
        card.dataset.shopCategory =
            "chocolate";

        card.dataset.shopFlavor =
            flavor;
    }
});


/* =====================================================
   ADD BUTTONS / PRICES TO THE EXISTING CARDS
===================================================== */

$$(
    "[data-shop-category]"
).forEach(card => {
    const category =
        card.dataset.shopCategory;

    const flavor =
        card.dataset.shopFlavor;

    if (
        category === "jars" &&
        $("h3", card)
    ) {
        $(
            "h3",
            card
        ).textContent =
            C.flavors[flavor];
    }

    const asset =
        C.newCakeAssets[flavor];

    if (
        category === "cakes" ||
        category === "half"
    ) {
        const pending = $(
            "[data-shop-art]",
            card
        );

        if (
            pending &&
            asset
        ) {
            pending.innerHTML = `
                <img
                    src="${esc(asset)}"
                    alt="${esc(
                        displayName(
                            category,
                            flavor
                        )
                    )}"
                    class="signature-cake-image"
                >
            `;

            pending.classList.remove(
                "shop-art-pending"
            );
        }
    }

   const copy =
    productDescription(
        category,
        flavor
    );

const price =
    category === "half"
        ? C.half.prices[2]
        : category === "chocolate"
            ? C.chocolate.treats[
                flavor
            ].price
            : C.categories[
                category
            ].prices[
                category === "cakes"
                    ? 2
                    : 1
            ];

const place =
    $(
        ".chocolate-collection-product-copy",
        card
    ) || card;

place.insertAdjacentHTML(
    "beforeend",

    `
        ${
            category === "half"
                ? `
                    <span class="shop-badge">
                        Two Flavors
                    </span>
                `
                : ""
        }

        <p class="shop-card-copy">
            ${esc(copy)}
        </p>

        <div class="shop-card-actions">
            <span class="shop-card-price">
                ${M.money(price)}
            </span>

            <button
                class="shop-select"
                type="button"
                aria-label="Choose options for ${esc(
                    displayName(
                        category,
                        flavor
                    )
                )}"
                title="Choose options"
            >${shoppingBagIcon()}</button>
        </div>
    `
);
    const entry = $(
        '[class$="image-wrap"],.dessert-product-image-wrap,.signature-cake-image-wrap,.chocolate-collection-image-wrap',
        card
    );

    const launch = () => {
        if (
            isCardAvailable(
                category,
                flavor
            )
        ) {
            openProduct(
                category,
                flavor
            );
        }
    };

    $(
        ".shop-select",
        card
    ).onclick = launch;

    if (entry) {
        entry.dataset.shopEntry = "";

        entry.tabIndex = 0;

        entry.setAttribute(
            "role",
            "button"
        );

        entry.setAttribute(
            "aria-label",

            "Select " +
            displayName(
                category,
                flavor
            )
        );

        entry.onclick = launch;

        entry.onkeydown = event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();

                launch();
            }
        };
    }
});


/* =====================================================
   HEADER CART / CROSS-TAB CART UPDATE
===================================================== */

$$(
    ".cart-button"
).forEach(button => {
    button.addEventListener(
        "click",
        event => {
            event.preventDefault();

            openCart();
        }
    );
});

window.addEventListener(
    "storage",
    event => {
        if (
            event.key === KEY &&
            !dialog.open
        ) {
            try {
                cart =
                    JSON.parse(
                        event.newValue
                    )?.items || [];

                updateCount();
            } catch {
                /* Ignore malformed storage updates. */
            }
        }
    }
);

updateCount();
refreshAvailability();

})();