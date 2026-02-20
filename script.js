const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');

// 1. Check Local Storage on Load
// If user previously chose 'light', apply it immediately
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon'); // Switch icon to moon
}

// 2. Toggle Function
function toggleTheme() {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        // Switch to Light Mode
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        // Switch back to Dark Mode
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2, // The higher the value, the smoother the scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. Initialize AOS (Fade In Animations)
    AOS.init({
        duration: 1000, // Animation lasts 1 second
        once: true,     // Animation happens only once
        offset: 100,    // Trigger 100px before element is visible
    });
}
