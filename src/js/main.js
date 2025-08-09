const getQueryParam = (param) => {
  const raw = new URLSearchParams(window.location.search).get(param);
  return raw ? decodeURIComponent(raw) : null;
};

// Nama tamu
const guestName = getQueryParam('to');
if (guestName) document.getElementById('guest-name').textContent = guestName;

// Register plugin scrollTo
gsap.registerPlugin(ScrollToPlugin);

// Tombol buka undangan
document.getElementById('open-invit').addEventListener('click', (e) => {
  e.preventDefault();
  setTimeout(() => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: '#mempelai',
      ease: 'power2.inOut',
      onComplete: () => document.body.classList.remove('overflow-hidden'),
    });
  }, 200);
});

const scriptURL =
  'https://script.google.com/macros/s/AKfycby0N3yEC6vLQJRPRTkAjJQuWTcdJHR-8T1rzGE2grZ7AjXaV3shb5cujO8ETP_aRic/exec';
const form = document.getElementById('formUcapan');
const konfirmasiInput = document.getElementById('konfirmasiInput');
const listContainer = document.getElementById('ucapanList');

// RSVP event delegation
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('rsvp-btn')) {
    document
      .querySelectorAll('.rsvp-btn')
      .forEach((b) => b.classList.remove('bg-blue-600', 'text-white', 'bg-red-500'));
    konfirmasiInput.value = e.target.dataset.value;
    e.target.classList.add(
      e.target.dataset.value === 'Hadir' ? 'bg-blue-600' : 'bg-red-500',
      'text-white'
    );
  }
});

// Fetch ucapan (lazy load)
async function fetchUcapan() {
  listContainer.innerHTML = `<p class="text-center text-gray-500">Memuat ucapan...</p>`;
  try {
    const res = await fetch(scriptURL);
    const data = await res.json();
    listContainer.innerHTML = data.length
      ? data
          .filter((item) => item.nama && item.nama.trim() !== '') // filter nama kosong
          .map(
            (item) => `
        <div class="bg-gray-80 p-4 border-gray-300 border-b-1">
          <div class="flex items-center justify-between">
            <div class="font-semibold text-blue-700">${item.nama}</div>
          </div>
          <p class="mt-1 text-sm text-gray-700">${item.ucapan}</p>
        </div>
      `
          )
          .join('')
      : `<p class="text-center text-gray-500">Belum ada ucapan.</p>`;
  } catch {
    listContainer.innerHTML = `<p class="text-center text-red-500">Gagal memuat data ucapan.</p>`;
  }
}

// Lazy load ucapan saat visible
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    fetchUcapan();
    obs.disconnect();
  }
}).observe(document.getElementById('ucapan'));

// Submit form
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.nama.value.trim()) return alert('Nama tidak boleh kosong!');
  if (!konfirmasiInput.value) return alert('Pilih konfirmasi kehadiran terlebih dahulu!');

  const data = {
    nama: form.nama.value,
    kehadiran: konfirmasiInput.value.toLowerCase(),
    ucapan: form.ucapan.value,
  };

  try {
    await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    });
    form.reset();
    konfirmasiInput.value = '';
    document
      .querySelectorAll('.rsvp-btn')
      .forEach((b) => b.classList.remove('bg-blue-600', 'text-white', 'bg-red-500'));
    fetchUcapan();
  } catch {
    alert('Gagal mengirim data, coba lagi!');
  }
});

// Lazy load Google Maps
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    document.getElementById('mapFrame').src =
      'https://maps.google.com/maps?width=600&height=400&hl=en&q=ibu%20djoe%20&t=&z=14&ie=UTF8&iwloc=B&output=embed';
    obs.disconnect();
  }
}).observe(document.getElementById('mapFrame'));
