// Project Carousel Logic - Seamless Infinite Loop
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const container = document.querySelector('.carousel-container');
    if (!track || !container) return;

    // Original items
    const originalItems = Array.from(track.children);
    const itemCount = originalItems.length;
    
    // Clone items for seamless loop
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        track.insertBefore(clone, track.firstChild);
    });

    const items = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    let currentIndex = itemCount; // Start at the first original item
    let isTransitioning = false;
    let autoPlayInterval;
    const autoPlaySpeed = 4000;

    // Create indicators (based on original items)
    originalItems.forEach((_, i) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            if (isTransitioning) return;
            moveToItem(i + itemCount);
            resetAutoPlay();
        });
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = Array.from(indicatorsContainer.children);

    const updateIndicators = (index) => {
        const realIndex = (index - itemCount + itemCount) % itemCount;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === realIndex);
        });
    };

    const moveToItem = (index, animate = true) => {
        if (animate) {
            isTransitioning = true;
            track.style.transition = 'transform 1s cubic-bezier(0.6, 0, 0.4, 1)';
        } else {
            track.style.transition = 'none';
        }

        const itemWidth = originalItems[0].getBoundingClientRect().width + 30;
        track.style.transform = `translateX(-${index * itemWidth}px)`;
        currentIndex = index;
        updateIndicators(index);
    };

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        // Seamless jump at boundaries
        if (currentIndex >= itemCount * 2) {
            moveToItem(itemCount, false);
        } else if (currentIndex < itemCount) {
            moveToItem(itemCount * 2 - 1, false);
        }
    });

    const nextSlide = () => {
        if (isTransitioning) return;
        moveToItem(currentIndex + 1);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        moveToItem(currentIndex - 1);
    };

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    const startAutoPlay = () => {
        autoPlayInterval = setInterval(nextSlide, autoPlaySpeed);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    const resetAutoPlay = () => {
        stopAutoPlay();
        startAutoPlay();
    };

    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    window.addEventListener('resize', () => {
        moveToItem(currentIndex, false);
    });

    // Initial position
    moveToItem(currentIndex, false);
    startAutoPlay();
});
