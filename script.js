// script.js

// PARALLAX BACKGROUND
const bgImage = document.querySelector('.profile-image');
window.addEventListener('scroll', () => {
  const offset = window.pageYOffset;
  // move the image at half the scroll speed
  bgImage.style.transform = `translateY(${offset * 0.7}px)`;
});

// SMOOTH SCROLL
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ACTIVE-LINK HIGHLIGHT
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (window.pageYOffset >= top - height / 3) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});
