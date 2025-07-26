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
