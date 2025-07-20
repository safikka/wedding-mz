const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

const guestName = getQueryParam('to');
const nameEl = document.getElementById('guest-name');
if (guestName) {
  nameEl.textContent = `${guestName}`;
}

const heroSection = document.getElementById('hero');
const enterBtn = document.getElementById('enter-button');
const mainContent = document.getElementById('main-content');

document.body.classList.add('noscroll');

enterBtn.addEventListener('click', () => {
  gsap.to(mainContent, {
    y: 0,
    duration: 1.2,
    ease: 'power4.inOut',
    onComplete: () => {
      // setelah animasi selesai, remove hero
      heroSection.remove();
      document.body.classList.remove('noscroll');

      // Inisialisasi Lenis setelah scroll diaktifkan
      const lenis = new Lenis({
        duration: 1.2,
        direction: 'vertical',
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: true,
        syncTouch: true,
        autoRaf: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    },
  });
});
