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
      ease: 'power2.inOut',
      onComplete: () => {
        // gsap.to('#mempelai', { opacity: 1, duration: 1 });
        document.body.classList.remove('overflow-hidden');
      },
    });
  }, 200);
});

// const scriptURL =
//   'https://script.google.com/macros/s/AKfycby0N3yEC6vLQJRPRTkAjJQuWTcdJHR-8T1rzGE2grZ7AjXaV3shb5cujO8ETP_aRic/exec';

// async function fetchUcapan() {
//   const listContainer = document.getElementById('ucapan-list');
//   const loadingText = document.getElementById('loading');

//   try {
//     const response = await fetch(scriptURL);
//     const data = await response.json();

//     // 👉 Debug hasil GET dari Google Apps Script
//     loadingText.remove();

//     if (data.length === 0) {
//       listContainer.innerHTML = `<p class="text-center text-gray-500">Belum ada ucapan.</p>`;
//       return;
//     }

//     data.forEach((item) => {
//       const div = document.createElement('div');
//       div.className = 'testing';
//       div.innerHTML = `
//           <p class="text-gray-700 italic">"${item.ucapan}"</p>
//           <p class="text-right mt-2 text-sm text-gray-600 font-medium">- ${item.nama}</p>
//         `;
//       listContainer.appendChild(div);
//     });
//   } catch (error) {
//     console.error('Gagal fetch:', error);
//   }
// }

// // document.getElementById('ucapanForm').addEventListener('submit', async (e) => {
// //   e.preventDefault();

// //   const form = e.target;
// //   const data = {
// //     nama: form.nama.value,
// //     kehadiran: form.kehadiran.value,
// //     ucapan: form.ucapan.value,
// //   };

// //   try {
// //     const response = await fetch(scriptURL, {
// //       redirect: 'follow',
// //       method: 'POST',
// //       body: JSON.stringify(data),
// //       headers: {
// //         'Content-Type': 'text/plain;charset=utf-8',
// //       },
// //     });

// //     form.reset();
// //     // await fetchUcapan();
// //   } catch (e) {
// //     console.log(`Error: ${e}`);
// //   }
// // });

// fetchUcapan();

const scriptURL =
  'https://script.google.com/macros/s/AKfycby0N3yEC6vLQJRPRTkAjJQuWTcdJHR-8T1rzGE2grZ7AjXaV3shb5cujO8ETP_aRic/exec';

const form = document.getElementById('formUcapan');
const konfirmasiInput = document.getElementById('konfirmasiInput');
const rsvpButtons = document.querySelectorAll('.rsvp-btn');
const listContainer = document.getElementById('ucapanList');

// Handle RSVP button aktif/tidak
rsvpButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    // Reset semua button
    rsvpButtons.forEach((b) => b.classList.remove('bg-blue-600', 'text-white', 'bg-red-500'));

    // Set value input hidden
    konfirmasiInput.value = btn.dataset.value;

    // Style sesuai pilihan
    if (btn.dataset.value === 'Hadir') {
      btn.classList.add('bg-blue-600', 'text-white');
    } else {
      btn.classList.add('bg-red-500', 'text-white');
    }
  });
});

// Fetch data dari Google Apps Script
async function fetchUcapan() {
  listContainer.innerHTML = `<p id="loading" class="text-center text-gray-500">Memuat ucapan...</p>`;
  const loadingText = document.getElementById('loading');

  try {
    const response = await fetch(scriptURL);
    const data = await response.json();

    loadingText.remove();

    if (data.length === 0) {
      listContainer.innerHTML = `<p class="text-center text-gray-500">Belum ada ucapan.</p>`;
      return;
    }

    // Render list ucapan
    data.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'bg-gray-50 p-4 rounded-md shadow-sm';

      // Status hadir/tidak hadir
      const status =
        item.konfirmasi?.toLowerCase() === 'hadir'
          ? `<span class="text-green-600 font-medium text-sm">✅ Hadir</span>`
          : `<span class="text-red-500 font-medium text-sm">❌ Tidak Hadir</span>`;

      div.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="font-semibold text-blue-600">${item.nama}</div>
          <div>${status}</div>
        </div>
        <p class="mt-2 text-sm text-gray-700">${item.ucapan}</p>
      `;
      listContainer.appendChild(div);
    });
  } catch (error) {
    console.error('Gagal fetch:', error);
    listContainer.innerHTML = `<p class="text-center text-red-500">Gagal memuat data ucapan.</p>`;
  }
}

// Submit form ke Google Apps Script
// form.addEventListener('submit', async (e) => {
document.getElementById('formUcapan').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validasi RSVP
  if (!konfirmasiInput.value) {
    alert('Pilih konfirmasi kehadiran terlebih dahulu!');
    return;
  }

  console.log(konfirmasiInput.value.toLowerCase());
  const data = {
    nama: form.nama.value,
    kehadiran: konfirmasiInput.value.toLowerCase(),
    ucapan: form.ucapan.value,
  };

  const formData = new FormData(form);

  try {
    // await fetch(scriptURL, {
    //   method: 'POST',
    //   body: formData,
    // });
    await fetch(scriptURL, {
      redirect: 'follow',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    // Reset form & RSVP button
    form.reset();
    konfirmasiInput.value = '';
    rsvpButtons.forEach((b) => b.classList.remove('bg-blue-600', 'text-white', 'bg-red-500'));

    // Refresh list ucapan
    fetchUcapan();
  } catch (error) {
    console.error('Gagal kirim data:', error);
    alert('Gagal mengirim data, coba lagi!');
  }
});

// Jalankan fetch pertama kali
fetchUcapan();
