// Soft gate for protected material links (<a data-protected="URL">).
// Note: this is a static site, so this only hides the link from casual visitors.
// Only the SHA-256 hash of the password is stored here, but the target URL is still in the page source.
const GATE_ID = 'admin';
const GATE_HASH = '67219b2f50268da2bbc6a1445e84349524358736c5a452ac7c164f27c36187d3';

const dlg = document.getElementById('gate');
const form = document.getElementById('gate-form');
const idInput = document.getElementById('gate-id');
const pwInput = document.getElementById('gate-pw');
const err = document.getElementById('gate-err');
let target = null;

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

document.querySelectorAll('a[data-protected]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    target = a.dataset.protected;
    idInput.value = GATE_ID;
    pwInput.value = '';
    err.hidden = true;
    dlg.showModal();
    pwInput.focus();
  });
});

document.getElementById('gate-cancel').addEventListener('click', () => dlg.close());

form.addEventListener('submit', async e => {
  e.preventDefault();
  const ok = idInput.value.trim() === GATE_ID && (await sha256(pwInput.value)) === GATE_HASH;
  if (ok) {
    dlg.close();
    window.open(target, '_blank', 'noopener');
  } else {
    err.hidden = false;
    pwInput.select();
  }
});
