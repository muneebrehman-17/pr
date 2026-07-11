// GSAP macOS Dock Effect
class MacOSDock {
    constructor(dockSelector) {
        this.dock = document.querySelector(dockSelector);
        if (!this.dock) return;
        this.icons = Array.from(this.dock.querySelectorAll('.dock-icon'));
        this.maxScale = 1.5;
        this.neighborScale = 1.2;
        this.distance = 100; // Affects how many icons scale

        this.init();
    }

    init() {
        this.icons.forEach(icon => {
            icon.addEventListener('mousemove', (e) => this.handleMouseMove(e));
            icon.addEventListener('mouseleave', () => this.handleMouseLeave());
        });
    }

    handleMouseMove(e) {
        const mouseX = e.clientX;
        
        this.icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            // Center of the icon
            const iconX = rect.left + rect.width / 2;
            
            // Calculate distance from mouse to center of icon
            const dist = Math.abs(mouseX - iconX);
            
            // Map distance to scale factor
            let scale = 1;
            if (dist < this.distance) {
                // Closer distance = higher scale
                const progress = 1 - (dist / this.distance);
                // Ease the progress slightly
                const easeProgress = gsap.parseEase('sine.out')(progress);
                scale = 1 + (this.maxScale - 1) * easeProgress;
            }

            gsap.to(icon, {
                scale: scale,
                transformOrigin: 'bottom center',
                duration: 0.1,
                overwrite: 'auto'
            });
        });
    }

    handleMouseLeave() {
        gsap.to(this.icons, {
            scale: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto'
        });
    }

    setActive(sectionId) {
        this.icons.forEach(icon => {
            if (icon.dataset.target === sectionId) {
                icon.classList.add('active');
            } else {
                icon.classList.remove('active');
            }
        });
    }
}

// Instantiate globally to use in controller
window.macOSDock = new MacOSDock('.mac-dock');
