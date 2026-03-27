// =========================
// MOBILE NAVIGATION
// =========================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// =========================
// PRODUCT GALLERY
// =========================
const galleryImages = [
  "assets/images/product-1.jpg",
  "assets/images/product-2.jpg",
  "assets/images/product-3.jpg",
  "assets/images/product-4.jpg"
];

let currentImageIndex = 0;

const mainImage = document.getElementById("mainImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const galleryDots = document.getElementById("galleryDots");
const thumbnails = document.querySelectorAll(".thumb");

function renderDots() {
  galleryDots.innerHTML = "";

  galleryImages.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    if (index === currentImageIndex) {
      dot.classList.add("active-dot");
    }

    dot.addEventListener("click", () => {
      updateGallery(index);
    });

    galleryDots.appendChild(dot);
  });
}

function updateGallery(index) {
  currentImageIndex = index;
  mainImage.src = galleryImages[currentImageIndex];

  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active-thumb", i === currentImageIndex);
  });

  renderDots();
}

prevBtn.addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGallery(currentImageIndex);
});

nextBtn.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateGallery(currentImageIndex);
});

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    updateGallery(index);
  });
});

renderDots();

// =========================
// RADIO BUTTONS + CART LINK
// =========================
const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
const purchaseRadios = document.querySelectorAll('input[name="purchase"]');

const addToCartLink = document.getElementById("addToCartLink");
const selectionPreview = document.getElementById("selectionPreview");

const singleSubscriptionBox = document.getElementById("singleSubscriptionBox");
const doubleSubscriptionBox = document.getElementById("doubleSubscriptionBox");

function updateCartLink() {
  const selectedFragrance = document.querySelector(
    'input[name="fragrance"]:checked'
  ).value;

  const selectedPurchase = document.querySelector(
    'input[name="purchase"]:checked'
  ).value;

  // Dynamic link (9 combinations)
  const newLink = `https://example.com/cart?fragrance=${selectedFragrance}&purchase=${selectedPurchase}`;

  addToCartLink.href = newLink;
  selectionPreview.textContent = `Selected: ${selectedFragrance} + ${selectedPurchase}`;

  // Expand subscription boxes
  singleSubscriptionBox.classList.remove("active");
  doubleSubscriptionBox.classList.remove("active");

  if (selectedPurchase === "single-subscription") {
    singleSubscriptionBox.classList.add("active");
  }

  if (selectedPurchase === "double-subscription") {
    doubleSubscriptionBox.classList.add("active");
  }
}

fragranceRadios.forEach((radio) => {
  radio.addEventListener("change", updateCartLink);
});

purchaseRadios.forEach((radio) => {
  radio.addEventListener("change", updateCartLink);
});

updateCartLink();

// =========================
// COUNTER ANIMATION
// =========================
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 80));

  function update() {
    current += increment;

    if (current < target) {
      counter.textContent = current + "%";
      requestAnimationFrame(update);
    } else {
      counter.textContent = target + "%";
    }
  }

  update();
}

function startCountersIfVisible() {
  const statsSection = document.getElementById("stats");
  const rect = statsSection.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100 && !countersStarted) {
    countersStarted = true;
    counters.forEach((counter) => animateCounter(counter));
  }
}

window.addEventListener("scroll", startCountersIfVisible);
window.addEventListener("load", startCountersIfVisible);