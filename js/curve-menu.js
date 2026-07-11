// GSAP Curve Swipe Animation (Dynamic Section Rendering)
class CurveMenu {
    constructor(overlaySelector) {
        this.overlay = document.querySelector(overlaySelector);
        if (!this.overlay) return;
        
        this.path = this.overlay.querySelector('.curve-path');
        this.content = this.overlay.querySelector('.curve-content');
        this.closeBtn = this.overlay.querySelector('.curve-close-btn');
        this.isOpen = false;
        
        this.currentActiveSection = null;

        // Path definitions for viewBox="0 0 100 100"
        this.paths = {
            start: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
            step1: "M 0 100 V 50 Q 50 0 100 50 V 100 z",
            step2: "M 0 100 V 0 Q 50 0 100 0 V 100 z"
        };

        // Initialize path
        gsap.set(this.path, { attr: { d: this.paths.start } });
        gsap.set([this.content, this.closeBtn], { autoAlpha: 0, y: 30 });

        // Build Master Timeline
        this.tl = gsap.timeline({ 
            paused: true,
            onStart: () => {
                this.overlay.classList.add('active');
                // Prevent background interaction
                document.body.style.overflow = 'hidden';
            },
            onReverseComplete: () => {
                this.overlay.classList.remove('active');
                this.isOpen = false;
                // Restore background interaction
                document.body.style.overflow = '';
                
                // Hide current active section when fully closed
                if (this.currentActiveSection) {
                    this.currentActiveSection.style.display = 'none';
                    document.body.appendChild(this.currentActiveSection);
                    this.currentActiveSection = null;
                }
            }
        });

        // 1. Morph path up
        this.tl.to(this.path, {
            attr: { d: this.paths.step1 },
            duration: 0.4,
            ease: "power3.in"
        })
        .to(this.path, {
            attr: { d: this.paths.step2 },
            duration: 0.4,
            ease: "power3.out"
        })
        // 2. Fade in content and close button
        .to([this.content, this.closeBtn], {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.5)"
        }, "-=0.2");
    }

    injectSection(sectionId) {
        const sectionEl = document.querySelector(sectionId);
        if (!sectionEl) return;

        // Hide and move previous section back to body if exists
        if (this.currentActiveSection && this.currentActiveSection !== sectionEl) {
            this.currentActiveSection.style.display = 'none';
            document.body.appendChild(this.currentActiveSection);
        }

        // Clear placeholder content if any (only on first run)
        if (!this.currentActiveSection && this.content.children.length > 0 && this.content.children[0].tagName !== 'SECTION') {
            this.content.innerHTML = '';
        }

        // Show new section
        sectionEl.style.display = 'block';
        
        // Move section into curve content container
        this.content.appendChild(sectionEl);
        
        // Trigger animations if section has AOS
        const aosElements = sectionEl.querySelectorAll('[data-aos]');
        aosElements.forEach(el => {
            el.classList.add('aos-animate');
        });

        this.currentActiveSection = sectionEl;
    }

    open(sectionId) {
        this.injectSection(sectionId);
        this.isOpen = true;
        this.tl.timeScale(1).play();
    }

    close() {
        if (!this.isOpen) return;
        this.tl.timeScale(1.5).reverse();
    }

    switchContent(sectionId) {
        // If already open, just crossfade the content
        gsap.to(this.content, {
            autoAlpha: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                this.injectSection(sectionId);
                // Reset scroll position
                this.content.scrollTop = 0;
                
                gsap.to(this.content, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "back.out(1.5)"
                });
            }
        });
    }
}

window.curveMenu = new CurveMenu('.curve-overlay');
