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

// =========================
// TIMER 1
// =========================

const countdown1 =
new Date("May 20, 2026 00:00:00").getTime();

// =========================
// TIMER 2
// =========================

const countdown2 =
new Date("June 1, 2026 00:00:00").getTime();

// =========================
// UPDATE TIMERS
// =========================

setInterval(() => {

    const now = new Date().getTime();

    // TIMER 1
    const distance1 = countdown1 - now;

    const days1 =
    Math.floor(distance1 / (1000 * 60 * 60 * 24));

    const hours1 =
    Math.floor((distance1 % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60));

    const minutes1 =
    Math.floor((distance1 % (1000 * 60 * 60))
    / (1000 * 60));

    const seconds1 =
    Math.floor((distance1 % (1000 * 60))
    / 1000);

    document.getElementById("days1").innerHTML = days1;
    document.getElementById("hours1").innerHTML = hours1;
    document.getElementById("minutes1").innerHTML = minutes1;
    document.getElementById("seconds1").innerHTML = seconds1;

    // TIMER 2
    const distance2 = countdown2 - now;

    const days2 =
    Math.floor(distance2 / (1000 * 60 * 60 * 24));

    const hours2 =
    Math.floor((distance2 % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60));

    const minutes2 =
    Math.floor((distance2 % (1000 * 60 * 60))
    / (1000 * 60));

    const seconds2 =
    Math.floor((distance2 % (1000 * 60))
    / 1000);

    document.getElementById("days2").innerHTML = days2;
    document.getElementById("hours2").innerHTML = hours2;
    document.getElementById("minutes2").innerHTML = minutes2;
    document.getElementById("seconds2").innerHTML = seconds2;

}, 1000);
