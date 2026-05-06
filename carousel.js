// Project Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const items = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentIndex = 0;

    // Create indicators
    items.forEach((_, i) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => moveToItem(i));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = Array.from(indicatorsContainer.children);

    const updateIndicators = (index) => {
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    };

    const moveToItem = (index) => {
        const itemWidth = items[0].getBoundingClientRect().width + 30; // Width + Gap
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        currentIndex = index;
        updateIndicators(index);
        
        // Disable/Enable buttons
        prevButton.style.opacity = index === 0 ? '0.5' : '1';
        prevButton.style.pointerEvents = index === 0 ? 'none' : 'auto';
        
        const visibleItems = getVisibleItemsCount();
        const isEnd = index >= items.length - visibleItems;
        nextButton.style.opacity = isEnd ? '0.5' : '1';
        nextButton.style.pointerEvents = isEnd ? 'none' : 'auto';
    };

    const getVisibleItemsCount = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };

    nextButton.addEventListener('click', () => {
        const visibleItems = getVisibleItemsCount();
        if (currentIndex < items.length - visibleItems) {
            moveToItem(currentIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToItem(currentIndex - 1);
        }
    });

    // Handle Window Resize
    window.addEventListener('resize', () => moveToItem(currentIndex));

    // Initial state
    moveToItem(0);
});
