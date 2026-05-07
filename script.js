// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
        }, 500);
    }
});

// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("myBar");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

// Theme Toggle Logic
const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');

if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        } else {
            localStorage.setItem('theme', 'dark');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    });
}

// AOS Animation Initialization
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Certifications Accordion Toggle Logic
    const certToggle = document.getElementById('certToggle');
    const certAccordion = document.getElementById('certAccordion');
    const toggleText = document.getElementById('toggleText');

    if (certToggle && certAccordion && toggleText) {
        certToggle.addEventListener('click', () => {
            certAccordion.classList.toggle('active');
            certToggle.classList.toggle('active');
            
            if (certAccordion.classList.contains('active')) {
                toggleText.innerText = "Show Less";
            } else {
                toggleText.innerText = "Show More";
                // Smoothly scroll back to the top of the section when closing
                document.getElementById('certifications').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Custom Cursor Logic
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

if (dot && outline) {
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Move dot instantly with no delay
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        // Linear Interpolation (lerp) for smooth trailing effect
        // 0.15 is the speed of follow (lower = slower/more trail)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .github-btn, .project-btn, .view-cred-btn, .skill-badge, .expertise-badge-item, .social-card, .submit-btn, .whatsapp-float, #certToggle');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}
