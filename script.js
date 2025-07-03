// script.js - Enhanced Portfolio Interactions

// Enhanced parallax with smoother movement
const bgImage = document.querySelector('.profile-image');
let ticking = false;

function updateParallax() {
  const offset = window.pageYOffset;
  const scrolled = offset * 0.5;
  bgImage.style.transform = `translateY(${scrolled}px) scale(1.1)`;
  ticking = false;
}

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestTick);

// Smooth scroll with enhanced behavior
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced active link highlighting with intersection observer
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

const observerOptions = {
  threshold: 0.3,
  rootMargin: '-20% 0px -20% 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Scroll-triggered animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.education-item, .experience-item, .project-item, .extracurricular-item');
  
  elements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.style.animationDelay = `${index * 0.1}s`;
      element.classList.add('loading', 'loaded');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Typing effect for the main heading
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.innerHTML = '';
  
  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const mainHeading = document.querySelector('.personal-details h1');
  if (mainHeading) {
    const originalText = mainHeading.textContent;
    typeWriter(mainHeading, originalText, 80);
  }
});

// Enhanced skills hover effects
document.querySelectorAll('.skills-list li').forEach(skill => {
  skill.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(5deg)';
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
  
  skill.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
});

// Particle background effect (optional enhancement)
const createParticles = () => {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  document.body.appendChild(particlesContainer);
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    particlesContainer.appendChild(particle);
  }
};

// Initialize particles on load
window.addEventListener('load', createParticles);

// Navigation is now always visible - removed hide/show effect

// Add CSS for the float animation if not already present
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.8;
    }
  }
`;
document.head.appendChild(style);

// Enhanced button click effects
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  animateOnScroll();
}, 16)); // ~60fps

// Enhanced loading states
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  
  // Add loading animation to sections
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    
    setTimeout(() => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Enhanced contact link interactions
document.querySelectorAll('.skills-list.contact li a').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
  });
});

// Add smooth reveal animation for content
const revealElements = document.querySelectorAll('.education-item, .experience-item, .project-item, .extracurricular-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s ease-out';
  revealObserver.observe(element);
});
