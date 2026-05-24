// Ask Muneeb - Portfolio Assistant Logic

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('assistantToggle');
    const windowEl = document.querySelector('.assistant-window');
    const headerEl = document.querySelector('.assistant-header');
    const closeBtn = document.querySelector('.assistant-close');
    const bodyEl = document.getElementById('assistantBody');
    const typingIndicator = document.getElementById('typingIndicator');
    const hintEl = document.getElementById('assistantHint');
    const hintTextEl = hintEl ? hintEl.querySelector('.hint-text') : null;
    const inputArea = document.getElementById('assistantInputArea');
    const inputField = document.getElementById('assistantInput');
    const sendBtn = document.getElementById('assistantSend');

    if (!toggleBtn || !windowEl || !closeBtn || !bodyEl || !typingIndicator) {
        console.error('Ask Muneeb Assistant elements not found in DOM.');
        return;
    }

    // Inquiry State Management
    let inquiryState = 'none'; // 'none', 'awaiting_email', 'awaiting_details'
    let leadData = { email: '', details: '' };
    let isOpen = false;
    let initialized = false;

    const assistantData = {
        initial: {
            text: "Hey, I'm Muneeb's portfolio assistant. What would you like to explore?",
            options: [
                { label: "Who are you?", action: "who" },
                { label: "Show projects", action: "projects" },
                { label: "Tech stack", action: "tech" }
            ]
        },
        responses: {
            who: {
                text: "Muneeb is a full stack developer focused on architecture, scalable web applications, landing pages, and modern digital experiences.",
                options: [
                    { label: "Show projects", action: "projects" },
                    { label: "Let's Build Something", action: "start_inquiry" }
                ],
                scroll: "#about"
            },
            projects: {
                text: "Here are some of Muneeb's featured projects, ranging from real estate portals to scalable APIs.",
                options: [
                    { label: "Discuss Your Project", action: "start_inquiry" },
                    { label: "Tech stack", action: "tech" }
                ],
                scroll: "#projects"
            },
            tech: {
                text: "Muneeb specializes in C#, .NET Core 8, SQL Server, and React. He builds robust backends and clean user interfaces.",
                options: [
                    { label: "Project Inquiry", action: "start_inquiry" },
                    { label: "Freelance availability", action: "freelance" }
                ],
                scroll: "#skills"
            },
            freelance: {
                text: "Yes, Muneeb is currently available for freelance work. I can help you start an inquiry right now.",
                options: [
                    { label: "Start Inquiry", action: "start_inquiry" },
                    { label: "Who are you?", action: "who" }
                ]
            },
            start_inquiry: {
                text: "I'd love to help you get started! First, what’s your email or phone number?",
                type: "input",
                nextState: "awaiting_email"
            },
            awaiting_details: {
                text: "Got it! Tell me a little about your project or what you need help with.",
                type: "input",
                nextState: "awaiting_details"
            },
            success: {
                text: "✓ Inquiry Sent. Thanks — Muneeb will get back to you soon.",
                options: [
                    { label: "Back to top", action: "top" }
                ]
            },
            top: {
                text: "What else would you like to explore?",
                options: [
                    { label: "Who are you?", action: "who" },
                    { label: "Show projects", action: "projects" },
                    { label: "Tech stack", action: "tech" }
                ],
                scroll: "body"
            }
        }
    };

    // --- Particle Dissolve Logic ---
    class ParticleEffect {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.isAnimating = false;
        }
        init(parent) {
            this.canvas.id = 'hintCanvas';
            parent.appendChild(this.canvas);
            this.resize();
        }
        resize() {
            if (!this.canvas.parentElement) return;
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
        createParticles(el) {
            this.resize();
            const rect = el.getBoundingClientRect();
            const parentRect = this.canvas.parentElement.getBoundingClientRect();
            const x = rect.left - parentRect.left;
            const y = rect.top - parentRect.top;
            const width = rect.width;
            const height = rect.height;
            const colors = ['rgba(133, 76, 230, 0.8)', 'rgba(48, 110, 232, 0.7)', 'rgba(255, 255, 255, 0.9)', 'rgba(133, 76, 230, 0.4)'];
            for (let i = 0; i < 100; i++) {
                this.particles.push({
                    x: x + Math.random() * width,
                    y: y + Math.random() * height,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5 - 0.5,
                    size: Math.random() * 3 + 1.5,
                    alpha: 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
            if (!this.isAnimating) { this.isAnimating = true; this.animate(); }
        }
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                p.x += p.vx; p.y += p.vy;
                p.alpha -= 0.008; p.size *= 0.985;
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = p.color;
                if (i % 5 === 0) { this.ctx.shadowBlur = 5; this.ctx.shadowColor = p.color; } else { this.ctx.shadowBlur = 0; }
                this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); this.ctx.fill();
                if (p.alpha <= 0) { this.particles.splice(i, 1); i--; }
            }
            if (this.particles.length > 0) { requestAnimationFrame(() => this.animate()); } else { this.isAnimating = false; }
        }
    }

    const particles = new ParticleEffect();
    if (hintEl) particles.init(hintEl);

    // --- Text Scramble Logic for Hint ---
    class HintScramble {
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
                if (this.frame >= end) { complete++; output += to; }
                else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) { char = this.randomChar(); this.queue[i].char = char; }
                    output += `<span style="opacity: 0.5;">${char}</span>`;
                } else { output += from; }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) { this.resolve(); }
            else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
        }
        randomChar() { return this.chars[Math.floor(Math.random() * this.chars.length)]; }
    }

    const hintMessages = ["Ask me a question! ✨", "What would you like to know?", "Need help navigating? 🚀", "Explore my tech stack! 💻", "See my latest projects! 📁"];
    let hintIndex = 0;
    let hintTimeout;
    const fx = hintTextEl ? new HintScramble(hintTextEl) : null;

    function cycleHints() {
        if (!fx || isOpen) return;
        hintTimeout = setTimeout(() => {
            if (isOpen) return;
            hintTextEl.classList.add('dissolving');
            particles.createParticles(hintTextEl);
            setTimeout(() => {
                if (isOpen) return;
                hintIndex = (hintIndex + 1) % hintMessages.length;
                hintTextEl.classList.remove('dissolving');
                fx.setText(hintMessages[hintIndex]).then(() => { cycleHints(); });
            }, 500);
        }, 4000);
    }

    function showHint() {
        if (hintEl) {
            setTimeout(() => {
                if (!isOpen) { hintEl.classList.add('active'); cycleHints(); }
            }, 3000);
        }
    }

    // Observe preloader
    const wrapper = document.querySelector('.assistant-wrapper');
    if (wrapper) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && wrapper.classList.contains('visible')) { showHint(); }
            });
        });
        observer.observe(wrapper, { attributes: true });
    }

    // --- Core Interaction Functions ---
    function scrollToSection(selector) {
        if (!selector) return;
        if (selector === "body") { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        const target = document.querySelector(selector);
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }

    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isUser ? 'user' : 'bot'}`;
        msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
        bodyEl.insertBefore(msgDiv, typingIndicator);
        bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    function addOptions(options) {
        const optsDiv = document.createElement('div');
        optsDiv.className = 'chat-options';
        options.forEach((opt, index) => {
            const btn = document.createElement('div');
            btn.className = 'chat-option-chip';
            btn.innerText = opt.label;
            btn.style.animationDelay = `${index * 0.1}s`;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                optsDiv.remove();
                addMessage(opt.label, true);
                processAction(opt.action);
            });
            optsDiv.appendChild(btn);
        });
        bodyEl.insertBefore(optsDiv, typingIndicator);
        bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    async function submitInquiry() {
        const formData = new FormData();
        formData.append('access_key', 'fb0a0b88-68de-4051-ac56-e31e71a03be2');
        formData.append('email', leadData.email);
        formData.append('message', leadData.details);
        formData.append('subject', `Project Inquiry from ${leadData.email}`);
        formData.append('from_name', 'Ask Muneeb Assistant');
        try {
            const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
            if (response.ok) { processAction('success'); }
            else { addMessage("Oops! Something went wrong. You can email me directly at muneeb.rehman1754@gmail.com"); }
        } catch (error) { addMessage("Network error. Please try again later."); }
    }

    function handleUserInput() {
        const val = inputField.value.trim();
        if (!val) return;
        addMessage(val, true);
        inputField.value = '';
        inputArea.classList.remove('active');
        if (inquiryState === 'awaiting_email') {
            leadData.email = val; inquiryState = 'awaiting_details'; processAction('awaiting_details');
        } else if (inquiryState === 'awaiting_details') {
            leadData.details = val; inquiryState = 'submitting'; typingIndicator.classList.add('active'); submitInquiry();
        }
    }

    sendBtn.addEventListener('click', handleUserInput);
    inputField.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleUserInput(); });

    function processAction(actionKey) {
        typingIndicator.classList.add('active');
        bodyEl.scrollTop = bodyEl.scrollHeight;
        const data = assistantData.responses[actionKey];
        setTimeout(() => {
            typingIndicator.classList.remove('active');
            if (data) {
                addMessage(data.text);
                if (data.type === 'input') { inquiryState = data.nextState; inputArea.classList.add('active'); inputField.focus(); }
                else { if (data.options) addOptions(data.options); }
                if (data.scroll) scrollToSection(data.scroll);
            }
        }, 800);
    }

    function toggleAssistant() {
        isOpen = !isOpen;
        windowEl.classList.toggle('active', isOpen);
        if (isOpen) {
            if (hintEl) hintEl.classList.remove('active');
            clearTimeout(hintTimeout);
            if (!initialized) {
                initialized = true;
                typingIndicator.classList.add('active');
                setTimeout(() => {
                    typingIndicator.classList.remove('active');
                    addMessage(assistantData.initial.text);
                    addOptions(assistantData.initial.options);
                }, 500);
            }
        } else { showHint(); }
    }

    toggleBtn.addEventListener('click', toggleAssistant);
    headerEl.addEventListener('click', toggleAssistant);
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); isOpen = false; windowEl.classList.remove('active'); showHint();
    });
});
