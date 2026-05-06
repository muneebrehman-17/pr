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
