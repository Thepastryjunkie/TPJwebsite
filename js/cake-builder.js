"use strict";


/* =========================================
   CAKE PRODUCT DATA
========================================= */

const cakeProducts = {
    "round-4": {
        name: '4" Mini Indulgence Cake',
        shape: "round",
        size: '4"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 125,
        tallPrice: 145,
        standardServings: "4–6",
        tallServings: "6–8",
        allowsExtraLayer: true
    },

    "round-6": {
        name: '6" Sweet Tooth Cake',
        shape: "round",
        size: '6"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 185,
        tallPrice: 215,
        standardServings: "8–12",
        tallServings: "12–18",
        allowsExtraLayer: true
    },

    "round-8": {
        name: '8" Party Starter Cake',
        shape: "round",
        size: '8"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 245,
        tallPrice: 285,
        standardServings: "16–20",
        tallServings: "20–28",
        allowsExtraLayer: true
    },

    "round-9": {
        name: '9" Main Event Cake',
        shape: "round",
        size: '9"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 310,
        tallPrice: 350,
        standardServings: "24–30",
        tallServings: "30–38",
        allowsExtraLayer: true
    },

    "round-10": {
        name: '10" Celebration Crowd Cake',
        shape: "round",
        size: '10"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 385,
        tallPrice: 425,
        standardServings: "32–40",
        tallServings: "40–50",
        allowsExtraLayer: true
    },

    "heart-5-bento": {
        name: '5" Sweetheart Bento Box',
        shape: "heart",
        size: '5"',
        standardLayers: 1,
        tallLayers: 1,
        standardPrice: 165,
        tallPrice: 165,
        standardServings: "2–4",
        tallServings: "2–4",
        allowsExtraLayer: false
    },

    "heart-5-tall": {
        name: '5" Tall Heart Cake',
        shape: "heart",
        size: '5"',
        standardLayers: 2,
        tallLayers: 2,
        standardPrice: 155,
        tallPrice: 155,
        standardServings: "4–6",
        tallServings: "4–6",
        allowsExtraLayer: false
    },

    "heart-6": {
        name: '6" Love at First Bite Heart Cake',
        shape: "heart",
        size: '6"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 200,
        tallPrice: 230,
        standardServings: "8–12",
        tallServings: "12–18",
        allowsExtraLayer: true
    },

    "heart-9": {
        name: '9" Whole Lotta Love Heart Cake',
        shape: "heart",
        size: '9"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 335,
        tallPrice: 375,
        standardServings: "20–26",
        tallServings: "26–34",
        allowsExtraLayer: true
    },

    "star-8": {
        name: '8" Superstar Cake',
        shape: "star",
        size: '8"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 265,
        tallPrice: 305,
        standardServings: "16–20",
        tallServings: "20–28",
        allowsExtraLayer: true
    }
};


/* =========================================
   APPLICATION STATE
========================================= */

const builderState = {
    currentStep: 1,
    highestUnlockedStep: 1,

    occasion: "",
    otherOccasion: "",
    eventDate: "",
    fulfillmentDate: "",
    guestCount: 0,

    cakeShape: "round",
    cakeProductId: "round-6",
    isTall: false,

    cakeFlavor: "",
    customCakeFlavor: "",

    buttercreamStyle: "",
    buttercreamFlavor: "",

    cakeFilling: "",
    customFilling: "",
    premiumFillings: [],

    mainCakeColor: "original",
    accentColor: "original",
    cakeFinish: "",

    cakeBoardStyle: "round",
    cakeBoardColor: "original",
    cupcakeLinerStyle: "paper",
    cupcakeFrostingStyle: "",
    cupcakeLinerColor: "original",
    cupcakeFrostingColor: "original",

    decorations: [],
    flowerSource: "",

    topperType: "",
    topperPrice: 0,
    topperWording: "",

    extras: [],
    quantityExtras: [],

    inspirationFiles: [],

    cakeNameText: "",
    cakeAgeText: "",
    cakeWording: "",
    cakeTheme: "",
    cakeVision: "",
    mustHaveDetails: "",
    doNotInclude: "",

    customerName: "",
    customerPhone: "",
    customerEmail: "",
    preferredContactMethod: "",

    fulfillmentMethod: "",
    deliveryStreet: "",
    deliveryCity: "",
    deliveryState: "Texas",
    deliveryZip: "",
    deliveryMiles: 0,

    customerBudget: "",

    rushFee: 0,
    deliveryFee: 0
};


/* =========================================
   DOM HELPERS
========================================= */

function getElement(selector) {
    return document.querySelector(selector);
}


function getElements(selector) {
    return Array.from(
        document.querySelectorAll(selector)
    );
}


function getCheckedValue(name) {
    const selected = document.querySelector(
        `input[name="${name}"]:checked`
    );

    return selected ? selected.value : "";
}


function setText(selector, value) {
    const element = getElement(selector);

    if (element) {
        element.textContent = value;
    }
}


function formatCurrency(amount) {
    const numericAmount = Number(amount) || 0;

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits:
                Number.isInteger(numericAmount) ? 0 : 2,
            maximumFractionDigits: 2
        }
    ).format(numericAmount);
}


function formatDate(dateString) {
    if (!dateString) {
        return "Not selected";
    }

    const date = new Date(
        `${dateString}T12:00:00`
    );

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    ).format(date);
}


function clampNumber(value, minimum, maximum) {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
}


/* =========================================
   IMPORTANT ELEMENTS
========================================= */

const cakeRenderer = getElement("#cakeRenderer");

const roundCakeShape = getElement("#roundCakeShape");
const heartCakeShape = getElement("#heartCakeShape");
const starCakeShape = getElement("#starCakeShape");

const previewCakeName = getElement("#previewCakeName");
const previewCakeDescription = getElement(
    "#previewCakeDescription"
);
const previewServingCount = getElement(
    "#previewServingCount"
);
const previewPrice = getElement("#previewPrice");

const headerCakePrice = getElement("#headerCakePrice");

const extraLayerToggle = getElement(
    "#extraLayerToggle"
);
const extraLayerDescription = getElement(
    "#extraLayerDescription"
);
const bentoLayerNotice = getElement(
    "#bentoLayerNotice"
);

const realisticCakeCanvas = getElement("#realisticCakeCanvas");

const finalAssetRoot = "../images/cake-builder/final";

const cakeAssetMap = {
    round: { standard: "TPJ-Asset-001-Blank-Round-Cake.png", tall: "TPJ-Asset-009-Blank-Tall-Round-3-Layer-Cake.png", key: "round", tallKey: "tallRound" },
    heart: { standard: "TPJ-Asset-002-Blank-Heart-Cake.png", tall: "TPJ-Asset-010-Blank-Tall-Heart-3-Layer-Cake.png", key: "heart", tallKey: "tallHeart" },
    star: { standard: "TPJ-Asset-003-Blank-Star-Cake.png", tall: "TPJ-Asset-012-Blank-Tall-Star-3-Layer-Cake.png", key: "star", tallKey: "tallStar" }
};

const boardAssetMap = {
    round: ["TPJ-Asset-033-Round-Cake-Board.png", "TPJ-Asset-033-Round-Cake-Board-Recolor-Mask.png"],
    square: ["TPJ-Asset-034-Square-Cake-Board.png", "TPJ-Asset-034-Square-Cake-Board-Recolor-Mask.png"],
    rectangleHorizontal: ["TPJ-Asset-037-Rectangle-Horizontal-Cake-Board.png", "TPJ-Asset-037-Rectangle-Horizontal-Cake-Board-Recolor-Mask.png"]
};

const cakePlacements = {
    round: { round:[118.1462,153.004,.810277], square:[130.5573,169.1502,.790514], rectangleHorizontal:[118.1462,-106.996,.810277] },
    heart: { round:[145.5955,166.2172,.76779], square:[157.3371,182.0412,.749064], rectangleHorizontal:[145.5955,-93.7828,.76779] },
    star: { round:[161.04,221.6379,.746133], square:[172.4049,236.1101,.727934], rectangleHorizontal:[161.04,-38.3621,.746133] },
    tallRound: { round:[55.9934,-65.7743,.90708], square:[55.9934,-70.7743,.90708], rectangleHorizontal:[55.9934,-325.7743,.90708] },
    tallHeart: { round:[130.8091,93.2498,.790743], square:[142.9113,110.8534,.771456], rectangleHorizontal:[130.8091,-166.7502,.790743] },
    tallStar: { round:[126.8638,96.3035,.797665], square:[139.0623,113.8327,.77821], rectangleHorizontal:[126.8638,-163.6965,.797665] },
    heart5in: { round:[80.6229,131.3771,.868644], square:[93.9492,148.0508,.847458], rectangleHorizontal:[80.6229,-128.6229,.868644] },
    tallHeart5in: { round:[92.6802,113.9979,.851506], square:[105.7124,131.0955,.830737], rectangleHorizontal:[92.6802,-146.0021,.851506] }
};

const previousStepButton = getElement(
    "#previousStepButton"
);
const nextStepButton = getElement(
    "#nextStepButton"
);

const stepValidationMessage = getElement(
    "#stepValidationMessage"
);


/* =========================================
   COLOR UTILITIES
========================================= */

function normalizeHexColor(hexColor) {
    if (
        typeof hexColor !== "string" ||
        !/^#[0-9a-fA-F]{6}$/.test(hexColor)
    ) {
        return "#F7B6D2";
    }

    return hexColor.toUpperCase();
}


function hexToRgb(hexColor) {
    const normalized = normalizeHexColor(
        hexColor
    );

    return {
        red: Number.parseInt(
            normalized.slice(1, 3),
            16
        ),

        green: Number.parseInt(
            normalized.slice(3, 5),
            16
        ),

        blue: Number.parseInt(
            normalized.slice(5, 7),
            16
        )
    };
}


function rgbToHex(red, green, blue) {
    const channels = [red, green, blue].map(
        (channel) => {
            const safeChannel = clampNumber(
                Math.round(channel),
                0,
                255
            );

            return safeChannel
                .toString(16)
                .padStart(2, "0");
        }
    );

    return `#${channels.join("")}`.toUpperCase();
}


function mixHexColor(
    sourceColor,
    targetColor,
    amount
) {
    const source = hexToRgb(sourceColor);
    const target = hexToRgb(targetColor);

    const safeAmount = clampNumber(
        amount,
        0,
        1
    );

    return rgbToHex(
        source.red +
            (target.red - source.red) *
                safeAmount,

        source.green +
            (target.green - source.green) *
                safeAmount,

        source.blue +
            (target.blue - source.blue) *
                safeAmount
    );
}


/* =========================================
   PRODUCT HELPERS
========================================= */

function getSelectedCakeProduct() {
    return (
        cakeProducts[builderState.cakeProductId] ||
        cakeProducts["round-6"]
    );
}


function cakeAllowsExtraLayer() {
    return (
        getSelectedCakeProduct()
            .allowsExtraLayer !== false
    );
}


function getCakeBasePrice() {
    const product = getSelectedCakeProduct();

    return builderState.isTall
        ? product.tallPrice
        : product.standardPrice;
}


function getCakeServings() {
    const product = getSelectedCakeProduct();

    return builderState.isTall
        ? product.tallServings
        : product.standardServings;
}


function getCakeLayerCount() {
    const product = getSelectedCakeProduct();

    return builderState.isTall
        ? product.tallLayers
        : product.standardLayers;
}


function getExtraLayerPrice() {
    const product = getSelectedCakeProduct();

    return (
        product.tallPrice -
        product.standardPrice
    );
}


/* =========================================
   PRICE CALCULATIONS
========================================= */

function calculatePremiumFillingTotal() {
    return builderState.premiumFillings.reduce(
        (total, filling) =>
            total + filling.price,
        0
    );
}


function calculateDecorationTotal() {
    return builderState.decorations.reduce(
        (total, decoration) =>
            total + decoration.price,
        0
    );
}


function calculateTopperTotal() {
    return builderState.topperPrice || 0;
}


function calculateCheckboxExtraTotal() {
    return builderState.extras.reduce(
        (total, extra) =>
            total + extra.price,
        0
    );
}


function calculateQuantityExtraTotal() {
    return builderState.quantityExtras.reduce(
        (total, extra) =>
            total + extra.total,
        0
    );
}


function calculateExtrasTotal() {
    return (
        calculateCheckboxExtraTotal() +
        calculateQuantityExtraTotal()
    );
}


function calculateCakeSubtotal() {
    return (
        getCakeBasePrice() +
        calculatePremiumFillingTotal() +
        calculateDecorationTotal() +
        calculateTopperTotal()
    );
}


function calculateEstimatedTotal() {
    return (
        calculateCakeSubtotal() +
        calculateExtrasTotal() +
        builderState.rushFee +
        builderState.deliveryFee
    );
}


/* =========================================
   RENDERER COLOR
========================================= */

const realisticImageCache = new Map();
let realisticRenderVersion = 0;

function loadRealisticImage(url) {
    if (!realisticImageCache.has(url)) {
        realisticImageCache.set(
            url,
            new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error(`Unable to load ${url}`));
                image.src = url;
            })
        );
    }

    return realisticImageCache.get(url);
}
function makeTintedLayer(image, mask, color) {
    const layer = document.createElement("canvas");

    layer.width = realisticCakeCanvas.width;
    layer.height = realisticCakeCanvas.height;

    const layerContext = layer.getContext("2d");

    /* Create the recolorable shape */
    layerContext.drawImage(
        mask,
        0,
        0,
        layer.width,
        layer.height
    );

    /* Fill the masked area with the selected color */
    layerContext.globalCompositeOperation = "source-in";
    layerContext.fillStyle = color;

    layerContext.fillRect(
        0,
        0,
        layer.width,
        layer.height
    );

    /* Restore shadows from the original artwork */
    layerContext.globalCompositeOperation = "multiply";
    layerContext.globalAlpha = 0.34;

    layerContext.drawImage(
        image,
        0,
        0,
        layer.width,
        layer.height
    );

    /* Preserve dimension without washing dark colors back to gray. */
const selectedRgb = hexToRgb(color);

const isVeryDark =
    selectedRgb.red +
    selectedRgb.green +
    selectedRgb.blue < 90;

layerContext.globalCompositeOperation = "screen";
layerContext.globalAlpha =
    isVeryDark ? 0.025 : 0.08;

    layerContext.drawImage(
        image,
        0,
        0,
        layer.width,
        layer.height
    );

    /* Remove anything drawn outside the recolor mask */
    layerContext.globalCompositeOperation = "destination-in";
    layerContext.globalAlpha = 1;

    layerContext.drawImage(
        mask,
        0,
        0,
        layer.width,
        layer.height
    );

    layerContext.globalCompositeOperation = "source-over";
    layerContext.globalAlpha = 1;

    return layer;
}
function drawRecoloredAsset(
    context,
    image,
    mask,
    color,
    x,
    y,
    width,
    height
) {
    if (!color || color === "original") {
        context.drawImage(
            image,
            x,
            y,
            width,
            height
        );

        return;
    }

    const tintLayer = makeTintedLayer(
        image,
        mask,
        color
    );

    context.save();
    context.globalAlpha = 1;

    context.drawImage(
        tintLayer,
        x,
        y,
        width,
        height
    );

    context.restore();
}

async function updateRealisticCakePreview() {
    if (!realisticCakeCanvas) return;

    const renderVersion = ++realisticRenderVersion;

    const boardKey = builderState.cakeBoardStyle;
    const boardAssets = boardAssetMap[boardKey] || boardAssetMap.round;
    const isBento = builderState.cakeProductId === "heart-5-bento";
    const isFiveInchHeart = builderState.cakeProductId === "heart-5-tall";
    const shapeAssets = cakeAssetMap[builderState.cakeShape] || cakeAssetMap.round;

    let cakeFile = builderState.isTall ? shapeAssets.tall : shapeAssets.standard;
    let placementKey = builderState.isTall ? shapeAssets.tallKey : shapeAssets.key;

    if (isFiveInchHeart) {
        cakeFile = "TPJ-Asset-026-Blank-Tall-5in-Heart-Standalone-Cake.png";
        placementKey = "tallHeart5in";
    }

    if (isBento) {
        cakeFile = "TPJ-Asset-008-Bento-Box-5in-Heart-4-Cupcakes.png";
    }

    const cakeUrl = `${finalAssetRoot}/cakes/${cakeFile}`;
    const boardUrl = `${finalAssetRoot}/boards/${boardAssets[0]}`;
    const boardMaskUrl = `${finalAssetRoot}/boards/${boardAssets[1]}`;

    try {
        const requestedImages = isBento
            ? await Promise.all([loadRealisticImage(cakeUrl)])
            : await Promise.all([
                loadRealisticImage(boardUrl),
                loadRealisticImage(boardMaskUrl),
                loadRealisticImage(cakeUrl)
            ]);

        if (renderVersion !== realisticRenderVersion) return;

        const context = realisticCakeCanvas.getContext("2d");
        context.clearRect(
            0,
            0,
            realisticCakeCanvas.width,
            realisticCakeCanvas.height
        );

        if (isBento) {
            context.drawImage(
                requestedImages[0],
                0,
                0,
                realisticCakeCanvas.width,
                realisticCakeCanvas.height
            );
            return;
        }

             const [boardImage, boardMask, cakeImage] =
            requestedImages;

        const boardYOffset =
            boardKey === "rectangleHorizontal"
                ? 260
                : 0;

        drawRecoloredAsset(
            context,
            boardImage,
            boardMask,
            builderState.cakeBoardColor,
            0,
            boardYOffset,
            realisticCakeCanvas.width,
            realisticCakeCanvas.height
        );

        const placementBoardKey =
            boardKey === "rectangleHorizontal"
                ? "round"
                : boardKey;

        const placement =
            cakePlacements[placementKey]?.[
                placementBoardKey
            ] ||
            cakePlacements[placementKey]?.round ||
            [0, 0, 1];

        const [x, y, scale] = placement;

        const cakeSize =
            realisticCakeCanvas.width * scale;

        drawRecoloredAsset(
            context,
            cakeImage,
            cakeImage,
            builderState.mainCakeColor,
            x,
            y,
            cakeSize,
            cakeSize
        );

    } catch (error) {
        console.error(
            "The realistic cake preview could not be rendered.",
            error
        );
    }
}

const cupcakeFoundationMap = {
    paper: [
        "TPJ-Asset-041-Standard-Pleated-Paper-Unfrosted-Cupcake.png",
        "TPJ-Asset-041-Standard-Pleated-Paper-Liner-Recolor-Mask.png",
        "paper-Frosting-Compatible-Foundation.png"
    ],

    "metallic-pleated": [
        "TPJ-Asset-043-Metallic-Foil-Pleated-Unfrosted-Cupcake.png",
        "TPJ-Asset-043-Metallic-Foil-Pleated-Liner-Recolor-Mask.png",
        "metallic-pleated-Frosting-Compatible-Foundation.png"
    ],

    "rigid-cup": [
        "TPJ-Asset-042-Rigid-Foil-Cup-Unfrosted-Cupcake.png",
        "TPJ-Asset-042-Rigid-Foil-Baking-Cup-Recolor-Mask.png",
        "rigid-cup-Frosting-Compatible-Foundation.png"
    ]
};

function getCupcakeFrostingFiles(liner, style) {
    if (style === "classic-tall-swirl") {
        return [
            `TPJ-Asset-044-ClassicTallSwirl-${liner}-Frosting.png`,
            `TPJ-Asset-044-ClassicTallSwirl-${liner}-Recolor-Mask.png`
        ];
    }

    if (style === "true-rosette") {
        return [
            "TPJ-Asset-045-TrueRosette-Frosting.png",
            "TPJ-Asset-045-TrueRosette-Recolor-Mask.png"
        ];
    }

    if (style === "low-piped-edible-image") {
        return [
            `TPJ-Asset-046-LowPipedEdibleImage-${liner}-Frosting.png`,
            `TPJ-Asset-046-LowPipedEdibleImage-${liner}-Recolor-Mask.png`
        ];
    }

    return null;
}

function updateCupcakePreview() {
    const foundation = getElement("#cupcakeFoundation");
    const frosting = getElement("#cupcakeFrosting");
    const linerTint = getElement("#cupcakeLinerTint");
    const frostingTint = getElement("#cupcakeFrostingTint");

    if (
        !foundation ||
        !frosting ||
        !linerTint ||
        !frostingTint
    ) {
        return;
    }

    const liner =
        builderState.cupcakeLinerStyle || "paper";

    const foundationFiles =
        cupcakeFoundationMap[liner] ||
        cupcakeFoundationMap.paper;

    const frostingFiles =
        getCupcakeFrostingFiles(
            liner,
            builderState.cupcakeFrostingStyle
        );

    const hasFrosting = Boolean(frostingFiles);

    const linerRoot =
        `${finalAssetRoot}/cupcakes/liners`;

    const frostingRoot =
        `${finalAssetRoot}/cupcakes/frosting`;

    const linerMaskUrl =
        `${linerRoot}/${foundationFiles[1]}`;

    foundation.src = hasFrosting
        ? `${frostingRoot}/${foundationFiles[2]}`
        : `${linerRoot}/${foundationFiles[0]}`;

    linerTint.style.backgroundColor =
        builderState.cupcakeLinerColor === "original"
            ? "transparent"
            : builderState.cupcakeLinerColor;

    linerTint.style.webkitMaskImage =
        `url("${linerMaskUrl}")`;

    linerTint.style.maskImage =
        `url("${linerMaskUrl}")`;

    if (hasFrosting) {
        const frostingMaskUrl =
            `${frostingRoot}/${frostingFiles[1]}`;

        frosting.src =
            `${frostingRoot}/${frostingFiles[0]}`;

        frosting.style.display = "";
        frostingTint.style.display = "";

        frostingTint.style.backgroundColor =
            builderState.cupcakeFrostingColor === "original"
                ? "transparent"
                : builderState.cupcakeFrostingColor;

        frostingTint.style.webkitMaskImage =
            `url("${frostingMaskUrl}")`;

        frostingTint.style.maskImage =
            `url("${frostingMaskUrl}")`;
    } else {
        frosting.removeAttribute("src");
        frosting.style.display = "none";

        frostingTint.style.display = "none";
        frostingTint.style.backgroundColor = "transparent";
        frostingTint.style.webkitMaskImage = "none";
        frostingTint.style.maskImage = "none";
    }

    const selectedSet = builderState.extras.find(
        (extra) =>
            /^\d+ Gourmet Cupcakes$/.test(extra.name)
    );

    setText(
        "#cupcakeSetCaption",
        selectedSet
            ? `${selectedSet.name} · preview applies to every cupcake`
            : "Select a 4-, 8-, or 12-count set above."
    );
}

function updateRendererColors() {
    if (!cakeRenderer) {
        return;
    }

    const mainColor = normalizeHexColor(
        builderState.mainCakeColor
    );

    const accentColor = normalizeHexColor(
        builderState.accentColor
    );

    const highlightColor = mixHexColor(
        mainColor,
        "#FFFFFF",
        0.3
    );

    const shadowColor = mixHexColor(
        mainColor,
        "#5A2A1E",
        0.2
    );

    const bodyStart = mixHexColor(
        mainColor,
        "#5A2A1E",
        0.12
    );

    const bodyEnd = mixHexColor(
        mainColor,
        "#5A2A1E",
        0.2
    );

    document.documentElement.style.setProperty(
        "--cake-color",
        mainColor
    );

    document.documentElement.style.setProperty(
        "--cake-highlight",
        highlightColor
    );

    document.documentElement.style.setProperty(
        "--cake-shadow-color",
        shadowColor
    );

    document.documentElement.style.setProperty(
        "--accent-color",
        accentColor
    );

    getElement(
        "#cakeBodyGradientStart"
    )?.setAttribute(
        "stop-color",
        bodyStart
    );

    getElement(
        "#cakeBodyGradientMiddle"
    )?.setAttribute(
        "stop-color",
        mainColor
    );

    getElement(
        "#cakeBodyGradientEnd"
    )?.setAttribute(
        "stop-color",
        bodyEnd
    );

    getElement(
        "#cakeTopGradientStart"
    )?.setAttribute(
        "stop-color",
        highlightColor
    );

    getElement(
        "#cakeTopGradientEnd"
    )?.setAttribute(
        "stop-color",
        mainColor
    );
}


/* =========================================
   RENDERER SHAPE
========================================= */

function updateVisibleCakeShape() {
    const shapes = {
        round: roundCakeShape,
        heart: heartCakeShape,
        star: starCakeShape
    };

    Object.entries(shapes).forEach(
        ([shapeName, shapeElement]) => {
            if (!shapeElement) {
                return;
            }

            shapeElement.classList.toggle(
                "is-hidden",
                shapeName !==
                    builderState.cakeShape
            );
        }
    );
}


/* =========================================
   RENDERER SIZE
========================================= */

function updateRendererSize() {
    if (!cakeRenderer) {
        return;
    }

    const product = getSelectedCakeProduct();

    const numericSize = product.size.replace(
        '"',
        ""
    );

    cakeRenderer.dataset.size = numericSize;
}


/* =========================================
   RENDERER HEIGHT
========================================= */

function updateCakeHeight() {
    const product = getSelectedCakeProduct();

    if (!cakeAllowsExtraLayer()) {
        builderState.isTall = false;

        if (extraLayerToggle) {
            extraLayerToggle.checked = false;
            extraLayerToggle.disabled = true;
        }
    } else if (extraLayerToggle) {
        extraLayerToggle.disabled = false;
    }

    cakeRenderer?.classList.toggle(
        "is-tall",
        builderState.isTall
    );

    getElement(
        "#extraLayerDecoration"
    )?.classList.toggle(
        "is-hidden",
        !builderState.isTall
    );

    const layerControl =
        extraLayerToggle?.closest(
            ".extra-layer-control"
        );

    layerControl?.classList.toggle(
        "is-hidden",
        !cakeAllowsExtraLayer()
    );

    if (extraLayerDescription) {
        if (builderState.isTall) {
            extraLayerDescription.textContent =
                `${product.tallLayers} layers · ${formatCurrency(product.tallPrice)} base`;
        } else {
            extraLayerDescription.textContent =
                `Makes your cake tall · Adds ${formatCurrency(getExtraLayerPrice())}`;
        }
    }

    if (bentoLayerNotice) {
        const isBento =
            builderState.cakeProductId ===
            "heart-5-bento";

        const isTallFive =
            builderState.cakeProductId ===
            "heart-5-tall";

        bentoLayerNotice.classList.toggle(
            "is-hidden",
            !isBento && !isTallFive
        );

        if (isBento) {
            bentoLayerNotice.textContent =
                'The 5" Sweetheart Bento Box includes a one-layer heart cake and cupcakes.';
        }

        if (isTallFive) {
            bentoLayerNotice.textContent =
                'The 5" Tall Heart Cake is a separate two-layer cake and does not include cupcakes.';
        }
    }
}


/* =========================================
   RENDERER FINISHES
========================================= */

function updateFinishVisibility() {
    const finishGroups = getElements(
        ".cake-finish-group"
    );

    finishGroups.forEach((group) => {
        group.classList.add("is-hidden");
    });

    const finishElementMap = {
        "Simple Texture":
            "#textureFinishDecoration",

        "Vintage Piping":
            "#vintagePipingDecoration",

        "Watercolor Finish":
            "#watercolorFinishDecoration",

        "Palette Knife Finish":
            "#paletteFinishDecoration",

        "Edible Image Design":
            "#edibleImageFinishDecoration"
    };

    const selectedFinishElement =
        finishElementMap[
            builderState.cakeFinish
        ];

    if (selectedFinishElement) {
        getElement(
            selectedFinishElement
        )?.classList.remove("is-hidden");
    }
}


/* =========================================
   RENDERER DECORATIONS
========================================= */

function updateDecorationVisibility() {
    getElements(
        ".cake-decoration-group"
    ).forEach((element) => {
        const isExtraLayer =
            element.id ===
            "extraLayerDecoration";

        if (isExtraLayer) {
            return;
        }

        const isSelected =
            builderState.decorations.some(
                (decoration) =>
                    decoration.id ===
                    element.id
            );

        const isTopper =
            element.id ===
                "topperDecoration" &&
            Boolean(builderState.topperType);

        element.classList.toggle(
            "is-hidden",
            !isSelected && !isTopper
        );
    });

    const topperTextPreview = getElement(
        "#topperTextPreview"
    );

    if (topperTextPreview) {
        const wording =
            builderState.topperWording.trim() ||
            "Celebrate";

        topperTextPreview.textContent =
            wording.length > 15
                ? `${wording.slice(0, 15)}…`
                : wording;
    }
}


/* =========================================
   SELECTED CARD STATES
========================================= */

function updateSelectedCardStates() {
    const selectableInputs = getElements(
        [
            ".occasion-card input",
            ".shape-choice-card input",
            ".cake-size-card input",
            ".text-choice-card input",
            ".description-choice-card input",
            ".upgrade-card input",
            ".style-choice-card input",
            ".decoration-choice-card input",
            ".extra-product-card input",
            ".color-choice input"
        ].join(",")
    );

    selectableInputs.forEach((input) => {
        const card = input.closest(
            [
                ".occasion-card",
                ".shape-choice-card",
                ".cake-size-card",
                ".text-choice-card",
                ".description-choice-card",
                ".upgrade-card",
                ".style-choice-card",
                ".decoration-choice-card",
                ".extra-product-card",
                ".color-choice"
            ].join(",")
        );

        card?.classList.toggle(
            "is-selected",
            input.checked
        );
    });
}


/* =========================================
   PREVIEW SUMMARY
========================================= */

function updatePreviewSummary() {
    const product = getSelectedCakeProduct();

    const heightLabel =
        builderState.isTall
            ? "Tall"
            : "Standard";

    const layerCount = getCakeLayerCount();

    const shapeName =
        product.shape.charAt(0).toUpperCase() +
        product.shape.slice(1);

    const total = calculateEstimatedTotal();

    if (previewCakeName) {
        previewCakeName.textContent =
            product.name;
    }

    if (previewCakeDescription) {
        previewCakeDescription.textContent =
            `${shapeName} · ${heightLabel} · ${layerCount} ${layerCount === 1 ? "layer" : "layers"}`;
    }

    if (previewServingCount) {
        previewServingCount.textContent =
            getCakeServings();
    }

    if (previewPrice) {
        previewPrice.textContent =
            formatCurrency(total);
    }

    if (headerCakePrice) {
        headerCakePrice.textContent =
            formatCurrency(total);
    }

    setText(
        "#mobileSummaryTitle",
        product.name
    );

    setText(
        "#mobileSummaryShape",
        shapeName
    );

    setText(
        "#mobileSummaryHeight",
        heightLabel
    );

    setText(
        "#mobileSummaryServings",
        getCakeServings()
    );

    setText(
        "#mobileSummaryPrice",
        formatCurrency(total)
    );
}


/* =========================================
   COMPLETE PREVIEW RENDER
========================================= */

function renderCakePreview() {
    updateRealisticCakePreview();
    updateCupcakePreview();
    updateVisibleCakeShape();
    updateRendererSize();
    updateCakeHeight();
    updateRendererColors();
    updateFinishVisibility();
    updateDecorationVisibility();
    updateSelectedCardStates();
    updatePreviewSummary();
    updateBudgetNotice();

    if (
        builderState.currentStep === 8
    ) {
        populateReview();
    }
}


/* =========================================
   STEP NAVIGATION
========================================= */

function showStep(stepNumber) {
    const safeStep = clampNumber(
        Number(stepNumber),
        1,
        8
    );

    builderState.currentStep = safeStep;

    getElements(".builder-step").forEach(
        (stepElement) => {
            const elementStep = Number(
                stepElement.dataset.step
            );

            const isActive =
                elementStep === safeStep;

            stepElement.hidden = !isActive;

            stepElement.classList.toggle(
                "is-active",
                isActive
            );
        }
    );

    getElements(".progress-step").forEach(
        (progressButton) => {
            const buttonStep = Number(
                progressButton.dataset.stepTarget
            );

            const isActive =
                buttonStep === safeStep;

            progressButton.classList.toggle(
                "is-active",
                isActive
            );

            progressButton.classList.toggle(
                "is-complete",
                buttonStep < safeStep
            );

            if (isActive) {
                progressButton.setAttribute(
                    "aria-current",
                    "step"
                );
            } else {
                progressButton.removeAttribute(
                    "aria-current"
                );
            }
        }
    );

    if (previousStepButton) {
        previousStepButton.disabled =
            safeStep === 1;
    }

    if (nextStepButton) {
        nextStepButton.hidden =
            safeStep === 8;

        nextStepButton.textContent =
            safeStep === 7
                ? "Review My Cake"
                : "Continue";
    }

    if (stepValidationMessage) {
        stepValidationMessage.textContent = "";
    }

    if (safeStep === 8) {
        populateReview();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function goToNextStep() {
    if (!validateCurrentStep()) {
        return;
    }

    builderState.highestUnlockedStep =
        Math.max(
            builderState.highestUnlockedStep,
            builderState.currentStep + 1
        );

    showStep(
        builderState.currentStep + 1
    );
}


function goToPreviousStep() {
    showStep(
        builderState.currentStep - 1
    );
}


/* =========================================
   VALIDATION
========================================= */

function showValidationMessage(message) {
    if (stepValidationMessage) {
        stepValidationMessage.textContent =
            message;
    }
}


function validateStepOne() {
    if (!builderState.occasion) {
        showValidationMessage(
            "Choose an occasion before continuing."
        );

        return false;
    }

    if (
        builderState.occasion === "Other" &&
        !builderState.otherOccasion.trim()
    ) {
        showValidationMessage(
            "Tell me what you are celebrating."
        );

        return false;
    }

    if (!builderState.eventDate) {
        showValidationMessage(
            "Choose the event date."
        );

        return false;
    }

    if (!builderState.fulfillmentDate) {
        showValidationMessage(
            "Choose the preferred pickup or delivery date."
        );

        return false;
    }

    if (
        !builderState.guestCount ||
        builderState.guestCount < 1
    ) {
        showValidationMessage(
            "Enter the approximate guest count."
        );

        return false;
    }

    return true;
}


function validateStepTwo() {
    if (!builderState.cakeProductId) {
        showValidationMessage(
            "Choose a cake size before continuing."
        );

        return false;
    }

    return true;
}


function validateStepThree() {
    if (!builderState.cakeFlavor) {
        showValidationMessage(
            "Choose a cake flavor."
        );

        return false;
    }

    if (
        builderState.cakeFlavor ===
            "Custom Flavor" &&
        !builderState.customCakeFlavor.trim()
    ) {
        showValidationMessage(
            "Describe the custom flavor you want."
        );

        return false;
    }

    if (!builderState.buttercreamStyle) {
        showValidationMessage(
            "Choose a buttercream."
        );

        return false;
    }

    if (!builderState.cakeFilling) {
        showValidationMessage(
            "Choose a filling."
        );

        return false;
    }

    if (
        builderState.cakeFilling ===
            "Custom Filling" &&
        !builderState.customFilling.trim()
    ) {
        showValidationMessage(
            "Describe the custom filling you want."
        );

        return false;
    }

    return true;
}


function validateStepFour() {
    if (!builderState.cakeFinish) {
        showValidationMessage(
            "Choose a buttercream finish."
        );

        return false;
    }

    const flowersSelected =
        builderState.decorations.some(
            (decoration) =>
                decoration.id ===
                "flowersDecoration"
        );

    if (
        flowersSelected &&
        !builderState.flowerSource
    ) {
        showValidationMessage(
            "Choose who will supply the fresh flowers."
        );

        return false;
    }

    const topperSelected =
        Boolean(
            getElement(
                "#topperDecorationOption"
            )?.checked
        );

    if (
        topperSelected &&
        !builderState.topperType
    ) {
        showValidationMessage(
            "Choose the topper type."
        );

        return false;
    }

    return true;
}


function validateStepSix() {
    const acknowledgment = getElement(
        "#inspirationPolicyAcknowledgment"
    );

    if (
        builderState.inspirationFiles.length >
            0 &&
        acknowledgment &&
        !acknowledgment.checked
    ) {
        showValidationMessage(
            "Acknowledge the inspiration-photo policy before continuing."
        );

        return false;
    }

    return true;
}


function validateStepSeven() {
    if (!builderState.customerName.trim()) {
        showValidationMessage(
            "Enter your first and last name."
        );

        return false;
    }

    if (!builderState.customerPhone.trim()) {
        showValidationMessage(
            "Enter your phone number."
        );

        return false;
    }

    if (!builderState.customerEmail.trim()) {
        showValidationMessage(
            "Enter your email address."
        );

        return false;
    }

    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            builderState.customerEmail
        );

    if (!validEmail) {
        showValidationMessage(
            "Enter a valid email address."
        );

        return false;
    }

    if (!builderState.preferredContactMethod) {
        showValidationMessage(
            "Choose a preferred contact method."
        );

        return false;
    }

    if (!builderState.fulfillmentMethod) {
        showValidationMessage(
            "Choose pickup or delivery."
        );

        return false;
    }

    if (
        builderState.fulfillmentMethod ===
        "Delivery"
    ) {
        if (
            !builderState.deliveryStreet.trim() ||
            !builderState.deliveryCity.trim() ||
            !builderState.deliveryZip.trim()
        ) {
            showValidationMessage(
                "Complete the delivery address."
            );

            return false;
        }

        if (
            !builderState.deliveryMiles ||
            builderState.deliveryMiles <= 0
        ) {
            showValidationMessage(
                "Enter the estimated delivery mileage."
            );

            return false;
        }
    }

    if (!builderState.customerBudget) {
        showValidationMessage(
            "Choose a comfortable spending range."
        );

        return false;
    }

    return true;
}


function validateCurrentStep() {
    showValidationMessage("");

    switch (builderState.currentStep) {
        case 1:
            return validateStepOne();

        case 2:
            return validateStepTwo();

        case 3:
            return validateStepThree();

        case 4:
            return validateStepFour();

        case 5:
            return true;

        case 6:
            return validateStepSix();

        case 7:
            return validateStepSeven();

        default:
            return true;
    }
}


/* =========================================
   OCCASION LOGIC
========================================= */

function updateOtherOccasionVisibility() {
    getElement(
        "#otherOccasionField"
    )?.classList.toggle(
        "is-hidden",
        builderState.occasion !== "Other"
    );
}


/* =========================================
   GUEST RECOMMENDATION
========================================= */

function updateGuestRecommendation() {
    const recommendation = getElement(
        "#guestRecommendation"
    );

    if (!recommendation) {
        return;
    }

    const guests = Number(
        builderState.guestCount
    );

    if (!guests || guests < 1) {
        recommendation.classList.add(
            "is-hidden"
        );

        recommendation.textContent = "";

        return;
    }

    let message = "";

    if (guests <= 6) {
        message =
            'A 4" Mini Indulgence Cake may fit this guest count.';
    } else if (guests <= 12) {
        message =
            'A standard 6" cake may fit this guest count.';
    } else if (guests <= 18) {
        message =
            'A tall 6" cake may fit this guest count.';
    } else if (guests <= 20) {
        message =
            'A standard 8" cake may fit this guest count.';
    } else if (guests <= 28) {
        message =
            'A tall 8" cake may fit this guest count.';
    } else if (guests <= 38) {
        message =
            'A 9" cake may fit this guest count.';
    } else if (guests <= 50) {
        message =
            'A 10" cake may fit this guest count.';
    } else {
        message =
            "This guest count may require multiple cakes, a tiered design, or extra desserts.";
    }

    recommendation.textContent = message;

    recommendation.classList.remove(
        "is-hidden"
    );
}


/* =========================================
   RUSH LOGIC
========================================= */

function calculateDaysUntilFulfillment() {
    if (!builderState.fulfillmentDate) {
        return null;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const fulfillmentDate = new Date(
        `${builderState.fulfillmentDate}T00:00:00`
    );

    if (
        Number.isNaN(
            fulfillmentDate.getTime()
        )
    ) {
        return null;
    }

    return Math.ceil(
        (
            fulfillmentDate.getTime() -
            today.getTime()
        ) / 86400000
    );
}


function updateRushFee() {
    const daysUntilFulfillment =
        calculateDaysUntilFulfillment();

    const isRush =
        daysUntilFulfillment !== null &&
        daysUntilFulfillment >= 0 &&
        daysUntilFulfillment < 5;

    builderState.rushFee =
        isRush ? 75 : 0;

    getElement(
        "#rushOrderNotice"
    )?.classList.toggle(
        "is-hidden",
        !isRush
    );

    renderCakePreview();
}


/* =========================================
   CAKE SHAPE AND SIZE
========================================= */

function showCakeSizeGroup(shape) {
    const groups = {
        round: getElement(
            "#roundSizeOptions"
        ),

        heart: getElement(
            "#heartSizeOptions"
        ),

        star: getElement(
            "#starSizeOptions"
        )
    };

    Object.entries(groups).forEach(
        ([groupShape, element]) => {
            element?.classList.toggle(
                "is-hidden",
                groupShape !== shape
            );
        }
    );
}


function chooseDefaultCakeForShape(shape) {
    const defaultProducts = {
        round: "round-6",
        heart: "heart-6",
        star: "star-8"
    };

    const productId =
        defaultProducts[shape] ||
        "round-6";

    builderState.cakeProductId =
        productId;

    builderState.isTall = false;

    if (extraLayerToggle) {
        extraLayerToggle.checked = false;
    }

    const sizeInput = getElement(
        `input[name="cakeSize"][value="${productId}"]`
    );

    if (sizeInput) {
        sizeInput.checked = true;
    }
}


function updateCakeSelection(input) {
    const product =
        cakeProducts[input.value];

    if (!product) {
        return;
    }

    builderState.cakeProductId =
        input.value;

    builderState.cakeShape =
        product.shape;

    builderState.isTall = false;

    if (extraLayerToggle) {
        extraLayerToggle.checked = false;
    }

    renderCakePreview();
}


/* =========================================
   CUSTOM FLAVOR FIELDS
========================================= */

function updateCustomCakeFlavorVisibility() {
    getElement(
        "#customCakeFlavorField"
    )?.classList.toggle(
        "is-hidden",
        builderState.cakeFlavor !==
            "Custom Flavor"
    );
}


function updateCustomFillingVisibility() {
    getElement(
        "#customFillingField"
    )?.classList.toggle(
        "is-hidden",
        builderState.cakeFilling !==
            "Custom Filling"
    );
}


/* =========================================
   FLOWER AND TOPPER OPTIONS
========================================= */

function updateFlowerSourceVisibility() {
    const flowersSelected =
        builderState.decorations.some(
            (decoration) =>
                decoration.id ===
                "flowersDecoration"
        );

    getElement(
        "#flowerSourceOptions"
    )?.classList.toggle(
        "is-hidden",
        !flowersSelected
    );

    if (!flowersSelected) {
        builderState.flowerSource = "";

        getElements(
            'input[name="flowerSource"]'
        ).forEach((input) => {
            input.checked = false;
        });
    }
}


function updateTopperOptionsVisibility() {
    const topperCheckbox = getElement(
        "#topperDecorationOption"
    );

    const topperSelected =
        Boolean(topperCheckbox?.checked);

    getElement(
        "#topperTypeOptions"
    )?.classList.toggle(
        "is-hidden",
        !topperSelected
    );

    if (!topperSelected) {
        builderState.topperType = "";
        builderState.topperPrice = 0;
        builderState.topperWording = "";

        getElements(
            'input[name="topperType"]'
        ).forEach((input) => {
            input.checked = false;
        });

        const wordingInput = getElement(
            "#topperWording"
        );

        if (wordingInput) {
            wordingInput.value = "";
        }
    }

    renderCakePreview();
}


/* =========================================
   EXTRAS
========================================= */

function updateCheckboxExtras() {
    builderState.extras = getElements(
        "[data-extra-name]"
    )
        .filter((input) => input.checked)
        .map((input) => ({
            name: input.dataset.extraName,
            price:
                Number(input.dataset.price) ||
                0
        }));

    renderCakePreview();
}


function updateQuantityExtras() {
    builderState.quantityExtras =
        getElements(".quantity-product")
            .map((productRow) => {
                const quantityInput =
                    productRow.querySelector(
                        'input[type="number"]'
                    );

                const quantity = Math.max(
                    0,
                    Number.parseInt(
                        quantityInput?.value || "0",
                        10
                    ) || 0
                );

                const unitPrice =
                    Number(
                        productRow.dataset
                            .unitPrice
                    ) || 0;

                return {
                    name:
                        productRow.dataset
                            .productName ||
                        "Extra",

                    quantity,
                    unitPrice,
                    total:
                        quantity * unitPrice
                };
            })
            .filter(
                (extra) =>
                    extra.quantity > 0
            );

    renderCakePreview();
}


/* =========================================
   DELIVERY
========================================= */

function calculateDeliveryFee(miles) {
    const safeMiles = Math.max(
        0,
        Number(miles) || 0
    );

    if (safeMiles <= 0) {
        return 0;
    }

    if (safeMiles <= 5) {
        return 10;
    }

    if (safeMiles <= 10) {
        return 15;
    }

    if (safeMiles <= 15) {
        return 20;
    }

    if (safeMiles <= 20) {
        return 25;
    }

    if (safeMiles <= 25) {
        return 30;
    }

    return 35;
}


function updateDeliveryFieldsVisibility() {
    const isDelivery =
        builderState.fulfillmentMethod ===
        "Delivery";

    getElement(
        "#deliveryAddressFields"
    )?.classList.toggle(
        "is-hidden",
        !isDelivery
    );

    if (!isDelivery) {
        builderState.deliveryMiles = 0;
        builderState.deliveryFee = 0;
    }

    updateDeliveryEstimate();
}


function updateDeliveryEstimate() {
    const notice = getElement(
        "#deliveryEstimateNotice"
    );

    if (
        builderState.fulfillmentMethod !==
        "Delivery"
    ) {
        builderState.deliveryFee = 0;

        if (notice) {
            notice.textContent = "";

            notice.classList.add(
                "is-hidden"
            );
        }

        renderCakePreview();

        return;
    }

    builderState.deliveryFee =
        calculateDeliveryFee(
            builderState.deliveryMiles
        );

    if (notice) {
        if (builderState.deliveryMiles > 0) {
            notice.textContent =
                `Estimated local delivery fee: ${formatCurrency(builderState.deliveryFee)}. Final distance will be confirmed after review.`;

            notice.classList.remove(
                "is-hidden"
            );
        } else {
            notice.textContent = "";

            notice.classList.add(
                "is-hidden"
            );
        }
    }

    renderCakePreview();
}


/* =========================================
   BUDGET NOTICE
========================================= */

function getBudgetUpperLimit(value) {
    switch (value) {
        case "Under $250":
            return 249;

        case "$250–$349":
            return 349;

        case "$350–$499":
            return 499;

        case "$500+":
            return Number.POSITIVE_INFINITY;

        default:
            return null;
    }
}


function updateBudgetNotice() {
    const notice = getElement(
        "#budgetNotice"
    );

    if (!notice) {
        return;
    }

    const upperLimit =
        getBudgetUpperLimit(
            builderState.customerBudget
        );

    if (
        upperLimit === null ||
        builderState.customerBudget ===
            "Not Sure"
    ) {
        notice.textContent = "";

        notice.classList.add("is-hidden");

        return;
    }

    const estimate =
        calculateEstimatedTotal();

    if (estimate > upperLimit) {
        notice.textContent =
            `Your current starting estimate is ${formatCurrency(estimate)}, which is above the selected spending range. You can revise the cake size or selected details before submitting.`;

        notice.classList.remove(
            "is-hidden"
        );
    } else {
        notice.textContent = "";

        notice.classList.add("is-hidden");
    }
}


/* =========================================
   INSPIRATION UPLOADS
========================================= */

const maximumUploadCount = 5;
const maximumFileSize =
    8 * 1024 * 1024;


function fileTypeIsAllowed(file) {
    return [
        "image/jpeg",
        "image/png",
        "image/webp"
    ].includes(file.type);
}


function addInspirationFiles(fileList) {
    const errorMessage = getElement(
        "#uploadErrorMessage"
    );

    if (errorMessage) {
        errorMessage.textContent = "";
    }

    const incomingFiles =
        Array.from(fileList);

    for (const file of incomingFiles) {
        if (
            builderState.inspirationFiles
                .length >= maximumUploadCount
        ) {
            if (errorMessage) {
                errorMessage.textContent =
                    "You can upload up to five inspiration images.";
            }

            break;
        }

        if (!fileTypeIsAllowed(file)) {
            if (errorMessage) {
                errorMessage.textContent =
                    "Only JPG, PNG, and WebP images are accepted.";
            }

            continue;
        }

        if (file.size > maximumFileSize) {
            if (errorMessage) {
                errorMessage.textContent =
                    `${file.name} is larger than 8 MB.`;
            }

            continue;
        }

        const duplicateExists =
            builderState.inspirationFiles.some(
                (upload) =>
                    upload.file.name ===
                        file.name &&
                    upload.file.size ===
                        file.size
            );

        if (duplicateExists) {
            continue;
        }

        builderState.inspirationFiles.push({
            id:
                `${Date.now()}-${Math.random().toString(16).slice(2)}`,

            file,

            previewUrl:
                URL.createObjectURL(file),

            note: ""
        });
    }

    renderInspirationPreviews();
}


function removeInspirationFile(uploadId) {
    const index =
        builderState.inspirationFiles.findIndex(
            (upload) =>
                upload.id === uploadId
        );

    if (index === -1) {
        return;
    }

    URL.revokeObjectURL(
        builderState.inspirationFiles[
            index
        ].previewUrl
    );

    builderState.inspirationFiles.splice(
        index,
        1
    );

    renderInspirationPreviews();
}


function renderInspirationPreviews() {
    const previewGrid = getElement(
        "#inspirationPreviewGrid"
    );

    if (!previewGrid) {
        return;
    }

    previewGrid.innerHTML = "";

    builderState.inspirationFiles.forEach(
        (upload) => {
            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "inspiration-preview-card";

            const image =
                document.createElement("img");

            image.src = upload.previewUrl;
            image.alt =
                "Uploaded cake inspiration";

            const removeButton =
                document.createElement(
                    "button"
                );

            removeButton.type = "button";
            removeButton.className =
                "remove-upload-button";

            removeButton.setAttribute(
                "aria-label",
                "Remove inspiration image"
            );

            removeButton.textContent = "×";

            removeButton.addEventListener(
                "click",
                () => {
                    removeInspirationFile(
                        upload.id
                    );
                }
            );

            const note =
                document.createElement(
                    "textarea"
                );

            note.placeholder =
                "What do you like about this photo?";

            note.value = upload.note;

            note.addEventListener(
                "input",
                () => {
                    upload.note = note.value;
                }
            );

            card.append(
                image,
                removeButton,
                note
            );

            previewGrid.appendChild(card);
        }
    );
}


/* =========================================
   REVIEW HELPERS
========================================= */

function getDisplayOccasion() {
    if (
        builderState.occasion === "Other"
    ) {
        return (
            builderState.otherOccasion.trim() ||
            "Other"
        );
    }

    return (
        builderState.occasion ||
        "Not selected"
    );
}


function getDisplayCakeFlavor() {
    if (
        builderState.cakeFlavor ===
        "Custom Flavor"
    ) {
        return (
            builderState.customCakeFlavor.trim() ||
            "Custom flavor"
        );
    }

    return (
        builderState.cakeFlavor ||
        "Not selected"
    );
}


function getDisplayFilling() {
    if (
        builderState.cakeFilling ===
        "Custom Filling"
    ) {
        return (
            builderState.customFilling.trim() ||
            "Custom filling"
        );
    }

    return (
        builderState.cakeFilling ||
        "Not selected"
    );
}


function getExtrasSummary() {
    const extras = [];

    builderState.extras.forEach(
        (extra) => {
            extras.push(
                `${extra.name} (${formatCurrency(extra.price)})`
            );
        }
    );

    builderState.quantityExtras.forEach(
        (extra) => {
            extras.push(
                `${extra.quantity} × ${extra.name} (${formatCurrency(extra.total)})`
            );
        }
    );

    return extras.length
        ? extras.join(", ")
        : "No extras selected.";
}


function populateReviewUploads() {
    const container = getElement(
        "#reviewUploadPreviews"
    );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (
        builderState.inspirationFiles
            .length === 0
    ) {
        const message =
            document.createElement("p");

        message.textContent =
            "No inspiration photos uploaded.";

        container.appendChild(message);

        return;
    }

    builderState.inspirationFiles.forEach(
        (upload) => {
            const image =
                document.createElement("img");

            image.src = upload.previewUrl;

            image.alt =
                "Uploaded inspiration preview";

            container.appendChild(image);
        }
    );
}


/* =========================================
   POPULATE REVIEW
========================================= */

function populateReview() {
    const product = getSelectedCakeProduct();

    const shapeName =
        product.shape.charAt(0).toUpperCase() +
        product.shape.slice(1);

    const layerCount = getCakeLayerCount();

    setText(
        "#reviewOccasion",
        getDisplayOccasion()
    );

    setText(
        "#reviewEventDate",
        formatDate(
            builderState.eventDate
        )
    );

    setText(
        "#reviewFulfillmentDate",
        formatDate(
            builderState.fulfillmentDate
        )
    );

    setText(
        "#reviewGuestCount",
        builderState.guestCount
            ? String(builderState.guestCount)
            : "Not entered"
    );

    setText(
        "#reviewCakeSelection",
        product.name
    );

    setText(
        "#reviewCakeShape",
        `${shapeName} · ${builderState.isTall ? "Tall" : "Standard"} · ${layerCount} ${layerCount === 1 ? "layer" : "layers"}`
    );

    setText(
        "#reviewServings",
        getCakeServings()
    );

    setText(
        "#reviewCakeFlavor",
        getDisplayCakeFlavor()
    );

    const buttercreamSummary = [
        builderState.buttercreamStyle ||
            "Not selected",

        builderState.buttercreamFlavor.trim()
    ]
        .filter(Boolean)
        .join(" · ");

    setText(
        "#reviewButtercream",
        buttercreamSummary
    );

    setText(
        "#reviewFilling",
        getDisplayFilling()
    );

    setText(
        "#reviewPremiumFilling",
        builderState.premiumFillings.length
            ? builderState.premiumFillings
                  .map(
                      (filling) =>
                          filling.name
                  )
                  .join(", ")
            : "None"
    );

    setText(
        "#reviewColors",
        `${builderState.mainCakeColor} main · ${builderState.accentColor} accent`
    );

    setText(
        "#reviewFinish",
        builderState.cakeFinish ||
            "Not selected"
    );

    setText(
        "#reviewDecorations",
        builderState.decorations.length
            ? builderState.decorations
                  .map(
                      (decoration) =>
                          decoration.name
                  )
                  .join(", ")
            : "None selected"
    );

    const topperSummary =
        builderState.topperType
            ? `${builderState.topperType}${builderState.topperWording.trim() ? ` · “${builderState.topperWording.trim()}”` : ""}`
            : "None";

    setText(
        "#reviewTopper",
        topperSummary
    );

    setText(
        "#reviewExtras",
        getExtrasSummary()
    );

    setText(
        "#reviewTheme",
        builderState.cakeTheme.trim() ||
            "Not entered"
    );

    setText(
        "#reviewCakeWording",
        builderState.cakeWording.trim() ||
            "Not entered"
    );

    setText(
        "#reviewCustomerName",
        builderState.customerName.trim() ||
            "Not entered"
    );

    const fulfillmentSummary =
        builderState.fulfillmentMethod ===
        "Delivery"
            ? `Delivery to ${builderState.deliveryCity || "entered address"}`
            : builderState.fulfillmentMethod ||
              "Not selected";

    setText(
        "#reviewFulfillmentMethod",
        fulfillmentSummary
    );

    setText(
        "#reviewBudget",
        builderState.customerBudget ||
            "Not selected"
    );

    setText(
        "#reviewCakeSubtotal",
        formatCurrency(
            calculateCakeSubtotal()
        )
    );

    setText(
        "#reviewExtrasSubtotal",
        formatCurrency(
            calculateExtrasTotal()
        )
    );

    setText(
        "#reviewRushFee",
        formatCurrency(
            builderState.rushFee
        )
    );

    setText(
        "#reviewDeliveryFee",
        formatCurrency(
            builderState.deliveryFee
        )
    );

    setText(
        "#reviewEstimatedTotal",
        formatCurrency(
            calculateEstimatedTotal()
        )
    );

    populateReviewUploads();
}


/* =========================================
   MOBILE SUMMARY
========================================= */

function openMobileSummary() {
    const drawer = getElement(
        "#mobileCakeSummary"
    );

    if (!drawer) {
        return;
    }

    drawer.classList.add("is-open");

    drawer.setAttribute(
        "aria-hidden",
        "false"
    );

    getElement(
        "#openCakeSummary"
    )?.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.classList.add(
        "summary-open"
    );
}


function closeMobileSummary() {
    const drawer = getElement(
        "#mobileCakeSummary"
    );

    if (!drawer) {
        return;
    }

    drawer.classList.remove("is-open");

    drawer.setAttribute(
        "aria-hidden",
        "true"
    );

    getElement(
        "#openCakeSummary"
    )?.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "summary-open"
    );
}


/* =========================================
   SUBMISSION PLACEHOLDER
========================================= */

function finalAcknowledgmentsAreChecked() {
    return [
        "#inquiryAcknowledgment",
        "#priceAcknowledgment",
        "#depositAcknowledgment",
        "#termsAcknowledgment"
    ].every(
        (selector) =>
            Boolean(
                getElement(selector)?.checked
            )
    );
}


function submitCakeVision() {
    const message = getElement(
        "#submissionMessage"
    );

    if (!finalAcknowledgmentsAreChecked()) {
        if (message) {
            message.className =
                "submission-message is-error";

            message.textContent =
                "Please acknowledge all four statements before submitting.";
        }

        return;
    }

    if (message) {
        message.className =
            "submission-message is-success";

        message.textContent =
            "The builder is working. The email and image-upload service still needs to be connected before this sends a real inquiry.";
    }

    /*
        The live form connection will later submit:

        - builderState
        - inspiration image files
        - inspiration notes
        - customer contact information
        - estimated pricing
        - selected cake details
    */
}


/* =========================================
   RESET
========================================= */

function resetBuilder() {
    const confirmed = window.confirm(
        "Reset the entire cake builder?"
    );

    if (!confirmed) {
        return;
    }
closeMobileSummary();
    builderState.inspirationFiles.forEach(
        (upload) => {
            URL.revokeObjectURL(
                upload.previewUrl
            );
        }
    );

    builderState.currentStep = 1;
    builderState.highestUnlockedStep = 1;

    builderState.occasion = "";
    builderState.otherOccasion = "";
    builderState.eventDate = "";
    builderState.fulfillmentDate = "";
    builderState.guestCount = 0;

    builderState.cakeShape = "round";
    builderState.cakeProductId = "round-6";
    builderState.isTall = false;

    builderState.cakeFlavor = "";
    builderState.customCakeFlavor = "";

    builderState.buttercreamStyle = "";
    builderState.buttercreamFlavor = "";

    builderState.cakeFilling = "";
    builderState.customFilling = "";
    builderState.premiumFillings = [];

    builderState.mainCakeColor = "original";
    builderState.accentColor = "original";
    builderState.cakeFinish = "";
    builderState.cakeBoardStyle = "round";
    builderState.cakeBoardColor = "original";
    builderState.cupcakeLinerStyle = "paper";
    builderState.cupcakeFrostingStyle = "";
    builderState.cupcakeLinerColor = "original";
    builderState.cupcakeFrostingColor = "original";

    builderState.decorations = [];
    builderState.flowerSource = "";

    builderState.topperType = "";
    builderState.topperPrice = 0;
    builderState.topperWording = "";

    builderState.extras = [];
    builderState.quantityExtras = [];
    builderState.inspirationFiles = [];

    builderState.cakeNameText = "";
    builderState.cakeAgeText = "";
    builderState.cakeWording = "";
    builderState.cakeTheme = "";
    builderState.cakeVision = "";
    builderState.mustHaveDetails = "";
    builderState.doNotInclude = "";

    builderState.customerName = "";
    builderState.customerPhone = "";
    builderState.customerEmail = "";
    builderState.preferredContactMethod = "";

    builderState.fulfillmentMethod = "";
    builderState.deliveryStreet = "";
    builderState.deliveryCity = "";
    builderState.deliveryState = "Texas";
    builderState.deliveryZip = "";
    builderState.deliveryMiles = 0;

    builderState.customerBudget = "";
    builderState.rushFee = 0;
    builderState.deliveryFee = 0;

    getElements(
        'input[type="radio"], input[type="checkbox"]'
    ).forEach((input) => {
        input.checked = false;
    });

    getElements(
        'input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="date"], textarea, select'
    ).forEach((field) => {
        if (field.id === "deliveryState") {
            field.value = "Texas";
        } else if (
            field.closest(".quantity-product")
        ) {
            field.value = "0";
        } else {
            field.value = "";
        }
    });

    const roundShapeInput = getElement(
        'input[name="cakeShape"][value="round"]'
    );

    const roundSixInput = getElement(
        'input[name="cakeSize"][value="round-6"]'
    );

    if (roundShapeInput) {
        roundShapeInput.checked = true;
    }

    if (roundSixInput) {
        roundSixInput.checked = true;
    }

    if (extraLayerToggle) {
        extraLayerToggle.checked = false;
    }

    const customMainColor = getElement(
        "#customMainColor"
    );

    if (customMainColor) {
        customMainColor.value = "#FF4FA3";
    }

    const accentColor = getElement(
        "#accentColor"
    );

    if (accentColor) {
        accentColor.value = "#FF4FA3";
    }
const resetValues = {
    cakeBoardStyle: "round",
    cakeBoardColor: "original",
    cupcakeLinerStyle: "paper",
    cupcakeFrostingStyle:"",
    cupcakeLinerColor: "original",
    cupcakeFrostingColor: "original"
};
    Object.entries(resetValues).forEach(([id, value]) => {
        const control = getElement(`#${id}`);
        if (control) control.value = value;
    });

    showCakeSizeGroup("round");

    updateOtherOccasionVisibility();
    updateCustomCakeFlavorVisibility();
    updateCustomFillingVisibility();
    updateFlowerSourceVisibility();
    updateTopperOptionsVisibility();
    updateDeliveryFieldsVisibility();
    renderInspirationPreviews();
    renderCakePreview();
    showStep(1);
}


/* =========================================
   NAVIGATION EVENTS
========================================= */

nextStepButton?.addEventListener(
    "click",
    goToNextStep
);

previousStepButton?.addEventListener(
    "click",
    goToPreviousStep
);

getElements(".progress-step").forEach(
    (button) => {
        button.addEventListener(
            "click",
            () => {
                const targetStep = Number(
                    button.dataset.stepTarget
                );

                if (
                    targetStep <=
                    builderState
                        .highestUnlockedStep
                ) {
                    showStep(targetStep);
                }
            }
        );
    }
);

getElements("[data-edit-step]").forEach(
    (button) => {
        button.addEventListener(
            "click",
            () => {
                showStep(
                    Number(
                        button.dataset.editStep
                    )
                );
            }
        );
    }
);


/* =========================================
   OCCASION EVENTS
========================================= */

getElements(
    'input[name="occasion"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.occasion =
                input.value;

            updateOtherOccasionVisibility();
            updateSelectedCardStates();
        }
    );
});

getElement(
    "#otherOccasionText"
)?.addEventListener(
    "input",
    (event) => {
        builderState.otherOccasion =
            event.target.value;
    }
);

getElement("#eventDate")?.addEventListener(
    "change",
    (event) => {
        builderState.eventDate =
            event.target.value;
    }
);

getElement(
    "#fulfillmentDate"
)?.addEventListener(
    "change",
    (event) => {
        builderState.fulfillmentDate =
            event.target.value;

        updateRushFee();
    }
);

getElement("#guestCount")?.addEventListener(
    "input",
    (event) => {
        builderState.guestCount =
            Number(event.target.value) || 0;

        updateGuestRecommendation();
    }
);


/* =========================================
   CAKE EVENTS
========================================= */

getElements(
    'input[name="cakeShape"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeShape =
                input.value;

            showCakeSizeGroup(
                input.value
            );

            chooseDefaultCakeForShape(
                input.value
            );

            renderCakePreview();
        }
    );
});

getElements(
    'input[name="cakeSize"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            updateCakeSelection(input);
        }
    );
});

extraLayerToggle?.addEventListener(
    "change",
    () => {
        if (!cakeAllowsExtraLayer()) {
            extraLayerToggle.checked =
                false;

            builderState.isTall = false;

            renderCakePreview();

            return;
        }

        builderState.isTall =
            extraLayerToggle.checked;

        renderCakePreview();
    }
);


/* =========================================
   FLAVOR EVENTS
========================================= */

getElements(
    'input[name="cakeFlavor"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeFlavor =
                input.value;

            updateCustomCakeFlavorVisibility();
            updateSelectedCardStates();
        }
    );
});

getElement(
    "#customCakeFlavor"
)?.addEventListener(
    "input",
    (event) => {
        builderState.customCakeFlavor =
            event.target.value;
    }
);

getElements(
    'input[name="buttercreamStyle"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.buttercreamStyle =
                input.value;

            updateSelectedCardStates();
        }
    );
});

getElement(
    "#buttercreamFlavor"
)?.addEventListener(
    "input",
    (event) => {
        builderState.buttercreamFlavor =
            event.target.value;
    }
);

getElements(
    'input[name="cakeFilling"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeFilling =
                input.value;

            updateCustomFillingVisibility();
            updateSelectedCardStates();
        }
    );
});

getElement(
    "#customFilling"
)?.addEventListener(
    "input",
    (event) => {
        builderState.customFilling =
            event.target.value;
    }
);

getElements(
    "[data-premium-filling]"
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.premiumFillings =
                getElements(
                    "[data-premium-filling]"
                )
                    .filter(
                        (premiumInput) =>
                            premiumInput.checked
                    )
                    .map(
                        (premiumInput) => ({
                            name:
                                premiumInput
                                    .dataset
                                    .premiumFilling,

                            price:
                                Number(
                                    premiumInput
                                        .dataset
                                        .price
                                ) || 0
                        })
                    );

            renderCakePreview();
        }
    );
});


/* =========================================
   COLOR AND FINISH EVENTS
========================================= */

getElements(
    'input[name="mainCakeColor"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.mainCakeColor =
                input.value;

            renderCakePreview();
        }
    );
});

getElement(
    "#customMainColor"
)?.addEventListener(
    "input",
    (event) => {
        builderState.mainCakeColor =
            event.target.value;

        getElements(
            'input[name="mainCakeColor"]'
        ).forEach((input) => {
            input.checked = false;
        });

        renderCakePreview();
    }
);

getElement("#accentColor")?.addEventListener(
    "input",
    (event) => {
        builderState.accentColor =
            event.target.value;

        renderCakePreview();
    }
);

getElements(
    'input[name="cakeFinish"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeFinish =
                input.value;

            renderCakePreview();
        }
    );
});


/* =========================================
   DECORATION EVENTS
========================================= */

getElements(
    "[data-decoration-id]"
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.decorations =
                getElements(
                    "[data-decoration-id]"
                )
                    .filter(
                        (decorationInput) =>
                            decorationInput.checked
                    )
                    .filter(
                        (decorationInput) =>
                            decorationInput
                                .dataset
                                .decorationId !==
                            "topperDecoration"
                    )
                    .map(
                        (decorationInput) => ({
                            id:
                                decorationInput
                                    .dataset
                                    .decorationId,

                            name:
                                decorationInput
                                    .dataset
                                    .decorationName,

                            price:
                                Number(
                                    decorationInput
                                        .dataset
                                        .price
                                ) || 0
                        })
                    );

            updateFlowerSourceVisibility();
            updateTopperOptionsVisibility();
            renderCakePreview();
        }
    );
});

getElements(
    'input[name="flowerSource"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.flowerSource =
                input.value;

            updateSelectedCardStates();
        }
    );
});

getElements(
    'input[name="topperType"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.topperType =
                input.value;

            builderState.topperPrice =
                Number(
                    input.dataset.price
                ) || 0;

            renderCakePreview();
        }
    );
});

getElement(
    "#topperWording"
)?.addEventListener(
    "input",
    (event) => {
        builderState.topperWording =
            event.target.value;

        renderCakePreview();
    }
);


/* =========================================
   EXTRA EVENTS
========================================= */

[
    ["#cakeBoardStyle", "cakeBoardStyle"],
    ["#cakeBoardColor", "cakeBoardColor"],
    ["#cupcakeLinerStyle", "cupcakeLinerStyle"],
    ["#cupcakeFrostingStyle", "cupcakeFrostingStyle"],
    ["#cupcakeLinerColor", "cupcakeLinerColor"],
    ["#cupcakeFrostingColor", "cupcakeFrostingColor"]
].forEach(([selector, stateKey]) => {
    getElement(selector)?.addEventListener("input", (event) => {
        builderState[stateKey] = event.target.value;
        renderCakePreview();
    });
});

getElements(
    "[data-extra-name]"
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            if (input.checked && /^\d+ Gourmet Cupcakes$/.test(input.dataset.extraName || "")) {
                getElements("[data-extra-name]").forEach((otherInput) => {
                    if (otherInput !== input && /^\d+ Gourmet Cupcakes$/.test(otherInput.dataset.extraName || "")) {
                        otherInput.checked = false;
                    }
                });
            }
            updateCheckboxExtras();
        }
    );
});

getElements(".quantity-product").forEach(
    (row) => {
        const input = row.querySelector(
            'input[type="number"]'
        );

        const decreaseButton =
            row.querySelector(
                '[data-quantity-action="decrease"]'
            );

        const increaseButton =
            row.querySelector(
                '[data-quantity-action="increase"]'
            );

        decreaseButton?.addEventListener(
            "click",
            () => {
                const nextValue = Math.max(
                    0,
                    Number(input.value) - 1
                );

                input.value =
                    String(nextValue);

                updateQuantityExtras();
            }
        );

        increaseButton?.addEventListener(
            "click",
            () => {
                const nextValue =
                    Math.max(
                        0,
                        Number(input.value)
                    ) + 1;

                input.value =
                    String(nextValue);

                updateQuantityExtras();
            }
        );

        input?.addEventListener(
            "input",
            () => {
                const safeValue = Math.max(
                    0,
                    Number.parseInt(
                        input.value || "0",
                        10
                    ) || 0
                );

                input.value =
                    String(safeValue);

                updateQuantityExtras();
            }
        );
    }
);


/* =========================================
   UPLOAD EVENTS
========================================= */

const inspirationFileInput = getElement(
    "#inspirationFiles"
);

const inspirationUploadZone = getElement(
    "#inspirationUploadZone"
);

getElement(
    "#chooseInspirationFiles"
)?.addEventListener(
    "click",
    () => {
        inspirationFileInput?.click();
    }
);

inspirationFileInput?.addEventListener(
    "change",
    (event) => {
        addInspirationFiles(
            event.target.files
        );

        event.target.value = "";
    }
);

[
    "dragenter",
    "dragover"
].forEach((eventName) => {
    inspirationUploadZone?.addEventListener(
        eventName,
        (event) => {
            event.preventDefault();

            inspirationUploadZone.classList.add(
                "is-dragging"
            );
        }
    );
});

[
    "dragleave",
    "drop"
].forEach((eventName) => {
    inspirationUploadZone?.addEventListener(
        eventName,
        (event) => {
            event.preventDefault();

            inspirationUploadZone.classList.remove(
                "is-dragging"
            );
        }
    );
});

inspirationUploadZone?.addEventListener(
    "drop",
    (event) => {
        addInspirationFiles(
            event.dataTransfer.files
        );
    }
);


/* =========================================
   DETAIL FIELD EVENTS
========================================= */

const simpleFieldBindings = {
    cakeNameText: "cakeNameText",
    cakeAgeText: "cakeAgeText",
    cakeWording: "cakeWording",
    cakeTheme: "cakeTheme",
    cakeVision: "cakeVision",
    mustHaveDetails: "mustHaveDetails",
    doNotInclude: "doNotInclude",

    customerName: "customerName",
    customerPhone: "customerPhone",
    customerEmail: "customerEmail",

    deliveryStreet: "deliveryStreet",
    deliveryCity: "deliveryCity",
    deliveryState: "deliveryState",
    deliveryZip: "deliveryZip"
};

Object.entries(
    simpleFieldBindings
).forEach(
    ([elementId, stateKey]) => {
        getElement(
            `#${elementId}`
        )?.addEventListener(
            "input",
            (event) => {
                builderState[stateKey] =
                    event.target.value;
            }
        );
    }
);

getElement(
    "#preferredContactMethod"
)?.addEventListener(
    "change",
    (event) => {
        builderState.preferredContactMethod =
            event.target.value;
    }
);

getElements(
    'input[name="fulfillmentMethod"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.fulfillmentMethod =
                input.value;

            updateDeliveryFieldsVisibility();
            updateSelectedCardStates();
        }
    );
});

getElement(
    "#deliveryMiles"
)?.addEventListener(
    "input",
    (event) => {
        builderState.deliveryMiles =
            Number(event.target.value) || 0;

        updateDeliveryEstimate();
    }
);

getElements(
    'input[name="customerBudget"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.customerBudget =
                input.value;

            updateBudgetNotice();
            updateSelectedCardStates();
        }
    );
});


/* =========================================
   SUMMARY, RESET, SUBMIT
========================================= */

getElement(
    "#openCakeSummary"
)?.addEventListener(
    "click",
    openMobileSummary
);

getElement(
    "#closeCakeSummary"
)?.addEventListener(
    "click",
    closeMobileSummary
);

getElement(
    "#closeCakeSummaryButton"
)?.addEventListener(
    "click",
    closeMobileSummary
);

getElement(
    "#resetCakeBuilder"
)?.addEventListener(
    "click",
    resetBuilder
);

getElement(
    "#submitCakeVision"
)?.addEventListener(
    "click",
    submitCakeVision
);


/* =========================================
   INITIALIZE
========================================= */

function initializeBuilder() {
    showCakeSizeGroup("round");

    updateOtherOccasionVisibility();
    updateCustomCakeFlavorVisibility();
    updateCustomFillingVisibility();
    updateFlowerSourceVisibility();
    updateTopperOptionsVisibility();
    updateDeliveryFieldsVisibility();

    renderInspirationPreviews();
    renderCakePreview();
    showStep(1);
}


initializeBuilder();
