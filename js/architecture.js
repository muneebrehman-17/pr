// js/architecture.js
document.addEventListener("DOMContentLoaded", () => {
    const archElements = document.querySelectorAll('.arch-stagger');

    const archObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate elements sequentially
                archElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        if (el.classList.contains('arch-line')) {
                            if (window.innerWidth <= 768) {
                                el.style.transform = 'scaleY(1)';
                            } else {
                                el.style.transform = 'scaleX(1)';
                            }
                        } else {
                            el.style.transform = 'scale(1)';
                        }
                    }, index * 200); // 200ms stagger
                });
                observer.disconnect(); // only animate once
            }
        });
    }, { threshold: 0.3 });

    const archContainer = document.querySelector('.arch-timeline');
    if (archContainer) {
        archObserver.observe(archContainer);
    }
});
