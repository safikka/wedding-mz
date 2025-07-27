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

// Register plugin scrollTo
gsap.registerPlugin(ScrollToPlugin);

// Tombol buka undangan
document.getElementById('open-invit').addEventListener('click', function (e) {
  e.preventDefault();
  // Scroll dan animasi fade-in
  setTimeout(() => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: '#mempelai',
      ease: 'power4.inOut',
      onComplete: () => {
        // gsap.to('#mempelai', { opacity: 1, duration: 1 });
        document.body.classList.remove('scroll-lock');
      },
    });
  }, 200);
});

const scriptURL =
  'https://script.google.com/macros/s/AKfycby0N3yEC6vLQJRPRTkAjJQuWTcdJHR-8T1rzGE2grZ7AjXaV3shb5cujO8ETP_aRic/exec';

async function fetchUcapan() {
  const listContainer = document.getElementById('ucapan-list');
  const loadingText = document.getElementById('loading');

  try {
    const response = await fetch(scriptURL);
    const data = await response.json();

    // 👉 Debug hasil GET dari Google Apps Script
    loadingText.remove();

    if (data.length === 0) {
      listContainer.innerHTML = `<p class="text-center text-gray-500">Belum ada ucapan.</p>`;
      return;
    }

    data.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'testing';
      div.innerHTML = `
          <p class="text-gray-700 italic">"${item.ucapan}"</p>
          <p class="text-right mt-2 text-sm text-gray-600 font-medium">- ${item.nama}</p>
        `;
      listContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Gagal fetch:', error);
  }
}

// document.getElementById('ucapanForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const form = e.target;
//   const data = {
//     nama: form.nama.value,
//     kehadiran: form.kehadiran.value,
//     ucapan: form.ucapan.value,
//   };

//   try {
//     const response = await fetch(scriptURL, {
//       redirect: 'follow',
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'text/plain;charset=utf-8',
//       },
//     });

//     form.reset();
//     // await fetchUcapan();
//   } catch (e) {
//     console.log(`Error: ${e}`);
//   }
// });

fetchUcapan();
