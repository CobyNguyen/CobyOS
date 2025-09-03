document.addEventListener('DOMContentLoaded', function() {
  // Preview on hover for any preview-link
  const previewBox = document.getElementById('previewBox');
  const previewImg = document.getElementById('previewImg');
  document.querySelectorAll('.preview-link').forEach(function(link) {
    link.addEventListener('mouseover', function(e) {
      previewImg.src = link.getAttribute('data-preview');
      previewBox.style.display = 'block';
      previewBox.style.left = e.pageX + 20 + 'px';
      previewBox.style.top = e.pageY + 20 + 'px';
    });
    link.addEventListener('mousemove', function(e) {
      previewBox.style.left = e.pageX + 20 + 'px';
      previewBox.style.top = e.pageY + 20 + 'px';
    });
    link.addEventListener('mouseout', function() {
      previewBox.style.display = 'none';
      previewImg.src = '';
    });
  });

  function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  let topZIndex = 1; // Initialize a variable to keep track of the top z-index

  // Make all windows draggable
  document.querySelectorAll('.window').forEach(function(windowEl) {
    const titleBar = windowEl.querySelector('.window-title');
    let isDragging = false, offsetX, offsetY;

    titleBar.addEventListener('mousedown', function(e) {
      // Only start dragging if not clicking the close button
      if (e.target.classList.contains('window-close')) return;
      isDragging = true;
      offsetX = e.clientX - windowEl.offsetLeft;
      offsetY = e.clientY - windowEl.offsetTop;
      windowEl.style.position = 'absolute';
      windowEl.style.zIndex = 1000;

      topZIndex++; // Increase the z-index when dragging
      windowEl.style.zIndex = topZIndex;
    });

    document.addEventListener('mousemove', function(e) {
      if (isDragging) {
        windowEl.style.left = (e.clientX - offsetX) + 'px';
        windowEl.style.top = (e.clientY - offsetY) + 'px';
      }
    });

    document.addEventListener('mouseup', function() {
      isDragging = false;
    });

    // Close button functionality
    const closeBtn = windowEl.querySelector('.window-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        windowEl.style.display = 'none';
      });
    }
  });

  // Open window when icon is clicked, do not close others
  document.querySelectorAll('.desktop-icon').forEach(function(icon) {
    icon.addEventListener('click', function() {
      const app = icon.getAttribute('data-app');
      const win = document.getElementById(app + 'Window');
      if (win) {
        win.style.display = 'block';
        topZIndex++;
        win.style.zIndex = topZIndex;
      }
    });
  });

  document.querySelectorAll('.popup-link').forEach(function(link) {
    link.addEventListener('click', function() {
      const winId = link.getAttribute('data-window');
      const win = document.getElementById(winId);
      if (win) {
        win.style.display = 'block';
        topZIndex++;
        win.style.zIndex = topZIndex;
      }
    });
  });
});