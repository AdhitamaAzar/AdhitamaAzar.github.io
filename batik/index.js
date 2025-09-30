// ======================
// Render Gallery
// ======================
const batikData = [
  /* data batik seperti sebelumnya (tidak diubah) */
];

function renderGallery() {
  const gallery = document.getElementById('batik-gallery');
  if (!gallery) return;
  batikData.forEach((batik, index) => {
    const card = document.createElement('div');
    card.className = 'luxury-card glass-card rounded-2xl overflow-hidden cursor-pointer reveal';
    card.style.animationDelay = `${index * 0.1}s`;
    card.onclick = () => openModal(batik.id);
    card.innerHTML = `
      <div class="relative overflow-hidden group image-zoom h-80">
          <img src="${batik.image}" alt="${batik.name}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div class="absolute top-4 right-4">
              <span class="glass-card px-4 py-2 rounded-full text-xs font-semibold text-yellow-400 tracking-wider">${batik.origin}</span>
          </div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="luxury-btn px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-full">
                  Lihat Detail
              </div>
          </div>
      </div>
      <div class="p-6">
          <h3 class="text-2xl font-bold gold-gradient-text mb-3">${batik.name}</h3>
          <p class="text-gray-400 text-sm leading-relaxed line-clamp-2">${batik.description}</p>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// ======================
// Modal
// ======================
function openModal(id) {
  const batik = batikData.find(b => b.id === id);
  document.getElementById('modal-image').src = batik.image;
  document.getElementById('modal-title').textContent = batik.name;
  document.getElementById('modal-origin').textContent = batik.origin;
  document.getElementById('modal-description').textContent = batik.description;
  document.getElementById('modal-philosophy').textContent = batik.philosophy;

  const detailsDiv = document.getElementById('modal-details');
  detailsDiv.innerHTML = batik.details.map(detail => 
    `<div class="flex items-start group">
      <span class="text-yellow-400 mr-3 text-xl group-hover:scale-125 transition-transform duration-300">✦</span>
      <span>${detail}</span>
    </div>`
  ).join('');

  document.getElementById('product-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('product-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// ======================
// Slider
// ======================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}
setInterval(nextSlide, 6000);

// ======================
// Scroll Reveal
// ======================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ======================
// Counter Animation
// ======================
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 50));
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = current;
    }
  }, 30);
}

const stats = document.querySelectorAll('.stat-number');
let statsAnimated = false;
window.addEventListener('scroll', () => {
  if (!statsAnimated) {
    const firstStat = stats[0];
    if (firstStat) {
      const rect = firstStat.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        statsAnimated = true;
        stats.forEach((stat, index) => {
          setTimeout(() => animateCounter(stat), index * 200);
        });
      }
    }
  }
});

// ======================
// Page Switcher
// ======================
function showPage(pageId) {
  document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ======================
// Init
// ======================
renderGallery();
