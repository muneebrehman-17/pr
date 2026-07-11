// js/fun-facts.js
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.fun-count');
    const speed = 200; 

    const startCounting = (counter) => {
        const targetAttr = counter.getAttribute('data-target');
        if(!targetAttr) return; // For infinity symbol card

        const target = +targetAttr;
        const count = +counter.innerText.replace(/,/g, '');
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc).toLocaleString();
            setTimeout(() => startCounting(counter), 20);
        } else {
            counter.innerText = target >= 100000 ? (target / 1000).toLocaleString() + 'K' : target.toLocaleString();
        }
    };

    const funObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        funObserver.observe(counter);
    });
});
