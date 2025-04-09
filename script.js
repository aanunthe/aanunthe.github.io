// Smooth scrolling for nav links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});

// Parallax effect for profile image
window.addEventListener('scroll', () => {
  const parallaxImage = document.querySelector('.profile-image');
  if (parallaxImage) {
    let offset = window.pageYOffset;
    parallaxImage.style.transform = 'translateY(' + offset * 0.2 + 'px)';
  }
});

// If user interacts (touch, mouse, or scroll), stop auto scroll
['touchstart', 'wheel', 'mousedown', 'pointerdown'].forEach(event => {
  skillsList.addEventListener(event, () => {
    skillsList.style.animationPlayState = 'paused';
  });
});
const skillsList = document.querySelector('.skills-list');
let scrollAmount = 1; // speed control
let direction = 1;
let autoScrollActive = true;
let isUserInteracting = false;
let interactionTimeout;

function autoScrollSkills() {
  if (!autoScrollActive || isUserInteracting) return;

  skillsList.scrollLeft += scrollAmount * direction;

  // Loop detection
  if (skillsList.scrollLeft + skillsList.clientWidth >= skillsList.scrollWidth - 1) {
    direction = -1;
  }

  if (skillsList.scrollLeft <= 0) {
    direction = 1;
  }

  requestAnimationFrame(autoScrollSkills);
}

// Start auto scroll
autoScrollSkills();

// User interaction handling (touch / mouse / scroll / drag)
['touchstart', 'wheel', 'mousedown', 'pointerdown'].forEach(event => {
  skillsList.addEventListener(event, () => {
    isUserInteracting = true;
    clearTimeout(interactionTimeout);

    // Resume auto-scroll after inactivity
    interactionTimeout = setTimeout(() => {
      isUserInteracting = false;
      autoScrollSkills();
    }, 3000); // 3 seconds after user stops interacting
  });
});

// In case of resize (mobile orientation change etc.), resume scroll
window.addEventListener('resize', () => {
  if (!isUserInteracting) {
    autoScrollSkills();
  }
});
