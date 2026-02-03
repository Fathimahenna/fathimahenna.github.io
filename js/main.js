// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Word-by-word typing effect
const aboutText =
  "Data Analyst with 2 years of experience in business intelligence and data visualization.\n" +
  "Specialized in Power BI, Microsoft Fabric, SQL, and Python for building automated data pipelines and interactive dashboards.\n" +
  "Focused on data quality, scalable analytics, and delivering clear, actionable insights for business stakeholders in the UAE.";


const words = aboutText.split(" ");
const target = document.getElementById("typedText");

let i = 0;
const speedMs = 110; // Change typing speed (lower = faster)

function typeWordByWord() {
  if (i < words.length) {
    target.textContent += (i === 0 ? "" : " ") + words[i];
    i++;
    setTimeout(typeWordByWord, speedMs);
  }
}

// Start typing after a small delay
setTimeout(typeWordByWord, 400);

// ---- Dashboard Galleries ----
// Add your images here (per dashboard/project)
const galleries = {
  dash1: [
    "assets/img/dash1-1.png",
    "assets/img/dash1-2.png",
    "assets/img/dash1-3.png"
  ],
  dash2: [
    "assets/img/dash2-1.png"
  ],
  dash3: [
    "assets/img/dash3-1.png",
    "assets/img/dash3-2.png",
    "assets/img/dash3-3.png",
    "assets/img/dash3-4.png"
  ],

  dash4: [
    "assets/img/dash4-1.png",
    "assets/img/dash4-2.png"
  ],
  dash5: [
    "assets/img/dash5-1.png"
  ],
  dash6: [
    "assets/img/dash6-1.png",
    "assets/img/dash6-2.png"
  ]
};

const modal = document.getElementById("galleryModal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImage");
const modalCount = document.getElementById("modalCount");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentGallery = [];
let currentIndex = 0;

function openModal(title, images) {
  currentGallery = images;
  currentIndex = 0;
  modalTitle.textContent = title;
  updateModalImage();

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateModalImage() {
  modalImg.src = currentGallery[currentIndex];
  modalCount.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateModalImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateModalImage();
}

// Open modal when clicking any element with data-gallery
document.querySelectorAll("[data-gallery]").forEach((el) => {
  el.addEventListener("click", () => {
    const key = el.getAttribute("data-gallery");
    const title = el.getAttribute("data-title") || "Dashboard Screenshots";
    const images = galleries[key];
    if (!images || images.length === 0) return;
    openModal(title, images);
  });
});

// Modal controls
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});
