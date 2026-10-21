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
document.querySelector('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  form.querySelector('.form-note').textContent = 'Thank you for being here. A little note will find its way to you soon.';
  form.reset();
});
