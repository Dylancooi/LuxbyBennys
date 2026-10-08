
const BASE_PRICE = 350000;

let selectedColor = "black";
let selectedView = "side";
let selectedColorName = "Obsidian Black";
let selectedColorPrice = 0;


// ------------------------------------
// DOM Elements
// ------------------------------------

const vehicleImage = document.getElementById("vehicle-image");

const colorName = document.getElementById("color-name");

const viewLabel = document.getElementById("view-label");

const imageStatus = document.getElementById("image-status");

const colorButtons = document.querySelectorAll(".color-option");

const viewButtons = document.querySelectorAll(".view-button");

const wheelInputs = document.querySelectorAll(
    'input[name="wheels"]'
);

const tintSelect = document.getElementById("window-tint");

const basePriceElement = document.getElementById("base-price");

const paintPriceElement = document.getElementById("paint-price");

const wheelPriceElement = document.getElementById("wheel-price");

const tintPriceElement = document.getElementById("tint-price");

const totalPriceElement = document.getElementById("total-price");

const resetButton = document.getElementById("reset-button");

const saveButton = document.getElementById("save-button");

const saveMessage = document.getElementById("save-message");


// ------------------------------------
// Format Currency
// ------------------------------------

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(amount);

}


// ------------------------------------
// Get Selected Wheel Price
// ------------------------------------

function getWheelPrice() {

    const selectedWheel = document.querySelector(
        'input[name="wheels"]:checked'
    );

    return Number(selectedWheel?.dataset.price || 0);

}


// ------------------------------------
// Get Tint Price
// ------------------------------------

function getTintPrice() {

    return Number(tintSelect.value || 0);

}


// ------------------------------------
// Get Vehicle Image Path
// ------------------------------------

function getImagePath() {

    return `images/fubuki/${selectedColor}-${selectedView}.png`;

}


// ------------------------------------
// Update Image
// ------------------------------------

function updateVehicleImage() {

    const imagePath = getImagePath();

    vehicleImage.style.opacity = "0.35";

    imageStatus.textContent = "LOADING PREVIEW";

    const testImage = new Image();

    testImage.onload = function () {

        vehicleImage.src = imagePath;

        vehicleImage.style.opacity = "1";

        imageStatus.textContent = "PREVIEW";

    };

    testImage.onerror = function () {

        // If a specific color/view image is missing,
        // fall back to the black version of that view.

        const fallbackPath =
            `images/fubuki/black-${selectedView}.png`;

        const fallbackImage = new Image();

        fallbackImage.onload = function () {

            vehicleImage.src = fallbackPath;

            vehicleImage.style.opacity = "1";

            imageStatus.textContent = "DEFAULT PREVIEW";

        };

        fallbackImage.onerror = function () {

            vehicleImage.src =
                "images/fubuki/black-side.png";

            vehicleImage.style.opacity = "1";

            imageStatus.textContent = "DEFAULT IMAGE";

        };

        fallbackImage.src = fallbackPath;

    };

    testImage.src = imagePath;

}


// ------------------------------------
// Update Total Price
// ------------------------------------

function updatePrice() {

    const wheelPrice = getWheelPrice();

    const tintPrice = getTintPrice();

    const totalPrice =
        BASE_PRICE +
        selectedColorPrice +
        wheelPrice +
        tintPrice;

    basePriceElement.textContent =
        formatCurrency(BASE_PRICE);

    paintPriceElement.textContent =
        `+${formatCurrency(selectedColorPrice)}`;

    wheelPriceElement.textContent =
        `+${formatCurrency(wheelPrice)}`;

    tintPriceElement.textContent =
        `+${formatCurrency(tintPrice)}`;

    totalPriceElement.textContent =
        formatCurrency(totalPrice);

}


// ------------------------------------
// Select Paint Color
// ------------------------------------

colorButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedColor = button.dataset.color;

        selectedColorName = button.dataset.name;

        selectedColorPrice =
            Number(button.dataset.price || 0);

        colorButtons.forEach(function (item) {

            item.classList.remove("active");

        });

        button.classList.add("active");

        colorName.textContent = selectedColorName;

        updateVehicleImage();

        updatePrice();

    });

});


// ------------------------------------
// Select Vehicle View
// ------------------------------------

viewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedView = button.dataset.view;

        viewButtons.forEach(function (item) {

            item.classList.remove("active");

        });

        button.classList.add("active");

        viewLabel.textContent =
            `${selectedView.toUpperCase()} VIEW`;

        updateVehicleImage();

    });

});


// ------------------------------------
// Select Wheels
// ------------------------------------

wheelInputs.forEach(function (input) {

    input.addEventListener("change", function () {

        updatePrice();

    });

});


// ------------------------------------
// Select Window Tint
// ------------------------------------

tintSelect.addEventListener("change", function () {

    updatePrice();

});


// ------------------------------------
// Reset Configurator
// ------------------------------------

resetButton.addEventListener("click", function () {

    selectedColor = "black";

    selectedView = "side";

    selectedColorName = "Obsidian Black";

    selectedColorPrice = 0;

    colorButtons.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.color === "black"
        );

    });

    viewButtons.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.view === "side"
        );

    });

    document.querySelector(
        'input[name="wheels"][value="standard"]'
    ).checked = true;

    tintSelect.value = "0";

    colorName.textContent = selectedColorName;

    viewLabel.textContent = "SIDE VIEW";

    saveMessage.textContent = "";

    updateVehicleImage();

    updatePrice();

});


// ------------------------------------
// Save Build
// ------------------------------------

saveButton.addEventListener("click", function () {

    const selectedWheel = document.querySelector(
        'input[name="wheels"]:checked'
    );

    const build = {

        vehicle: "Annis Fubuki",

        color: selectedColorName,

        view: selectedView,

        wheels: selectedWheel?.value || "standard",

        windowTint: tintSelect.options[
            tintSelect.selectedIndex
        ].text,

        totalPrice: totalPriceElement.textContent

    };

    console.log("Saved build:", build);

    saveMessage.textContent =
        `Build saved: ${build.color} Fubuki — ${build.totalPrice}`;

});


// ------------------------------------
// Initial Setup
// ------------------------------------

updateVehicleImage();
 
updatePrice();