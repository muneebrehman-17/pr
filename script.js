const body = document.body;
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');


if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
}

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
    const lenis = new Lenis({
        duration: 1.2, 
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

  
    AOS.init({
        duration: 1000, // Animation lasts 1 second
        once: true,     // Animation happens only once
        offset: 100,    // Trigger 100px before element is visible
    });
}
