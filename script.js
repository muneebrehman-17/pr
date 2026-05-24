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

// Mobile Expertise Marquee Logic
function initExpertiseMarquee() {
    const container = document.querySelector('.expertise-badges-container');
    if (!container) return;

    if (window.innerWidth <= 768) {
        if (!container.dataset.cloned) {
            const items = Array.from(container.children);
            items.forEach(item => {
                const clone = item.cloneNode(true);
                container.appendChild(clone);
            });
            container.dataset.cloned = "true";
        }
    }
}

// Footer Mouse Follow Logic
function initFooterFollow() {
    const footerSpans = document.querySelectorAll('.footer-marquee-content span');
    const contactSection = document.getElementById('contact');
    
    if (!footerSpans.length || !contactSection) return;

    window.addEventListener('mousemove', (e) => {
        const contactRect = contactSection.getBoundingClientRect();
        
        // Only activate when mouse is near contact section or footer
        if (e.clientY > contactRect.top - 200) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
            
            footerSpans.forEach(span => {
                span.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        } else {
            footerSpans.forEach(span => {
                span.style.transform = `translate(0, 0)`;
            });
        }
    });
}

// Text Scramble Animation Logic
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initExpertiseMarquee(); // Initialize marquee for expertise badges
    initFooterFollow(); // Initialize interactive footer marquee
    
    const el = document.querySelector('.typing-text');
    if (el) {
        const phrases = [
            'Backend Developer',
            'Building APIs',
            'Designing Systems',
            'Solving Problems',
            'Creating Experiences'
        ];
        const fx = new TextScramble(el);
        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2000);
            });
            counter = (counter + 1) % phrases.length;
        };
        next();
    }
});
