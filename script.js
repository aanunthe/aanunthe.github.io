// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scrollToTopBtn';
scrollToTopBtn.innerText = 'Top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Skill Bars Animation
function animateSkillBars() {
    document.querySelectorAll('.skill-bar .progress').forEach((progressBar) => {
        const value = progressBar.getAttribute('data-value');
        progressBar.style.width = `${value}%`;
    });
}

// Trigger animations on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.fadeInUp');
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
            element.style.animationPlayState = 'running';
        }
    });
}

// Initial call and event listeners
window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    animateSkillBars();
});
