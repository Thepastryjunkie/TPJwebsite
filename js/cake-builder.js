


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
        standardPrice: 145,
        tallPrice: 145,
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
    },

    "tier-4-6-standard": {
        name: '4" + 6" Two-Tier Cake',
        shape: "tier",
        size: '4" + 6"',
        standardLayers: 2,
        tallLayers: 2,
        standardPrice: 300,
        tallPrice: 300,
        standardServings: "12–18",
        tallServings: "12–18",
        heightLabel: "Standard Tiers",
        structureLabel: "2 layers per tier",
        previewFile: "TPJ-Asset-007-Blank-Two-Tier-4in-6in-Cake.png",
        previewKey: "tier",
        allowsExtraLayer: false
    },

    "tier-4-6-tall": {
        name: '4" Tall + 6" Tall Two-Tier Cake',
        shape: "tier",
        size: '4" + 6" Tall',
        standardLayers: 3,
        tallLayers: 3,
        standardPrice: 360,
        tallPrice: 360,
        standardServings: "18–26",
        tallServings: "18–26",
        heightLabel: "Tall Tiers",
        structureLabel: "3 layers per tier",
        previewFile: "TPJ-Asset-013-Blank-Tall-Two-Tier-4in-6in-Cake.png",
        previewKey: "tallTier",
        allowsExtraLayer: false
    },

    "cupcakes-4": {
        name: "4 Gourmet Cupcakes",
        shape: "cupcakes",
        size: "4 Count",
        standardLayers: 0,
        tallLayers: 0,
        standardPrice: 20,
        tallPrice: 20,
        standardServings: "4 cupcakes",
        tallServings: "4 cupcakes",
        cupcakeCount: 4,
        heightLabel: "4 Count",
        structureLabel: "4 individually decorated cupcakes",
        previewFile: "TPJ-Asset-028-Blank-4-Count-Cupcake-Box.png",
        previewKey: "cupcakes4",
        allowsExtraLayer: false
    },

    "cupcakes-8": {
        name: "8 Gourmet Cupcakes",
        shape: "cupcakes",
        size: "8 Count",
        standardLayers: 0,
        tallLayers: 0,
        standardPrice: 40,
        tallPrice: 40,
        standardServings: "8 cupcakes",
        tallServings: "8 cupcakes",
        cupcakeCount: 8,
        heightLabel: "8 Count",
        structureLabel: "8 individually decorated cupcakes",
        previewFile: "TPJ-Asset-029-Blank-8-Count-Cupcake-Box.png",
        previewKey: "cupcakes8",
        allowsExtraLayer: false
    },

    "cupcakes-12": {
        name: "12 Gourmet Cupcakes",
        shape: "cupcakes",
        size: "12 Count",
        standardLayers: 0,
        tallLayers: 0,
        standardPrice: 60,
        tallPrice: 60,
        standardServings: "12 cupcakes",
        tallServings: "12 cupcakes",
        cupcakeCount: 12,
        heightLabel: "12 Count",
        structureLabel: "12 individually decorated cupcakes",
        previewFile: "TPJ-Asset-030-Blank-12-Count-Cupcake-Box.png",
        previewKey: "cupcakes12",
        allowsExtraLayer: false
    },

    "square-6": {
        name: '6" Square Cake',
        shape: "square",
        size: '6"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 195,
        tallPrice: 225,
        standardServings: "10–14",
        tallServings: "14–18",
        allowsExtraLayer: true
    },

    "square-8": {
        name: '8" Square Cake',
        shape: "square",
        size: '8"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 265,
        tallPrice: 305,
        standardServings: "20–26",
        tallServings: "28–36",
        allowsExtraLayer: true
    },

    "square-10": {
        name: '10" Square Cake',
        shape: "square",
        size: '10"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 365,
        tallPrice: 425,
        standardServings: "38–50",
        tallServings: "50–65",
        allowsExtraLayer: true
    },

    "sheet-half": {
        name: "1/2 Sheet Cake",
        shape: "sheet",
        size: "1/2 Sheet",
        standardLayers: 2,
        tallLayers: 2,
        standardPrice: 245,
        tallPrice: 245,
        standardServings: "40–50",
        tallServings: "40–50",
        allowsExtraLayer: false
    },

    "sheet-full": {
        name: "Full Sheet Cake",
        shape: "sheet",
        size: "Full Sheet",
        standardLayers: 2,
        tallLayers: 2,
        standardPrice: 385,
        tallPrice: 385,
        standardServings: "70–90",
        tallServings: "70–90",
        allowsExtraLayer: false
    },

    "number-letter-single": {
        name: "Single Number / Letter Cake",
        shape: "numberLetter",
        size: "Single",
        standardLayers: 2,
        tallLayers: 2,
        standardPrice: 185,
        tallPrice: 185,
        standardServings: "15–20",
        tallServings: "15–20",
        characterCount: 1,
        allowsExtraLayer: false
    },

    "number-letter-double": {
        name: "Double Number / Letter Cake",
        shape: "numberLetter",
        size: "Double",
        standardLayers: 2,
        tallLayers: 2,
        standardPrice: 335,
        tallPrice: 335,
        standardServings: "30–40",
        tallServings: "30–40",
        characterCount: 2,
        allowsExtraLayer: false
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
    bentoCupcakeCount: 4,
    isTall: false,
    fondantEnabled: false,
    numberLetterKind: "number",
    numberCakeFirst: "0",
    numberCakeSecond: "1",
    letterCakeText: "A",
    numberLetterStyle: "",

    cakeFlavor: "",
    customCakeFlavor: "",

    buttercreamStyle: "",
    buttercreamFlavor: "",

    cakeFilling: "",
    customFilling: "",
    premiumFillings: [],

mainCakeColor: "original",
customMainColor: "#F7B6D2",
mainCakeUsesCustomShade: false,

accentColor: "#F7B6D2",

cakeBorderStyle: "",
cakeBorderPlacement: "both",
cakeBorderColor: "#F7B6D2",
cakeBorderUsesCustomShade: false,
customCakeBorderColor: "#F7B6D2",
cakeBorderSprinkles: false,

finishAccentOne: "#F7B6D2",
finishAccentTwo: "#D9C2F0",

cakeFinish: "",
cakeCoverage: "full",

tierTopColor: "original",
tierBottomColor: "original",

characterOneColor: "original",
characterTwoColor: "original",

cakeBoardStyle: "round",
cakeBoardColor: "#FFFFFF",
matchBoardToCakePalette: false,

cupcakeLinerStyle: "paper",
cupcakeFrostingStyle: "",
cupcakeLinerColor: "#FFFFFF",
cupcakeFrostingColor: "original",
cupcakeFrostingUsesCustomShade: false,
customCupcakeFrostingColor: "#F7B6D2",

decorations: [],

decorationQuantities: {
    ribbonDecoration: 1,
    butterfliesDecoration: 1,
    flowersDecoration: 1,
    cherriesDecoration: 1,
    macaronsDecoration: 1,
    discoBallsDecoration: 1
},
flowerSource: "",

bowColor: "#F7B6D2",
butterflyColor: "#F7B6D2",

cherryColor: "#E5172F",
cherryGlitter: "No",

dripChocolateType: "Milk Chocolate",
whiteChocolateColored: "No",
whiteChocolateDripColor: "#F7B6D2",
dripColor: "#84563C",

pearlColor: "#FFF7F2",

flowerColor: "#FFF3D6",
flowerType: "",
customFlowerType: "",
metallicLeafType: "Gold",
cakeTopperEnabled: false,
    topperType: "",
    topperPrice: 0,
    topperWording: "",

    extras: [],
    quantityExtras: [],

    inspirationFiles: [],

  edibleImageEnabled: false,
edibleImageQuantity: 1,
edibleImages: [],
edibleImageFile: null,
edibleImageUrl: "",
edibleImagePlacement: "front",
edibleImageTier: "bottom",
edibleImageShape: "original",
edibleImageScale: 70,
edibleImageX: 0,
edibleImageY: 0,
edibleImageRotation: 0,

toyFigurineEnabled: false,
toyFigurineDetails: "",
sculptedPiecesEnabled: false,
sculptedPiecesDetails: "", 

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
const cakeAssetVersion = "?v=tpj-definition-borders-20260814-2"; "?v=tpj-surgical-fixes-20260813-1";

const cakeAssetMap = {
    round: { standard: "TPJ-Asset-001-Blank-Round-Cake.png", tall: "TPJ-Asset-009-Blank-Tall-Round-3-Layer-Cake.png", key: "round", tallKey: "tallRound" },
    heart: { standard: "TPJ-Asset-002-Blank-Heart-Cake.png", tall: "TPJ-Asset-010-Blank-Tall-Heart-3-Layer-Cake.png", key: "heart", tallKey: "tallHeart" },
    star: { standard: "TPJ-Asset-003-Blank-Star-Cake.png", tall: "TPJ-Asset-012-Blank-Tall-Star-3-Layer-Cake.png", key: "star", tallKey: "tallStar" },
    square: { standard: "TPJ-Asset-004-Blank-Square-Cake.png", tall: "TPJ-Asset-011-Blank-Tall-Square-3-Layer-Cake.png", key: "square", tallKey: "tallSquare" }
};

const sheetAssetMap = {
    "sheet-half": {
        file: "TPJ-Asset-005-Blank-Half-Sheet-Cake.png",
        key: "halfSheet"
    },
    "sheet-full": {
        file: "TPJ-Asset-006-Blank-Full-Sheet-Cake.png",
        key: "fullSheet"
    }
};

const numberCakeAssetMap = {
    "0": ["TPJ-Asset-014-Blank-Number-0-Cake.png", "number0"],
    "1": ["TPJ-Asset-015-Blank-Number-1-Cake.png", "number1"],
    "2": ["TPJ-Asset-016-Blank-Number-2-Cake.png", "number2"],
    "3": ["TPJ-Asset-017-Blank-Number-3-Cake.png", "number3"],
    "4": ["TPJ-Asset-018-Blank-Number-4-Cake.png", "number4"],
    "5": ["TPJ-Asset-019-Blank-Number-5-Cake.png", "number5"],
    "6": ["TPJ-Asset-020-Blank-Number-6-Cake.png", "number6"],
    "7": ["TPJ-Asset-021-Blank-Number-7-Cake.png", "number7"],
    "8": ["TPJ-Asset-022-Blank-Number-8-Cake.png", "number8"],
    "9": ["TPJ-Asset-023-Blank-Number-9-Cake.png", "number9"]
};

const boardAssetMap = {
    round: ["TPJ-Asset-033-Round-Cake-Board.png", "TPJ-Asset-033-Round-Cake-Board-Recolor-Mask.png"],
    square: ["TPJ-Asset-034-Square-Cake-Board.png", "TPJ-Asset-034-Square-Cake-Board-Recolor-Mask.png"],
    rectangleHorizontal: ["TPJ-Asset-037-Rectangle-Horizontal-Cake-Board.png", "TPJ-Asset-037-Rectangle-Horizontal-Cake-Board-Recolor-Mask.png"],
    letterNumber: ["TPJ-Asset-044-Letter-Number-Cake-Board.png", "TPJ-Asset-044-Letter-Number-Cake-Board-Recolor-Mask.png"]
};

const cakePlacements = {
    round: { round:[118.1462,153.004,.810277], square:[130.5573,169.1502,.790514], rectangleHorizontal:[118.1462,-106.996,.810277] },
    heart: { round:[145.5955,166.2172,.76779], square:[157.3371,182.0412,.749064], rectangleHorizontal:[145.5955,-93.7828,.76779] },
    star: { round:[161.04,221.6379,.746133], square:[172.4049,236.1101,.727934], rectangleHorizontal:[161.04,-38.3621,.746133] },
    tallRound: { round:[55.9934,-65.7743,.90708], square:[55.9934,-70.7743,.90708], rectangleHorizontal:[55.9934,-325.7743,.90708] },
    tallHeart: { round:[130.8091,93.2498,.790743], square:[142.9113,110.8534,.771456], rectangleHorizontal:[130.8091,-166.7502,.790743] },
    tallStar: { round:[126.8638,96.3035,.797665], square:[139.0623,113.8327,.77821], rectangleHorizontal:[126.8638,-163.6965,.797665] },
    square: { square:[157.597,200.0746,.746269], rectangleHorizontal:[145.8619,-75.2985,.764925] },
  tallSquare: {
    square: [54, -35, 0.90],
    rectangleHorizontal: [54, -290, 0.90]
},
    tier: { round:[88,40,.87], square:[100,55,.84], rectangleHorizontal:[88,-220,.87] },
    tallTier: { round:[75,0,.88], square:[78,4,.87], rectangleHorizontal:[75,-260,.88] },
    halfSheet: { rectangleHorizontal:[159.0955,248.2004,.762644] },
    fullSheet: { rectangleHorizontal:[179.5674,316.6618,.712675] },
    number0: { letterNumber:[163.2443,21.1758,.742009] },
    number1: { letterNumber:[155.4427,9.6082,.744368] },
    number2: { letterNumber:[160.6533,9.6082,.744368] },
    number3: { letterNumber:[164.3592,14,.737864] },
    number4: { letterNumber:[186.8887,47.667,.68929] },
    number5: { letterNumber:[164.808,13.3366,.737148] },
    number6: { letterNumber:[165.5975,13.3429,.730067] },
    number7: { letterNumber:[162.8835,15.4757,.737864] },
    number8: { letterNumber:[163.1278,15.6922,.735721] },
    number9: { letterNumber:[168.8929,20.9751,.726577] },
    letter: { letterNumber:[206.6667,133.3333,.666667] },
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
const curatedButtercreamPalette = [
    {
        name: "Soft Pink",
        value: "#F7B6D2"
    },
    {
        name: "Hot Pink",
        value: "#E95A9D"
    },
    {
        name: "Chocolate",
        value: "#84563C"
    },
    {
        name: "Cream",
        value: "#F3E2C7"
    },
    {
        name: "White",
        value: "#FFFDFC"
    },
    {
        name: "Black",
        value: "#24201F"
    },
    {
        name: "Lavender",
        value: "#D4C0E8"
    },
    {
        name: "Baby Blue",
        value: "#BDD5E8"
    },
    {
        name: "Sage",
        value: "#B9C8AE"
    },
    {
        name: "Yellow",
        value: "#F1D77D"
    }
];


const boardPalette = [
    {
        name: "White",
        value: "#FFFFFF"
    },
    {
        name: "Silver",
        value: "#C9C9C7"
    },
    {
        name: "Gold",
        value: "#C7A14A"
    },
    {
        name: "Black",
        value: "#24201F"
    },
    {
        name: "Natural / Kraft",
        value: "#B78B5C"
    }
];


const bowButterflyPalette = [
    ...curatedButtercreamPalette.slice(
        0,
        2
    ),

    {
        name: "White",
        value: "#FFFDFC"
    },
    {
        name: "Black",
        value: "#24201F"
    },
    {
        name: "Gold",
        value: "#C7A14A"
    },
    {
        name: "Silver",
        value: "#C9C9C7"
    },
    {
        name: "Lavender",
        value: "#D4C0E8"
    },
    {
        name: "Baby Blue",
        value: "#BDD5E8"
    },
    {
        name: "Sage",
        value: "#B9C8AE"
    },
    {
        name: "Yellow",
        value: "#F1D77D"
    }
];


const pearlPalette = [
    {
        name: "White",
        value: "#FFFDFC"
    },
    {
        name: "Ivory",
        value: "#F3E2C7"
    },
    {
        name: "Soft Pink",
        value: "#F7B6D2"
    },
    {
        name: "Gold",
        value: "#C7A14A"
    },
    {
        name: "Silver",
        value: "#C9C9C7"
    },
    {
        name: "Black",
        value: "#24201F"
    }
];


const cherryPalette = [
    {
        name: "Red",
        value: "#D92B3F"
    },
    {
        name: "Pink",
        value: "#E95A9D"
    },
    {
        name: "White",
        value: "#FFFDFC"
    },
    {
        name: "Black",
        value: "#24201F"
    },
    {
        name: "Gold",
        value: "#C7A14A"
    },
    {
        name: "Silver",
        value: "#C9C9C7"
    }
];


const flowerPalette = [
    {
        name: "White / Ivory",
        value: "#FFF3D6"
    },
    {
        name: "Pink",
        value: "#F7B6D2"
    },
    {
        name: "Red",
        value: "#C9555F"
    },
    {
        name: "Purple",
        value: "#B89BCB"
    },
    {
        name: "Blue",
        value: "#AFC8DD"
    },
    {
        name: "Yellow",
        value: "#E8D278"
    },
    {
        name: "Peach",
        value: "#E9B796"
    },
    {
        name: "Greenery",
        value: "#A6B99B"
    }
];


const cupcakeLinerPalettes = {
    paper: [
        {
            name: "White",
            value: "#FFFFFF"
        },
        {
            name: "Black",
            value: "#24201F"
        },
        {
            name: "Soft Pink",
            value: "#F7B6D2"
        }
    ],

    "metallic-pleated": [
        {
            name: "Gold",
            value: "#C7A14A"
        },
        {
            name: "Silver",
            value: "#C9C9C7"
        },
        {
            name: "Rose Gold",
            value: "#C99783"
        },
        {
            name: "Black",
            value: "#24201F"
        }
    ],

    "rigid-cup": [
        {
            name: "Gold",
            value: "#C7A14A"
        },
        {
            name: "Silver",
            value: "#C9C9C7"
        },
        {
            name: "Rose Gold",
            value: "#C99783"
        },
        {
            name: "Black",
            value: "#24201F"
        },
        {
            name: "White",
            value: "#FFFFFF"
        }
    ]
};
function buildColorSwatches(
    containerSelector,
    inputName,
    palette,
    selectedValue,
    onChange,
    options = {}
) {
    const container =
        getElement(containerSelector);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    palette.forEach((color) => {
        const label =
            document.createElement(
                "label"
            );

        label.className =
            "color-choice";

        const input =
            document.createElement(
                "input"
            );

        input.type = "radio";
        input.name = inputName;
        input.value = color.value;

        input.checked =
            selectedValue ===
            color.value;

        const swatch =
            document.createElement(
                "span"
            );

        swatch.className =
            "color-swatch";

        swatch.style.setProperty(
            "--swatch-color",
            color.value
        );

        const name =
            document.createElement(
                "small"
            );

        name.textContent =
            color.name;

        input.addEventListener(
            "change",
            () => {
                if (!input.checked) {
                    return;
                }

                onChange(
                    color.value,
                    color.name
                );

                updateSelectedCardStates();
            }
        );

        label.append(
            input,
            swatch,
            name
        );

        container.appendChild(
            label
        );
    });

    if (options.allowCustom) {
        const customLabel =
            document.createElement(
                "label"
            );

        customLabel.className =
            "color-choice custom-shade-tile";

        const customInput =
            document.createElement(
                "input"
            );

        customInput.type = "radio";
        customInput.name = inputName;
        customInput.value = "custom";

        customInput.checked =
            Boolean(
                options.customSelected
            );

        const customSwatch =
            document.createElement(
                "span"
            );

        customSwatch.className =
            "custom-shade-icon";

        customSwatch.textContent = "+";

        const customText =
            document.createElement(
                "small"
            );

        customText.textContent =
            "Custom Shade";

        customInput.addEventListener(
            "change",
            () => {
                if (
                    customInput.checked &&
                    options.onCustomSelected
                ) {
                    options.onCustomSelected();
                }

                updateSelectedCardStates();
            }
        );

        customLabel.append(
            customInput,
            customSwatch,
            customText
        );

        container.appendChild(
            customLabel
        );
    }
}

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


function getDisplayColorName(color) {
    if (!color || color === "original") {
        return "Natural / Original";
    }

    const knownColors = [
        ...curatedButtercreamPalette,
        ...boardPalette,
        ...Object.values(
            cupcakeLinerPalettes
        ).flat()
    ];

    return (
        knownColors.find(
            (option) =>
                option.value.toUpperCase() ===
                String(color).toUpperCase()
        )?.name || color
    );
}


function getRenderableCakeColor(color) {
    return !color || color === "original"
        ? "#FFF1DC"
        : normalizeHexColor(color);
}


function getLightenedCakePreviewColor(color) {
    if (!color || color === "original") {
        return color;
    }

    const normalizedColor =
        normalizeHexColor(color);

    const isBlackShade = [
        "#000000",
        "#111111",
        "#24201F"
    ].includes(normalizedColor);

    return mixHexColor(
        "#FFF1DC",
        normalizedColor,
        isBlackShade ? 0.78 : 0.48
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


function getCakeShapeName(product = getSelectedCakeProduct()) {
    const shapeNames = {
        round: "Round",
        heart: "Heart",
        star: "Star",
        square: "Square",
        sheet: "Sheet",
        numberLetter: "Number / Letter",
        tier: "Two-Tier Round",
        cupcakes: "Cupcakes Only"
    };

    return shapeNames[product.shape] || product.shape;
}


function getCakeHeightLabel() {
    const product = getSelectedCakeProduct();

    if (product.heightLabel) {
        return product.heightLabel;
    }

    if (product.shape === "numberLetter") {
        return product.characterCount === 2
            ? "Double"
            : "Single";
    }

    if (product.shape === "sheet") {
        return "Standard";
    }

    return builderState.isTall
        ? "Tall"
        : "Standard";
}


function getNumberLetterCharacters() {
    const product = getSelectedCakeProduct();
    const count = product.characterCount || 1;

    if (builderState.numberLetterKind === "letter") {
        const cleaned = builderState.letterCakeText
            .toUpperCase()
            .replace(/[^A-Z]/g, "")
            .slice(0, count);

        return cleaned || (count === 2 ? "AA" : "A");
    }

    return count === 2
        ? `${builderState.numberCakeFirst}${builderState.numberCakeSecond}`
        : builderState.numberCakeFirst;
}


function getDisplayCakeName() {
    const product = getSelectedCakeProduct();

    if (product.shape !== "numberLetter") {
        return product.name;
    }

    const kindLabel =
        builderState.numberLetterKind === "letter"
            ? "Letter"
            : "Number";

    const countLabel =
        product.characterCount === 2
            ? "Double"
            : "Single";

    return `${countLabel} ${kindLabel} Cake · ${getNumberLetterCharacters()}`;
}


function cakeAllowsExtraLayer() {
    return (
        getSelectedCakeProduct()
            .allowsExtraLayer !== false
    );
}
 function cakeSupportsCoverage(
    product = getSelectedCakeProduct()
) {
    return [
        "round",
        "heart",
        "star",
        "square",
        "tier"
    ].includes(product.shape);
}


function getBentoCupcakeUpgradePrice() {
    return (
        builderState.cakeProductId ===
            "heart-5-bento" &&
        builderState.bentoCupcakeCount === 8
    )
        ? 20
        : 0;
}


function getSurfaceUpcharge(type) {
    const product = getSelectedCakeProduct();

 if (
    product.shape === "cupcakes" ||
    (
        type === "fondant" &&
        builderState.cakeCoverage !== "full"
    )
) {
    return 0;
}   

    const prices = type === "fondant"
        ? {
            small: 25,
            standard6: 35,
            tall6: 45,
            standard8: 45,
            tall8: 55,
            standard9: 55,
            tall9: 65,
            standard10: 65,
            tall10: 75,
            halfSheet: 60,
            fullSheet: 85,
            standardTier: 80,
            tallTier: 105,
            singleCharacter: 50,
            doubleCharacter: 85
        }
        : {
            small: 15,
            standard6: 20,
            tall6: 25,
            standard8: 25,
            tall8: 30,
            standard9: 30,
            tall9: 35,
            standard10: 35,
            tall10: 40,
            halfSheet: 35,
            fullSheet: 50,
            standardTier: 45,
            tallTier: 60,
            singleCharacter: 30,
            doubleCharacter: 50
        };

    if (
        [
            "round-4",
            "heart-5-bento",
            "heart-5-tall"
        ].includes(builderState.cakeProductId)
    ) {
        return prices.small;
    }

    if (product.shape === "sheet") {
        return builderState.cakeProductId ===
            "sheet-full"
            ? prices.fullSheet
            : prices.halfSheet;
    }

    if (product.shape === "tier") {
        return builderState.cakeProductId ===
            "tier-4-6-tall"
            ? prices.tallTier
            : prices.standardTier;
    }

    if (product.shape === "numberLetter") {
        return product.characterCount === 2
            ? prices.doubleCharacter
            : prices.singleCharacter;
    }

    const size =
        Number.parseInt(product.size, 10);

    const height =
        builderState.isTall
            ? "tall"
            : "standard";

    if (size === 6) {
        return prices[`${height}6`];
    }

    if (size === 8) {
        return prices[`${height}8`];
    }

    if (size === 9) {
        return prices[`${height}9`];
    }

    if (size === 10) {
        return prices[`${height}10`];
    }

    return prices.small;
}


function getGanacheCoatingPrice() {
    return builderState.buttercreamStyle ===
        "Ganache"
        ? getSurfaceUpcharge("ganache")
        : 0;
}


function getFondantPrice() {
    return builderState.fondantEnabled
        ? getSurfaceUpcharge("fondant")
        : 0;
}


function getIncludedEdibleImageCount() {
    if (
        builderState.cakeProductId !==
        "heart-5-bento"
    ) {
        return 0;
    }

    return builderState.bentoCupcakeCount === 8
        ? 5
        : 3;
}


function calculateEdibleImageTotal() {
    if (!builderState.edibleImageEnabled) {
        return 0;
    }

    const quantity = Math.max(
        0,
        Number(
            builderState.edibleImageQuantity
        ) || 0
    );

    if (
        builderState.cakeProductId ===
        "heart-5-bento"
    ) {
        return Math.max(
            0,
            quantity -
                getIncludedEdibleImageCount()
        ) * 2;
    }

    if (isCupcakesOnlyProduct()) {
        return quantity * 2;
    }

    return quantity * 15;
}

function getCakeBasePrice() {
    const product = getSelectedCakeProduct();

    const regularPrice = builderState.isTall
        ? product.tallPrice
        : product.standardPrice;

    return Math.max(
        0,
       regularPrice +
getBentoCupcakeUpgradePrice() -
getCakeFinishDiscount() 
    );
}


function getCakeFinishDiscount() {
    const product = getSelectedCakeProduct();

    if (!cakeSupportsCoverage(product)) {
        return 0;
    }

    if (builderState.cakeCoverage === "naked") {
        return 15;
    }

    if (builderState.cakeCoverage === "semi-naked") {
        return 10;
    }

    return 0;
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


function getCakeStructureLabel() {
    const product = getSelectedCakeProduct();
    if (
    builderState.cakeProductId ===
    "heart-5-bento"
) {
    return `1-layer heart cake + ${builderState.bentoCupcakeCount} cupcakes`;
}

    if (product.structureLabel) {
        return product.structureLabel;
    }

    const layerCount = getCakeLayerCount();

    return `${layerCount} ${layerCount === 1 ? "layer" : "layers"}`;
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
            total +
            (
                decoration.total ??
                decoration.price
            ),
        0
    );
}


function calculateTopperTotal() {
    return builderState.cakeTopperEnabled
        ? builderState.topperPrice || 0
        : 0;
}


function calculateCheckboxExtraTotal() {
    return builderState.extras.reduce(
        (total, extra) => {
            const isCupcakeBundle =
                /^\d+ Gourmet Cupcakes$/.test(extra.name);

            if (isCupcakesOnlyProduct() && isCupcakeBundle) {
                return total;
            }

            return total + extra.price;
        },
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
    const isCupcakesOnly =
        getSelectedCakeProduct()
            .shape === "cupcakes";

    const customBoardFee =
    !isCupcakesOnly &&
    builderState.matchBoardToCakePalette
        ? 5
        : 0;

    return (
        getCakeBasePrice() +
        (
            isCupcakesOnly
                ? 0
                : calculatePremiumFillingTotal()
        ) +
       calculateDecorationTotal() +
calculateTopperTotal() +
getGanacheCoatingPrice() +
getFondantPrice() +
calculateEdibleImageTotal() +
customBoardFee 
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

const tintedLayerCache =
    new WeakMap();

const dripTintLayerCache =
    new WeakMap();

let realisticRenderVersion = 0;

const cakePreviewDetailStrength = {
    smoothCake: 0.30,
    simpleHeart: 0.44,
    simpleOther: 0.42,
    dimensionalFinish: 0.40,
    border: 0.38,
    numberLetterBase: 0.32,
    numberLetterPiping: 0.44,
    cupcakeFrosting: 0.48,
    other: 0.12
};

function loadRealisticImage(url) {
    if (!realisticImageCache.has(url)) {
        realisticImageCache.set(
            url,
            new Promise((resolve, reject) => {
                const image = new Image();

                image.onload = () => resolve(image);

                image.onerror = () => {
                    realisticImageCache.delete(url);

                    reject(
                        new Error(
                            `Unable to load ${url}`
                        )
                    );
                };

                image.src = url;
            })
        );
    }

    return realisticImageCache.get(url);
}
function makeTintedLayer(
    image,
    mask,
    color
) {
    let maskCache =
        tintedLayerCache.get(image);

    if (!maskCache) {
        maskCache =
            new WeakMap();

        tintedLayerCache.set(
            image,
            maskCache
        );
    }

    let colorCache =
        maskCache.get(mask);

    if (!colorCache) {
        colorCache =
            new Map();

        maskCache.set(
            mask,
            colorCache
        );
    }

    const normalizedColor =
        normalizeHexColor(color);

    if (
        colorCache.has(
            normalizedColor
        )
    ) {
        return colorCache.get(
            normalizedColor
        );
    }


    const layer =
        document.createElement(
            "canvas"
        );

    layer.width =
        image.naturalWidth ||
        image.width;

    layer.height =
        image.naturalHeight ||
        image.height;

    const layerContext =
        layer.getContext("2d");


    /*
        Build color only inside
        the approved recolor mask.
    */

    layerContext.drawImage(
        mask,
        0,
        0,
        layer.width,
        layer.height
    );

    layerContext.globalCompositeOperation =
        "source-in";

    layerContext.fillStyle =
        normalizedColor;

    layerContext.fillRect(
        0,
        0,
        layer.width,
        layer.height
    );


       const source = image.src || "";

    const isSimpleTextureAsset =
        source.includes(
            "Simple-Texture-Horizontal-Comb"
        );

    const isHeartSimpleTextureAsset =
        isSimpleTextureAsset &&
        source.includes("-Heart");

       const isBorderAsset =
        source.includes("/borders/");

    const isNumberLetterAsset =
        source.includes("TPJ-Number-Letter-");

    const isNumberLetterBaseAsset =
        isNumberLetterAsset &&
        source.includes("-Base");

    const isNumberLetterPipingAsset =
        isNumberLetterAsset &&
        source.includes("-Accent-");

    const isCupcakeFrostingAsset =
        source.includes("/cupcakes/frosting/") &&
        source.includes("-Frosting") &&
        !source.includes("Foundation");

    const isDimensionalFinishAsset =
        source.includes("TPJ-Finish-") &&
        !isSimpleTextureAsset;

    const isSmoothCakeAsset =
        source.includes("/cakes/") &&
        !source.includes("TPJ-Finish-") &&
        !isNumberLetterAsset;

    /*
    Preserve the selected color while using
    only grayscale highlights and shadows
    from the original artwork for dimension.
*/

const detailLayer =
    document.createElement(
        "canvas"
    );

detailLayer.width = layer.width;
detailLayer.height = layer.height;

const detailContext =
    detailLayer.getContext("2d");

detailContext.drawImage(
    image,
    0,
    0,
    layer.width,
    layer.height
);

/*
    Remove the original cream/pink color
    while retaining its light and shadow.
*/

detailContext.globalCompositeOperation =
    "saturation";

detailContext.fillStyle =
    "#808080";

detailContext.fillRect(
    0,
    0,
    layer.width,
    layer.height
);

detailContext.globalCompositeOperation =
    "destination-in";

detailContext.drawImage(
    image,
    0,
    0,
    layer.width,
    layer.height
);

detailContext.globalCompositeOperation =
    "source-over";

/*
    Reveal dimension without washing out
    or overpowering the selected color.
*/

/*
    Keep only a light multiply detail pass.
    The former soft-light pass laid a pale,
    translucent cast over selected colors.
*/
layerContext.globalCompositeOperation =
    "multiply";

layerContext.globalAlpha =
    isBorderAsset
        ? cakePreviewDetailStrength.border
        : isNumberLetterPipingAsset
            ? cakePreviewDetailStrength.numberLetterPiping
            : isNumberLetterBaseAsset
                ? cakePreviewDetailStrength.numberLetterBase
                : isCupcakeFrostingAsset
                    ? cakePreviewDetailStrength.cupcakeFrosting
                    : isDimensionalFinishAsset
                        ? cakePreviewDetailStrength.dimensionalFinish
                        : isHeartSimpleTextureAsset
                            ? cakePreviewDetailStrength.simpleHeart
                            : isSimpleTextureAsset
                                ? cakePreviewDetailStrength.simpleOther
                                : isSmoothCakeAsset
                                    ? cakePreviewDetailStrength.smoothCake
                                    : cakePreviewDetailStrength.other;

layerContext.drawImage(
    detailLayer,
    0,
    0,
    layer.width,
    layer.height
);

    /*
        Final clip back to the original mask.
    */

    layerContext.globalCompositeOperation =
        "destination-in";

    layerContext.globalAlpha = 1;

    layerContext.drawImage(
        mask,
        0,
        0,
        layer.width,
        layer.height
    );


    layerContext.globalCompositeOperation =
        "source-over";

    layerContext.globalAlpha = 1;


    colorCache.set(
        normalizedColor,
        layer
    );

    return layer;
}

function getContainedAssetSize(image, scale) {
    const sourceWidth = image.naturalWidth || image.width;
    const sourceHeight = image.naturalHeight || image.height;
    const containScale = Math.min(
        realisticCakeCanvas.width / sourceWidth,
        realisticCakeCanvas.height / sourceHeight
    );

    return {
        width: sourceWidth * containScale * scale,
        height: sourceHeight * containScale * scale
    };
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

function getNumberLetterStyleSlug() {
    if (
        builderState.numberLetterStyle ===
        "Layered Piped"
    ) {
        return "Layered-Piped";
    }

    if (
        builderState.numberLetterStyle ===
        "Fully Frosted & Piped"
    ) {
        return "Fully-Frosted-Piped";
    }

    return "";
}


function getNumberLetterPreviewEntries(product) {
    const isDouble =
        product.characterCount === 2;

    const doublePlacements = [
        [40, 330, 0.46],
        [610, 330, 0.46]
    ];

    const styleSlug =
        getNumberLetterStyleSlug();

    function createEntry(
        characterType,
        characterValue,
        originalFile,
        key,
        placement = null
    ) {
        const file = styleSlug
            ? `TPJ-Number-Letter-${styleSlug}-${characterType}-${characterValue}-Base.png`
            : originalFile;

        return {
            file,
            key,
            characterType,
            characterValue,
            placement
        };
    }

    if (
        builderState.numberLetterKind ===
        "letter"
    ) {
        const entry = createEntry(
            "Letter",
            "A",
            "TPJ-Asset-024-Blank-Letter-A-Cake.png",
            "letter"
        );

        return isDouble
            ? doublePlacements.map(
                (placement) => ({
                    ...entry,
                    placement
                })
            )
            : [entry];
    }

    const digits = isDouble
        ? [
            builderState.numberCakeFirst,
            builderState.numberCakeSecond
        ]
        : [builderState.numberCakeFirst];

    return digits.map(
        (digit, index) => {
            const [originalFile, key] =
                numberCakeAssetMap[digit] ||
                numberCakeAssetMap["0"];

            return createEntry(
                "Number",
                digit,
                originalFile,
                key,
                isDouble
                    ? doublePlacements[index]
                    : null
            );
        }
    );
}


async function loadNumberLetterStyleAssets(
    entry
) {
    const styleSlug =
        getNumberLetterStyleSlug();

    if (
        !styleSlug ||
        !entry.characterType ||
        !entry.characterValue
    ) {
        return null;
    }

    const prefix =
        `TPJ-Number-Letter-${styleSlug}-${entry.characterType}-${entry.characterValue}`;

    const files = [
        `${prefix}-Accent-1-Strokes.png`,
        `${prefix}-Accent-1-Mask.png`,
        `${prefix}-Accent-2-Strokes.png`,
        `${prefix}-Accent-2-Mask.png`
    ];

    const images = await Promise.all(
        files.map(
            (file) =>
                loadOptionalRealisticImage(
                    `${finalAssetRoot}/cakes/${file}?v=tpj-number-letter-styles-1`
                )
        )
    );

    if (images.some((image) => !image)) {
        return null;
    }

    return {
        type: "numberLetterPiping",
        images
    };
}

function getCoveragePreviewEntry(product) {
    const coverage =
        builderState.cakeCoverage;

    if (
        coverage === "full" ||
        !cakeSupportsCoverage(product)
    ) {
        return null;
    }

    const coverageName =
        coverage === "naked"
            ? "Naked"
            : "Semi-Naked";

    if (
        builderState.cakeProductId ===
        "heart-5-bento"
    ) {
        return {
            file:
                `TPJ-Coverage-${coverageName}-Bento-5in-Heart-4-Cupcakes.png`,
            key: "heart5in"
        };
    }

    if (
        builderState.cakeProductId ===
        "heart-5-tall"
    ) {
        return {
            file:
                `TPJ-Coverage-${coverageName}-Tall-5in-Heart.png`,
            key: "tallHeart5in"
        };
    }

    if (product.shape === "tier") {
        const isTallTier =
            builderState.cakeProductId ===
            "tier-4-6-tall";

        return {
            file: isTallTier
                ? `TPJ-Coverage-${coverageName}-Tall-Two-Tier-4in-6in.png`
                : `TPJ-Coverage-${coverageName}-Two-Tier-4in-6in.png`,

            key: isTallTier
                ? "tallTier"
                : "tier"
        };
    }

    if (product.shape === "round") {
        return {
            file:
                coverage === "naked"
                    ? builderState.isTall
                        ? "TPJ-Asset-047-Naked-Tall-Round-Cake.png"
                        : "TPJ-Asset-031-Naked-Round-Cake.png"
                    : builderState.isTall
                        ? "TPJ-Asset-048-Semi-Naked-Tall-Round-Cake.png"
                        : "TPJ-Asset-032-Semi-Naked-Round-Cake.png",

            key: builderState.isTall
                ? "tallRound"
                : "round"
        };
    }

    const shapeName = {
        heart: "Heart",
        star: "Star",
        square: "Square"
    }[product.shape];

    if (!shapeName) {
        return null;
    }

    return {
        file:
            `TPJ-Coverage-${coverageName}-${builderState.isTall ? "Tall-" : ""}${shapeName}.png`,

        key: builderState.isTall
            ? `tall${shapeName}`
            : product.shape
    };
}
function getCakePreviewEntries(product) {
    const coverageEntry =
    getCoveragePreviewEntry(product);

if (coverageEntry) {
    return [coverageEntry];
}

if (
    builderState.cakeProductId ===
    "heart-5-bento"
) {
    return [{
        file:
            "TPJ-Asset-008-Bento-Box-5in-Heart-4-Cupcakes.png",
        key: "heart5in"
    }];
}
    if (product.previewFile) {
        return [{
            file: product.previewFile,
            key: product.previewKey
        }];
    }

    if (product.shape === "sheet") {
        const sheetAsset =
            sheetAssetMap[builderState.cakeProductId] ||
            sheetAssetMap["sheet-half"];

        return [sheetAsset];
    }

    if (product.shape === "numberLetter") {
        return getNumberLetterPreviewEntries(product);
    }

    const shapeAssets =
        cakeAssetMap[product.shape] ||
        cakeAssetMap.round;

 let file = builderState.isTall
    ? shapeAssets.tall
    : shapeAssets.standard;

let key = builderState.isTall
    ? shapeAssets.tallKey
    : shapeAssets.key;


/*
    SIMPLE TEXTURE ASSET SWAP
*/

const simpleTextureAssetMap = {
    round: {
        standard:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Round.png",

        tall:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Tall-Round.png"
    },

    heart: {
        standard:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Heart.png",

        tall:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Tall-Heart.png"
    },

    star: {
        standard:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Star.png",

        tall:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Tall-Star.png"
    },

    square: {
        standard:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Square.png",

        tall:
            "TPJ-Finish-Simple-Texture-Horizontal-Comb-Tall-Square.png"
    }
};

if (builderState.cakeFinish === "Simple Texture") {
    const textureAssets =
        simpleTextureAssetMap[product.shape];

    if (textureAssets) {
        file = builderState.isTall
            ? textureAssets.tall
            : textureAssets.standard;
    }
}
if (builderState.cakeProductId === "heart-5-tall") {
    file =
        builderState.cakeFinish === "Simple Texture"
            ? "TPJ-Finish-Simple-Texture-Horizontal-Comb-Tall-5in-Heart.png"
            : "TPJ-Asset-026-Blank-Tall-5in-Heart-Standalone-Cake.png";

    key = "tallHeart5in";
}


    return [{ file, key }];
}

function drawContainedCanvasImage(
    context,
    image,
    canvas,
    scaleMultiplier = 1,
    offsetY = 0
) {
    const scale = Math.min(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight
    ) * scaleMultiplier;
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2 + offsetY;

    context.drawImage(image, x, y, width, height);

    return { x, y, width, height, scale };
}

const bentoCakeMaskCache = new WeakMap();

const coverageButtercreamMaskCache =
    new WeakMap();


function getCoverageButtercreamMask(image) {
    if (
        coverageButtercreamMaskCache.has(
            image
        )
    ) {
        return coverageButtercreamMaskCache.get(
            image
        );
    }

    const width =
        image.naturalWidth || image.width;

    const height =
        image.naturalHeight || image.height;

    const sourceCanvas =
        document.createElement("canvas");

    sourceCanvas.width = width;
    sourceCanvas.height = height;

    const sourceContext =
        sourceCanvas.getContext("2d", {
            willReadFrequently: true
        });

    sourceContext.drawImage(
        image,
        0,
        0
    );

    const sourcePixels =
        sourceContext.getImageData(
            0,
            0,
            width,
            height
        );

    const maskCanvas =
        document.createElement("canvas");

    maskCanvas.width = width;
    maskCanvas.height = height;

    const maskContext =
        maskCanvas.getContext("2d");

    const maskPixels =
        maskContext.createImageData(
            width,
            height
        );

    for (
        let offset = 0;
        offset < sourcePixels.data.length;
        offset += 4
    ) {
        const red =
            sourcePixels.data[offset];

        const green =
            sourcePixels.data[offset + 1];

        const blue =
            sourcePixels.data[offset + 2];

        const alpha =
            sourcePixels.data[offset + 3];

        const isButtercream =
            alpha > 20 &&
            red > 180 &&
            green > 150 &&
            blue > 125 &&
            red - green < 60 &&
            green - blue < 95;

        if (isButtercream) {
            maskPixels.data[offset] = 255;
            maskPixels.data[offset + 1] = 255;
            maskPixels.data[offset + 2] = 255;
            maskPixels.data[offset + 3] =
                alpha;
        }
    }

    maskContext.putImageData(
        maskPixels,
        0,
        0
    );

    coverageButtercreamMaskCache.set(
        image,
        maskCanvas
    );

    return maskCanvas;
}

function getBentoCakeMask(image) {
    if (bentoCakeMaskCache.has(image)) {
        return bentoCakeMaskCache.get(image);
    }

    const sourceCanvas = document.createElement("canvas");
    sourceCanvas.width = image.naturalWidth;
    sourceCanvas.height = image.naturalHeight;

    const sourceContext = sourceCanvas.getContext("2d", {
        willReadFrequently: true
    });

    sourceContext.drawImage(image, 0, 0);

    const pixels = sourceContext.getImageData(
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height
    );

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = sourceCanvas.width;
    maskCanvas.height = sourceCanvas.height;

    const maskContext = maskCanvas.getContext("2d");
    const maskPixels = maskContext.createImageData(
        maskCanvas.width,
        maskCanvas.height
    );

    for (let y = 500; y < 875; y += 1) {
        const leftEdge = y < 800
            ? 220 + Math.max(0, y - 570) * 0.05
            : 225 + (y - 800) * 1.15;
        const rightEdge = y < 800
            ? 625 - Math.max(0, y - 570) * 0.06
            : 625 - (y - 800) * 0.5;

        for (
            let x = Math.floor(leftEdge);
            x < Math.ceil(rightEdge);
            x += 1
        ) {
            const offset = (y * sourceCanvas.width + x) * 4;
            const red = pixels.data[offset];
            const green = pixels.data[offset + 1];
            const blue = pixels.data[offset + 2];
            const alpha = pixels.data[offset + 3];

            const isButtercream =
                alpha > 20 &&
                red > 175 &&
                green > 135 &&
                red - blue > 35 &&
                green - blue > 20;

            if (isButtercream) {
                maskPixels.data[offset] = 255;
                maskPixels.data[offset + 1] = 255;
                maskPixels.data[offset + 2] = 255;
                maskPixels.data[offset + 3] = alpha;
            }
        }
    }

    maskContext.putImageData(maskPixels, 0, 0);
    bentoCakeMaskCache.set(image, maskCanvas);

    return maskCanvas;
}

function getBentoTransformMap(
    image,
    transform
) {
    const sourceWidth =
        image.naturalWidth || image.width;

    const sourceHeight =
        image.naturalHeight || image.height;

    const scaleX =
        transform.width / sourceWidth;

    const scaleY =
        transform.height / sourceHeight;

    return {
        x: (value) =>
            transform.x + value * scaleX,

        y: (value) =>
            transform.y + value * scaleY,

        radiusX: (value) =>
            value * scaleX,

        radiusY: (value) =>
            value * scaleY,

        scaleX,
        scaleY
    };
}

function traceBentoCakePath(
    context,
    map
) {
    context.beginPath();

    context.moveTo(
        map.x(451),
        map.y(521)
    );

    context.bezierCurveTo(
        map.x(410), map.y(500),
        map.x(377), map.y(481),
        map.x(334), map.y(483)
    );

    context.bezierCurveTo(
        map.x(268), map.y(486),
        map.x(219), map.y(523),
        map.x(218), map.y(583)
    );

    context.lineTo(
        map.x(218),
        map.y(720)
    );

    context.bezierCurveTo(
        map.x(218), map.y(789),
        map.x(289), map.y(843),
        map.x(392), map.y(870)
    );

    context.bezierCurveTo(
        map.x(500), map.y(844),
        map.x(636), map.y(791),
        map.x(636), map.y(715)
    );

    context.lineTo(
        map.x(636),
        map.y(587)
    );

    context.bezierCurveTo(
        map.x(635), map.y(525),
        map.x(592), map.y(503),
        map.x(547), map.y(505)
    );

    context.bezierCurveTo(
        map.x(507), map.y(505),
        map.x(482), map.y(527),
        map.x(451), map.y(521)
    );

    context.closePath();
}

function drawBentoSimpleTexture(
    context,
    map
) {
    if (
        builderState.cakeFinish !==
        "Simple Texture"
    ) {
        return;
    }

    context.save();
    traceBentoCakePath(context, map);
    context.clip();

    for (
        let sourceY = 585;
        sourceY <= 825;
        sourceY += 15
    ) {
        context.beginPath();
        context.moveTo(
            map.x(210),
            map.y(sourceY)
        );

        context.bezierCurveTo(
            map.x(315), map.y(sourceY + 4),
            map.x(535), map.y(sourceY + 4),
            map.x(645), map.y(sourceY)
        );

        context.strokeStyle =
            "rgba(86, 50, 34, 0.16)";

        context.lineWidth =
            Math.max(
                1,
                2.2 * map.scaleY
            );

        context.stroke();

        context.beginPath();
        context.moveTo(
            map.x(210),
            map.y(sourceY - 2)
        );

        context.bezierCurveTo(
            map.x(315), map.y(sourceY + 2),
            map.x(535), map.y(sourceY + 2),
            map.x(645), map.y(sourceY - 2)
        );

        context.strokeStyle =
            "rgba(255, 255, 255, 0.20)";

        context.lineWidth =
            Math.max(
                1,
                1.4 * map.scaleY
            );

        context.stroke();
    }

    context.restore();
}

function drawBentoColorPreview(
    context,
    image,
    transform
) {
    const map =
        getBentoTransformMap(
            image,
            transform
        );

    if (
        builderState.mainCakeColor !==
        "original"
    ) {
        context.save();
        traceBentoCakePath(
            context,
            map
        );
        context.clip();

        drawRecoloredAsset(
            context,
            image,
            builderState.cakeCoverage ===
                "full"
                ? image
                : getCoverageButtercreamMask(
                    image
                ),
            getLightenedCakePreviewColor(
                builderState.mainCakeColor
            ),
            transform.x,
            transform.y,
            transform.width,
            transform.height
        );

        context.restore();
    }

    drawBentoSimpleTexture(
        context,
        map
    );

    if (
        builderState.cupcakeFrostingColor !==
        "original"
    ) {
        context.save();
        context.beginPath();

        [
            [768, 621, 90, 70],
            [987, 656, 86, 71],
            [725, 799, 98, 84],
            [952, 846, 96, 85]
        ].forEach(
            ([x, y, radiusX, radiusY]) => {
                context.moveTo(
                    map.x(x) +
                        map.radiusX(radiusX),
                    map.y(y)
                );

                context.ellipse(
                    map.x(x),
                    map.y(y),
                    map.radiusX(radiusX),
                    map.radiusY(radiusY),
                    0,
                    0,
                    Math.PI * 2
                );
            }
        );

        context.clip();

        drawRecoloredAsset(
            context,
            image,
            image,
            builderState.cupcakeFrostingColor,
            transform.x,
            transform.y,
            transform.width,
            transform.height
        );

        context.restore();
    }
}

function drawTwoTierColors(
    context,
    image,
    x,
    y,
    width,
    height,
    recolorMask = image
) {
    const isTall =
        builderState.cakeProductId ===
        "tier-4-6-tall";

    const topTier = isTall
        ? {
            left: 0.287,
            right: 0.714,
            top: 0.051,
            shoulder: 0.103,
            sideBottom: 0.487,
            bottom: 0.552
        }
        : {
            left: 0.263,
            right: 0.737,
            top: 0.128,
            shoulder: 0.205,
            sideBottom: 0.452,
            bottom: 0.544
        };

    /*
        Color the complete cake with the
        selected bottom-tier color first.
    */
    drawRecoloredAsset(
        context,
        image,
        recolorMask,
        getLightenedCakePreviewColor(
            builderState.tierBottomColor
        ),
        x,
        y,
        width,
        height
    );

    const left =
        x + width * topTier.left;

    const right =
        x + width * topTier.right;

    const centerX =
        (left + right) / 2;

    const radiusX =
        (right - left) / 2;

    const top =
        y + height * topTier.top;

    const shoulder =
        y + height * topTier.shoulder;

    const sideBottom =
        y + height * topTier.sideBottom;

    const bottom =
        y + height * topTier.bottom;

    /*
        Clip the top color to the actual
        cylindrical top tier.
    */
    context.save();
    context.beginPath();

    context.moveTo(left, shoulder);

    context.ellipse(
        centerX,
        shoulder,
        radiusX,
        shoulder - top,
        0,
        Math.PI,
        Math.PI * 2
    );

    context.lineTo(right, sideBottom);

    context.ellipse(
        centerX,
        sideBottom,
        radiusX,
        bottom - sideBottom,
        0,
        0,
        Math.PI
    );

    context.closePath();
    context.clip();

    drawRecoloredAsset(
        context,
        image,
        recolorMask,
        getLightenedCakePreviewColor(
            builderState.tierTopColor
        ),
        x,
        y,
        width,
        height
    );

    context.restore();
}
function drawTwoTierSimpleTexture(
    context,
    image,
    x,
    y,
    width,
    height,
    textureMask = image
) {
    if (
        builderState.cakeFinish !==
        "Simple Texture"
    ) {
        return;
    }

    const sourceWidth =
        image.naturalWidth || image.width;

    const sourceHeight =
        image.naturalHeight || image.height;

    const layer =
        document.createElement("canvas");

    layer.width = sourceWidth;
    layer.height = sourceHeight;

    const layerContext =
        layer.getContext("2d");

    const isTall =
        builderState.cakeProductId ===
        "tier-4-6-tall";

    const sideRanges = isTall
        ? [
            [0.105, 0.485],
            [0.565, 0.905]
        ]
        : [
            [0.205, 0.455],
            [0.545, 0.835]
        ];

    const rowGap = Math.max(
        10,
        Math.round(
            sourceHeight * 0.012
        )
    );

    sideRanges.forEach(
        ([startRatio, endRatio]) => {
            const startY =
                sourceHeight * startRatio;

            const endY =
                sourceHeight * endRatio;

            for (
                let rowY = startY;
                rowY <= endY;
                rowY += rowGap
            ) {
                layerContext.beginPath();
                layerContext.moveTo(0, rowY);
                layerContext.lineTo(
                    sourceWidth,
                    rowY
                );

                layerContext.strokeStyle =
                    "rgba(86, 50, 34, 0.28)";

                layerContext.lineWidth =
                    Math.max(
                        1,
                        sourceHeight * 0.002
                    );

                layerContext.stroke();

                layerContext.beginPath();
                layerContext.moveTo(
                    0,
                    rowY - 2
                );
                layerContext.lineTo(
                    sourceWidth,
                    rowY - 2
                );

                layerContext.strokeStyle =
                    "rgba(255, 255, 255, 0.20)";

                layerContext.lineWidth =
                    Math.max(
                        1,
                        sourceHeight * 0.0013
                    );

                layerContext.stroke();
            }
        }
    );

    layerContext.globalCompositeOperation =
        "destination-in";

    layerContext.drawImage(
    textureMask,
        0,
        0,
        sourceWidth,
        sourceHeight
    );

    layerContext.globalCompositeOperation =
        "source-over";

    context.drawImage(
        layer,
        x,
        y,
        width,
        height
    );
}
const sheetTextureBoundsCache =
    new WeakMap();

function getSheetTextureBounds(mask) {
    if (
        sheetTextureBoundsCache.has(mask)
    ) {
        return sheetTextureBoundsCache.get(mask);
    }

    const width =
        mask.naturalWidth || mask.width;

    const height =
        mask.naturalHeight || mask.height;

    const canvas =
        document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const context =
        canvas.getContext("2d", {
            willReadFrequently: true
        });

    context.drawImage(
        mask,
        0,
        0,
        width,
        height
    );

    const pixels =
        context.getImageData(
            0,
            0,
            width,
            height
        ).data;

    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;

    for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
            const alpha =
                pixels[(y * width + x) * 4 + 3];

            if (alpha <= 20) {
                continue;
            }

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
    }

    const bounds =
        maxX > minX && maxY > minY
            ? {
                minX,
                minY,
                maxX,
                maxY,
                width: maxX - minX,
                height: maxY - minY
            }
            : {
                minX: 0,
                minY: 0,
                maxX: width,
                maxY: height,
                width,
                height
            };

    sheetTextureBoundsCache.set(
        mask,
        bounds
    );

    return bounds;
}

function drawSheetSimpleTexture(
    context,
    image,
    x,
    y,
    width,
    height
) {
    if (
        builderState.cakeFinish !==
            "Simple Texture"
    ) {
        return;
    }

    const textureMask =
        getCoverageButtercreamMask(image);

    const sourceWidth =
        image.naturalWidth || image.width;

    const sourceHeight =
        image.naturalHeight || image.height;

    const bounds =
        getSheetTextureBounds(
            textureMask
        );

    const layer =
        document.createElement("canvas");

    layer.width = sourceWidth;
    layer.height = sourceHeight;

    const layerContext =
        layer.getContext("2d");

    const startY =
        bounds.minY +
        bounds.height * 0.52;

    const endY =
        bounds.minY +
        bounds.height * 0.90;

    const rowGap = Math.max(
        7,
        Math.round(
            bounds.height * 0.055
        )
    );

    for (
        let rowY = startY;
        rowY <= endY;
        rowY += rowGap
    ) {
        layerContext.beginPath();
        layerContext.moveTo(
            bounds.minX,
            rowY
        );
        layerContext.lineTo(
            bounds.maxX,
            rowY
        );

        layerContext.strokeStyle =
            "rgba(86, 50, 34, 0.30)";

        layerContext.lineWidth =
            Math.max(
                1,
                bounds.height * 0.012
            );

        layerContext.stroke();

        layerContext.beginPath();
        layerContext.moveTo(
            bounds.minX,
            rowY - 2
        );
        layerContext.lineTo(
            bounds.maxX,
            rowY - 2
        );

        layerContext.strokeStyle =
            "rgba(255, 255, 255, 0.18)";

        layerContext.lineWidth =
            Math.max(
                1,
                bounds.height * 0.006
            );

        layerContext.stroke();
    }

    layerContext.globalCompositeOperation =
        "destination-in";

    layerContext.drawImage(
        textureMask,
        0,
        0,
        sourceWidth,
        sourceHeight
    );

    layerContext.globalCompositeOperation =
        "source-over";

    context.drawImage(
        layer,
        x,
        y,
        width,
        height
    );
}
/* =========================================
   EDIBLE IMAGE CANVAS LAYER
========================================= */

function edibleImageIsReady() {
    return Boolean(
        builderState.edibleImageEnabled &&
        builderState.edibleImageUrl
    );
}
function edibleImagesAreComplete() {
    if (!builderState.edibleImageEnabled) {
        return true;
    }

    const requestedQuantity = Math.max(
        1,
        Number(
            builderState.edibleImageQuantity
        ) || 1
    );

    return Array.from(
        { length: requestedQuantity },
        (_, index) =>
            Boolean(
                builderState.edibleImages[
                    index
                ]?.url
            )
    ).every(Boolean);
}

function addRoundedRectanglePath(
    context,
    x,
    y,
    width,
    height,
    radius
) {
    const safeRadius = Math.min(
        Math.max(0, radius),
        width / 2,
        height / 2
    );

    context.beginPath();
    context.moveTo(x + safeRadius, y);
    context.lineTo(x + width - safeRadius, y);
    context.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + safeRadius
    );
    context.lineTo(x + width, y + height - safeRadius);
    context.quadraticCurveTo(
        x + width,
        y + height,
        x + width - safeRadius,
        y + height
    );
    context.lineTo(x + safeRadius, y + height);
    context.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - safeRadius
    );
    context.lineTo(x, y + safeRadius);
    context.quadraticCurveTo(
        x,
        y,
        x + safeRadius,
        y
    );
    context.closePath();
}

   function drawEdibleImageInArea(
    context,
    image,
    area
) {
    /*
        Edible images are intentionally not drawn
        on the live cake preview.

        The uploaded file is shown in the
        edible-image thumbnail for reference.
    */

    return;
}
function getEdibleImageArea(
    product,
    x,
    y,
    width,
    height
) {
    const placement =
        builderState.edibleImagePlacement ||
        "front";

    const isTopPlacement =
        placement === "top";

    /*
        TWO-TIER CAKES
    */

    if (product.shape === "tier") {
        const isTallTier =
            builderState.cakeProductId ===
            "tier-4-6-tall";

        /*
            Top Center means the very top of
            the complete tiered cake.
        */

        if (isTopPlacement) {
            return isTallTier
                ? {
                    centerX:
                        x + width * 0.5,

                    centerY:
                        y + height * 0.105,

                    width:
                        width * 0.22,

                    height:
                        height * 0.13,

                    surface: "top"
                }
                : {
                    centerX:
                        x + width * 0.5,

                    centerY:
                        y + height * 0.17,

                    width:
                        width * 0.25,

                    height:
                        height * 0.14,

                    surface: "top"
                };
        }

        const useTopTier =
            builderState.edibleImageTier ===
            "top";

        /*
            Front face of the smaller top tier.
        */

        if (useTopTier) {
            return isTallTier
                ? {
                    centerX:
                        x + width * 0.5,

                    centerY:
                        y + height * 0.32,

                    width:
                        width * 0.19,

                    height:
                        height * 0.19,

                    surface: "front"
                }
                : {
                    centerX:
                        x + width * 0.5,

                    centerY:
                        y + height * 0.35,

                    width:
                        width * 0.21,

                    height:
                        height * 0.16,

                    surface: "front"
                };
        }

        /*
            Front face of the larger bottom tier.
            This is deliberately lower than the
            previous 0.61 position.
        */

        return isTallTier
            ? {
                centerX:
                    x + width * 0.5,

                centerY:
                    y + height * 0.73,

                width:
                    width * 0.29,

                height:
                    height * 0.19,

                surface: "front"
            }
            : {
                centerX:
                    x + width * 0.5,

                centerY:
                    y + height * 0.71,

                width:
                    width * 0.31,

                height:
                    height * 0.18,

                surface: "front"
            };
    }

    /*
        SHEET CAKES
    */

    if (product.shape === "sheet") {
        return {
            centerX:
                x + width * 0.5,

            centerY:
                y + height * 0.38,

            width:
                width * 0.4,

            height:
                height * 0.23,

            surface: "top"
        };
    }

    /*
        NUMBER AND LETTER CAKES
    */

    if (
        product.shape ===
        "numberLetter"
    ) {
        return {
            centerX:
                x + width * 0.5,

            centerY:
                y + height * 0.43,

            width:
                width * 0.3,

            height:
                height * 0.22,

            surface: "top"
        };
    }

    const isTallCake =
        builderState.isTall ||
        builderState.cakeProductId ===
            "heart-5-tall";

    /*
        TOP CENTER OF A SINGLE CAKE
    */

    if (isTopPlacement) {
        const topCenterMap = {
            round: isTallCake
                ? 0.2
                : 0.26,

            heart: isTallCake
                ? 0.22
                : 0.29,

            star: isTallCake
                ? 0.23
                : 0.31,

            square: isTallCake
                ? 0.19
                : 0.26
        };

        return {
            centerX:
                x + width * 0.5,

            centerY:
                y +
                height *
                    (
                        topCenterMap[
                            product.shape
                        ] || 0.26
                    ),

            width:
                width *
                    (
                        isTallCake
                            ? 0.25
                            : 0.31
                    ),

            height:
                height *
                    (
                        isTallCake
                            ? 0.13
                            : 0.16
                    ),

            surface: "top"
        };
    }

    /*
        FRONT FACE OF A SINGLE CAKE
    */

    return {
        centerX:
            x + width * 0.5,

        centerY:
            y +
            height *
                (
                    isTallCake
                        ? 0.5
                        : 0.53
                ),

        width:
            width *
                (
                    isTallCake
                        ? 0.28
                        : 0.32
                ),

        height:
            height *
                (
                    isTallCake
                        ? 0.24
                        : 0.21
                ),

        surface: "front"
    };
}

function drawBentoEdibleImage(
    context,
    image,
    transform,
    sourceImage
) {
    if (
        !image ||
        !edibleImageIsReady()
    ) {
        return;
    }

    context.save();

    context.translate(
        transform.x,
        transform.y
    );

    context.scale(
        transform.width /
            sourceImage.naturalWidth,

        transform.height /
            sourceImage.naturalHeight
    );

    const isTopPlacement =
        builderState.edibleImagePlacement ===
        "top";

    drawEdibleImageInArea(
        context,
        image,
        isTopPlacement
            ? {
                centerX: 430,
                centerY: 515,
                width: 250,
                height: 125,
                surface: "top"
            }
            : {
                centerX: 430,
                centerY: 630,
                width: 255,
                height: 145,
                surface: "front"
            }
    );

    context.restore();
}
const realisticFinishShapeMap = {
    round: "Round",
    heart: "Heart",
    star: "Star",
    square: "Square",

    tallRound: "Tall-Round",
    tallHeart: "Tall-Heart",
    tallStar: "Tall-Star",
    tallSquare: "Tall-Square",

    tier: "Two-Tier",
    tallTier: "Tall-Two-Tier",

    halfSheet: "Half-Sheet",
    fullSheet: "Full-Sheet",

    heart5in: "5in-Heart",
tallHeart5in: "Tall-5in-Heart",

number0: "Number-0",
number1: "Number-1",
number2: "Number-2",
number3: "Number-3",
number4: "Number-4",
number5: "Number-5",
number6: "Number-6",
number7: "Number-7",
number8: "Number-8",
number9: "Number-9",
letter: "Letter-A"
};
const borderStyleNameMap = {
    shell: "Shell",
    rope: "Rope",
    rosette: "Rosette",
    ruffle: "Ruffle"
};
function getBorderShapeName(
    entryKey,
    isBento = false
) {
    if (isBento) {
        return "Bento-5in-Heart";
    }

    return realisticFinishShapeMap[
        entryKey
    ] || null;
}
function getBorderAssetFiles(
    entryKey,
    placement,
    isBento = false
) {
    const styleName =
        borderStyleNameMap[
            builderState.cakeBorderStyle
        ];

    const shapeName =
        getBorderShapeName(
            entryKey,
            isBento
        );

    if (
        !styleName ||
        !shapeName
    ) {
        return null;
    }

    const placementName =
        placement === "top"
            ? "Top"
            : "Bottom";

    const prefix =
        `TPJ-Border-${styleName}-${shapeName}-${placementName}`;

    return {
        strokes:
            `${prefix}-Strokes.png`,

        mask:
            `${prefix}-Mask.png`,

        sprinkles:
            `${prefix}-Sprinkles.png`
    };
}
async function loadBorderAssets(
    entryKey,
    placement,
    isBento = false
) {
    const files =
        getBorderAssetFiles(
            entryKey,
            placement,
            isBento
        );

    if (!files) {
        return null;
    }

    const borderRoot =
        `${finalAssetRoot}/borders`;

        const [
        strokes,
        mask,
        sprinkles
    ] = await Promise.all([
        loadOptionalRealisticImage(
            `${borderRoot}/${files.strokes}${cakeAssetVersion}`
        ),

        loadOptionalRealisticImage(
            `${borderRoot}/${files.mask}${cakeAssetVersion}`
        ),

        builderState.cakeBorderSprinkles
            ? loadOptionalRealisticImage(
                `${borderRoot}/${files.sprinkles}${cakeAssetVersion}`
            )
            : Promise.resolve(null)
    ]);

    if (!strokes || !mask) {
        return null;
    }

    return {
        strokes,
        mask,
        sprinkles
    };
}
function getBorderDrawBox(
    assets,
    x,
    y,
    width,
    height
) {
    const source =
        assets?.strokes?.src || "";

    let scaleX = 1;
    let scaleY = 1;
    let offsetY = 0;

    /*
        Square standard and tall are the
        benchmark, so Square is intentionally
        not changed here.
    */

    if (
        source.includes(
            "-Tall-5in-Heart-Bottom-"
        )
    ) {
        scaleX = 0.94;
    } else if (
        source.includes(
            "-Tall-Heart-Top-"
        )
    ) {
        scaleX = 1.16;
    } else if (
        source.includes("-Heart-Top-") &&
        !source.includes("-Tall-Heart-") &&
        !source.includes("-5in-Heart-") &&
        !source.includes("-Bento-")
    ) {
        scaleX = 1.10;
    } else if (
        source.includes(
            "-Tall-Round-Bottom-"
        )
    ) {
        scaleX = 0.91;
    } else if (
        source.includes(
            "-Tall-Star-Top-"
        )
    ) {
        scaleX = 0.94;
    } else if (
        source.includes(
            "-Tall-Star-Bottom-"
        )
    ) {
        scaleX = 0.94;
    } else if (
        source.includes("-Star-Top-") &&
        !source.includes("-Tall-Star-")
    ) {
        scaleX = 0.95;
    } else if (
        source.includes("-Star-Bottom-") &&
        !source.includes("-Tall-Star-")
    ) {
        scaleX = 0.84;
    } else if (
        source.includes(
            "-Full-Sheet-Bottom-"
        )
    ) {
        scaleY = 0.90;
        offsetY = height * 0.10;
    }

    const adjustedWidth =
        width * scaleX;

    const adjustedHeight =
        height * scaleY;

    return {
        x:
            x +
            (
                width -
                adjustedWidth
            ) / 2,

        y: y + offsetY,
        width: adjustedWidth,
        height: adjustedHeight
    };
}

function drawRegisteredBorderLayer(
    context,
    layer,
    source,
    drawBox
) {
    const isTallTierTop =
        source.includes(
            "-Tall-Two-Tier-Top-"
        );

    if (!isTallTierTop) {
        context.drawImage(
            layer,
            drawBox.x,
            drawBox.y,
            drawBox.width,
            drawBox.height
        );

        return;
    }

    const sourceWidth =
        layer.width;

    const sourceHeight =
        layer.height;

    /*
        Draw the top rim without moving it.
    */

    context.drawImage(
        layer,
        0,
        0,
        sourceWidth,
        sourceHeight * 0.28,
        drawBox.x,
        drawBox.y,
        drawBox.width,
        drawBox.height * 0.28
    );

    /*
        Draw a larger middle slice so the band
        is no longer cut off at the upper-tier base.
    */

    context.drawImage(
        layer,
        0,
        sourceHeight * 0.28,
        sourceWidth,
        sourceHeight * 0.42,
        drawBox.x,
        drawBox.y +
            drawBox.height * 0.28,
        drawBox.width,
        drawBox.height * 0.44
    );
}

function drawCakeBorder(
    context,
    assets,
    x,
    y,
    width,
    height
) {
    if (!assets) {
        return;
    }

    const borderColor =
        builderState.cakeBorderColor ||
        "#FF4FA3";

    const tintedBorder =
        makeTintedLayer(
            assets.strokes,
            assets.mask,
            borderColor
        );

    const drawBox =
        getBorderDrawBox(
            assets,
            x,
            y,
            width,
            height
        );

    const source =
        assets.strokes?.src || "";

    context.save();

    context.globalCompositeOperation =
        "source-over";

    context.globalAlpha = 1;

    drawRegisteredBorderLayer(
        context,
        tintedBorder,
        source,
        drawBox
    );

    if (
        builderState.cakeBorderSprinkles &&
        assets.sprinkles
    ) {
        drawRegisteredBorderLayer(
            context,
            assets.sprinkles,
            source,
            drawBox
        );
    }

    context.restore();
}
async function loadSelectedBorderAssets(
    entryKey,
    isBento = false
) {
    if (
        !builderState.cakeBorderStyle
    ) {
        return {
            top: null,
            bottom: null
        };
    }
     const placement =
        builderState.cakeBorderPlacement;

    const needsTop =
        placement === "top" ||
        placement === "both";

    const needsBottom =
        placement === "bottom" ||
        placement === "both";

    const [
        top,
        bottom
    ] = await Promise.all([
        needsTop
            ? loadBorderAssets(
                entryKey,
                "top",
                isBento
            )
            : Promise.resolve(null),

        needsBottom
            ? loadBorderAssets(
                entryKey,
                "bottom",
                isBento
            )
            : Promise.resolve(null)
    ]);

    return {
        top,
        bottom
    };
}
/* =========================================
   REALISTIC EXTRA ASSETS
========================================= */

const realisticExtraNameMap = {
    ribbonDecoration: "Bows",
    butterfliesDecoration: "Butterflies",
    cherriesDecoration: "Cherries",
    chocolateDripDecoration: "Chocolate-Drip",
    flowersDecoration: "Fresh-Flowers",
    goldAccentDecoration: "Metallic-Leaf-Gold",
        silverLeafDecoration:
        "Metallic-Leaf-Silver",

    pearlsDecoration: "Pearls",

    macaronsDecoration:
        "Macarons",

    discoBallsDecoration:
        "Mini-Disco-Balls"
};

function getNumberLetterExtraSlug(entry) {
    if (!entry) {
        return null;
    }

    if (entry.characterType === "Letter") {
        return `Letter-${String(
            entry.characterValue || "A"
        ).toUpperCase()}`;
    }

    return `Number-${String(
        entry.characterValue ?? "0"
    )}`;
}
function getSelectedRealisticExtraIds() {
    return builderState.decorations
        .map(
            (decoration) =>
                decoration.id
        )
        .filter(
            (id) =>
                Boolean(
                    realisticExtraNameMap[
                        id
                    ]
                )
        );
}

async function loadOptionalRealisticImage(url) {
    try {
        return await loadRealisticImage(url);
    } catch (error) {
        console.warn("Missing preview asset:", url);
        return null;
    }
}

function getCakeExtraShapeName(entryKey, isBento = false) {
    return getBorderShapeName(entryKey, isBento);
}

async function loadCakeExtraAssets(entryKey, isBento = false) {
    const shapeName = getCakeExtraShapeName(entryKey, isBento);

    if (!shapeName) {
        return [];
    }

    const extraRoot = `${finalAssetRoot}/extras`;
    const selectedExtraIds = getSelectedRealisticExtraIds();

    const loadedAssets = await Promise.all(
        selectedExtraIds.map(async (id) => {
            const styleName =
    id === "goldAccentDecoration"
        ? builderState.metallicLeafType === "Silver"
            ? "Metallic-Leaf-Silver"
            : "Metallic-Leaf-Gold"
        : realisticExtraNameMap[id];

            if (!styleName) {
                return null;
            }

            const strokes = await loadOptionalRealisticImage(
                `${extraRoot}/TPJ-Extra-${styleName}-${shapeName}-Strokes.png`
            );

            const mask = await loadOptionalRealisticImage(
                `${extraRoot}/TPJ-Extra-${styleName}-${shapeName}-Mask.png`
            );

            if (!strokes) {
                return null;
            }

            return {
                id,
                strokes,
                mask
            };
        })
    );

    return loadedAssets.filter(Boolean);
}
async function loadNumberLetterExtraAssets(entry) {
    const shapeSlug =
        getNumberLetterExtraSlug(entry);

    if (!shapeSlug) {
        return [];
    }

    const extraRoot =
        `${finalAssetRoot}/extras`;

    const selectedExtraIds =
        getSelectedRealisticExtraIds();

    const loadedAssets =
        await Promise.all(
            selectedExtraIds.map(
                async (id) => {

                    let extraName =
                        realisticExtraNameMap[id];

                    /*
                        Gold / Silver Leaf uses
                        whichever metallic choice
                        the customer selected.
                    */
                    if (
                        id ===
                        "goldAccentDecoration"
                    ) {
                        extraName =
                            builderState
                                .metallicLeafType ===
                            "Silver"
                                ? "Metallic-Leaf-Silver"
                                : "Metallic-Leaf-Gold";
                    }

                    if (!extraName) {
                        return null;
                    }

                    const prefix =
                        `TPJ-Extra-${extraName}-${shapeSlug}`;

                    const strokes =
                        await loadOptionalRealisticImage(
                            `${extraRoot}/${prefix}-Strokes.png`
                        );

                    const mask =
                        await loadOptionalRealisticImage(
                            `${extraRoot}/${prefix}-Mask.png`
                        );

                    if (!strokes) {
                        return null;
                    }

                    return {
                        id,
                        strokes,
                        mask
                    };
                }
            )
        );

    return loadedAssets.filter(Boolean);
}
function getRealisticExtraColor(
    decorationId
) {
    const colorMap = {
        ribbonDecoration:
            builderState.bowColor,

        butterfliesDecoration:
            builderState.butterflyColor,

        cherriesDecoration:
            builderState.cherryColor,

        chocolateDripDecoration:
            builderState.dripColor,

        flowersDecoration:
            builderState.flowerColor,

        pearlsDecoration:
            builderState.pearlColor
    };

    return colorMap[decorationId] || null;
}
function makeDripTintedLayer(
    image,
    color
) {
    let colorCache =
        dripTintLayerCache.get(image);

    if (!colorCache) {
        colorCache =
            new Map();

        dripTintLayerCache.set(
            image,
            colorCache
        );
    }


    const normalizedColor =
        normalizeHexColor(color);


    if (
        colorCache.has(
            normalizedColor
        )
    ) {
        return colorCache.get(
            normalizedColor
        );
    }


    const layer =
        document.createElement(
            "canvas"
        );

    layer.width =
        image.naturalWidth ||
        image.width;

    layer.height =
        image.naturalHeight ||
        image.height;

    const context =
        layer.getContext("2d");


    context.drawImage(
        image,
        0,
        0,
        layer.width,
        layer.height
    );


    context.globalCompositeOperation =
        "source-in";

    context.fillStyle =
        normalizedColor;

    context.fillRect(
        0,
        0,
        layer.width,
        layer.height
    );


    context.globalCompositeOperation =
        "multiply";

    context.globalAlpha =
        0.18;

    context.drawImage(
        image,
        0,
        0,
        layer.width,
        layer.height
    );


    context.globalCompositeOperation =
        "source-over";

    context.globalAlpha = 1;


    colorCache.set(
        normalizedColor,
        layer
    );

    return layer;
}
function getRenderedExtraLayer(asset) {
    const selectedColor =
        getRealisticExtraColor(
            asset.id
        );

    /*
        Metallic leaf keeps its
        original artwork.
    */
    if (!selectedColor) {
        return asset.strokes;
    }

    /*
        Chocolate Drip:
        use the visible drip artwork itself
        as the recolor mask.

        This prevents light colors like
        white chocolate from tinting the
        transparent canvas around the drip.
    */
    if (
        asset.id ===
        "chocolateDripDecoration"
    ) {
       return makeDripTintedLayer(
    asset.strokes,
    selectedColor
);
    }

    if (!asset.mask) {
        return asset.strokes;
    }

    return makeTintedLayer(
        asset.strokes,
        asset.mask,
        selectedColor
    );
}
function getDripDrawBox(
    dripAsset,
    x,
    y,
    width,
    height
) {
    const source =
        dripAsset?.strokes?.src || "";

    let scaleX = 1;
    let scaleY = 1;
    let offsetY = 0;

    if (
        source.includes("-Tall-Square-")
    ) {
        scaleX = 0.96;
        scaleY = 0.98;
        offsetY = 5;
    } else if (
        source.includes("-Square-")
    ) {
        scaleX = 0.98;
        scaleY = 0.99;
        offsetY = 3;
    } else if (
        source.includes(
            "-Tall-Two-Tier-"
        )
    ) {
        scaleX = 0.97;
        scaleY = 0.98;
        offsetY = 5;
    }

    /*
        Standard Two-Tier and Number/Letter
        exports use their exact 1:1 boxes.
    */

    const adjustedWidth =
        width * scaleX;

    const adjustedHeight =
        height * scaleY;

    return {
        x:
            x +
            (
                width -
                adjustedWidth
            ) / 2,

        y:
            y +
            (
                height -
                adjustedHeight
            ) / 2 +
            offsetY,

        width: adjustedWidth,
        height: adjustedHeight
    };
}
function drawCakeDripExtra(
    context,
    assets,
    x,
    y,
    width,
    height
) {
    const dripAsset =
        assets?.find(
            (asset) =>
                asset.id ===
                "chocolateDripDecoration"
        );

    if (!dripAsset) {
        return;
    }


    const drawBox =
        getDripDrawBox(
            dripAsset,
            x,
            y,
            width,
            height
        );


    context.save();


    context.drawImage(
        getRenderedExtraLayer(
            dripAsset
        ),
        drawBox.x,
        drawBox.y,
        drawBox.width,
        drawBox.height
    );


    context.restore();
}


function drawCakeForegroundExtras(
    context,
    assets,
    x,
    y,
    width,
    height
) {
    if (!assets?.length) {
        return;
    }

    assets
        .filter(
            (asset) =>
                asset.id !==
                "chocolateDripDecoration"
        )
        .forEach((asset) => {
            context.save();

            context.drawImage(
                getRenderedExtraLayer(asset), 
                x,
                y,
                width,
                height
            );

            context.restore();
        });
}

function getCupcakeExtraStyleName() {
    switch (builderState.cupcakeFrostingStyle) {
        case "low-piped-edible-image":
            return "Flat";
        case "true-rosette":
            return "Rosette";
        case "classic-tall-swirl":
            return "Swirl";
        default:
            return null;
    }
}

async function loadCupcakeExtraAssets() {
    const styleName =
        getCupcakeExtraStyleName();

    if (!styleName) {
        return [];
    }

    const extraRoot = `${finalAssetRoot}/extras`;

    const selectedExtraIds =
        getSelectedRealisticExtraIds().filter(
            (id) => id !== "chocolateDripDecoration"
        );

    const loadedAssets = await Promise.all(
        selectedExtraIds.map(async (id) => {
            const extraName =
    id === "goldAccentDecoration"
        ? builderState.metallicLeafType === "Silver"
            ? "Metallic-Leaf-Silver"
            : "Metallic-Leaf-Gold"
        : realisticExtraNameMap[id];

            if (!extraName) {
                return null;
            }

            const strokes = await loadOptionalRealisticImage(
                `${extraRoot}/TPJ-Cupcake-Extra-${extraName}-${styleName}-Strokes.png`
            );

            const mask = await loadOptionalRealisticImage(
                `${extraRoot}/TPJ-Cupcake-Extra-${extraName}-${styleName}-Mask.png`
            );

            if (!strokes) {
                return null;
            }

            return {
                id,
                strokes,
                mask
            };
        })
    );

    return loadedAssets.filter(Boolean);
}

function drawCupcakeExtraAssets(
    context,
    assets,
    width,
    height
) {
    if (!assets?.length) {
        return;
    }

    assets.forEach((asset) => {
        context.save();

        context.drawImage(
            getRenderedExtraLayer(asset),
            0,
            0,
            width,
            height
        );

        context.restore();
    });
}
function getRealisticFinishFiles(
    entryKey,
    isBento = false
) {
    const shapeName = isBento
        ? "Bento-Heart"
        : realisticFinishShapeMap[entryKey];

    if (!shapeName) {
        return null;
    }

    if (
        builderState.cakeFinish ===
        "Watercolor Finish"
    ) {
        return {
            type: "watercolor",

            files: [
                `TPJ-Finish-Watercolor-${shapeName}-Accent-1-Mask.png`,
                `TPJ-Finish-Watercolor-${shapeName}-Accent-2-Mask.png`
            ]
        };
    }

    if (
        builderState.cakeFinish ===
        "Palette Knife Finish"
    ) {
        return {
            type: "paletteKnife",

            files: [
                `TPJ-Finish-Palette-Knife-Abstract-${shapeName}-Accent-1-Strokes.png`,
                `TPJ-Finish-Palette-Knife-Abstract-${shapeName}-Accent-1-Mask.png`,
                `TPJ-Finish-Palette-Knife-Abstract-${shapeName}-Accent-2-Strokes.png`,
                `TPJ-Finish-Palette-Knife-Abstract-${shapeName}-Accent-2-Mask.png`
            ]
        };
    }

  if (
    builderState.cakeFinish ===
    "Vintage Piping"
) {
    const vintageShapeName = isBento
        ? "Bento-5in-Heart"
        : shapeName;

    return {
        type: "vintagePiping",

        files: [
            `TPJ-Finish-Vintage-Piping-${vintageShapeName}-Accent-1-Strokes.png`,
            `TPJ-Finish-Vintage-Piping-${vintageShapeName}-Accent-1-Mask.png`,
            `TPJ-Finish-Vintage-Piping-${vintageShapeName}-Accent-2-Strokes.png`,
            `TPJ-Finish-Vintage-Piping-${vintageShapeName}-Accent-2-Mask.png`
        ]
    };
}

    return null;
}

async function loadRealisticFinishAssets(
    entryKey,
    isBento = false
) {
    const finishDefinition =
        getRealisticFinishFiles(
            entryKey,
            isBento
        );

    if (!finishDefinition) {
        return null;
    }

    const assetVersion =
        finishDefinition.type === "vintagePiping"
            ? "?v=tpj-vintage-piping-20260813-1"
            : "";

    const images = await Promise.all(
        finishDefinition.files.map(
            (file) =>
                loadOptionalRealisticImage(
                    `${finalAssetRoot}/cakes/${file}${assetVersion}`
                )
        )
    );

    if (images.some((image) => !image)) {
        return null;
    }

    return {
        type: finishDefinition.type,
        images
    };
}
function makeFlatTintedMask(
    mask,
    color
) {
    const layer =
        document.createElement("canvas");

    layer.width =
        mask.naturalWidth ||
        mask.width;

    layer.height =
        mask.naturalHeight ||
        mask.height;

    const layerContext =
        layer.getContext("2d");

    /*
        Place the original soft-edged mask.
    */

    layerContext.drawImage(
        mask,
        0,
        0,
        layer.width,
        layer.height
    );

    /*
        Fill only the visible mask pixels
        with the selected accent color.
    */

    layerContext.globalCompositeOperation =
        "source-in";

    layerContext.fillStyle =
        color;

    layerContext.fillRect(
        0,
        0,
        layer.width,
        layer.height
    );

    layerContext.globalCompositeOperation =
        "source-over";

    return layer;
}

function drawVintageFinishLayer(
    context,
    layer,
    source,
    x,
    y,
    width,
    height
) {
    const drawCentered = (
        scaleX,
        clipTopRatio = 0,
        clipBottomRatio = 1,
        scaleY = 1,
        verticalAnchor = 0.5
    ) => {
        const adjustedWidth =
            width * scaleX;

        const adjustedHeight =
            height * scaleY;

        const adjustedX =
            x +
            (width - adjustedWidth) / 2;

        const adjustedY =
            y +
            (height - adjustedHeight) *
                verticalAnchor;

        context.save();
        context.beginPath();

        context.rect(
            x,
            y + height * clipTopRatio,
            width,
            height *
                (
                    clipBottomRatio -
                    clipTopRatio
                )
        );

        context.clip();

        context.drawImage(
            layer,
            adjustedX,
            adjustedY,
            adjustedWidth,
            adjustedHeight
        );

        context.restore();
    };

    const drawCroppedBand = (
        sourceTopRatio,
        sourceBottomRatio,
        scaleX,
        scaleY,
        offsetYRatio = 0
    ) => {
        const sourceWidth =
            layer.width || width;

        const sourceHeight =
            layer.height || height;

        const sourceY =
            sourceHeight * sourceTopRatio;

        const sourceBandHeight =
            sourceHeight *
            (
                sourceBottomRatio -
                sourceTopRatio
            );

        const destinationWidth =
            width * scaleX;

        const destinationBandHeight =
            height *
            (
                sourceBottomRatio -
                sourceTopRatio
            ) *
            scaleY;

        const destinationX =
            x +
            (width - destinationWidth) / 2;

        const originalBandY =
            y + height * sourceTopRatio;

        const destinationY =
            originalBandY +
            (
                height *
                    (
                        sourceBottomRatio -
                        sourceTopRatio
                    ) -
                destinationBandHeight
            ) / 2 +
            height * offsetYRatio;

        context.drawImage(
            layer,
            0,
            sourceY,
            sourceWidth,
            sourceBandHeight,
            destinationX,
            destinationY,
            destinationWidth,
            destinationBandHeight
        );
    };

    /*
        TALL ROUND
        Accent 1 keeps the corrected rings.
        Accent 2 contains the swags, so only
        the swag layer is narrowed.
    */

    if (
        source.includes("-Tall-Round-") &&
        builderState.cakeCoverage === "full"
    ) {
        if (
            source.includes("-Accent-1-")
        ) {
            drawCroppedBand(
                0,
                0.28,
                0.88,
                0.75
            );

            drawCentered(
                1,
                0.30,
                0.75
            );

            drawCroppedBand(
                0.75,
                1,
                0.88,
                0.75
            );
        } else {
            drawCentered(
                0.90
            );
        }

        return;
    }

    /*
        TALL HEART
        Grow only the upper piping area.
    */

    if (
        source.includes("-Tall-Heart-") &&
        !source.includes(
            "-Tall-5in-Heart-"
        ) &&
        source.includes("-Accent-1-")
    ) {
        drawCroppedBand(
            0,
            0.30,
            1.12,
            1
        );

        drawCentered(
            1,
            0.30,
            1
        );

        return;
    }

    /*
        STANDARD HEART
        Grow only the upper piping area.
    */

    if (
        source.includes("-Heart-") &&
        !source.includes("-Tall-Heart-") &&
        !source.includes("-5in-Heart-") &&
        !source.includes("-Bento-") &&
        source.includes("-Accent-1-")
    ) {
        drawCroppedBand(
            0,
            0.30,
            1.10,
            1
        );

        drawCentered(
            1,
            0.30,
            1
        );

        return;
    }

    /*
        STANDARD STAR
        Keep the upper artwork full-sized and
        narrow only the lower piping.
    */

    if (
        source.includes("-Star-") &&
        !source.includes("-Tall-Star-") &&
        source.includes("-Accent-1-")
    ) {
        drawCentered(
            1,
            0,
            0.70
        );

        drawCroppedBand(
            0.70,
            1,
            0.86,
            1
        );

        return;
    }

    /*
        HALF SHEET
    */

    if (
        source.includes("-Half-Sheet-") &&
        source.includes("-Accent-1-")
    ) {
        drawCentered(
            1,
            0,
            0.68
        );

        drawCroppedBand(
            0.68,
            1,
            0.97,
            1,
            -0.055
        );

        return;
    }

    /*
        FULL SHEET
    */

    if (
        source.includes("-Full-Sheet-") &&
        source.includes("-Accent-1-")
    ) {
        drawCentered(
            1,
            0,
            0.70
        );

        drawCroppedBand(
            0.70,
            1,
            1,
            1,
            -0.055
        );

        return;
    }

    /*
        TALL TWO-TIER
    */

    if (
        source.includes(
            "-Tall-Two-Tier-"
        )
    ) {
        drawCentered(
            0.94,
            0,
            0.56
        );

        drawCentered(
            1,
            0.56,
            1
        );

        return;
    }

    /*
        STANDARD TWO-TIER
        Move the complete decoration slightly
        left without moving or resizing the cake.
    */

    if (
        source.includes("-Two-Tier-")
    ) {
        context.save();

        context.translate(
            -width * 0.035,
            0
        );

        drawCentered(
            0.94,
            0,
            0.55
        );

        drawCentered(
            0.97,
            0.55,
            1
        );

        context.restore();

        return;
    }

    /*
        Everything not explicitly listed,
        including Square, stays exactly at
        its exported registration.
    */

    context.drawImage(
        layer,
        x,
        y,
        width,
        height
    );
}
function drawRealisticCakeFinish(
    context,
    finishAssets,
    x,
    y,
    width,
    height
) {
    if (!finishAssets) {
        return;
    }

    const accentOne =
        builderState.finishAccentOne ||
        "#FF4FA3";

    const accentTwo =
        builderState.finishAccentTwo ||
        "#F4D66E";

    context.save();

    /*
        WATERCOLOR QA MASKS
    */

    if (
        finishAssets.type ===
        "watercolor"
    ) {
        const [
            accentOneMask,
            accentTwoMask
        ] = finishAssets.images;

        const accentOneLayer =
            makeFlatTintedMask(
                accentOneMask,
                accentOne
            );

        const accentTwoLayer =
            makeFlatTintedMask(
                accentTwoMask,
                accentTwo
            );

        const isBento =
            builderState.cakeProductId ===
            "heart-5-bento";

        context.globalCompositeOperation =
            isBento
                ? "source-over"
                : "multiply";

        context.globalAlpha =
            isBento ? 0.72 : 0.78;

        context.drawImage(
            accentOneLayer,
            x,
            y,
            width,
            height
        );

        context.globalAlpha =
            isBento ? 0.62 : 0.68;

        context.drawImage(
            accentTwoLayer,
            x,
            y,
            width,
            height
        );
    }

    /*
        DIMENSIONAL STROKE-AND-MASK FINISHES
    */

    if (
        finishAssets.type ===
            "paletteKnife" ||
        finishAssets.type ===
            "vintagePiping" ||
        finishAssets.type ===
            "numberLetterPiping"
    ) {
        const [
            accentOneStrokes,
            accentOneMask,
            accentTwoStrokes,
            accentTwoMask
        ] = finishAssets.images;

        const accentOneLayer =
            makeTintedLayer(
                accentOneStrokes,
                accentOneMask,
                accentOne
            );

        const accentTwoLayer =
            makeTintedLayer(
                accentTwoStrokes,
                accentTwoMask,
                accentTwo
            );

        context.globalCompositeOperation =
            "source-over";

        context.globalAlpha = 1;

        if (
            finishAssets.type ===
            "vintagePiping"
        ) {
            drawVintageFinishLayer(
                context,
                accentOneLayer,
                accentOneStrokes.src || "",
                x,
                y,
                width,
                height
            );

            drawVintageFinishLayer(
                context,
                accentTwoLayer,
                accentTwoStrokes.src || "",
                x,
                y,
                width,
                height
            );
        } else {
            context.drawImage(
                accentOneLayer,
                x,
                y,
                width,
                height
            );

            context.drawImage(
                accentTwoLayer,
                x,
                y,
                width,
                height
            );
        }
    }

    context.restore();
}
function getEffectiveBoardColor() {
    if (
        !builderState
            .matchBoardToCakePalette
    ) {
        return builderState
            .cakeBoardColor;
    }

    const product =
        getSelectedCakeProduct();

    if (
        product.shape === "tier"
    ) {
        return getRenderableCakeColor(
            builderState.tierBottomColor
        );
    }

    if (
        product.shape ===
        "numberLetter"
    ) {
        return getRenderableCakeColor(
            builderState.characterOneColor
        );
    }

    return getRenderableCakeColor(
        builderState.mainCakeColor
    );
}
async function updateRealisticCakePreview() {
    if (!realisticCakeCanvas) return;

    const renderVersion = ++realisticRenderVersion;
    const product = getSelectedCakeProduct();
    const isBento =
        builderState.cakeProductId === "heart-5-bento";
    const isCupcakesOnly = product.shape === "cupcakes";
    const isStandalonePreview = isBento || isCupcakesOnly;

    let boardKey = builderState.cakeBoardStyle;

    if (product.shape === "sheet") {
        boardKey = "rectangleHorizontal";
    }

    if (product.shape === "numberLetter") {
        boardKey = "letterNumber";
    }

    if (product.shape === "square" && boardKey === "round") {
        boardKey = "square";
    }

    const boardAssets =
        boardAssetMap[boardKey] ||
        boardAssetMap.round;

    const previewEntries =
    getCakePreviewEntries(product);

    const cakeUrls = previewEntries.map(
        (entry) =>
            `${finalAssetRoot}/cakes/${entry.file}${cakeAssetVersion}`
    );

    try {
        if (isStandalonePreview) {
     const [
    standaloneImage,
    cupcakeDesign,
    edibleImage,
    standaloneFinishAssets,
    standaloneBorderAssets,
    standaloneExtraAssets
] = await Promise.all([    
    loadRealisticImage(
        cakeUrls[0]
    ),

    renderCupcakeDesignCanvas(),

    edibleImageIsReady()
        ? loadRealisticImage(
            builderState.edibleImageUrl
        )
        : Promise.resolve(null),

    isBento
        ? loadRealisticFinishAssets(
            "heart5in",
            true
        )
        : Promise.resolve(null),
        isBento
    ? loadSelectedBorderAssets(
        "heart5in",
        true
    )
    : Promise.resolve({
        top: null,
        bottom: null
    }),

isBento
    ? loadCakeExtraAssets(
        "heart5in",
        true
    )
    : Promise.resolve([])
]);
            if (renderVersion !== realisticRenderVersion) return;

            const context = realisticCakeCanvas.getContext("2d");
            context.clearRect(
                0,
                0,
                realisticCakeCanvas.width,
                realisticCakeCanvas.height
            );
            const standaloneScale = isBento
                ? 0.96
                : product.cupcakeCount === 4
                ? 0.94
                : 1.06;

            const standaloneOffsetY = isBento
                ? 12
                : product.cupcakeCount === 4
                ? 18
                : 8;

            const transform = drawContainedCanvasImage(
                context,
                standaloneImage,
                realisticCakeCanvas,
                standaloneScale,
                standaloneOffsetY
            );

            if (isBento) {
                drawBentoColorPreview(
                    context,
                    standaloneImage,
                    transform
                );
 drawRealisticCakeFinish(
    context,
    standaloneFinishAssets,
    transform.x,
    transform.y,
    transform.width,
    transform.height
);


/*
    Drip first.
*/

drawCakeDripExtra(
    context,
    standaloneExtraAssets,
    transform.x,
    transform.y,
    transform.width,
    transform.height
);


if (standaloneBorderAssets?.bottom) {
    drawCakeBorder(
        context,
        standaloneBorderAssets.bottom,
        transform.x,
        transform.y,
        transform.width,
        transform.height
    );
}

if (standaloneBorderAssets?.top) {
    drawCakeBorder(
        context,
        standaloneBorderAssets.top,
        transform.x,
        transform.y,
        transform.width,
        transform.height
    );
}


/*
    Remaining extras last.
*/

drawCakeForegroundExtras(
    context,
    standaloneExtraAssets,
    transform.x,
    transform.y,
    transform.width,
    transform.height
);

                drawBentoEdibleImage(
                    context,
                    edibleImage,
                    transform,
                    standaloneImage
                );
            }

            drawCupcakeSetPreview(
                context,
                cupcakeDesign,
                isBento ? "bento" : builderState.cakeProductId,
                transform,
                standaloneImage
            );
            return;
        }

        const boardUrl =
            `${finalAssetRoot}/boards/${boardAssets[0]}`;

        const boardMaskUrl =
            `${finalAssetRoot}/boards/${boardAssets[1]}`;

      const [
    boardImage,
    boardMask,
    cakeImages,
    edibleImage,
    finishAssetSets,
    borderAssetSets,
    extraAssetSets
] =
    await Promise.all([
        loadRealisticImage(
            boardUrl
        ),

        loadRealisticImage(
            boardMaskUrl
        ),

        Promise.all(
            cakeUrls.map(
                loadRealisticImage
            )
        ),

        edibleImageIsReady()
            ? loadRealisticImage(
                builderState.edibleImageUrl
            )
            : Promise.resolve(null),

      Promise.all(
    previewEntries.map(
        (entry) =>
            product.shape === "numberLetter"
                ? loadNumberLetterStyleAssets(
                    entry
                )
                : loadRealisticFinishAssets(
                    entry.key
                )
    )
),

Promise.all(
    previewEntries.map(
        (entry) =>
            loadSelectedBorderAssets(
                entry.key
            )
    )
),
Promise.all(
    previewEntries.map(
        (entry) =>
            product.shape === "numberLetter"
                ? loadNumberLetterExtraAssets(
                    entry
                )
                : loadCakeExtraAssets(
                    entry.key
                )
    )
)

    ]);
        if (renderVersion !== realisticRenderVersion) return;

        const context = realisticCakeCanvas.getContext("2d");
        context.clearRect(
            0,
            0,
            realisticCakeCanvas.width,
            realisticCakeCanvas.height
        );

        const boardYOffset =
            boardKey === "rectangleHorizontal"
                ? 260
                : 0;

        drawRecoloredAsset(
            context,
            boardImage,
            boardMask,
            getEffectiveBoardColor(),
            0,
            boardYOffset,
            realisticCakeCanvas.width,
            realisticCakeCanvas.height
        );
previewEntries.forEach((entry, index) => {
    const cakeImage = cakeImages[index];

    const placement =
        entry.placement ||
        cakePlacements[entry.key]?.[boardKey] ||
        cakePlacements[entry.key]?.round ||
        [0, 0, 1];

    const [x, y, scale] = placement;

    const size = getContainedAssetSize(
        cakeImage,
        scale
    );
    const isCoveragePreview =
    builderState.cakeCoverage !== "full" &&
    cakeSupportsCoverage(product);

const coverageMask =
    isCoveragePreview
        ? getCoverageButtercreamMask(
            cakeImage
        )
        : cakeImage;

if (isCoveragePreview) {
    context.drawImage(
        cakeImage,
        x,
        y + boardYOffset,
        size.width,
        size.height
    );
}

    if (product.shape === "tier") {
    drawTwoTierColors(
        context,
        cakeImage,
        x,
        y + boardYOffset,
        size.width,
        size.height,
        coverageMask
        
    );

    drawTwoTierSimpleTexture(
        context,
        cakeImage,
        x,
        y + boardYOffset,
        size.width,
        size.height,
        coverageMask
    );
} else {
    const isLayeredNumberLetter =
        product.shape === "numberLetter" &&
        builderState.numberLetterStyle ===
            "Layered Piped";

    if (isLayeredNumberLetter) {
        /*
            The layered base contains exposed
            sponge, so it must retain its
            original baked-cake color.
        */

        context.drawImage(
            cakeImage,
            x,
            y + boardYOffset,
            size.width,
            size.height
        );
    } else {
        const selectedCakeColor =
            product.shape === "numberLetter"
                ? index === 0
                    ? builderState.characterOneColor
                    : builderState.characterTwoColor
                : builderState.mainCakeColor;

         drawRecoloredAsset(
            context,
            cakeImage,
            coverageMask,
            getLightenedCakePreviewColor(
                selectedCakeColor
            ),
            x,
            y + boardYOffset,
            size.width,
            size.height
        );
    }

    if (product.shape === "sheet") {
        drawSheetSimpleTexture(
            context,
            cakeImage,
            x,
            y + boardYOffset,
            size.width,
            size.height
        );
    }
}
    

    /*
        This MUST remain inside the loop because      
    

    /*
        This MUST remain inside the loop because
        x, y, and size only exist inside this loop.
    */

  drawRealisticCakeFinish(
    context,
    finishAssetSets[index],
    x,
    y + boardYOffset,
    size.width,
    size.height
);


/*
    Chocolate drip belongs underneath
    the buttercream border.
*/

drawCakeDripExtra(
    context,
    extraAssetSets[index],
    x,
    y + boardYOffset,
    size.width,
    size.height
);


const borderAssets =
    borderAssetSets[index];

if (borderAssets?.bottom) {
    drawCakeBorder(
        context,
        borderAssets.bottom,
        x,
        y + boardYOffset,
        size.width,
        size.height
    );
}

if (borderAssets?.top) {
    drawCakeBorder(
        context,
        borderAssets.top,
        x,
        y + boardYOffset,
        size.width,
        size.height
    );
}


/*
    Bows, butterflies, cherries,
    flowers, leaf and pearls sit above
    the border.
*/

drawCakeForegroundExtras(
    context,
    extraAssetSets[index],
    x,
    y + boardYOffset,
    size.width,
    size.height
);

});
        if (edibleImage) {
            previewEntries.forEach((entry, index) => {
                const cakeImage = cakeImages[index];
                const placement =
                    entry.placement ||
                    cakePlacements[entry.key]?.[boardKey] ||
                    cakePlacements[entry.key]?.round ||
                    [0, 0, 1];

                const [x, y, scale] = placement;
                const size = getContainedAssetSize(
                    cakeImage,
                    scale
                );

                drawEdibleImageInArea(
                    context,
                    edibleImage,
                    getEdibleImageArea(
                        product,
                        x,
                        y + boardYOffset,
                        size.width,
                        size.height
                    )
                );
            });
        }
 } catch (error) {
    if (
        renderVersion ===
        realisticRenderVersion
    ) {
        const context =
            realisticCakeCanvas.getContext(
                "2d"
            );

        context.clearRect(
            0,
            0,
            realisticCakeCanvas.width,
            realisticCakeCanvas.height
        );
    }

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

async function renderCupcakeDesignCanvas() {
    const liner = builderState.cupcakeLinerStyle || "paper";
    const foundationFiles =
        cupcakeFoundationMap[liner] || cupcakeFoundationMap.paper;
    const frostingFiles = getCupcakeFrostingFiles(
        liner,
        builderState.cupcakeFrostingStyle
    );

    const linerRoot = `${finalAssetRoot}/cupcakes/liners`;
    const frostingRoot = `${finalAssetRoot}/cupcakes/frosting`;
    const foundationUrl = frostingFiles
        ? `${frostingRoot}/${foundationFiles[2]}`
        : `${linerRoot}/${foundationFiles[0]}`;

    const [foundation, linerMask, frosting, frostingMask] =
        await Promise.all([
            loadRealisticImage(foundationUrl),
            loadRealisticImage(`${linerRoot}/${foundationFiles[1]}`),
            frostingFiles
                ? loadRealisticImage(`${frostingRoot}/${frostingFiles[0]}`)
                : Promise.resolve(null),
            frostingFiles
                ? loadRealisticImage(`${frostingRoot}/${frostingFiles[1]}`)
                : Promise.resolve(null)
        ]);

    const canvas = document.createElement("canvas");
    canvas.width = foundation.naturalWidth;
    canvas.height = foundation.naturalHeight;

    const context = canvas.getContext("2d");
    context.drawImage(foundation, 0, 0, canvas.width, canvas.height);

    if (builderState.cupcakeLinerColor !== "original") {
        const linerTint = makeTintedLayer(
            foundation,
            linerMask,
            builderState.cupcakeLinerColor
        );
        context.drawImage(linerTint, 0, 0, canvas.width, canvas.height);
    }

    if (frosting && frostingMask) {
        context.drawImage(frosting, 0, 0, canvas.width, canvas.height);

        if (builderState.cupcakeFrostingColor !== "original") {
            const frostingTint = makeTintedLayer(
                frosting,
                frostingMask,
                builderState.cupcakeFrostingColor
            );
            context.drawImage(frostingTint, 0, 0, canvas.width, canvas.height);
        }

        if (
            getSelectedCakeProduct().shape === "cupcakes" &&
            builderState.cupcakeFrostingStyle ===
                "low-piped-edible-image" &&
            edibleImageIsReady()
        ) {
            const edibleImage = await loadRealisticImage(
                builderState.edibleImageUrl
            );

            drawEdibleImageInArea(
                context,
                edibleImage,
                {
                    centerX: canvas.width * 0.5,
                    centerY: canvas.height * 0.255,
                    width: canvas.width * 0.3,
                    height: canvas.height * 0.22
                }
            );
        }

      const cupcakeExtraAssets =
    await loadCupcakeExtraAssets();

drawCupcakeExtraAssets(
    context,
    cupcakeExtraAssets,
    canvas.width,
    canvas.height
);
}

return canvas;
}

const cupcakeSetLayouts = {
    bento: {
        slots: [
            [772, 670, 268, -0.03],
            [986, 705, 262, 0.035],
            [724, 855, 268, -0.02],
            [949, 898, 260, 0.04]
        ]
    },
    "cupcakes-4": {
        slots: [
            [459, 662, 430, -0.035],
            [801, 723, 420, 0.035],
            [384, 906, 425, -0.04],
            [749, 971, 415, 0.04]
        ]
    },
    "cupcakes-8": {
        slots: [
            [402, 510, 300, -0.025], [644, 535, 297, -0.01],
            [887, 554, 293, 0.01], [1129, 576, 286, 0.025],
            [351, 695, 300, -0.035], [604, 721, 297, -0.015],
            [861, 743, 293, 0.01], [1124, 768, 286, 0.03]
        ]
    },
    "cupcakes-12": {
        slots: [
            [406, 459, 250, -0.025], [622, 477, 247, -0.01],
            [842, 495, 245, 0.01], [1063, 516, 240, 0.025],
            [364, 606, 250, -0.035], [591, 625, 247, -0.015],
            [818, 645, 245, 0.01], [1046, 666, 240, 0.03],
            [320, 761, 250, -0.04], [556, 784, 247, -0.02],
            [792, 803, 245, 0.01], [1029, 826, 240, 0.035]
        ]
    }
};

function drawCupcakeSetPreview(
    context,
    cupcakeDesign,
    layoutKey,
    transform,
    sourceImage
) {
    const layout = cupcakeSetLayouts[layoutKey];

    if (!layout || !cupcakeDesign) {
        return;
    }

    context.save();
    context.translate(transform.x, transform.y);
    context.scale(
        transform.width / sourceImage.naturalWidth,
        transform.height / sourceImage.naturalHeight
    );

    layout.slots.forEach(([centerX, centerY, size, rotation]) => {
        context.save();
        context.translate(centerX, centerY);
        context.rotate(rotation);

        /* Crop away the transparent single-cupcake padding. The liner/body
           remains underneath; frosting and decorations stay on top. */
        context.drawImage(
            cupcakeDesign,
            60,
            100,
            cupcakeDesign.width - 120,
            cupcakeDesign.height - 170,
            -size / 2,
            -size * 0.48,
            size,
            size * 0.92
        );

        context.restore();
    });

    context.restore();
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
        getSelectedCakeProduct().shape === "cupcakes"
            ? `${getDisplayCakeName()} · preview applies to every cupcake`
            : builderState.cakeProductId === "heart-5-bento"
            ? `Bento box · preview applies to all ${builderState.bentoCupcakeCount} included cupcakes`
            : selectedSet
            ? `${selectedSet.name} · preview applies to every cupcake`
            : "Select a 4-, 8-, or 12-count set above."
    );

 getElements(
    "[data-cupcake-decoration]"
).forEach((element) => {
    element.classList.remove(
        "is-visible"
    );
});   
}

function updateRendererColors() {
    if (!cakeRenderer) {
        return;
    }

    const mainColor = getRenderableCakeColor(
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
                `The 5" Sweetheart Bento Box includes a one-layer heart cake and ${builderState.bentoCupcakeCount} cupcakes.`;
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
function updateFinishAvailability() {
    const product =
        getSelectedCakeProduct();

    const isNumberLetter =
        product.shape ===
            "numberLetter";

    const unsupportedFinishes = [
        "Simple Texture",
        "Watercolor Finish",
        "Palette Knife Finish",
        "Vintage Piping"
    ];

    unsupportedFinishes.forEach(
        (finishValue) => {
            const finishInput =
                getElement(
                    `input[name="cakeFinish"][value="${finishValue}"]`
                );

            const finishCard =
                finishInput?.closest(
                    ".style-choice-card"
                );

            const unavailableForNumberLetter =
                isNumberLetter;

            const unavailableWithFondant =
                builderState.fondantEnabled &&
                finishValue ===
                    "Simple Texture";

            const unavailable =
                unavailableForNumberLetter ||
                unavailableWithFondant;

            finishCard?.classList.toggle(
                "is-hidden",
                unavailable
            );

            if (finishInput) {
                finishInput.disabled =
                    unavailable;
            }
        }
    );

    const selectedFinishUnavailable =
        (
            isNumberLetter &&
            unsupportedFinishes.includes(
                builderState.cakeFinish
            )
        ) ||
        (
            builderState.fondantEnabled &&
            builderState.cakeFinish ===
                "Simple Texture"
        );

    if (selectedFinishUnavailable) {
        builderState.cakeFinish = "";

        getElements(
            'input[name="cakeFinish"]'
        ).forEach((finishInput) => {
            finishInput.checked = false;
        });
    }
}
function updateFinishColorControls() {
    const finishColorCustomizer =
        getElement(
            "#finishColorCustomizer"
        );

    const product =
        getSelectedCakeProduct();

    const numberLetterUsesPipingColors =
        product.shape === "numberLetter" &&
        Boolean(
            builderState.numberLetterStyle
        );

    const finishUsesTwoColors =
    builderState.cakeCoverage === "full" &&
    (
        builderState.cakeFinish ===
            "Watercolor Finish" ||
        builderState.cakeFinish ===
            "Palette Knife Finish" ||
        builderState.cakeFinish ===
            "Vintage Piping" ||
        numberLetterUsesPipingColors
    );
}
function updateFinishVisibility() {
    /*
        All realistic cake finishes are now
        rendered directly on the canvas.

        Keep the old SVG finish layers hidden.
    */

    getElements(
        ".cake-finish-group"
    ).forEach((group) => {
        group.classList.add(
            "is-hidden"
        );
    });
 
}

/* =========================================
   RENDERER DECORATIONS
========================================= */

function updateDecorationVisibility() {
    /*
        Realistic extras are now rendered
        directly on the canvas.

        Keep all old SVG decoration layers hidden.
        The extra-layer indicator is the only
        legacy layer that may still be used.
    */

    getElements(
        ".cake-decoration-group"
    ).forEach((element) => {
        const isExtraLayer =
            element.id ===
            "extraLayerDecoration";

        if (isExtraLayer) {
            return;
        }

        element.classList.add(
            "is-hidden"
        );
    });
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

    getElements(
        ".quantity-decoration-card"
    ).forEach((card) => {
        const quantity = Math.max(
            0,
            Number.parseInt(
                card.querySelector(
                    'input[type="number"]'
                )?.value || "0",
                10
            ) || 0
        );

        card.classList.toggle(
            "is-selected",
            quantity > 0
        );
    });
}        


/* =========================================
   PRODUCT-SPECIFIC BUILDER PATHS
========================================= */

function isCupcakesOnlyProduct() {
    return getSelectedCakeProduct().shape === "cupcakes";
}
function reorderStepFourControls() {
    const cupcakeSlot = getElement(
        "#cupcakeOnlyStudioSlot"
    );

    const fondant = getElement(
        "#fondantCoverageCustomizer"
    );

    if (cupcakeSlot && fondant) {
        fondant.before(cupcakeSlot);
    }

    const finish = getElement(
        "#cakeFinishCustomizer"
    );

    const finishColors = getElement(
        "#finishColorCustomizer"
    );

    const borders = getElement(
        "#cakeBorderCustomizer"
    );

    if (finish && borders) {
        borders.before(finish);
    }

    if (finish && finishColors) {
        finish.after(finishColors);
    }

    const topperQuestion = getElement(
        "#cakeTopperCustomizer"
    );

    const topperOptions = getElement(
        "#topperTypeOptions"
    );

    if (
        topperQuestion &&
        topperOptions
    ) {
        topperQuestion.after(
            topperOptions
        );
    }

    const cakeDetails = getElement(
        "#cakeDetailsCustomizer"
    );

    const toyFigurine = getElement(
        "#toyFigurineCustomizer"
    );

    const customSculpted = getElement(
        "#customSculptedCustomizer"
    );

    if (cakeDetails && toyFigurine) {
        cakeDetails.after(toyFigurine);
    }

    if (toyFigurine && customSculpted) {
        toyFigurine.after(customSculpted);
    }
}


function updateSurfaceOptionAvailability() {
    const product =
        getSelectedCakeProduct();

    const ganacheAllowed =
        product.shape !== "cupcakes";

    const fondantAllowed =
        ganacheAllowed &&
        builderState.cakeCoverage ===
            "full";

    const ganacheInput = getElement(
        'input[name="buttercreamStyle"][value="Ganache"]'
    );

    const ganacheCard =
        ganacheInput?.closest(
            ".description-choice-card"
        );

    ganacheCard?.classList.toggle(
        "is-hidden",
        !ganacheAllowed
    );

    if (ganacheInput) {
        ganacheInput.disabled =
            !ganacheAllowed;
    }

    if (
        !ganacheAllowed &&
        builderState.buttercreamStyle ===
            "Ganache"
    ) {
        builderState.buttercreamStyle =
            "";

        if (ganacheInput) {
            ganacheInput.checked = false;
        }
    }

    setText(
        "#ganacheCoatingPriceLabel",
        ganacheAllowed
            ? `+${formatCurrency(
                getSurfaceUpcharge(
                    "ganache"
                )
            )}`
            : "Unavailable for cupcakes"
    );

    const fondantFieldset = getElement(
        "#fondantCoverageCustomizer"
    );

    const fondantToggle = getElement(
        "#fondantEnabledToggle"
    );

    fondantFieldset?.classList.toggle(
        "is-hidden",
        !fondantAllowed
    );

    if (!fondantAllowed) {
        builderState.fondantEnabled =
            false;

        if (fondantToggle) {
            fondantToggle.checked = false;
        }
    }

    setText(
        "#fondantPriceLabel",
        fondantAllowed
            ? `Add for ${formatCurrency(
                getSurfaceUpcharge(
                    "fondant"
                )
            )}`
            : "Unavailable for this selection"
    );
}


function updateCoverageDesignAvailability() {
    const product =
        getSelectedCakeProduct();

    const isCupcakesOnly =
        product.shape === "cupcakes";

    const limitedCoverage =
        cakeSupportsCoverage(product) &&
        builderState.cakeCoverage !==
            "full";

    const quoteOnlyUnavailable =
        limitedCoverage ||
        isCupcakesOnly;

    getElement(
        "#cakeFinishCustomizer"
    )?.classList.toggle(
        "is-hidden",
        isCupcakesOnly ||
        limitedCoverage
    );

    [
        "#edibleImageCustomizer",
        "#cakeTopperCustomizer",
        "#cakeDetailsCustomizer"
    ].forEach((selector) => {
        getElement(selector)?.classList.toggle(
            "is-hidden",
            limitedCoverage
        );
    });

    [
        "#toyFigurineCustomizer",
        "#customSculptedCustomizer"
    ].forEach((selector) => {
        getElement(selector)?.classList.toggle(
            "is-hidden",
            quoteOnlyUnavailable
        );
    });

    if (quoteOnlyUnavailable) {
        builderState.toyFigurineEnabled =
            false;

        builderState.sculptedPiecesEnabled =
            false;

        const toyToggle = getElement(
            "#toyFigurineEnabledToggle"
        );

        const sculptedToggle = getElement(
            "#customSculptedEnabledToggle"
        );

        if (toyToggle) {
            toyToggle.checked = false;
        }

        if (sculptedToggle) {
            sculptedToggle.checked = false;
        }
    }

    if (!limitedCoverage) {
        updateExtraDetailControlsVisibility();
        updateFlowerSourceVisibility();
        updateTopperOptionsVisibility();
        updateQuoteOnlyExtraVisibility();
        return;
    }

    builderState.fondantEnabled = false;
    builderState.cakeFinish = "";
    builderState.edibleImageEnabled = false;
    builderState.cakeTopperEnabled = false;
    builderState.topperType = "";
    builderState.topperPrice = 0;
    builderState.decorations = [];


    [
        "#fondantEnabledToggle",
        "#edibleImageEnabledToggle",
        "#cakeTopperEnabledToggle"
    ].forEach((selector) => {
        const toggle = getElement(selector);

        if (toggle) {
            toggle.checked = false;
        }
    });

    getElements(
        'input[name="cakeFinish"], input[name="topperType"], [data-decoration-id]'
    ).forEach((input) => {
        input.checked = false;
    });
[
    "#finishColorCustomizer",
    "#topperTypeOptions",
    "#metallicLeafDetailOptions",
    "#bowDetailOptions",
    "#butterflyDetailOptions",
    "#cherryDetailOptions",
    "#dripDetailOptions",
    "#pearlDetailOptions",
    "#flowerDetailOptions",
    "#macaronsDetailOptions",
    "#discoBallsDetailOptions",
    "#flowerSourceOptions",
    "#toyFigurineDetailsField",
    "#customSculptedDetailsField"
]
    .forEach((selector) => {
        getElement(selector)?.classList.add(
            "is-hidden"
        );
    });
}

function updateProductModeUI() {
    const product = getSelectedCakeProduct();
    const isCupcakesOnly = product.shape === "cupcakes";
    const isBento = builderState.cakeProductId === "heart-5-bento";
   const supportsCoverage =
    cakeSupportsCoverage(product);
    const isTwoTier = product.shape === "tier";
    const usesCupcakeStudio = isCupcakesOnly || isBento;
    

    cakeRenderer?.classList.toggle(
        "is-cupcake-box-preview",
        isCupcakesOnly
    );
    cakeRenderer?.classList.toggle(
        "is-bento-preview",
        isBento
    );

    getElement("#cakeBoardCustomizer")?.classList.toggle(
        "is-hidden",
        isCupcakesOnly
    );

    getElements(
    ".cake-only-inside"
).forEach((element) => {
    const isCustomFillingField =
        element.id ===
        "customFillingField";

    const shouldHide =
        isCupcakesOnly ||
        (
            isCustomFillingField &&
            builderState.cakeFilling !==
                "Custom Filling"
        );

    element.classList.toggle(
        "is-hidden",
        shouldHide
    );
});

    getElements(".cake-only-look").forEach((element) => {
        element.classList.toggle("is-hidden", isCupcakesOnly);
    });

    getElement("#gourmetCupcakeExtras")?.classList.toggle(
        "is-hidden",
        isCupcakesOnly
    );

   getElement(
    "#cakeCoverageOptions"
)?.classList.toggle(
    "is-hidden",
    !supportsCoverage
);

getElement(
    "#bentoCupcakeCountOptions"
)?.classList.toggle(
    "is-hidden",
    !isBento
); 

    getElement("#tierColorCustomizer")?.classList.toggle(
        "is-hidden",
        !isTwoTier
    );

    const isNumberLetter =
    product.shape === "numberLetter";

const isLayeredNumberLetter =
    isNumberLetter &&
    builderState.numberLetterStyle ===
        "Layered Piped";

getElement(
    "#numberLetterStyleCustomizer"
)?.classList.toggle(
    "is-hidden",
    !isNumberLetter
);

getElement(
    "#characterColorCustomizer"
)?.classList.toggle(
    "is-hidden",
    !isNumberLetter ||
        isLayeredNumberLetter
);

    getElement("#secondCharacterColorField")?.classList.toggle(
        "is-hidden",
        !isNumberLetter || product.characterCount !== 2
    );

   getElement(
    "#singleCakeColorCustomizer"
)?.classList.toggle(
    "is-hidden",
    isCupcakesOnly ||
    isTwoTier ||
    isNumberLetter
    
);


const dripDecorationCard =
    getElement(
        '[data-decoration-id="chocolateDripDecoration"]'
    )?.closest(
        ".decoration-choice-card"
    );


dripDecorationCard?.classList.toggle(
    "is-hidden",
    isCupcakesOnly
);


const cupcakeStudio =
    getElement(
        "#cupcakeStudio"
    ); 
    const targetSlot = getElement(
        usesCupcakeStudio
            ? "#cupcakeOnlyStudioSlot"
            : "#cupcakeAddOnStudioSlot"
    );

    if (
        cupcakeStudio &&
        targetSlot &&
        cupcakeStudio.parentElement !== targetSlot
    ) {
        targetSlot.appendChild(cupcakeStudio);
    }

    setText(
        "#step3Eyebrow",
        isCupcakesOnly ? "Inside The Cupcake" : "Inside The Cake"
    );
    setText(
        "#step3Title",
        isCupcakesOnly ? "Choose Your Cupcake Flavor." : "What Are You Craving?"
    );
    setText(
        "#step3Description",
        isCupcakesOnly
            ? "Choose one flavor for the selected cupcake set."
            : "Choose a favorite or describe the flavor combination you already have in mind."
    );
    setText(
        "#flavorLegend",
        isCupcakesOnly ? "Cupcake Flavor" : "Cake Flavor"
    );

    setText(
        "#step4Eyebrow",
        isCupcakesOnly ? "Decorate The Cupcakes" : "Outside The Cake"
    );
    setText(
        "#step4Description",
        isCupcakesOnly
            ? "Choose the liner, icing style, icing color, and finishing details."
            : "Choose the color, coating finish, and details that fit the celebration."
    );

       setText(
        "#cupcakeStudioCaption",
        isCupcakesOnly
            ? `These choices apply to all ${product.cupcakeCount} cupcakes in this order.`
            : isBento
            ? `These choices apply to all ${builderState.bentoCupcakeCount} cupcakes included in the bento box.`
            : "These choices apply to whichever 4-, 8-, or 12-count cupcake set you select above."
    );

    updateSurfaceOptionAvailability();
} 


function normalizeProductSpecificState(
    product
) {
       const isCupcakesOnly =
        product.shape ===
        "cupcakes";

    const supportsCoverage =
        cakeSupportsCoverage(product);

    if (!supportsCoverage) {
        builderState.cakeCoverage =
            "full";

        getElements(
            'input[name="cakeCoverage"]'
        ).forEach((input) => {
            input.checked =
                input.value === "full";
        });
    }


    if (!isCupcakesOnly) {
        return;
    }


    /*
        Cupcakes do not use cake-only
        inside options.
    */

    builderState.buttercreamStyle =
        "";

    builderState.buttercreamFlavor =
        "";

    builderState.cakeFilling =
        "";

    builderState.customFilling =
        "";

    builderState.premiumFillings =
        [];

    builderState.cakeFinish =
        "";


    /*
        Cupcakes do not use cake boards.
    */

    builderState
        .matchBoardToCakePalette =
        false;

    const matchBoardInput =
        getElement(
            "#matchBoardToCakePalette"
        );

    if (matchBoardInput) {
        matchBoardInput.checked =
            false;
    }


    /*
        Chocolate Drip is not offered
        for cupcake rendering.
    */

    builderState.decorations =
        builderState.decorations.filter(
            (decoration) =>
                decoration.id !==
                "chocolateDripDecoration"
        );


    const dripDecorationInput =
        getElement(
            '[data-decoration-id="chocolateDripDecoration"]'
        );

    if (dripDecorationInput) {
        dripDecorationInput.checked =
            false;
    }


    builderState.dripChocolateType =
        "Milk Chocolate";

    builderState
        .whiteChocolateColored =
        "No";

    builderState
        .whiteChocolateDripColor =
        "#F7B6D2";

    builderState.dripColor =
        "#84563C";


    /*
        Remove cupcake add-on bundles when
        Cupcakes Only is the main product.
    */

    builderState.extras =
        builderState.extras.filter(
            (extra) =>
                !/^\d+ Gourmet Cupcakes$/.test(
                    extra.name
                )
        );


    getElements(
        'input[name="buttercreamStyle"], input[name="cakeFilling"], [data-premium-filling], input[name="cakeFinish"]'
    ).forEach((input) => {
        input.checked = false;
    });


    getElements(
        "[data-extra-name]"
    ).forEach((input) => {
        if (
            /^\d+ Gourmet Cupcakes$/.test(
                input.dataset
                    .extraName || ""
            )
        ) {
            input.checked = false;
        }
    });
}

function renderEdibleImageSlots() {
    const container = getElement(
        "#edibleImageSlots"
    );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const quantity = Math.max(
        1,
        Number(
            builderState.edibleImageQuantity
        ) || 1
    );

    for (
        let index = 0;
        index < quantity;
        index += 1
    ) {
        const upload =
            builderState.edibleImages[
                index
            ] || null;

        const row =
            document.createElement("div");

        row.className =
            "edible-image-upload-row";

        const thumbnail =
            document.createElement("div");

        thumbnail.className =
            "edible-image-thumbnail";

        if (upload?.url) {
            const image =
                document.createElement(
                    "img"
                );

            image.src = upload.url;
            image.alt =
                `Selected edible image ${index + 1}`;

            thumbnail.appendChild(image);
        } else {
            const empty =
                document.createElement(
                    "span"
                );

            empty.textContent =
                `Image ${index + 1}`;

            thumbnail.appendChild(empty);
        }

        const actions =
            document.createElement("div");

        actions.className =
            "edible-image-upload-actions";

        const fileInput =
            document.createElement(
                "input"
            );

        fileInput.className =
            "visually-hidden-file-input";

        fileInput.type = "file";

        fileInput.accept =
            ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp";

        const chooseButton =
            document.createElement(
                "button"
            );

        chooseButton.className =
            "upload-select-button";

        chooseButton.type = "button";

        chooseButton.textContent =
            upload?.url
                ? `Replace Image ${index + 1}`
                : `Choose Image ${index + 1}`;

        const removeButton =
            document.createElement(
                "button"
            );

        removeButton.className =
            "edible-image-secondary-button";

        removeButton.type = "button";

        removeButton.textContent =
            `Remove Image ${index + 1}`;

        removeButton.disabled =
            !upload?.url;

        chooseButton.addEventListener(
            "click",
            () => fileInput.click()
        );

        fileInput.addEventListener(
            "change",
            () => {
                setEdibleImageFile(
                    fileInput.files?.[0],
                    index
                );
            }
        );

        removeButton.addEventListener(
            "click",
            () =>
                clearEdibleImageFile(
                    index
                )
        );

        actions.append(
            fileInput,
            chooseButton,
            removeButton
        );

        row.append(
            thumbnail,
            actions
        );

        container.appendChild(row);
    }
}


function updateEdibleImageControls() {
    const controls = getElement(
        "#edibleImageControls"
    );

    const tierTarget = getElement(
        "#edibleImageTierTarget"
    );

    const placementTarget = getElement(
        "#edibleImagePlacementTarget"
    );

    const placementNote = getElement(
        "#edibleImagePlacementNote"
    );

    const product =
        getSelectedCakeProduct();

    const isCupcakesOnly =
        product.shape === "cupcakes";

    if (isCupcakesOnly) {
        builderState.edibleImagePlacement =
            "top";

        getElements(
            'input[name="edibleImagePlacement"]'
        ).forEach((input) => {
            input.checked =
                input.value === "top";
        });
    }

   const edibleImageToggle = getElement(
    "#edibleImageEnabledToggle"
);

if (edibleImageToggle) {
    edibleImageToggle.checked =
        builderState.edibleImageEnabled;
} 

    controls?.classList.toggle(
        "is-hidden",
        !builderState.edibleImageEnabled
    );

    placementTarget?.classList.toggle(
        "is-hidden",
        isCupcakesOnly
    );

    const showTierTarget =
        !isCupcakesOnly &&
        product.shape === "tier" &&
        builderState.edibleImagePlacement ===
            "front";

    tierTarget?.classList.toggle(
        "is-hidden",
        !showTierTarget
    );

    const quantityInput = getElement(
        "#edibleImageQuantity"
    );

    if (quantityInput) {
        quantityInput.value = String(
            builderState
                .edibleImageQuantity
        );
    }

    const includedCount =
        getIncludedEdibleImageCount();

    setText(
        "#edibleImagePriceNote",
        builderState.cakeProductId ===
            "heart-5-bento"
            ? `Up to ${includedCount} included · additional images $2 each`
            : isCupcakesOnly
                ? "$2 each on standalone cupcakes"
                : "$15 each on cakes"
    );

    if (placementNote) {
        placementNote.textContent =
            isCupcakesOnly
                ? "Requested placement: centered on top of the cupcakes. The first uploaded design is used as the representative live preview."
                : builderState.edibleImagePlacement ===
                    "top"
                    ? "Requested placement: centered on top of the cake. The first uploaded design is used as the representative live preview."
                    : "Requested placement: front face of the cake. The first uploaded design is used as the representative live preview.";
    }

    if (
        builderState.edibleImageEnabled
    ) {
        renderEdibleImageSlots();
    }
}

/* =========================================
   PREVIEW SUMMARY
========================================= */
function updatePreviewSummary() {
    const product = getSelectedCakeProduct();

    const heightLabel = getCakeHeightLabel();

    const shapeName = getCakeShapeName(product);

    const total = calculateEstimatedTotal();

    if (previewCakeName) {
        previewCakeName.textContent =
            getDisplayCakeName();
    }

    if (previewCakeDescription) {
        previewCakeDescription.textContent =
            `${shapeName} · ${heightLabel} · ${getCakeStructureLabel()}`;
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
        builderState.currentStep === 1
            ? "$0"
            : formatCurrency(total);
}

    setText(
        "#mobileSummaryTitle",
        getDisplayCakeName()
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

let previewRenderQueued =
    false;


function renderCakePreview() {
    if (previewRenderQueued) {
        return;
    }

    previewRenderQueued =
        true;


    window.requestAnimationFrame(
        () => {
            previewRenderQueued =
                false;

            performCakePreviewRender();
        }
    );
}


function performCakePreviewRender() {
    updateProductModeUI();

    updateCoverageDesignAvailability();

    updateFinishAvailability();

    updateEdibleImageControls();

    updateRealisticCakePreview();

    updateCupcakePreview();

    updateVisibleCakeShape();

    updateRendererSize();

    updateCakeHeight();

    updateRendererColors();

    updateFinishVisibility();

    updateFinishColorControls();

    updateDecorationVisibility();

    updateSelectedCardStates();

    updatePreviewSummary();

    updateBudgetNotice();


    if (
        builderState.currentStep ===
        8
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
    const basicsHero =
    getElement("#builderBasicsHero");

const cakePreviewCard =
    getElement("#cakePreviewCard");

if (basicsHero) {
    basicsHero.classList.toggle(
        "is-hidden",
        safeStep !== 1
    );
}

if (cakePreviewCard) {
    cakePreviewCard.classList.toggle(
        "is-hidden",
        safeStep === 1
    );
}
const cakePreviewMeta =
    getElement("#cakePreviewMeta");

if (cakePreviewMeta) {
    cakePreviewMeta.classList.toggle(
        "is-hidden",
        safeStep === 1
    );
}
const cakePreviewDisclaimer =
    getElement("#cakePreviewDisclaimer");

if (cakePreviewDisclaimer) {
    cakePreviewDisclaimer.classList.toggle(
        "is-hidden",
        safeStep === 1
    );
}
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

    const progressTrack =
    getElement(".builder-progress-inner");

const activeProgressStep =
    getElement(
        `.progress-step[data-step-target="${safeStep}"]`
    );

if (
    progressTrack &&
    activeProgressStep
) {
    const centeredLeft =
        activeProgressStep.offsetLeft -
        (
            progressTrack.clientWidth -
            activeProgressStep.offsetWidth
        ) / 2;

    progressTrack.scrollTo({
        left: Math.max(0, centeredLeft),
        behavior: "smooth"
    });
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
    builderState.eventDate =
        getElement("#eventDate")?.value || "";
    builderState.fulfillmentDate =
        getElement("#fulfillmentDate")?.value || "";
    builderState.guestCount =
        Number(getElement("#guestCount")?.value) || 0;
 

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

    if (isCupcakesOnlyProduct()) {
        return true;
    }

    if (!builderState.buttercreamStyle) {
        showValidationMessage(
            "Choose a coating."
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
    const product =
        getSelectedCakeProduct();

    const hasNumberLetterFinish =
        Boolean(
            builderState.numberLetterStyle
        ) ||
        builderState.cakeFinish ===
            "Smooth Finish";

    if (
        product.shape === "numberLetter" &&
        !hasNumberLetterFinish
    ) {
        showValidationMessage(
            "Choose Smooth, Layered Piped, or Fully Frosted & Piped."
        );

        return false;
    }

    if (isCupcakesOnlyProduct()) {
        if (!builderState.cupcakeFrostingStyle) {
            showValidationMessage(
                "Choose an icing style for the cupcakes."
            );

            return false;
        }
   } else if (
    builderState.cakeCoverage === "full" &&
    product.shape !== "numberLetter" &&
    !builderState.cakeFinish
) {
        showValidationMessage(
            "Choose a finish."
        );

        return false;
    }


    if (
        builderState.edibleImageEnabled &&
!edibleImagesAreComplete()
    ) {
        showValidationMessage(
           "Upload every requested edible image or turn the edible-image option off." 
        );

        return false;
    }

    if (
        isCupcakesOnlyProduct() &&
        edibleImageIsReady() &&
        builderState.cupcakeFrostingStyle !==
            "low-piped-edible-image"
    ) {
        showValidationMessage(
            "Choose Low Piped / Edible Image icing for cupcake edible images."
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


    if (
        builderState.cakeTopperEnabled &&
        !builderState.topperType
    ) {
        showValidationMessage(
            "Choose the topper type."
        );

        return false;
    }
if (
    builderState.toyFigurineEnabled &&
    !builderState.toyFigurineDetails.trim()
) {
    showValidationMessage(
        "Describe the toys or figurines you would like."
    );

    return false;
}

if (
    builderState.sculptedPiecesEnabled &&
    !builderState.sculptedPiecesDetails.trim()
) {
    showValidationMessage(
        "Describe what you would like sculpted."
    );

    return false;
}
    return true;
}
function validateStepFive() {
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
            return validateStepFive();

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
        ),

        square: getElement(
            "#squareSizeOptions"
        ),

        sheet: getElement(
            "#sheetSizeOptions"
        ),

        numberLetter: getElement(
            "#numberLetterSizeOptions"
        ),

        tier: getElement(
            "#tierSizeOptions"
        ),

        cupcakes: getElement(
            "#cupcakeOnlySizeOptions"
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

    getElement(
        "#numberLetterDetails"
    )?.classList.toggle(
        "is-hidden",
        shape !== "numberLetter"
    );
}


function updateCakeBoardControls() {
    const boardSelect = getElement(
        "#cakeBoardStyle"
    );

    if (!boardSelect) {
        return;
    }

    const product = getSelectedCakeProduct();

    if (product.shape === "cupcakes") {
        boardSelect.disabled = true;
        return;
    }

    const allowedBoards = {
        square: ["square", "rectangleHorizontal"],
        sheet: ["rectangleHorizontal"],
        numberLetter: ["letterNumber"]
    }[product.shape] || [
        "round",
        "square",
        "rectangleHorizontal"
    ];

    if (!allowedBoards.includes(builderState.cakeBoardStyle)) {
        builderState.cakeBoardStyle = allowedBoards[0];
    }

    getElements(
        "#cakeBoardStyle option"
    ).forEach((option) => {
        option.hidden = !allowedBoards.includes(
            option.value
        );
    });

    boardSelect.value = builderState.cakeBoardStyle;
    boardSelect.disabled = allowedBoards.length === 1;

    const boardNotice = getElement(
        "#cakeBoardNotice"
    );

    if (boardNotice) {
        if (product.shape === "sheet") {
            boardNotice.textContent =
                "Sheet cakes use the horizontal rectangle board. You can still choose its color.";
        } else if (product.shape === "numberLetter") {
            boardNotice.textContent =
                "Number and letter cakes use their dedicated board. You can still choose its color.";
        } else if (product.shape === "square") {
            boardNotice.textContent =
                "Square cakes can use a square or horizontal rectangle board. Board choices do not change pricing.";
        } else {
            boardNotice.textContent =
                "Board choices update the realistic preview only and do not change pricing.";
        }
    }
}


function updateNumberLetterControls() {
    const isNumber =
        builderState.numberLetterKind === "number";

    getElement(
        "#numberCakeControls"
    )?.classList.toggle(
        "is-hidden",
        !isNumber
    );

    getElement(
        "#letterCakeControls"
    )?.classList.toggle(
        "is-hidden",
        isNumber
    );

    const isDouble =
        getSelectedCakeProduct().characterCount === 2;

    getElement(
        "#secondNumberField"
    )?.classList.toggle(
        "is-hidden",
        !isDouble
    );

    const letterInput = getElement(
        "#letterCakeText"
    );

    if (letterInput) {
        letterInput.maxLength = isDouble ? 2 : 1;

        if (letterInput.value.length > letterInput.maxLength) {
            letterInput.value = letterInput.value.slice(
                0,
                letterInput.maxLength
            );
            builderState.letterCakeText = letterInput.value;
        }
    }
}


function chooseDefaultCakeForShape(shape) {
    const defaultProducts = {
        round: "round-6",
        heart: "heart-6",
        star: "star-8",
        square: "square-6",
        sheet: "sheet-half",
        numberLetter: "number-letter-single",
        tier: "tier-4-6-standard",
        cupcakes: "cupcakes-4"
    };

    const productId =
        defaultProducts[shape] ||
        "round-6";

    builderState.cakeProductId =
        productId;

    normalizeProductSpecificState(
        getSelectedCakeProduct()
    );

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

    updateCakeBoardControls();
    updateNumberLetterControls();
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

    normalizeProductSpecificState(product);

    builderState.isTall = false;

    if (extraLayerToggle) {
        extraLayerToggle.checked = false;
    }

    updateCakeBoardControls();
    updateNumberLetterControls();

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
function decorationIsSelected(decorationId) {
    return builderState.decorations.some(
        (decoration) =>
            decoration.id === decorationId
    );
}


function updateExtraDetailControlsVisibility() {
    getElement(
        "#bowDetailOptions"
    )?.classList.toggle(
        "is-hidden",
        !decorationIsSelected(
            "ribbonDecoration"
        )
    );

    getElement(
        "#butterflyDetailOptions"
    )?.classList.toggle(
        "is-hidden",
        !decorationIsSelected(
            "butterfliesDecoration"
        )
    );

    getElement(
        "#cherryDetailOptions"
    )?.classList.toggle(
        "is-hidden",
        !decorationIsSelected(
            "cherriesDecoration"
        )
    );

    getElement(
        "#dripDetailOptions"
    )?.classList.toggle(
        "is-hidden",
        !decorationIsSelected(
            "chocolateDripDecoration"
        )
    );

    getElement(
        "#pearlDetailOptions"
    )?.classList.toggle(
        "is-hidden",
        !decorationIsSelected(
            "pearlsDecoration"
        )
    );

    getElement(
    "#flowerDetailOptions"
)?.classList.toggle(
    "is-hidden",
    !decorationIsSelected(
        "flowersDecoration"
    )
);
getElement(
    "#macaronsDetailOptions"
)?.classList.toggle(
    "is-hidden",
    !decorationIsSelected(
        "macaronsDecoration"
    )
);

getElement(
    "#discoBallsDetailOptions"
)?.classList.toggle(
    "is-hidden",
    !decorationIsSelected(
        "discoBallsDecoration"
    )
);

    getElement(
        "#customFlowerTypeField"
    )?.classList.toggle(
        "is-hidden",
        builderState.flowerType !== "Other"
    );
    getElement(
    "#metallicLeafDetailOptions"
)?.classList.toggle(
    "is-hidden",
    !decorationIsSelected(
        "goldAccentDecoration"
    )
);
const dripSelected =
    decorationIsSelected(
        "chocolateDripDecoration"
    );

const whiteChocolateSelected =
    builderState.dripChocolateType ===
    "White Chocolate";

const whiteChocolateColored =
    builderState.whiteChocolateColored ===
    "Yes";

getElement(
    "#whiteChocolateColorQuestion"
)?.classList.toggle(
    "is-hidden",
    !dripSelected ||
    !whiteChocolateSelected
);

getElement(
    "#whiteChocolateColorOptions"
)?.classList.toggle(
    "is-hidden",
    !dripSelected ||
    !whiteChocolateSelected ||
    !whiteChocolateColored
);
}
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
    getElement(
        "#topperTypeOptions"
    )?.classList.toggle(
        "is-hidden",
        !builderState.cakeTopperEnabled
    );
}
getElement(
    "#cakeTopperEnabledToggle"
)?.addEventListener(
    "change",
    (event) => {
        builderState.cakeTopperEnabled =
            event.target.checked;

        updateTopperOptionsVisibility();
        renderCakePreview();
    }
);


/* =========================================
   EXTRAS
========================================= */
function updateQuoteOnlyExtraVisibility() {
    getElement(
        "#toyFigurineDetailsField"
    )?.classList.toggle(
        "is-hidden",
        !builderState.toyFigurineEnabled
    );

    getElement(
        "#customSculptedDetailsField"
    )?.classList.toggle(
        "is-hidden",
        !builderState.sculptedPiecesEnabled
    );
}
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

  builderState.quantityExtras
    .forEach((extra) => {
        extras.push(
            `${extra.quantity} × ${extra.name} (${formatCurrency(extra.total)})`
        );
    }); 

    return extras.length
        ? extras.join(", ")
        : "No extras selected.";
}


function getQuoteOnlyDetailsSummary() {
    const details = [];

    if (builderState.toyFigurineEnabled) {
        details.push(
            `Toy / Figurine Decorations · ${builderState.toyFigurineDetails.trim()} (quote after design review · excluded from estimate)`
        );
    }

    if (builderState.sculptedPiecesEnabled) {
        details.push(
            `Custom 3D Sculpted Pieces · ${builderState.sculptedPiecesDetails.trim()} (quote after design review · excluded from estimate)`
        );
    }

    return details.length
        ? details.join(", ")
        : "None";
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

    const shapeName = getCakeShapeName(product);

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
        getDisplayCakeName()
    );

    setText(
        "#reviewCakeShape",
        `${shapeName} · ${getCakeHeightLabel()} · ${getCakeStructureLabel()}`
    );
    const coverageSummary =
        cakeSupportsCoverage(product)
            ? builderState.cakeCoverage ===
                "naked"
                ? "Naked · −$15"
                : builderState.cakeCoverage ===
                    "semi-naked"
                    ? "Semi-Naked · −$10"
                    : "Full"
            : "Not applicable";

    setText(
        "#reviewCoverage",
        coverageSummary
    );

    const isBento =
        builderState.cakeProductId ===
            "heart-5-bento";

    getElement(
        "#reviewBentoCupcakesRow"
    )?.classList.toggle(
        "is-hidden",
        !isBento
    );

    setText(
        "#reviewBentoCupcakes",
        builderState.bentoCupcakeCount === 8
            ? "8 cupcakes · +$20"
            : "4 cupcakes included"
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
        isCupcakesOnlyProduct()
            ? "Selected in Cupcake Look"
            : builderState.buttercreamStyle ||
                "Not selected",

        builderState.buttercreamStyle ===
            "Ganache"
            ? `+${formatCurrency(
                getGanacheCoatingPrice()
            )}`
            : "",

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
        isCupcakesOnlyProduct()
            ? "Not applicable"
            : getDisplayFilling()
    );

    setText(
        "#reviewPremiumFilling",
        isCupcakesOnlyProduct()
            ? "Not applicable"
            : builderState.premiumFillings.length
            ? builderState.premiumFillings
                  .map(
                      (filling) =>
                          `${filling.name} (+${formatCurrency(filling.price)})`
                  )
                  .join(", ")
            : "None"
    );

    setText(
        "#reviewColors",
        isCupcakesOnlyProduct()
            ? `${getDisplayColorName(builderState.cupcakeLinerColor)} liner · ${getDisplayColorName(builderState.cupcakeFrostingColor)} icing`
            : product.shape === "tier"
            ? `${getDisplayColorName(builderState.tierTopColor)} top tier · ${getDisplayColorName(builderState.tierBottomColor)} bottom tier`
            : product.shape === "numberLetter"
            ? product.characterCount === 2
                ? `${getDisplayColorName(builderState.characterOneColor)} first character · ${getDisplayColorName(builderState.characterTwoColor)} second character`
                : `${getDisplayColorName(builderState.characterOneColor)} character color`
            : `${getDisplayColorName(builderState.mainCakeColor)} main · ${getDisplayColorName(builderState.accentColor)} accent`
    );

      setText(
        "#reviewFinish",
        isCupcakesOnlyProduct()
            ? builderState
                .cupcakeFrostingStyle ||
                "Not selected"
            : product.shape ===
                "numberLetter"
                ? builderState
                    .numberLetterStyle ||
                    builderState
                        .cakeFinish ||
                    "Not selected"
                : builderState.cakeFinish ||
                    "Not selected"
    ); 

    setText(
        "#reviewFondant",
        builderState.fondantEnabled
            ? `Yes · +${formatCurrency(
                getFondantPrice()
            )}`
            : "No"
    );

    if (builderState.edibleImageEnabled) {
        const placementLabel =
            builderState.edibleImagePlacement ===
                "top"
                ? "Center Top"
                : "Front Face";

        const tierLabel =
            product.shape === "tier" &&
            builderState
                .edibleImagePlacement ===
                    "front"
                ? ` · ${
                    builderState
                        .edibleImageTier ===
                    "top"
                        ? "Top Tier"
                        : "Bottom Tier"
                }`
                : "";

        const includedCount =
            getIncludedEdibleImageCount();

        const includedLabel =
            includedCount
                ? ` · up to ${includedCount} included`
                : "";

        setText(
            "#reviewEdibleImage",
            `${builderState.edibleImageQuantity} image${builderState.edibleImageQuantity === 1 ? "" : "s"} · ${placementLabel}${tierLabel}${includedLabel} · ${formatCurrency(calculateEdibleImageTotal())}`
        );
    } else {
        setText(
            "#reviewEdibleImage",
            "None"
        );
    }
  const reviewDecorationNames =
    builderState.decorations.map(
        (decoration) => {
            const quantityLabel =
                decoration.quantity > 1
                    ? `${decoration.quantity} × `
                    : "";

            const price =
                decoration.total ??
                decoration.price;

            return `${quantityLabel}${decoration.name} (+${formatCurrency(price)})`;
        }
    );
    

    setText(
        "#reviewDecorations",
        reviewDecorationNames.length
            ? reviewDecorationNames.join(", ")
            : "None selected"
    );

        const topperSummary =
        builderState.cakeTopperEnabled &&
        builderState.topperType
            ? `${builderState.topperType} (+${formatCurrency(builderState.topperPrice)})${builderState.topperWording.trim() ? ` · “${builderState.topperWording.trim()}”` : ""}`
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
        "#reviewQuoteOnlyDetails",
        getQuoteOnlyDetailsSummary()
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

    window.location.replace(
        window.location.href.split(/[?#]/)[0]
    );
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
    "input",
    (event) => {
        builderState.eventDate =
            event.target.value;
    }
);

getElement(
    "#fulfillmentDate"
)?.addEventListener(
    "input",
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

getElement(
    "#numberLetterKind"
)?.addEventListener(
    "change",
    (event) => {
        builderState.numberLetterKind =
            event.target.value;

        updateNumberLetterControls();
        renderCakePreview();
    }
    
);
getElements(
    'input[name="numberLetterStyle"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.numberLetterStyle =
                input.value;

            /*
                Clear the prior finish selection,
                but keep Smooth visible so it can
                be selected separately with a border.
            */
            builderState.cakeFinish = "";

            getElements(
                'input[name="cakeFinish"]'
            ).forEach((finishInput) => {
                finishInput.checked = false;
            });

            renderCakePreview();
        }
    );
});
getElements(
    'input[name="bentoCupcakeCount"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.bentoCupcakeCount =
                Number(input.value) === 8
                    ? 8
                    : 4;

            renderCakePreview();
        }
    );
});
[
    ["#numberCakeFirst", "numberCakeFirst"],
    ["#numberCakeSecond", "numberCakeSecond"]
].forEach(([selector, stateKey]) => {
    getElement(selector)?.addEventListener(
        "change",
        (event) => {
            builderState[stateKey] =
                event.target.value;
            renderCakePreview();
        }
    );
});

getElement(
    "#letterCakeText"
)?.addEventListener(
    "input",
    (event) => {
        const count =
            getSelectedCakeProduct()
                .characterCount || 1;

        const cleaned = event.target.value
            .toUpperCase()
            .replace(/[^A-Z]/g, "")
            .slice(0, count);

        event.target.value = cleaned;
        builderState.letterCakeText = cleaned;
        renderCakePreview();
    }
);

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
            renderCakePreview();
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
getElement(
    "#customMainColor"
)?.addEventListener(
    "input",
    (event) => {
        builderState.customMainColor =
            event.target.value;

        builderState.mainCakeColor =
            event.target.value;

        builderState
            .mainCakeUsesCustomShade =
            true;

        renderCakePreview();
    }
);


getElement(
    "#customCakeBorderColor"
)?.addEventListener(
    "input",
    (event) => {
        builderState
            .customCakeBorderColor =
            event.target.value;

        builderState.cakeBorderColor =
            event.target.value;

        builderState
            .cakeBorderUsesCustomShade =
            true;

        renderCakePreview();
    }
);


getElement(
    "#customCupcakeFrostingColor"
)?.addEventListener(
    "input",
    (event) => {
        builderState
            .customCupcakeFrostingColor =
            event.target.value;

        builderState
            .cupcakeFrostingColor =
            event.target.value;

        builderState
            .cupcakeFrostingUsesCustomShade =
            true;

        renderCakePreview();
    }
);
function updateBorderControlsVisibility() {
    const controls =
        getElement("#cakeBorderControls");

    controls?.classList.toggle(
        "is-hidden",
        !builderState.cakeBorderStyle
    );
}
function showCustomShadeControls(
    fieldSelector,
    noteSelector,
    shouldShow
) {
    getElement(
        fieldSelector
    )?.classList.toggle(
        "is-hidden",
        !shouldShow
    );

    getElement(
        noteSelector
    )?.classList.toggle(
        "is-hidden",
        !shouldShow
    );
}


function buildBuilderColorControls() {

    /*
        MAIN CAKE
    */

    buildColorSwatches(
        "#mainCakeColorSwatches",
        "mainCakeColorChoice",
        curatedButtercreamPalette,
        builderState.mainCakeColor,
        (value) => {
            builderState.mainCakeColor =
                value;

            builderState
                .mainCakeUsesCustomShade =
                false;

            showCustomShadeControls(
                "#customMainColorField",
                "#customMainColorNote",
                false
            );

            renderCakePreview();
        },
        {
            allowCustom: true,

            customSelected:
                builderState
                    .mainCakeUsesCustomShade,

            onCustomSelected: () => {
                builderState
                    .mainCakeUsesCustomShade =
                    true;

                builderState.mainCakeColor =
                    builderState
                        .customMainColor;

                showCustomShadeControls(
                    "#customMainColorField",
                    "#customMainColorNote",
                    true
                );

                renderCakePreview();
            }
        }
    );


    /*
        TWO-TIER
    */

    buildColorSwatches(
        "#tierTopColorSwatches",
        "tierTopColorChoice",
        curatedButtercreamPalette,
        builderState.tierTopColor,
        (value) => {
            builderState.tierTopColor =
                value;

            renderCakePreview();
        }
    );


    buildColorSwatches(
        "#tierBottomColorSwatches",
        "tierBottomColorChoice",
        curatedButtercreamPalette,
        builderState.tierBottomColor,
        (value) => {
            builderState.tierBottomColor =
                value;

            renderCakePreview();
        }
    );


    /*
        NUMBER / LETTER
    */

    buildColorSwatches(
        "#characterOneColorSwatches",
        "characterOneColorChoice",
        curatedButtercreamPalette,
        builderState.characterOneColor,
        (value) => {
            builderState.characterOneColor =
                value;

            renderCakePreview();
        }
    );


    buildColorSwatches(
        "#characterTwoColorSwatches",
        "characterTwoColorChoice",
        curatedButtercreamPalette,
        builderState.characterTwoColor,
        (value) => {
            builderState.characterTwoColor =
                value;

            renderCakePreview();
        }
    );


    /*
        BORDER
    */

    buildColorSwatches(
        "#cakeBorderColorSwatches",
        "cakeBorderColorChoice",
        curatedButtercreamPalette,
        builderState.cakeBorderColor,
        (value) => {
            builderState.cakeBorderColor =
                value;

            builderState
                .cakeBorderUsesCustomShade =
                false;

            showCustomShadeControls(
                "#customCakeBorderColorField",
                "#customCakeBorderColorNote",
                false
            );

            renderCakePreview();
        },
        {
            allowCustom: true,

            customSelected:
                builderState
                    .cakeBorderUsesCustomShade,

            onCustomSelected: () => {
                builderState
                    .cakeBorderUsesCustomShade =
                    true;

                builderState.cakeBorderColor =
                    builderState
                        .customCakeBorderColor;

                showCustomShadeControls(
                    "#customCakeBorderColorField",
                    "#customCakeBorderColorNote",
                    true
                );

                renderCakePreview();
            }
        }
    );


    /*
        FINISH ACCENTS
    */

    buildColorSwatches(
        "#finishAccentOneSwatches",
        "finishAccentOneChoice",
        curatedButtercreamPalette,
        builderState.finishAccentOne,
        (value) => {
            builderState.finishAccentOne =
                value;

            renderCakePreview();
        }
    );


    buildColorSwatches(
        "#finishAccentTwoSwatches",
        "finishAccentTwoChoice",
        curatedButtercreamPalette,
        builderState.finishAccentTwo,
        (value) => {
            builderState.finishAccentTwo =
                value;

            renderCakePreview();
        }
    );


    /*
        PHYSICAL EXTRAS
    */

    buildColorSwatches(
        "#bowColorSwatches",
        "bowColorChoice",
        bowButterflyPalette,
        builderState.bowColor,
        (value) => {
            builderState.bowColor =
                value;

            renderCakePreview();
        }
    );


    buildColorSwatches(
        "#butterflyColorSwatches",
        "butterflyColorChoice",
        bowButterflyPalette,
        builderState.butterflyColor,
        (value) => {
            builderState.butterflyColor =
                value;

            renderCakePreview();
        }
    );


    buildColorSwatches(
        "#cherryColorSwatches",
        "cherryColorChoice",
        cherryPalette,
        builderState.cherryColor,
        (value) => {
            builderState.cherryColor =
                value;

            renderCakePreview();
        }
    );


    buildColorSwatches(
        "#pearlColorSwatches",
        "pearlColorChoice",
        pearlPalette,
        builderState.pearlColor,
        (value) => {
            builderState.pearlColor =
                value;

            renderCakePreview();
        }
    );


    buildColorSwatches(
        "#flowerColorSwatches",
        "flowerColorChoice",
        flowerPalette,
        builderState.flowerColor,
        (value) => {
            builderState.flowerColor =
                value;

            renderCakePreview();
        }
    );


    /*
        BOARD
    */

    buildColorSwatches(
        "#cakeBoardColorSwatches",
        "cakeBoardColorChoice",
        boardPalette,
        builderState.cakeBoardColor,
        (value) => {
            builderState.cakeBoardColor =
                value;

            renderCakePreview();
        }
    );


    /*
        CUPCAKE FROSTING
    */

    buildColorSwatches(
        "#cupcakeFrostingColorSwatches",
        "cupcakeFrostingColorChoice",
        curatedButtercreamPalette,
        builderState
            .cupcakeFrostingColor,
        (value) => {
            builderState
                .cupcakeFrostingColor =
                value;

            builderState
                .cupcakeFrostingUsesCustomShade =
                false;

            showCustomShadeControls(
                "#customCupcakeFrostingColorField",
                "#customCupcakeFrostingColorNote",
                false
            );

            renderCakePreview();
        },
        {
            allowCustom: true,

            customSelected:
                builderState
                    .cupcakeFrostingUsesCustomShade,

            onCustomSelected: () => {
                builderState
                    .cupcakeFrostingUsesCustomShade =
                    true;

                builderState
                    .cupcakeFrostingColor =
                    builderState
                        .customCupcakeFrostingColor;

                showCustomShadeControls(
                    "#customCupcakeFrostingColorField",
                    "#customCupcakeFrostingColorNote",
                    true
                );

                renderCakePreview();
            }
        }
    );


    updateCupcakeLinerColorChoices();
} 
function updateCupcakeLinerColorChoices() {
    const linerStyle =
        builderState
            .cupcakeLinerStyle ||
        "paper";

    const palette =
        cupcakeLinerPalettes[
            linerStyle
        ] ||
        cupcakeLinerPalettes.paper;

    const currentStillExists =
        palette.some(
            (color) =>
                color.value ===
                builderState
                    .cupcakeLinerColor
        );

    if (!currentStillExists) {
        builderState.cupcakeLinerColor =
            palette[0].value;
    }

    buildColorSwatches(
        "#cupcakeLinerColorSwatches",
        "cupcakeLinerColorChoice",
        palette,
        builderState.cupcakeLinerColor,
        (value) => {
            builderState.cupcakeLinerColor =
                value;

            renderCakePreview();
        }
    );
}getElements(
    'input[name="cakeCoverage"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeCoverage =
                input.value;

            renderCakePreview();
        }
    );
});

getElements(
    'input[name="cakeFinish"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeFinish =
                input.value;

            const isNumberLetter =
                getSelectedCakeProduct().shape ===
                "numberLetter";

            if (
                isNumberLetter &&
                input.value ===
                    "Smooth Finish"
            ) {
                builderState.numberLetterStyle =
                    "";

                getElements(
                    'input[name="numberLetterStyle"]'
                ).forEach((styleInput) => {
                    styleInput.checked = false;
                });
            }

            renderCakePreview();
        }
    );
});


/* =========================================
   BORDER EVENTS
========================================= */

getElements(
    'input[name="cakeBorderStyle"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeBorderStyle =
                input.value;

            if (!input.value) {
                builderState.cakeBorderSprinkles =
                    false;

                const sprinkleToggle =
                    getElement(
                        "#cakeBorderSprinkles"
                    );

                if (sprinkleToggle) {
                    sprinkleToggle.checked =
                        false;
                }
            }

            updateBorderControlsVisibility();
            updateSelectedCardStates();
            renderCakePreview();
        }
    );
});


getElements(
    'input[name="cakeBorderPlacement"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cakeBorderPlacement =
                input.value;

            renderCakePreview();
        }
    );
});

getElement(
    "#cakeBorderSprinkles"
)?.addEventListener(
    "change",
    (event) => {
        builderState.cakeBorderSprinkles =
            event.target.checked;

        renderCakePreview();
    }
);
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
                        (decorationInput) => {
                            const id =
                                decorationInput
                                    .dataset
                                    .decorationId;

                            const price =
                                Number(
                                    decorationInput
                                        .dataset
                                        .price
                                ) || 0;

                            const quantity =
                                builderState
                                    .decorationQuantities[
                                        id
                                    ] || 1;

                            return {
                                id,

                                name:
                                    decorationInput
                                        .dataset
                                        .decorationName,

                                price,
                                quantity,
                                total:
                                    price *
                                    quantity
                            };
                        }
                    );
                    const dripStillSelected =
    builderState.decorations.some(
        (decoration) =>
            decoration.id ===
            "chocolateDripDecoration"
    );

if (!dripStillSelected) {
    builderState.dripChocolateType =
        "Milk Chocolate";

    builderState.whiteChocolateColored =
        "No";

    builderState.whiteChocolateDripColor =
        "#F7B6D2";

    updateDripColorFromSelection();

    getElements(
        'input[name="dripChocolateType"]'
    ).forEach((dripInput) => {
        dripInput.checked =
            dripInput.value ===
            "Milk Chocolate";
    });

    getElements(
        'input[name="whiteChocolateColored"]'
    ).forEach((colorInput) => {
        colorInput.checked =
            colorInput.value === "No";
    });
}

            updateFlowerSourceVisibility();
updateExtraDetailControlsVisibility();
updateTopperOptionsVisibility();
renderCakePreview();
        }
    );
});
getElements(
    "[data-decoration-quantity]"
).forEach((input) => {
    input.addEventListener(
        "input",
        () => {
            const id =
                input.dataset
                    .decorationQuantity;

            const quantity = Math.max(
                1,
                Number.parseInt(
                    input.value || "1",
                    10
                ) || 1
            );

            input.value =
                String(quantity);

            builderState
                .decorationQuantities[id] =
                quantity;

            const decoration =
                builderState.decorations.find(
                    (item) =>
                        item.id === id
                );

            if (decoration) {
                decoration.quantity =
                    quantity;

                decoration.total =
                    decoration.price *
                    quantity;
            }

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
    'input[name="metallicLeafType"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.metallicLeafType =
                input.value;

            updateSelectedCardStates();
            renderCakePreview();
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

getElements(
    'input[name="cherryGlitter"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.cherryGlitter =
                input.value;

            if (
                builderState.currentStep === 8
            ) {
                populateReview();
            }
        }
    );
});
const dripChocolateColorMap = {
    "Milk Chocolate": "#84563C",
    "Dark Chocolate": "#3B2118",
    "White Chocolate": "#F3E2C7"
};


function updateDripColorFromSelection() {
    if (
        builderState.dripChocolateType ===
            "White Chocolate" &&
        builderState.whiteChocolateColored ===
            "Yes"
    ) {
        builderState.dripColor =
            builderState.whiteChocolateDripColor;

        return;
    }

    builderState.dripColor =
        dripChocolateColorMap[
            builderState.dripChocolateType
        ] || "#84563C";
}


getElements(
    'input[name="dripChocolateType"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.dripChocolateType =
                input.value;

            /*
                If they switch away from
                White Chocolate, custom color
                is automatically turned off.
            */
            if (
                input.value !==
                "White Chocolate"
            ) {
                builderState.whiteChocolateColored =
                    "No";

                const noInput =
                    getElement(
                        'input[name="whiteChocolateColored"][value="No"]'
                    );

                if (noInput) {
                    noInput.checked = true;
                }
            }

            updateDripColorFromSelection();
            updateExtraDetailControlsVisibility();
            updateSelectedCardStates();
            renderCakePreview();

            if (
                builderState.currentStep === 8
            ) {
                populateReview();
            }
        }
    );
});


getElements(
    'input[name="whiteChocolateColored"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.whiteChocolateColored =
                input.value;

            updateDripColorFromSelection();
            updateExtraDetailControlsVisibility();
            updateSelectedCardStates();
            renderCakePreview();

            if (
                builderState.currentStep === 8
            ) {
                populateReview();
            }
        }
    );
});


getElements(
    'input[name="whiteChocolateDripColor"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.whiteChocolateDripColor =
                input.value;

            updateDripColorFromSelection();
            updateSelectedCardStates();
            renderCakePreview();

            if (
                builderState.currentStep === 8
            ) {
                populateReview();
            }
        }
    );
});

getElements(
    'input[name="flowerType"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.flowerType =
                input.value;

            updateExtraDetailControlsVisibility();
updateSelectedCardStates();
            if (
                builderState.currentStep === 8
            ) {
                populateReview();
            }
        }
    );
});


getElement(
    "#customFlowerType"
)?.addEventListener(
    "input",
    (event) => {
        builderState.customFlowerType =
            event.target.value;

        if (
            builderState.currentStep === 8
        ) {
            populateReview();
        }
    }
);

/* =========================================
   EXTRA EVENTS
========================================= */

getElement(
    "#cakeBoardStyle"
)?.addEventListener(
    "change",
    (event) => {
        builderState.cakeBoardStyle =
            event.target.value;

        renderCakePreview();
    }
);


getElement(
    "#matchBoardToCakePalette"
)?.addEventListener(
    "change",
    (event) => {
        builderState
            .matchBoardToCakePalette =
            event.target.checked;

        renderCakePreview();
    }
);


getElement(
    "#cupcakeLinerStyle"
)?.addEventListener(
    "change",
    (event) => {
        builderState
            .cupcakeLinerStyle =
            event.target.value;

        updateCupcakeLinerColorChoices();

        renderCakePreview();
    }
);


getElement(
    "#cupcakeFrostingStyle"
)?.addEventListener(
    "change",
    (event) => {
        builderState
            .cupcakeFrostingStyle =
            event.target.value;

        renderCakePreview();
    }
);

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
getElement(
    "#toyFigurineEnabledToggle"
)?.addEventListener(
    "change",
    (event) => {
        builderState.toyFigurineEnabled =
            event.target.checked;

        updateQuoteOnlyExtraVisibility();
        renderCakePreview();
    }
);

getElement(
    "#toyFigurineDetails"
)?.addEventListener(
    "input",
    (event) => {
        builderState.toyFigurineDetails =
            event.target.value;
    }
);

getElement(
    "#customSculptedEnabledToggle"
)?.addEventListener(
    "change",
    (event) => {
        builderState.sculptedPiecesEnabled =
            event.target.checked;

        updateQuoteOnlyExtraVisibility();
        renderCakePreview();
    }
);

getElement(
    "#customSculptedDetails"
)?.addEventListener(
    "input",
    (event) => {
        builderState.sculptedPiecesDetails =
            event.target.value;
    }
);

/* =========================================
   UPLOAD EVENTS
========================================= */

function updateEdibleImageRangeOutputs() {
    setText(
        "#edibleImageScaleValue",
        `${builderState.edibleImageScale}%`
    );
    setText(
        "#edibleImageXValue",
        String(builderState.edibleImageX)
    );
    setText(
        "#edibleImageYValue",
        String(builderState.edibleImageY)
    );
    setText(
        "#edibleImageRotationValue",
        `${builderState.edibleImageRotation}°`
    );
}

function syncPrimaryEdibleImage() {
    const firstUpload =
        builderState.edibleImages[0] ||
        null;

    builderState.edibleImageFile =
        firstUpload?.file || null;

    builderState.edibleImageUrl =
        firstUpload?.url || "";
}


function clearEdibleImageFile(
    index = 0
) {
    const current =
        builderState.edibleImages[
            index
        ];

    if (current?.url) {
        URL.revokeObjectURL(
            current.url
        );
    }

    builderState.edibleImages[
        index
    ] = null;

    syncPrimaryEdibleImage();

    setText(
        "#edibleImageError",
        ""
    );

    renderCakePreview();
}


function setEdibleImageFile(
    file,
    index = 0
) {
    const errorMessage = getElement(
        "#edibleImageError"
    );

    const acceptedTypes = new Set([
        "image/jpeg",
        "image/png",
        "image/webp"
    ]);

    if (
        !file ||
        !acceptedTypes.has(file.type)
    ) {
        if (errorMessage) {
            errorMessage.textContent =
                "Choose a JPG, PNG, or WebP image.";
        }

        return;
    }

    if (
        file.size >
        15 * 1024 * 1024
    ) {
        if (errorMessage) {
            errorMessage.textContent =
                "The edible image must be 15 MB or smaller.";
        }

        return;
    }

    const current =
        builderState.edibleImages[
            index
        ];

    if (current?.url) {
        URL.revokeObjectURL(
            current.url
        );
    }

    builderState.edibleImageEnabled =
        true;

    builderState.edibleImages[
        index
    ] = {
        file,
        url: URL.createObjectURL(file)
    };

    syncPrimaryEdibleImage();

    if (errorMessage) {
        errorMessage.textContent = "";
    }

    renderCakePreview();
}

  


function resetEdibleImagePosition() {
    builderState.edibleImagePlacement =
    "front";

builderState.edibleImageTier =
    "bottom";
    builderState.edibleImageScale = 70;
    builderState.edibleImageX = 0;
    builderState.edibleImageY = 0;
    builderState.edibleImageRotation = 0;

    [
        ["#edibleImageScale", 70],
        ["#edibleImageX", 0],
        ["#edibleImageY", 0],
        ["#edibleImageRotation", 0]
    ].forEach(([selector, value]) => {
        const input = getElement(selector);
        if (input) input.value = String(value);
    });
getElements(
    'input[name="edibleImagePlacement"]'
).forEach((input) => {
    input.checked =
        input.value === "front";
});

getElements(
    'input[name="edibleImageTier"]'
).forEach((input) => {
    input.checked =
        input.value === "bottom";
});
    updateEdibleImageRangeOutputs();
    renderCakePreview();
}




function setEdibleImageQuantity(
    nextQuantity
) {
    const quantity = Math.max(
        1,
        Number.parseInt(
            String(nextQuantity),
            10
        ) || 1
    );

    if (
        quantity <
        builderState.edibleImages.length
    ) {
        builderState.edibleImages
            .slice(quantity)
            .forEach((upload) => {
                if (upload?.url) {
                    URL.revokeObjectURL(
                        upload.url
                    );
                }
            });

        builderState.edibleImages.length =
            quantity;

        syncPrimaryEdibleImage();
    }

    builderState.edibleImageQuantity =
        quantity;

    renderCakePreview();
}


getElement(
    "#edibleImageEnabledToggle"
)?.addEventListener(
    "change",
    (event) => {
        builderState.edibleImageEnabled =
            event.target.checked;

        renderCakePreview();
    }
);


getElement(
    "#decreaseEdibleImageQuantity"
)?.addEventListener(
    "click",
    () => {
        setEdibleImageQuantity(
            builderState
                .edibleImageQuantity - 1
        );
    }
);


getElement(
    "#increaseEdibleImageQuantity"
)?.addEventListener(
    "click",
    () => {
        setEdibleImageQuantity(
            builderState
                .edibleImageQuantity + 1
        );
    }
);


getElement(
    "#edibleImageQuantity"
)?.addEventListener(
    "input",
    (event) => {
        setEdibleImageQuantity(
            event.target.value
        );
    }
);

getElement(
    "#resetEdibleImagePosition"
)?.addEventListener(
    "click",
    resetEdibleImagePosition
);

getElements(
    'input[name="edibleImageShape"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.edibleImageShape = input.value;
        renderCakePreview();
    });
});
getElements(
    'input[name="edibleImagePlacement"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.edibleImagePlacement =
                input.value;

            updateEdibleImageControls();

            if (
                builderState.currentStep === 8
            ) {
                populateReview();
            }
        }
    );
});
getElements(
    'input[name="edibleImageTier"]'
).forEach((input) => {
    input.addEventListener(
        "change",
        () => {
            builderState.edibleImageTier =
                input.value;

            if (
                builderState.currentStep ===
                8
            ) {
                populateReview();
            }
        }
    );
});
[
    ["#edibleImageScale", "edibleImageScale"],
    ["#edibleImageX", "edibleImageX"],
    ["#edibleImageY", "edibleImageY"],
    ["#edibleImageRotation", "edibleImageRotation"]
].forEach(([selector, stateKey]) => {
    getElement(selector)?.addEventListener(
        "input",
        (event) => {
            builderState[stateKey] =
                Number(event.target.value);
            updateEdibleImageRangeOutputs();
            renderCakePreview();
        }
    );
});

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
getElement(
    "#fondantEnabledToggle"
)?.addEventListener(
    "change",
    (event) => {
        builderState.fondantEnabled =
            event.target.checked;

        renderCakePreview();
    }
);

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
    reorderStepFourControls();
    buildBuilderColorControls();

showCustomShadeControls(
    "#customMainColorField",
    "#customMainColorNote",
    builderState
        .mainCakeUsesCustomShade
);

showCustomShadeControls(
    "#customCakeBorderColorField",
    "#customCakeBorderColorNote",
    builderState
        .cakeBorderUsesCustomShade
);

showCustomShadeControls(
    "#customCupcakeFrostingColorField",
    "#customCupcakeFrostingColorNote",
    builderState
        .cupcakeFrostingUsesCustomShade
);
    showCakeSizeGroup("round");
    updateCakeBoardControls();
    updateNumberLetterControls();
    updateBorderControlsVisibility();

    updateOtherOccasionVisibility();
    updateCustomCakeFlavorVisibility();
    updateCustomFillingVisibility();
    updateFlowerSourceVisibility();
    updateDripColorFromSelection();
    const defaultDripType =
    getElement(
        'input[name="dripChocolateType"][value="Milk Chocolate"]'
    );

if (defaultDripType) {
    defaultDripType.checked = true;
}

const defaultWhiteChocolateColored =
    getElement(
        'input[name="whiteChocolateColored"][value="No"]'
    );

if (defaultWhiteChocolateColored) {
    defaultWhiteChocolateColored.checked =
        true;
}
    updateExtraDetailControlsVisibility();
    updateTopperOptionsVisibility();
updateQuoteOnlyExtraVisibility();
updateDeliveryFieldsVisibility();

    updateEdibleImageRangeOutputs();
    renderInspirationPreviews();
    renderCakePreview();
    showStep(1);
}  
initializeBuilder();
{
    const boardFieldset =
        getElement("#cakeBoardCustomizer");

    const heightFieldset =
        getElement(
            "#extraLayerToggle"
        )?.closest("fieldset");

    if (
        boardFieldset &&
        heightFieldset &&
        heightFieldset.nextElementSibling !==
            boardFieldset
    ) {
        heightFieldset.insertAdjacentElement(
            "afterend",
            boardFieldset
        );
    }
}
/* =========================================
   MATCH EACH IMAGE SLOT TO ITS OWN ARTWORK
========================================= */

function getTpjImageEdgeColor(image, edge) {
    const sampleSize = 32;
    const edgeDepth = 4;
    const cornerDepth = 8;
    const canvas = document.createElement("canvas");

    canvas.width = sampleSize;
    canvas.height = sampleSize;

    const context = canvas.getContext(
        "2d",
        { willReadFrequently: true }
    );

    if (!context) {
        return "rgb(255, 248, 242)";
    }

    context.drawImage(
        image,
        0,
        0,
        sampleSize,
        sampleSize
    );

    const pixels = context.getImageData(
        0,
        0,
        sampleSize,
        sampleSize
    ).data;

    const reds = [];
    const greens = [];
    const blues = [];

    for (let y = 0; y < sampleSize; y += 1) {
        for (let x = 0; x < sampleSize; x += 1) {
            const isLeft =
                x < edgeDepth;

            const isRight =
                x >= sampleSize - edgeDepth;

            const isCorner =
                (
                    x < cornerDepth ||
                    x >= sampleSize - cornerDepth
                ) &&
                (
                    y < cornerDepth ||
                    y >= sampleSize - cornerDepth
                );

            const shouldSample =
                edge === "left"
                    ? isLeft
                    : edge === "right"
                        ? isRight
                        : isCorner;

            if (!shouldSample) {
                continue;
            }

            const pixelIndex =
                (y * sampleSize + x) * 4;

            if (pixels[pixelIndex + 3] < 180) {
                continue;
            }

            reds.push(
                pixels[pixelIndex]
            );

            greens.push(
                pixels[pixelIndex + 1]
            );

            blues.push(
                pixels[pixelIndex + 2]
            );
        }
    }

    const median = (values) => {
        values.sort(
            (first, second) =>
                first - second
        );

        return values[
            Math.floor(values.length / 2)
        ];
    };

    if (!reds.length) {
        return "rgb(255, 248, 242)";
    }

    return `rgb(${median(reds)}, ${median(greens)}, ${median(blues)})`;
}


function applyTpjImageBackground(
    image,
    isHeroPhoto = false
) {
    const applyBackground = () => {
        if (!image.naturalWidth) {
            return;
        }

        try {
            if (isHeroPhoto) {
                const heroColor =
                    getTpjImageEdgeColor(
                        image,
                        "corners"
                    );

                image.style.backgroundColor =
                    heroColor;

                image.closest(
                    ".builder-basics-hero"
                )?.style.setProperty(
                    "background-color",
                    heroColor
                );

                return;
            }

            const leftColor =
                getTpjImageEdgeColor(
                    image,
                    "left"
                );

            const rightColor =
                getTpjImageEdgeColor(
                    image,
                    "right"
                );

            image.style.backgroundColor =
                leftColor;

            image.style.backgroundImage =
                `linear-gradient(
                    90deg,
                    ${leftColor} 0%,
                    ${leftColor} 25%,
                    ${rightColor} 75%,
                    ${rightColor} 100%
                )`;
        } catch (error) {
            /*
               Existing CSS remains as the
               fallback if sampling is blocked.
            */
        }
    };

    if (
        image.complete &&
        image.naturalWidth
    ) {
        applyBackground();
    } else {
        image.addEventListener(
            "load",
            applyBackground,
            { once: true }
        );
    }
}


function matchTpjBuilderImageBackgrounds() {
    document.querySelectorAll(
        [
            ".option-card-image",
            ".finish-card-image",
            ".decoration-card-image",
            ".cupcake-count-card-image",
            ".quantity-product-image",
            ".text-choice-card > img"
        ].join(",")
    ).forEach((image) => {
        applyTpjImageBackground(image);
    });

    const heroPhoto =
        document.querySelector(
            ".builder-basics-hero img"
        );

    if (heroPhoto) {
        applyTpjImageBackground(
            heroPhoto,
            true
        );
    }
}


matchTpjBuilderImageBackgrounds();
