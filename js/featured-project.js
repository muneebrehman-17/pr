// js/featured-project.js
document.addEventListener("DOMContentLoaded", () => {
    // Staggered animation for the architecture flow
    const flowElements = document.querySelectorAll('.fp-architecture-flow .fade-in-stagger');
    
    flowElements.forEach((el, index) => {
        // Add a growing transition delay to each subsequent element
        el.style.transitionDelay = `${index * 0.15}s`;
    });
});
