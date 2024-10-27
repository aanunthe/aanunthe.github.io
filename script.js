document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links a, .cta-button");

    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = event.currentTarget.getAttribute("href");
            smoothScrollTo(target);
        });
    });

    function smoothScrollTo(target) {
        document.querySelector(target).scrollIntoView({
            behavior: "smooth"
        });
    }
});