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
  'https://script.google.com/macros/s/AKfycbz4k8ycYWA486Dy2inaYxHF0Gw16h9Ge4jeBAwHndGed8AtGLxd6i8Xa8yU_6dXMNnqEw/exec'; // Ganti dengan URL Web App kamu

async function fetchUcapan() {
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();

    const listDiv = document.getElementById('listUcapan');
    listDiv.innerHTML = '';

    data.reverse().forEach((row) => {
      const el = document.createElement('div');
      el.innerHTML = `<strong>${row.nama}</strong> (${row.kehadiran}):<br>${row.ucapan}`;
      el.style.marginBottom = '1rem';
      listDiv.appendChild(el);
    });
  } catch (err) {
    console.error('Gagal fetch:', err);
  }
}

document.getElementById('ucapanForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    nama: form.nama.value,
    kehadiran: form.kehadiran.value,
    ucapan: form.ucapan.value,
  };

  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    form.reset();
    await fetchUcapan();
  } catch (err) {
    console.error('Gagal kirim:', err);
  }
});

fetchUcapan(); // load awal
