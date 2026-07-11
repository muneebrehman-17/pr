document.addEventListener("DOMContentLoaded", () => {
    const expSteps = document.querySelectorAll('.exp-step');
    
    expSteps.forEach((step, index) => {
        step.style.setProperty('--delay', ${index * 0.4}s);
    });

    const expObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Activate the step (draws the line)
                entry.target.classList.add('active');
                
                // Animate the content with lightSpeedInLeft
                const content = entry.target.querySelector('.exp-content');
                if(content) {
                    content.classList.add('animate__animated', 'animate__lightSpeedInLeft');
                    content.style.animationDelay = entry.target.style.getPropertyValue('--delay');
                }
            }
        });
    }, { threshold: 0.15 });

    expSteps.forEach(step => expObserver.observe(step));
});
