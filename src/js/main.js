const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// Tampilkan nama tamu
const guestName = getQueryParam('to');
const nameEl = document.getElementById('guest-name');
if (guestName) {
  nameEl.textContent = `${guestName}`;
}

// Elemen penting
const heroSection = document.getElementById('hero');
const enterBtn = document.getElementById('enter-button');
const mainContent = document.getElementById('main-content');

// Prevent scroll sebelum masuk
document.body.classList.add('noscroll');

let lenis = null;
let lenisStarted = false;
let rafId = null;

// Loop untuk Lenis
function startLenisRAF() {
  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);
}

function stopLenisRAF() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

// Tombol masuk ditekan
enterBtn.addEventListener('click', () => {
  if (lenisStarted) return; // prevent double click

  lenisStarted = true;

  // Animasi masuk
  gsap.to(mainContent, {
    y: 0,
    duration: 1,
    ease: 'power2.out',
    onComplete: () => {
      // Hapus hero, aktifkan scroll
      gsap.killTweensOf(heroSection); // pastikan tween dibersihkan
      heroSection.remove();
      document.body.classList.remove('noscroll');

      // Inisialisasi Lenis
      lenis = new Lenis({
        duration: 1.5,
        direction: 'vertical',
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: true,
        syncTouch: true,
        autoRaf: false, // karena kita handle manual dengan RAF
      });

      startLenisRAF();
    },
  });
});

// Otomatis pause/resume saat tab tidak aktif
document.addEventListener('visibilitychange', () => {
  if (!lenis) return;
  if (document.hidden) {
    lenis.stop();
    stopLenisRAF();
  } else {
    lenis.start();
    startLenisRAF();
  }
});
