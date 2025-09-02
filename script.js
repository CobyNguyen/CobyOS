function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Make all windows draggable
document.querySelectorAll('.window').forEach(windowEl => {
    const titleBar = windowEl.querySelector('.window-title');
    let isDragging = false, offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        // Only start dragging if not clicking the close button
        if (e.target.classList.contains('window-close')) return;
        isDragging = true;
        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;
        windowEl.style.position = 'absolute';
        windowEl.style.zIndex = 1000;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowEl.style.left = (e.clientX - offsetX) + 'px';
            windowEl.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Close button functionality
    const closeBtn = windowEl.querySelector('.window-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            windowEl.style.display = 'none';
        });
    }
});

// Open window when icon is clicked, do not close others
document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const app = icon.getAttribute('data-app');
        const win = document.getElementById(app + 'Window');
        if (win) win.style.display = 'block';
    });
});