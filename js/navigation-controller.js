// Navigation Controller
document.addEventListener('DOMContentLoaded', () => {
    const dock = window.macOSDock;
    const curveMenu = window.curveMenu;

    if (!dock || !curveMenu) return;

    let currentSection = null;

    // Add click listeners to dock icons
    dock.icons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const targetSelector = icon.dataset.target; // e.g. #build
            if (!targetSelector) return;

            dock.setActive(targetSelector.replace('#', ''));

            if (!curveMenu.isOpen) {
                currentSection = targetSelector;
                curveMenu.open(targetSelector);
            } else if (currentSection !== targetSelector) {
                currentSection = targetSelector;
                curveMenu.switchContent(targetSelector);
            }
        });
    });

    // Close button listener
    if (curveMenu.closeBtn) {
        curveMenu.closeBtn.addEventListener('click', () => {
            curveMenu.close();
            dock.setActive(null);
            currentSection = null;
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && curveMenu.isOpen) {
            curveMenu.close();
            dock.setActive(null);
            currentSection = null;
        }
    });
});
