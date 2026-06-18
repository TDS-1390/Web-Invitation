/* =========================================================
   Undangan Pernikahan — script utama
   Fitur: nama tamu dari URL, buka cover, musik latar,
   hitung mundur, galeri foto, ucapan (localStorage)
   ========================================================= */

// ---- KONFIGURASI (ubah sesuai kebutuhan) ----
const WEDDING_DATE = new Date("2026-12-12T08:00:00+07:00");

// Daftar foto galeri. Ganti dengan foto kamu di assets/img/
// atau biarkan URL contoh di bawah ini.
const GALLERY_PHOTOS = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80",
  "https://images.unsplash.com/photo-1525258946800-98c7b9d6e6f7?w=500&q=80",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
];

const STORAGE_KEY = "wedding_wishes";

// ---- 1. Nama tamu dari URL (?to=Nama+Tamu) ----
(function setGuestName() {
  const params = new URLSearchParams(window.location.search);
  const to = params.get("to");
  if (to) {
    document.getElementById("guestName").textContent = decodeURIComponent(to);
  }
})();

// ---- 2. Buka undangan + mulai musik ----
const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const main = document.getElementById("main");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

openBtn.addEventListener("click", () => {
  cover.style.display = "none";
  main.classList.remove("main--hidden");
  window.scrollTo(0, 0);
  playMusic();
});

// ---- 3. Kontrol musik ----
function playMusic() {
  bgMusic
    .play()
    .then(() => musicToggle.classList.add("playing"))
    .catch(() => {
      // Browser memblok autoplay; tombol tetap bisa dipakai manual.
    });
}

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.add("playing");
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
  }
});

// ---- 4. Hitung mundur ----
function updateCountdown() {
  const now = new Date().getTime();
  const distance = WEDDING_DATE.getTime() - now;

  if (distance < 0) {
    document.getElementById("cdDays").textContent = "0";
    document.getElementById("cdHours").textContent = "0";
    document.getElementById("cdMins").textContent = "0";
    document.getElementById("cdSecs").textContent = "0";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("cdDays").textContent = days;
  document.getElementById("cdHours").textContent = hours;
  document.getElementById("cdMins").textContent = mins;
  document.getElementById("cdSecs").textContent = secs;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---- 5. Render galeri ----
(function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  GALLERY_PHOTOS.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Foto galeri " + (i + 1);
    img.loading = "lazy";
    img.addEventListener("click", () => window.open(src, "_blank"));
    grid.appendChild(img);
  });
})();

// ---- 6. Ucapan & RSVP (localStorage) ----
const wishForm = document.getElementById("wishForm");
const wishList = document.getElementById("wishList");

function getWishes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveWishes(wishes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderWishes() {
  const wishes = getWishes();
  if (wishes.length === 0) {
    wishList.innerHTML =
      '<p style="color:#9a9a9a;text-align:center">Belum ada ucapan. Jadilah yang pertama!</p>';
    return;
  }
  wishList.innerHTML = wishes
    .map(
      (w) => `
      <div class="wish-item">
        <div class="wish-item__head">
          <span class="wish-item__name">${escapeHtml(w.name)}</span>
          <span class="wish-item__badge">${escapeHtml(w.rsvp)}</span>
        </div>
        <p class="wish-item__msg">${escapeHtml(w.message)}</p>
      </div>`
    )
    .join("");
}

wishForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("wishName").value.trim();
  const rsvp = document.getElementById("wishRsvp").value;
  const message = document.getElementById("wishMessage").value.trim();
  if (!name || !message) return;

  const wishes = getWishes();
  wishes.unshift({ name, rsvp, message, time: Date.now() });
  saveWishes(wishes);
  renderWishes();
  wishForm.reset();
});

renderWishes();
