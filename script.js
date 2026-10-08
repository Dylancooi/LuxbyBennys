const searchBar = document.getElementById("searchBar");
const vehicles = document.querySelectorAll(".vehicle-card");

searchBar.addEventListener("keyup", () => {

    let input =
    searchBar.value.toLowerCase();

    // SELECT VEHICLE CARDS
    let cards =
    document.querySelectorAll(".vehicle-card");

    cards.forEach(card => {

        let text =
        card.innerText.toLowerCase();

        // SHOW/HIDE
        if(text.includes(input)){

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

  });
});

const popup = document.getElementById("promoPopup");
const closeBtn = document.querySelector(".close-btn");

// Show popup after 2 seconds
window.onload = () => {
  setTimeout(() => {
    popup.style.display = "flex";
  }, 2000);
};

// Close when clicking X
closeBtn.onclick = () => {
  popup.style.display = "none";
};

// Close when clicking outside
window.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};


const carImage = document.getElementById("carImage");

const carViewer = document.querySelector(".car-viewer");

const colorButtons = document.querySelectorAll(".color-btn");

const selectedColorText = document.getElementById("selectedColor");

const rotateLeftBtn = document.getElementById("rotateLeft");

const rotateRightBtn = document.getElementById("rotateRight");

const resetBtn = document.getElementById("resetView");


/* =========================
   VEHICLE SETTINGS
========================= */

const totalFrames = 36;

let currentFrame = 1;

let selectedColor = "black";

let isDragging = false;

let startX = 0;

let startFrame = 1;


/* =========================
   IMAGE PATH
========================= */

function getImagePath() {

    return `images/cars/${selectedColor}/car-${String(currentFrame).padStart(2, "0")}.png`;

}


/* =========================
   UPDATE VEHICLE IMAGE
========================= */

function updateImage() {

    carImage.src = getImagePath();

}


/* =========================
   CHANGE CAMERA ANGLE
========================= */

function changeFrame(amount) {

    currentFrame += amount;

    if (currentFrame > totalFrames) {

        currentFrame = 1;

    }

    if (currentFrame < 1) {

        currentFrame = totalFrames;

    }

    updateImage();

}


/* =========================
   DRAG TO ROTATE
========================= */

carViewer.addEventListener("pointerdown", (event) => {

    isDragging = true;

    startX = event.clientX;

    startFrame = currentFrame;

    carViewer.setPointerCapture(event.pointerId);

});


carViewer.addEventListener("pointermove", (event) => {

    if (!isDragging) return;

    const difference = event.clientX - startX;

    const sensitivity = 15;

    const frameChange = Math.floor(difference / sensitivity);

    let newFrame = startFrame - frameChange;

    newFrame = ((newFrame - 1) % totalFrames + totalFrames) % totalFrames + 1;

    if (newFrame !== currentFrame) {

        currentFrame = newFrame;

        updateImage();

    }

});


function stopDragging() {

    isDragging = false;

}

carViewer.addEventListener("pointerup", stopDragging);

carViewer.addEventListener("pointercancel", stopDragging);

carViewer.addEventListener("lostpointercapture", stopDragging);


/* =========================
   BUTTON CONTROLS
========================= */

rotateLeftBtn.addEventListener("click", () => {

    changeFrame(-1);

});


rotateRightBtn.addEventListener("click", () => {

    changeFrame(1);

});


resetBtn.addEventListener("click", () => {

    currentFrame = 1;

    updateImage();

});


/* =========================
   COLOR SELECTOR
========================= */

colorButtons.forEach((button) => {

    button.addEventListener("click", () => {

        selectedColor = button.dataset.color;

        colorButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        selectedColorText.textContent =
            "Selected Color: " +
            selectedColor.charAt(0).toUpperCase() +
            selectedColor.slice(1);

        updateImage();

    });

});


/* =========================
   INITIAL IMAGE
========================= */

updateImage();