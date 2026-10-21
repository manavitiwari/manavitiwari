const nav = document.querySelector('.nav-wrap');
const menu = document.querySelector('.menu');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
  menu.textContent = open ? '×' : '☰';
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '☰';
}));
document.querySelector('#appointment-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = new FormData(event.currentTarget).get('name').trim();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = `Thank you${name ? `, ${name}` : ''}! Your appointment request has been received.`;
  event.currentTarget.reset();
});
document.querySelector('#rating-form').addEventListener('submit', event => {
  event.preventDefault();
  const rating = new FormData(event.currentTarget).get('rating');
  event.currentTarget.querySelector('.rating-message').textContent = `Thank you for sharing your ${rating}-star rating!`;
  event.currentTarget.reset();
});

const carousel = document.querySelector('#makeup-carousel');
if (carousel) {
  const track = carousel.querySelector('.makeup-carousel-track');
  const slides = [...carousel.querySelectorAll('.makeup-slide')];
  const dots = [...carousel.querySelectorAll('[data-carousel-slide]')];
  let activeSlide = 0;
  const showSlide = index => {
    activeSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    slides.forEach((slide, i) => slide.setAttribute('aria-hidden', i === activeSlide ? 'false' : 'true'));
    dots.forEach((dot, i) => dot.setAttribute('aria-current', i === activeSlide ? 'true' : 'false'));
  };
  carousel.querySelectorAll('[data-carousel-step]').forEach(button => button.addEventListener('click', () => {
    showSlide(activeSlide + Number(button.dataset.carouselStep));
  }));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  const viewport = carousel.querySelector('.makeup-carousel-viewport');
  let touchStartX = null;
  viewport.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, {passive:true});
  viewport.addEventListener('touchend', event => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) showSlide(activeSlide + (distance < 0 ? 1 : -1));
    touchStartX = null;
  }, {passive:true});
  showSlide(0);
}

const makeupCube = document.querySelector('#makeup-look-cube');
if (makeupCube) {
  const faces = [...makeupCube.querySelectorAll('.makeup-cube-face')];
  const status = document.querySelector('[data-cube-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const orientations = [
    'rotateX(0deg) rotateY(0deg)',
    'rotateX(0deg) rotateY(-90deg)',
    'rotateX(0deg) rotateY(-180deg)',
    'rotateX(0deg) rotateY(-270deg)',
    'rotateX(90deg) rotateY(-360deg)',
    'rotateX(-90deg) rotateY(-360deg)'
  ];
  let activeFace = 0;
  let timer;
  const showFace = index => {
    activeFace = (index + faces.length) % faces.length;
    makeupCube.style.transform = orientations[activeFace];
    faces.forEach((face, i) => {
      face.setAttribute('aria-hidden', i === activeFace ? 'false' : 'true');
      face.inert = i !== activeFace;
    });
    status.textContent = `Look ${activeFace + 1} of ${faces.length}`;
  };
  const stopRotation = () => window.clearInterval(timer);
  const startRotation = () => {
    stopRotation();
    if (!reducedMotion.matches && !document.hidden) timer = window.setInterval(() => showFace(activeFace + 1), 4000);
  };
  document.querySelectorAll('[data-cube-step]').forEach(button => button.addEventListener('click', () => {
    showFace(activeFace + Number(button.dataset.cubeStep));
    startRotation();
  }));
  const cubeWrap = makeupCube.closest('.makeup-cube-wrap');
  cubeWrap.addEventListener('mouseenter', stopRotation);
  cubeWrap.addEventListener('mouseleave', startRotation);
  cubeWrap.addEventListener('focusin', stopRotation);
  cubeWrap.addEventListener('focusout', event => {
    if (!cubeWrap.contains(event.relatedTarget)) startRotation();
  });
  document.addEventListener('visibilitychange', startRotation);
  reducedMotion.addEventListener?.('change', startRotation);
  showFace(0);
  startRotation();
}
