// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Word-by-word typing effect
const aboutText =
  "Data Analyst with 2+ years of experience in business intelligence and data visualization.\n" +
  "Specialized in Power BI, Microsoft Fabric, SQL, and Python for building automated data pipelines and interactive dashboards.\n" +
  "Focused on data quality, scalable analytics, and delivering clear, actionable insights for business stakeholders in the UAE.";

const words = aboutText.split(" ");
const target = document.getElementById("typedText");

let i = 0;
const speedMs = 110;

function typeWordByWord() {
  if (i < words.length) {
    target.textContent += (i === 0 ? "" : " ") + words[i];
    i++;
    setTimeout(typeWordByWord, speedMs);
  }
}
setTimeout(typeWordByWord, 400);

// ---- Dashboard Galleries ----
const galleries = {
  dash1: ["assets/img/dash1-1.png", "assets/img/dash1-2.png", "assets/img/dash1-3.png"],
  dash2: ["assets/img/dash2-1.png"],
  dash3: ["assets/img/dash3-1.png", "assets/img/dash3-2.png", "assets/img/dash3-3.png", "assets/img/dash3-4.png"],
  dash4: ["assets/img/dash4-1.png", "assets/img/dash4-2.png"],
  dash5: ["assets/img/dash5-1.png"],
  dash6: ["assets/img/dash6-1.png", "assets/img/dash6-2.png"]
};

// ---- Modal elements (declared ONCE) ----
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

document.querySelectorAll("[data-gallery]").forEach((el) => {
  el.addEventListener("click", () => {
    const key = el.getAttribute("data-gallery");
    const title = el.getAttribute("data-title") || "Dashboard Screenshots";
    const images = galleries[key];
    if (!images || images.length === 0) return;
    openModal(title, images);
  });
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

// ---- Auto-cycle screenshots on hover ----
document.querySelectorAll(".project__cover[data-gallery]").forEach((img) => {
  const key = img.getAttribute("data-gallery");
  const images = galleries[key];
  if (!images || images.length === 0) return;

  if (images.length < 2) return;

  let idx = 0;
  let cycleTimer = null;

  img.addEventListener("mouseenter", () => {
    cycleTimer = setInterval(() => {
      idx = (idx + 1) % images.length;
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = images[idx];
        img.style.opacity = 1;
      }, 180);
    }, 900);
  });

  img.addEventListener("mouseleave", () => {
    clearInterval(cycleTimer);
    idx = 0;
    img.src = images[0];
    img.style.opacity = 1;
  });
});

// ---- Stat counters ----
const counters = document.querySelectorAll(".counter");
let started = false;

function startCounterAnimation() {
  if (started) return;
  const stats = document.querySelector(".stats");
  const rect = stats.getBoundingClientRect();

  if (rect.top < window.innerHeight - 100) {
    started = true;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const increment = target / 50;

      function updateCounter() {
        count += increment;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      updateCounter();
    });
  }
}

window.addEventListener("scroll", startCounterAnimation);
startCounterAnimation();
