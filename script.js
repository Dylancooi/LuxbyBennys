const searchBar = document.getElementById("searchBar");
const vehicles = document.querySelectorAll(".vehicle-card");

searchBar.addEventListener("keyup", () => {
  const searchValue = searchBar.value.toLowerCase();

  vehicles.forEach(vehicle => {
    const name = vehicle.getAttribute("data-name").toLowerCase();

    if (name.includes(searchValue)) {
      vehicle.style.display = "block";
    } else {
      vehicle.style.display = "none";
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