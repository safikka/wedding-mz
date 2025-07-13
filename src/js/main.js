// Get query param to display guest
const getQueryParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

window.addEventListener('DOMContentLoaded', () => {
  const nameParam = getQueryParam('name') || 'Welcome';
  const nameContainer = document.getElementById('nameContainer');

  // Setup name text with span per char
  nameContainer.innerHTML = '';
  for (let char of nameParam) {
    const span = document.createElement('span');
    span.textContent = char;
    nameContainer.appendChild(span);
  }

  const enterBtn = document.getElementById('enterBtn');
  const section1 = document.getElementById('section1');
  const section2 = document.getElementById('section2');

  enterBtn.addEventListener('click', () => {
    const letters = nameContainer.querySelectorAll('span');

    // Fade out letters
    gsap.to(letters, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      stagger: 0.05,
      ease: 'power2.inOut',
      onComplete: () => {
        // Animate section2 up
        gsap.to(section2, {
          y: '0%',
          duration: 1.8,
          ease: 'back.inOut',
          onStart: () => {
            section2.style.zIndex = 3;
          },
          onComplete: () => {
            // Hide section1 and unlock scroll
            section1.style.display = 'none';
            section2.style.position = 'relative';
            section2.style.transform = 'none';
            document.body.style.overflow = 'auto';
          },
        });
      },
    });
  });
});
