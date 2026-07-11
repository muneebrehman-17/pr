// js/process-timeline.js
document.addEventListener("DOMContentLoaded", () => {
    // Staggered animation for the development process timeline
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach((step, index) => {
        // Set CSS variable for delay so both the step and pseudo-elements can use it
        step.style.setProperty('--delay', `${index * 0.4}s`);
    });
});
