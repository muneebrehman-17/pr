// js/animations.js
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optional: Unobserve after animating if we only want it to run once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with animation classes
    const animatedElements = document.querySelectorAll('.reveal-up, .fade-in-stagger');
    animatedElements.forEach(el => observer.observe(el));
});
