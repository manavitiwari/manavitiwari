const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('#site-nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));
const dateInput = document.querySelector('#appointment-date');
const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = new FormData(form).get('name').trim();
  const message = form.querySelector('.form-note');
  message.textContent = `Thanks, ${name}. This is a preview request and has not been sent to Embrace yet.`;
  message.classList.add('is-success');
  form.reset();
});
