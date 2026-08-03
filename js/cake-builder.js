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
        tallServings: "6–8"
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
        tallServings: "12–18"
    },

    "round-8": {
        name: '8" Party Starter Cake',
        shape: "round",
        size: '8"',
        standardLayers: 2,
        tallLayers: 3,
        standardPrice: 245,
        tallPrice: 275,
        standardServings: "16–20",
        tallServings: "20–28"
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
        tallServings: "30–38"
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
        tallServings: "40–50"
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
        allowExtraLayer: false
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
        allowExtraLayer: false
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
        tallServings: "12–18"
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
        tallServings: "26–34"
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
        tallServings: "20–28"
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

    mainCakeColor: "#F7B6D2",
    accentColor: "#FF4FA3",
    cakeFinish: "",

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
   ELEMENT HELPERS
========================================= */

function getElement(selector) {
    return document.querySelector(selector);
}


function getElements(selector) {
    return Array.from(document.querySelectorAll(selector));
}


function getCheckedValue(name) {
    const checkedInput = document.querySelector(
        `input[name="${name}"]:checked`
    );

    return checkedInput ? checkedInput.value : "";
}


function formatCurrency(amount) {
    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
            maximumFractionDigits: 2
        }
    ).format(amount);
}


function formatDate(dateString) {
    if (!dateString) {
        return "Not selected";
    }

    const date = new Date(`${dateString}T12:00:00`);

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
   IMPORTANT DOM ELEMENTS
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

const extraLayerToggle = getElement("#extraLayerToggle");
const extraLayerDescription = getElement(
    "#extraLayerDescription"
);
const bentoLayerNotice = getElement("#bentoLayerNotice");

const previousStepButton = getElement(
    "#previousStepButton"
);
const nextStepButton = getElement("#nextStepButton");

const stepValidationMessage = getElement(
    "#stepValidationMessage"
);

const resetCakeBuilderButton = getElement(
    "#resetCakeBuilder"
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
    const normalizedColor = normalizeHexColor(hexColor);

    return {
        red: Number.parseInt(
            normalizedColor.slice(1, 3),
            16
        ),

        green: Number.parseInt(
            normalizedColor.slice(3, 5),
            16
        ),

        blue: Number.parseInt(
            normalizedColor.slice(5, 7),
            16
        )
    };
}


function rgbToHex(red, green, blue) {
    const channels = [red, green, blue].map((channel) => {
        const safeChannel = clampNumber(
            Math.round(channel),
            0,
            255
        );

        return safeChannel
            .toString(16)
            .padStart(2, "0");
    });

    return `#${channels.join("")}`.toUpperCase();
}


function mixHexColor(hexColor, targetColor, amount) {
    const source = hexToRgb(hexColor);
    const target = hexToRgb(targetColor);

    const safeAmount = clampNumber(amount, 0, 1);

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


function updateCakeRendererColors() {
    const mainColor = normalizeHexColor(
        builderState.mainCakeColor
    );

    const accentColor = normalizeHexColor(
        builderState.accentColor
    );

    const cakeHighlight = mixHexColor(
        mainColor,
        "#FFFFFF",
        0.28
    );

    const cakeShadow = mixHexColor(
        mainColor,
        "#5A2A1E",
        0.2
    );

    const gradientStart = mixHexColor(
        mainColor,
        "#5A2A1E",
        0.11
    );

    const gradientEnd = mixHexColor(
        mainColor,
        "#5A2A1E",
        0.18
    );

    document.documentElement.style.setProperty(
        "--cake-color",
        mainColor
    );

    document.documentElement.style.setProperty(
        "--cake-highlight",
        cakeHighlight
    );

    document.documentElement.style.setProperty(
        "--cake-shadow-color",
        cakeShadow
    );

    document.documentElement.style.setProperty(
        "--accent-color",
        accentColor
    );

    const gradientStartStop = getElement(
        "#cakeBodyGradientStart"
    );

    const gradientMiddleStop = getElement(
        "#cakeBodyGradientMiddle"
    );

    const gradientEndStop = getElement(
        "#cakeBodyGradientEnd"
    );

    const topGradientStart = getElement(
        "#cakeTopGradientStart"
    );

    const topGradientEnd = getElement(
        "#cakeTopGradientEnd"
    );

    if (gradientStartStop) {
        gradientStartStop.setAttribute(
            "stop-color",
            gradientStart
        );
    }

    if (gradientMiddleStop) {
        gradientMiddleStop.setAttribute(
            "stop-color",
            mainColor
        );
    }

    if (gradientEndStop) {
        gradientEndStop.setAttribute(
            "stop-color",
            gradientEnd
        );
    }

    if (topGradientStart) {
        topGradientStart.setAttribute(
            "stop-color",
            cakeHighlight
        );
    }

    if (topGradientEnd) {
        topGradientEnd.setAttribute(
            "stop-color",
            mainColor
        );
    }
}


/* =========================================
   CAKE PRODUCT HELPERS
========================================= */

function getSelectedCakeProduct() {
    return (
        cakeProducts[builderState.cakeProductId] ||
        cakeProducts["round-6"]
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

    return product.tallPrice - product.standardPrice;
}

function cakeAllowsExtraLayer() {
    const product = getSelectedCakeProduct();
    return product.allowExtraLayer !== false;
}


/* =========================================
   ESTIMATE CALCULATIONS
========================================= */

function calculatePremiumFillingTotal() {
    return builderState.premiumFillings.reduce(
        (total, filling) => {
            return total + filling.price;
        },
        0
    );
}


function calculateDecorationTotal() {
    return builderState.decorations.reduce(
        (total, decoration) => {
            return total + decoration.price;
        },
        0
    );
}


function calculateTopperTotal() {
    return builderState.topperPrice || 0;
}


function calculateCheckboxExtraTotal() {
    return builderState.extras.reduce(
        (total, extra) => {
            return total + extra.price;
        },
        0
    );
}


function calculateQuantityExtraTotal() {
    return builderState.quantityExtras.reduce(
        (total, extra) => {
            return total + extra.total;
        },
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
   RENDER CAKE SHAPE
========================================= */

function updateVisibleCakeShape() {
    const shapeGroups = {
        round: roundCakeShape,
        heart: heartCakeShape,
        star: starCakeShape
    };

    Object.entries(shapeGroups).forEach(
        ([shapeName, shapeElement]) => {
            if (!shapeElement) {
                return;
            }

            shapeElement.classList.toggle(
                "is-hidden",
                shapeName !== builderState.cakeShape
            );
        }
    );
}


/* =========================================
   RENDER CAKE SIZE
========================================= */

function updateRendererSize() {
    const product = getSelectedCakeProduct();

    const widthScaleMap = {
        '4"': 0.68,
        '5"': 0.76,
        '6"': 0.84,
        '8"': 1,
        '9"': 1.08,
        '10"': 1.16
    };

    const widthScale = widthScaleMap[product.size] || 1;

    [
        roundCakeShape,
        heartCakeShape,
        starCakeShape
    ].forEach((shapeElement) => {
        if (!shapeElement) {
            return;
        }

        shapeElement.style.transformOrigin = "center bottom";
        shapeElement.style.setProperty("--cake-width-scale", widthScale);
    });

    cakeRenderer.dataset.cakeSize = product.size.replace('"', "");
}


/* =========================================
   RENDER CAKE HEIGHT
========================================= */

function updateCakeHeight() {
    if (!cakeAllowsExtraLayer()) {
        builderState.isTall = false;
        if (extraLayerToggle) {
            extraLayerToggle.checked = false;
            extraLayerToggle.disabled = true;
        }
    } else if (extraLayerToggle) {
        extraLayerToggle.disabled = false;
    }

    cakeRenderer.classList.toggle(
        "is-tall",
        builderState.isTall
    );

    const extraLayerDecoration = getElement(
        "#extraLayerDecoration"
    );

    if (extraLayerDecoration) {
        extraLayerDecoration.classList.toggle(
            "is-hidden",
            !builderState.isTall
        );
    }

    const product = getSelectedCakeProduct();
    const extraLayerPrice = getExtraLayerPrice();

    if (extraLayerDescription) {
        extraLayerDescription.textContent =
            builderState.isTall
                ? `Tall version selected · ${product.tallLayers} layers · ${formatCurrency(product.tallPrice)} base`
                : `Makes your cake tall · Adds ${formatCurrency(extraLayerPrice)}`;
    }

    if (bentoLayerNotice) {
        const isFixedFiveInchHeart =
            builderState.cakeProductId === "heart-5-bento" ||
            builderState.cakeProductId === "heart-5-tall";

        bentoLayerNotice.classList.toggle(
            "is-hidden",
            !isFixedFiveInchHeart
        );

        if (builderState.cakeProductId === "heart-5-bento") {
            bentoLayerNotice.textContent =
                'The 5" Sweetheart Bento Box is a one-layer heart cake packaged with cupcakes.';
        } else if (builderState.cakeProductId === "heart-5-tall") {
            bentoLayerNotice.textContent =
                'The 5" Tall Heart Cake is a separate two-layer cake and does not include cupcakes.';
        }
    }

    const layerToggleLabel = extraLayerToggle?.closest(".extra-layer-toggle");
    if (layerToggleLabel) {
        layerToggleLabel.classList.toggle(
            "is-hidden",
            !cakeAllowsExtraLayer()
        );
    }
}


/* =========================================
   RENDER DECORATIONS
========================================= */

function updateDecorationVisibility() {
    const decorationElements = getElements(
        ".cake-decoration-group"
    );

    decorationElements.forEach((element) => {
        const alwaysVisible =
            element.id ===
            "pipedBorderDecoration";

        const isSelected =
            builderState.decorations.some(
                (decoration) =>
                    decoration.id === element.id
            );

        const isTopper =
            element.id ===
                "topperDecoration" &&
            builderState.topperType;

        element.classList.toggle(
            "is-hidden",
            !alwaysVisible &&
                !isSelected &&
                !isTopper
        );
    });

    const topperTextPreview = getElement(
        "#topperTextPreview"
    );

    if (topperTextPreview) {
        const previewText =
            builderState.topperWording.trim() ||
            "Celebrate";

        topperTextPreview.textContent =
            previewText.length > 14
                ? `${previewText.slice(0, 14)}…`
                : previewText;
    }
}


/* =========================================
   RENDER MAIN PREVIEW SUMMARY
========================================= */

function updatePreviewSummary() {
    const product = getSelectedCakeProduct();
    const heightLabel = builderState.isTall
        ? "Tall"
        : "Standard";

    const layerCount = getCakeLayerCount();
    const servings = getCakeServings();
    const total = calculateEstimatedTotal();

    previewCakeName.textContent = product.name;

    previewCakeDescription.textContent =
        `${product.shape[0].toUpperCase()}${product.shape.slice(1)} · ` +
        `${heightLabel} · ` +
        `${layerCount} ${layerCount === 1 ? "layer" : "layers"}`;

    previewServingCount.textContent = servings;
    previewPrice.textContent = formatCurrency(total);

    headerCakePrice.textContent =
        formatCurrency(total);

    const mobileSummaryTitle = getElement(
        "#mobileSummaryTitle"
    );

    const mobileSummaryShape = getElement(
        "#mobileSummaryShape"
    );

    const mobileSummaryHeight = getElement(
        "#mobileSummaryHeight"
    );

    const mobileSummaryServings = getElement(
        "#mobileSummaryServings"
    );

    const mobileSummaryPrice = getElement(
        "#mobileSummaryPrice"
    );

    if (mobileSummaryTitle) {
        mobileSummaryTitle.textContent = product.name;
    }

    if (mobileSummaryShape) {
        mobileSummaryShape.textContent =
            product.shape[0].toUpperCase() +
            product.shape.slice(1);
    }

    if (mobileSummaryHeight) {
        mobileSummaryHeight.textContent =
            heightLabel;
    }

    if (mobileSummaryServings) {
        mobileSummaryServings.textContent =
            servings;
    }

    if (mobileSummaryPrice) {
        mobileSummaryPrice.textContent =
            formatCurrency(total);
    }
}


/* =========================================
   RENDER SELECTED CARD STATES
========================================= */

function updateSelectedCardStates() {
    const selectableInputs = getElements(
        [
            ".visual-option-card input",
            ".shape-choice-card input",
            ".cake-size-card input",
            ".text-option-card input",
            ".description-option-card input",
            ".style-choice-card input",
            ".upgrade-card input",
            ".decoration-choice-card input",
            ".extra-product-card input",
            ".color-choice input"
        ].join(",")
    );

    selectableInputs.forEach((input) => {
        const card = input.closest(
            [
                ".visual-option-card",
                ".shape-choice-card",
                ".cake-size-card",
                ".text-option-card",
                ".description-option-card",
                ".style-choice-card",
                ".upgrade-card",
                ".decoration-choice-card",
                ".extra-product-card",
                ".color-choice"
            ].join(",")
        );

        if (!card) {
            return;
        }

        card.classList.toggle(
            "is-selected",
            input.checked
        );
    });
}


/* =========================================
   FULL PREVIEW RENDER
========================================= */

function updateFinishPreview() {
    const finishClasses = [
        "finish-smooth",
        "finish-texture",
        "finish-vintage",
        "finish-watercolor",
        "finish-palette",
        "finish-edible"
    ];

    cakeRenderer.classList.remove(...finishClasses);

    const finishClassMap = {
        "Smooth Finish": "finish-smooth",
        "Simple Texture": "finish-texture",
        "Vintage Piping": "finish-vintage",
        "Watercolor Finish": "finish-watercolor",
        "Palette Knife Finish": "finish-palette",
        "Edible Image Design": "finish-edible"
    };

    const finishClass = finishClassMap[builderState.cakeFinish];
    if (finishClass) {
        cakeRenderer.classList.add(finishClass);
    }
}

function renderCakePreview() {
    updateVisibleCakeShape();
    updateRendererSize();
    updateCakeHeight();
    updateCakeRendererColors();
    updateDecorationVisibility();
    updateFinishPreview();
    updatePreviewSummary();
    updateSelectedCardStates();
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

    previousStepButton.disabled =
        safeStep === 1;

    nextStepButton.hidden =
        safeStep === 8;

    nextStepButton.textContent =
        safeStep === 7
            ? "Review My Cake"
            : "Continue";

    stepValidationMessage.textContent = "";

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

    showStep(builderState.currentStep + 1);
}


function goToPreviousStep() {
    showStep(builderState.currentStep - 1);
}


/* =========================================
   VALIDATION
========================================= */

function setStepValidationMessage(message) {
    stepValidationMessage.textContent = message;
}


function validateStepOne() {
    if (!builderState.occasion) {
        setStepValidationMessage(
            "Choose an occasion before continuing."
        );

        return false;
    }

    if (
        builderState.occasion === "Other" &&
        !builderState.otherOccasion.trim()
    ) {
        setStepValidationMessage(
            "Tell us what you are celebrating."
        );

        return false;
    }

    if (!builderState.eventDate) {
        setStepValidationMessage(
            "Choose the event date."
        );

        return false;
    }

    if (!builderState.fulfillmentDate) {
        setStepValidationMessage(
            "Choose the preferred pickup or delivery date."
        );

        return false;
    }

    if (
        !builderState.guestCount ||
        builderState.guestCount < 1
    ) {
        setStepValidationMessage(
            "Enter the approximate guest count."
        );

        return false;
    }

    return true;
}


function validateStepTwo() {
    if (!builderState.cakeProductId) {
        setStepValidationMessage(
            "Choose a cake size before continuing."
        );

        return false;
    }

    return true;
}


function validateStepThree() {
    if (!builderState.cakeFlavor) {
        setStepValidationMessage(
            "Choose a cake flavor."
        );

        return false;
    }

    if (
        builderState.cakeFlavor ===
            "Custom Flavor" &&
        !builderState.customCakeFlavor.trim()
    ) {
        setStepValidationMessage(
            "Tell us the custom cake flavor you want."
        );

        return false;
    }

    if (!builderState.buttercreamStyle) {
        setStepValidationMessage(
            "Choose a buttercream style."
        );

        return false;
    }

    if (!builderState.cakeFilling) {
        setStepValidationMessage(
            "Choose a filling."
        );

        return false;
    }

    if (
        builderState.cakeFilling ===
            "Custom Filling" &&
        !builderState.customFilling.trim()
    ) {
        setStepValidationMessage(
            "Tell us the custom filling you want."
        );

        return false;
    }

    return true;
}


function validateStepFour() {
    if (!builderState.cakeFinish) {
        setStepValidationMessage(
            "Choose a buttercream finish."
        );

        return false;
    }

    const flowerDecorationSelected =
        builderState.decorations.some(
            (decoration) =>
                decoration.id ===
                "flowersDecoration"
        );

    if (
        flowerDecorationSelected &&
        !builderState.flowerSource
    ) {
        setStepValidationMessage(
            "Choose who will supply the fresh flowers."
        );

        return false;
    }

    const topperSelected =
        getElement(
            "#topperDecorationOption"
        )?.checked;

    if (
        topperSelected &&
        !builderState.topperType
    ) {
        setStepValidationMessage(
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
        builderState.inspirationFiles.length > 0 &&
        acknowledgment &&
        !acknowledgment.checked
    ) {
        setStepValidationMessage(
            "Acknowledge the inspiration-photo policy before continuing."
        );

        return false;
    }

    return true;
}


function validateStepSeven() {
    if (!builderState.customerName.trim()) {
        setStepValidationMessage(
            "Enter your first and last name."
        );

        return false;
    }

    if (!builderState.customerPhone.trim()) {
        setStepValidationMessage(
            "Enter your phone number."
        );

        return false;
    }

    if (!builderState.customerEmail.trim()) {
        setStepValidationMessage(
            "Enter your email address."
        );

        return false;
    }

    const emailIsValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            builderState.customerEmail
        );

    if (!emailIsValid) {
        setStepValidationMessage(
            "Enter a valid email address."
        );

        return false;
    }

    if (!builderState.preferredContactMethod) {
        setStepValidationMessage(
            "Choose a preferred contact method."
        );

        return false;
    }

    if (!builderState.fulfillmentMethod) {
        setStepValidationMessage(
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
            setStepValidationMessage(
                "Complete the delivery address."
            );

            return false;
        }

        if (
            !builderState.deliveryMiles ||
            builderState.deliveryMiles <= 0
        ) {
            setStepValidationMessage(
                "Enter the estimated delivery mileage."
            );

            return false;
        }
    }

    if (!builderState.customerBudget) {
        setStepValidationMessage(
            "Choose the amount you are comfortable spending."
        );

        return false;
    }

    return true;
}


function validateCurrentStep() {
    setStepValidationMessage("");

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
   OCCASION AND DATE LOGIC
========================================= */

function updateOtherOccasionVisibility() {
    const field = getElement(
        "#otherOccasionField"
    );

    if (!field) {
        return;
    }

    field.classList.toggle(
        "is-hidden",
        builderState.occasion !== "Other"
    );
}


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

    let recommendationText = "";

    if (guests <= 6) {
        recommendationText =
            'A 4" Mini Indulgence Cake may fit this guest count.';
    } else if (guests <= 12) {
        recommendationText =
            'A standard 6" cake may fit this guest count.';
    } else if (guests <= 18) {
        recommendationText =
            'A tall 6" cake may fit this guest count.';
    } else if (guests <= 20) {
        recommendationText =
            'A standard 8" cake may fit this guest count.';
    } else if (guests <= 28) {
        recommendationText =
            'A tall 8" cake may fit this guest count.';
    } else if (guests <= 38) {
        recommendationText =
            'A 9" cake may fit this guest count.';
    } else if (guests <= 50) {
        recommendationText =
            'A 10" cake may fit this guest count.';
    } else {
        recommendationText =
            "This guest count may require a tiered cake or an additional dessert option.";
    }

    recommendation.textContent =
        recommendationText;

    recommendation.classList.remove(
        "is-hidden"
    );
}


function calculateDaysUntilFulfillment() {
    if (!builderState.fulfillmentDate) {
        return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fulfillmentDate = new Date(
        `${builderState.fulfillmentDate}T00:00:00`
    );

    if (Number.isNaN(fulfillmentDate.getTime())) {
        return null;
    }

    return Math.ceil(
        (fulfillmentDate.getTime() -
            today.getTime()) /
            86400000
    );
}


function updateRushFee() {
    const daysUntilFulfillment =
        calculateDaysUntilFulfillment();

    const rushNotice = getElement(
        "#rushOrderNotice"
    );

    const isRushRequest =
        daysUntilFulfillment !== null &&
        daysUntilFulfillment >= 0 &&
        daysUntilFulfillment < 5;

    builderState.rushFee =
        isRushRequest ? 75 : 0;

    if (rushNotice) {
        rushNotice.classList.toggle(
            "is-hidden",
            !isRushRequest
        );
    }

    renderCakePreview();
}


/* =========================================
   CAKE SHAPE AND SIZE LOGIC
========================================= */

function showCakeSizeGroup(shape) {
    const sizeGroups = {
        round: getElement("#roundSizeOptions"),
        heart: getElement("#heartSizeOptions"),
        star: getElement("#starSizeOptions")
    };

    Object.entries(sizeGroups).forEach(
        ([groupShape, groupElement]) => {
            if (!groupElement) {
                return;
            }

            groupElement.classList.toggle(
                "is-hidden",
                groupShape !== shape
            );
        }
    );
}


function chooseDefaultCakeForShape(shape) {
    const defaults = {
        round: "round-6",
        heart: "heart-6",
        star: "star-8"
    };

    const nextProductId =
        defaults[shape] || "round-6";

    builderState.cakeProductId =
        nextProductId;

    const sizeInput = getElement(
        `input[name="cakeSize"][value="${nextProductId}"]`
    );

    if (sizeInput) {
        sizeInput.checked = true;
    }
}


function updateCakeSelectionFromInput(input) {
    if (!cakeProducts[input.value]) {
        return;
    }

    builderState.cakeProductId = input.value;
    builderState.cakeShape =
        cakeProducts[input.value].shape;

    renderCakePreview();
}


/* =========================================
   CONDITIONAL FLAVOR FIELDS
========================================= */

function updateCustomCakeFlavorVisibility() {
    const field = getElement(
        "#customCakeFlavorField"
    );

    if (!field) {
        return;
    }

    field.classList.toggle(
        "is-hidden",
        builderState.cakeFlavor !==
            "Custom Flavor"
    );
}


function updateCustomFillingVisibility() {
    const field = getElement(
        "#customFillingField"
    );

    if (!field) {
        return;
    }

    field.classList.toggle(
        "is-hidden",
        builderState.cakeFilling !==
            "Custom Filling"
    );
}


/* =========================================
   FLOWER AND TOPPER CONDITIONALS
========================================= */

function updateFlowerSourceVisibility() {
    const flowersSelected =
        builderState.decorations.some(
            (decoration) =>
                decoration.id ===
                "flowersDecoration"
        );

    const flowerSourceOptions = getElement(
        "#flowerSourceOptions"
    );

    if (flowerSourceOptions) {
        flowerSourceOptions.classList.toggle(
            "is-hidden",
            !flowersSelected
        );
    }

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
    const topperOption = getElement(
        "#topperDecorationOption"
    );

    const topperTypeOptions = getElement(
        "#topperTypeOptions"
    );

    const topperSelected =
        Boolean(topperOption?.checked);

    if (topperTypeOptions) {
        topperTypeOptions.classList.toggle(
            "is-hidden",
            !topperSelected
        );
    }

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
   EXTRA PRODUCT LOGIC
========================================= */

function updateCheckboxExtras() {
    builderState.extras = getElements(
        "[data-extra-name]"
    )
        .filter((input) => input.checked)
        .map((input) => {
            return {
                name: input.dataset.extraName,
                price:
                    Number(input.dataset.price) ||
                    0
            };
        });

    renderCakePreview();
}


function updateQuantityExtras() {
    builderState.quantityExtras =
        getElements(".quantity-product")
            .map((productRow) => {
                const input =
                    productRow.querySelector(
                        'input[type="number"]'
                    );

                const quantity = Math.max(
                    0,
                    Number.parseInt(
                        input?.value || "0",
                        10
                    ) || 0
                );

                const unitPrice =
                    Number(
                        productRow.dataset.unitPrice
                    ) || 0;

                return {
                    name:
                        productRow.dataset.productName ||
                        "Extra",

                    quantity,
                    unitPrice,
                    total: quantity * unitPrice
                };
            })
            .filter(
                (extra) => extra.quantity > 0
            );

    renderCakePreview();
}


/* =========================================
   DELIVERY CALCULATION
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
    const deliveryFields = getElement(
        "#deliveryAddressFields"
    );

    const isDelivery =
        builderState.fulfillmentMethod ===
        "Delivery";

    if (deliveryFields) {
        deliveryFields.classList.toggle(
            "is-hidden",
            !isDelivery
        );
    }

    if (!isDelivery) {
        builderState.deliveryFee = 0;
        builderState.deliveryMiles = 0;
    }

    updateDeliveryEstimate();
}


function updateDeliveryEstimate() {
    const deliveryNotice = getElement(
        "#deliveryEstimateNotice"
    );

    if (
        builderState.fulfillmentMethod !==
        "Delivery"
    ) {
        builderState.deliveryFee = 0;

        if (deliveryNotice) {
            deliveryNotice.classList.add(
                "is-hidden"
            );

            deliveryNotice.textContent = "";
        }

        renderCakePreview();

        return;
    }

    builderState.deliveryFee =
        calculateDeliveryFee(
            builderState.deliveryMiles
        );

    if (deliveryNotice) {
        if (builderState.deliveryMiles > 0) {
            deliveryNotice.textContent =
                `Estimated local delivery fee: ${formatCurrency(builderState.deliveryFee)}. Final distance will be confirmed after review.`;

            deliveryNotice.classList.remove(
                "is-hidden"
            );
        } else {
            deliveryNotice.classList.add(
                "is-hidden"
            );

            deliveryNotice.textContent = "";
        }
    }

    renderCakePreview();
}


/* =========================================
   BUDGET NOTICE
========================================= */

function getBudgetUpperLimit(budgetValue) {
    switch (budgetValue) {
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
    const budgetNotice = getElement(
        "#budgetNotice"
    );

    if (!budgetNotice) {
        return;
    }

    const upperLimit = getBudgetUpperLimit(
        builderState.customerBudget
    );

    if (
        upperLimit === null ||
        builderState.customerBudget ===
            "Not Sure"
    ) {
        budgetNotice.classList.add(
            "is-hidden"
        );

        budgetNotice.textContent = "";

        return;
    }

    const estimate = calculateEstimatedTotal();

    if (estimate > upperLimit) {
        budgetNotice.textContent =
            `Your current starting estimate is ${formatCurrency(estimate)}, which is above the selected budget range. You may revise the cake size or details before submitting.`;

        budgetNotice.classList.remove(
            "is-hidden"
        );
    } else {
        budgetNotice.classList.add(
            "is-hidden"
        );

        budgetNotice.textContent = "";
    }
}


/* =========================================
   INSPIRATION UPLOADS
========================================= */

const maximumUploadCount = 5;
const maximumFileSize = 8 * 1024 * 1024;

function fileIsAllowed(file) {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    return allowedTypes.includes(file.type);
}


function addInspirationFiles(fileList) {
    const uploadErrorMessage = getElement(
        "#uploadErrorMessage"
    );

    if (uploadErrorMessage) {
        uploadErrorMessage.textContent = "";
    }

    const incomingFiles = Array.from(fileList);

    for (const file of incomingFiles) {
        if (
            builderState.inspirationFiles.length >=
            maximumUploadCount
        ) {
            if (uploadErrorMessage) {
                uploadErrorMessage.textContent =
                    "You can upload up to five inspiration images.";
            }

            break;
        }

        if (!fileIsAllowed(file)) {
            if (uploadErrorMessage) {
                uploadErrorMessage.textContent =
                    "Only JPG, PNG, and WebP images are accepted.";
            }

            continue;
        }

        if (file.size > maximumFileSize) {
            if (uploadErrorMessage) {
                uploadErrorMessage.textContent =
                    `${file.name} is larger than 8 MB.`;
            }

            continue;
        }

        const duplicateExists =
            builderState.inspirationFiles.some(
                (upload) =>
                    upload.file.name === file.name &&
                    upload.file.size === file.size
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
    const uploadIndex =
        builderState.inspirationFiles.findIndex(
            (upload) => upload.id === uploadId
        );

    if (uploadIndex === -1) {
        return;
    }

    URL.revokeObjectURL(
        builderState.inspirationFiles[
            uploadIndex
        ].previewUrl
    );

    builderState.inspirationFiles.splice(
        uploadIndex,
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
                document.createElement("article");

            card.className =
                "inspiration-preview-card";

            const image =
                document.createElement("img");

            image.src = upload.previewUrl;
            image.alt =
                "Uploaded cake inspiration";

            const removeButton =
                document.createElement("button");

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

            const noteField =
                document.createElement("textarea");

            noteField.placeholder =
                "What do you love about this photo?";

            noteField.value = upload.note;

            noteField.addEventListener(
                "input",
                () => {
                    upload.note =
                        noteField.value;
                }
            );

            card.append(
                image,
                removeButton,
                noteField
            );

            previewGrid.appendChild(card);
        }
    );
}


/* =========================================
   REVIEW SCREEN
========================================= */

function getDisplayOccasion() {
    if (builderState.occasion === "Other") {
        return (
            builderState.otherOccasion.trim() ||
            "Other"
        );
    }

    return builderState.occasion ||
        "Not selected";
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

    return builderState.cakeFlavor ||
        "Not selected";
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

    return builderState.cakeFilling ||
        "Not selected";
}


function getDecorationNames() {
    return builderState.decorations.map(
        (decoration) => decoration.name
    );
}


function getExtrasSummaryText() {
    const lines = [];

    builderState.extras.forEach((extra) => {
        lines.push(
            `${extra.name} (${formatCurrency(extra.price)})`
        );
    });

    builderState.quantityExtras.forEach(
        (extra) => {
            lines.push(
                `${extra.quantity} × ${extra.name} (${formatCurrency(extra.total)})`
            );
        }
    );

    return lines.length
        ? lines.join(", ")
        : "No extras selected.";
}


function setTextContent(selector, value) {
    const element = getElement(selector);

    if (element) {
        element.textContent = value;
    }
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
        builderState.inspirationFiles.length ===
        0
    ) {
        const emptyMessage =
            document.createElement("p");

        emptyMessage.textContent =
            "No inspiration photos uploaded.";

        container.appendChild(emptyMessage);

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


function populateReview() {
    const product = getSelectedCakeProduct();

    setTextContent(
        "#reviewOccasion",
        getDisplayOccasion()
    );

    setTextContent(
        "#reviewEventDate",
        formatDate(builderState.eventDate)
    );

    setTextContent(
        "#reviewFulfillmentDate",
        formatDate(
            builderState.fulfillmentDate
        )
    );

    setTextContent(
        "#reviewGuestCount",
        builderState.guestCount
            ? String(builderState.guestCount)
            : "Not entered"
    );

    setTextContent(
        "#reviewCakeSelection",
        product.name
    );

    setTextContent(
        "#reviewCakeShape",
        `${product.shape[0].toUpperCase()}${product.shape.slice(1)} · ${builderState.isTall ? "Tall" : "Standard"} · ${getCakeLayerCount()} ${getCakeLayerCount() === 1 ? "layer" : "layers"}`
    );

    setTextContent(
        "#reviewServings",
        getCakeServings()
    );

    setTextContent(
        "#reviewCakeFlavor",
        getDisplayCakeFlavor()
    );

    const buttercreamText = [
        builderState.buttercreamStyle ||
            "Not selected",

        builderState.buttercreamFlavor.trim()
    ]
        .filter(Boolean)
        .join(" · ");

    setTextContent(
        "#reviewButtercream",
        buttercreamText
    );

    setTextContent(
        "#reviewFilling",
        getDisplayFilling()
    );

    setTextContent(
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

    setTextContent(
        "#reviewColors",
        `${builderState.mainCakeColor} main · ${builderState.accentColor} accent`
    );

    setTextContent(
        "#reviewFinish",
        builderState.cakeFinish ||
            "Not selected"
    );

    setTextContent(
        "#reviewDecorations",
        getDecorationNames().length
            ? getDecorationNames().join(", ")
            : "None selected"
    );

    const topperSummary =
        builderState.topperType
            ? `${builderState.topperType}${builderState.topperWording.trim() ? ` · “${builderState.topperWording.trim()}”` : ""}`
            : "None";

    setTextContent(
        "#reviewTopper",
        topperSummary
    );

    setTextContent(
        "#reviewExtras",
        getExtrasSummaryText()
    );

    setTextContent(
        "#reviewTheme",
        builderState.cakeTheme.trim() ||
            "Not entered"
    );

    setTextContent(
        "#reviewCakeWording",
        builderState.cakeWording.trim() ||
            "Not entered"
    );

    setTextContent(
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

    setTextContent(
        "#reviewFulfillmentMethod",
        fulfillmentSummary
    );

    setTextContent(
        "#reviewBudget",
        builderState.customerBudget ||
            "Not selected"
    );

    setTextContent(
        "#reviewCakeSubtotal",
        formatCurrency(
            calculateCakeSubtotal()
        )
    );

    setTextContent(
        "#reviewExtrasSubtotal",
        formatCurrency(
            calculateExtrasTotal()
        )
    );

    setTextContent(
        "#reviewRushFee",
        formatCurrency(builderState.rushFee)
    );

    setTextContent(
        "#reviewDeliveryFee",
        formatCurrency(
            builderState.deliveryFee
        )
    );

    setTextContent(
        "#reviewEstimatedTotal",
        formatCurrency(
            calculateEstimatedTotal()
        )
    );

    populateReviewUploads();
}


/* =========================================
   MOBILE SUMMARY DRAWER
========================================= */

function openMobileSummary() {
    const drawer = getElement(
        "#mobileCakeSummary"
    );

    const openButton = getElement(
        "#openCakeSummary"
    );

    if (!drawer) {
        return;
    }

    drawer.classList.add("is-open");
    drawer.setAttribute(
        "aria-hidden",
        "false"
    );

    openButton?.setAttribute(
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

    const openButton = getElement(
        "#openCakeSummary"
    );

    if (!drawer) {
        return;
    }

    drawer.classList.remove("is-open");
    drawer.setAttribute(
        "aria-hidden",
        "true"
    );

    openButton?.setAttribute(
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

function validateFinalAcknowledgments() {
    const requiredAcknowledgments = [
        "#inquiryAcknowledgment",
        "#priceAcknowledgment",
        "#depositAcknowledgment",
        "#termsAcknowledgment"
    ];

    return requiredAcknowledgments.every(
        (selector) =>
            Boolean(
                getElement(selector)?.checked
            )
    );
}


function submitCakeVision() {
    const submissionMessage = getElement(
        "#submissionMessage"
    );

    if (!validateFinalAcknowledgments()) {
        if (submissionMessage) {
            submissionMessage.className =
                "submission-message is-error";

            submissionMessage.textContent =
                "Please acknowledge all four statements before submitting.";
        }

        return;
    }

    if (submissionMessage) {
        submissionMessage.className =
            "submission-message is-success";

        submissionMessage.textContent =
            "The visual builder is working. The final email and file-upload service still needs to be connected before this form can send real inquiries.";
    }

    /*
       IMPORTANT:

       This prototype does not send data anywhere yet.

       Later, this function will package:
       - builderState
       - inspiration image files
       - inspiration notes
       - estimated total
       - customer contact details

       and submit them to the form/upload service
       selected for the live website.
    */
}


/* =========================================
   RESET BUILDER
========================================= */

function resetBuilder() {
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

    builderState.mainCakeColor = "#F7B6D2";
    builderState.accentColor = "#FF4FA3";
    builderState.cakeFinish = "";

    builderState.decorations = [];
    builderState.flowerSource = "";
    builderState.topperType = "";
    builderState.topperPrice = 0;
    builderState.topperWording = "";

    builderState.extras = [];
    builderState.quantityExtras = [];

    builderState.inspirationFiles.forEach(
        (upload) => {
            URL.revokeObjectURL(
                upload.previewUrl
            );
        }
    );

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
        if (
            field.id === "deliveryState"
        ) {
            field.value = "Texas";
        } else if (
            field.type === "number"
        ) {
            field.value =
                field.closest(
                    ".quantity-product"
                )
                    ? "0"
                    : "";
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

    const defaultMainColor = getElement(
        'input[name="mainCakeColor"][value="#F7B6D2"]'
    );

    if (roundShapeInput) {
        roundShapeInput.checked = true;
    }

    if (roundSixInput) {
        roundSixInput.checked = true;
    }

    if (defaultMainColor) {
        defaultMainColor.checked = true;
    }

    if (extraLayerToggle) {
        extraLayerToggle.checked = false;
    }

    const customMainColor = getElement(
        "#customMainColor"
    );

    const accentColor = getElement(
        "#accentColor"
    );

    if (customMainColor) {
        customMainColor.value = "#FF4FA3";
    }

    if (accentColor) {
        accentColor.value = "#FF4FA3";
    }

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
   EVENT BINDINGS: STEP NAVIGATION
========================================= */

nextStepButton.addEventListener(
    "click",
    goToNextStep
);

previousStepButton.addEventListener(
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
                    builderState.highestUnlockedStep
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
                const targetStep = Number(
                    button.dataset.editStep
                );

                showStep(targetStep);
            }
        );
    }
);


/* =========================================
   EVENT BINDINGS: OCCASION
========================================= */

getElements(
    'input[name="occasion"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.occasion = input.value;

        updateOtherOccasionVisibility();
        updateSelectedCardStates();
    });
});

getElement("#otherOccasionText")?.addEventListener(
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

getElement("#fulfillmentDate")?.addEventListener(
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
   EVENT BINDINGS: CAKE SHAPE AND SIZE
========================================= */

getElements(
    'input[name="cakeShape"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.cakeShape = input.value;

        showCakeSizeGroup(input.value);
        chooseDefaultCakeForShape(input.value);
        renderCakePreview();
    });
});

getElements(
    'input[name="cakeSize"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        updateCakeSelectionFromInput(input);
    });
});

extraLayerToggle?.addEventListener(
    "change",
    () => {
        builderState.isTall =
            extraLayerToggle.checked;

        renderCakePreview();
    }
);


/* =========================================
   EVENT BINDINGS: FLAVORS
========================================= */

getElements(
    'input[name="cakeFlavor"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.cakeFlavor = input.value;

        updateCustomCakeFlavorVisibility();
        updateSelectedCardStates();
    });
});

getElement("#customCakeFlavor")?.addEventListener(
    "input",
    (event) => {
        builderState.customCakeFlavor =
            event.target.value;
    }
);

getElements(
    'input[name="buttercreamStyle"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.buttercreamStyle =
            input.value;

        updateSelectedCardStates();
    });
});

getElement("#buttercreamFlavor")?.addEventListener(
    "input",
    (event) => {
        builderState.buttercreamFlavor =
            event.target.value;
    }
);

getElements(
    'input[name="cakeFilling"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.cakeFilling =
            input.value;

        updateCustomFillingVisibility();
        updateSelectedCardStates();
    });
});

getElement("#customFilling")?.addEventListener(
    "input",
    (event) => {
        builderState.customFilling =
            event.target.value;
    }
);

getElements(
    "[data-premium-filling]"
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.premiumFillings =
            getElements(
                "[data-premium-filling]"
            )
                .filter(
                    (premiumInput) =>
                        premiumInput.checked
                )
                .map((premiumInput) => {
                    return {
                        name:
                            premiumInput.dataset
                                .premiumFilling,

                        price:
                            Number(
                                premiumInput.dataset
                                    .price
                            ) || 0
                    };
                });

        renderCakePreview();
    });
});


/* =========================================
   EVENT BINDINGS: COLORS AND STYLE
========================================= */

getElements(
    'input[name="mainCakeColor"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.mainCakeColor =
            input.value;

        renderCakePreview();
    });
});

getElement("#customMainColor")?.addEventListener(
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
    input.addEventListener("change", () => {
        builderState.cakeFinish =
            input.value;

        updateSelectedCardStates();
        renderCakePreview();
    });
});


/* =========================================
   EVENT BINDINGS: DECORATIONS
========================================= */

getElements(
    "[data-decoration-id]"
).forEach((input) => {
    input.addEventListener("change", () => {
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
                        decorationInput.dataset
                            .decorationId !==
                        "topperDecoration"
                )
                .map((decorationInput) => {
                    return {
                        id:
                            decorationInput.dataset
                                .decorationId,

                        name:
                            decorationInput.dataset
                                .decorationName,

                        price:
                            Number(
                                decorationInput.dataset
                                    .price
                            ) || 0
                    };
                });

        updateFlowerSourceVisibility();
        updateTopperOptionsVisibility();
        renderCakePreview();
    });
});

getElements(
    'input[name="flowerSource"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.flowerSource =
            input.value;

        updateSelectedCardStates();
    });
});

getElements(
    'input[name="topperType"]'
).forEach((input) => {
    input.addEventListener("change", () => {
        builderState.topperType =
            input.value;

        builderState.topperPrice =
            Number(input.dataset.price) ||
            0;

        updateSelectedCardStates();
        renderCakePreview();
    });
});

getElement("#topperWording")?.addEventListener(
    "input",
    (event) => {
        builderState.topperWording =
            event.target.value;

        renderCakePreview();
    }
);


/* =========================================
   EVENT BINDINGS: EXTRAS
========================================= */

getElements("[data-extra-name]").forEach(
    (input) => {
        input.addEventListener(
            "change",
            updateCheckboxExtras
        );
    }
);

getElements(".quantity-product").forEach(
    (productRow) => {
        const quantityInput =
            productRow.querySelector(
                'input[type="number"]'
            );

        const decreaseButton =
            productRow.querySelector(
                '[data-quantity-action="decrease"]'
            );

        const increaseButton =
            productRow.querySelector(
                '[data-quantity-action="increase"]'
            );

        decreaseButton?.addEventListener(
            "click",
            () => {
                const nextValue = Math.max(
                    0,
                    Number(quantityInput.value) -
                        1
                );

                quantityInput.value =
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
                        Number(quantityInput.value)
                    ) + 1;

                quantityInput.value =
                    String(nextValue);

                updateQuantityExtras();
            }
        );

        quantityInput?.addEventListener(
            "input",
            () => {
                const safeValue = Math.max(
                    0,
                    Number.parseInt(
                        quantityInput.value || "0",
                        10
                    ) || 0
                );

                quantityInput.value =
                    String(safeValue);

                updateQuantityExtras();
            }
        );
    }
);


/* =========================================
   EVENT BINDINGS: UPLOADS
========================================= */

const inspirationFileInput = getElement(
    "#inspirationFiles"
);

const chooseInspirationFiles = getElement(
    "#chooseInspirationFiles"
);

const inspirationUploadZone = getElement(
    "#inspirationUploadZone"
);

chooseInspirationFiles?.addEventListener(
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
   EVENT BINDINGS: DETAILS
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

Object.entries(simpleFieldBindings).forEach(
    ([elementId, stateKey]) => {
        getElement(`#${elementId}`)?.addEventListener(
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
    input.addEventListener("change", () => {
        builderState.fulfillmentMethod =
            input.value;

        updateDeliveryFieldsVisibility();
        updateSelectedCardStates();
    });
});

getElement("#deliveryMiles")?.addEventListener(
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
    input.addEventListener("change", () => {
        builderState.customerBudget =
            input.value;

        updateBudgetNotice();
        updateSelectedCardStates();
    });
});


/* =========================================
   EVENT BINDINGS: SUMMARY AND RESET
========================================= */

getElement("#openCakeSummary")?.addEventListener(
    "click",
    openMobileSummary
);

getElement("#closeCakeSummary")?.addEventListener(
    "click",
    closeMobileSummary
);

getElement(
    "#closeCakeSummaryButton"
)?.addEventListener(
    "click",
    closeMobileSummary
);

resetCakeBuilderButton?.addEventListener(
    "click",
    () => {
        const confirmed = window.confirm(
            "Reset the entire cake builder?"
        );

        if (confirmed) {
            resetBuilder();
        }
    }
);

getElement("#submitCakeVision")?.addEventListener(
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

