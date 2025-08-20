(() => {
  if (window.__custom_screenshot_active) return;
  window.__custom_screenshot_active = true;

  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: 2147483647,
    cursor: 'crosshair',
    background: 'rgba(0,0,0,0.15)'
  });
  document.documentElement.appendChild(overlay);

  const selection = document.createElement('div');
  Object.assign(selection.style, {
    position: 'fixed',
    border: '2px dashed #fff',
    background: 'rgba(255,255,255,0.0)',
    zIndex: 2147483648,
    display: 'none',
    pointerEvents: 'none'
  });
  document.documentElement.appendChild(selection);

  let startX = 0, startY = 0, dragging = false;

  function toDevicePixels(value) {
    return Math.round(value * window.devicePixelRatio);
  }

  overlay.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    dragging = true;
    selection.style.left = `${startX}px`;
    selection.style.top = `${startY}px`;
    selection.style.width = '0px';
    selection.style.height = '0px';
    selection.style.display = 'block';
  });

  overlay.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const curX = e.clientX;
    const curY = e.clientY;
    const x = Math.min(startX, curX);
    const y = Math.min(startY, curY);
    const w = Math.abs(curX - startX);
    const h = Math.abs(curY - startY);
    selection.style.left = `${x}px`;
    selection.style.top = `${y}px`;
    selection.style.width = `${w}px`;
    selection.style.height = `${h}px`;
  });

  function finishSelection(e) {
    if (!dragging) return;
    dragging = false;
    selection.style.display = 'none';
    overlay.parentNode.removeChild(overlay);
    selection.parentNode.removeChild(selection);
    window.__custom_screenshot_active = false;

    const endX = e.clientX;
    const endY = e.clientY;
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const w = Math.abs(endX - startX);
    const h = Math.abs(endY - startY);

    // minimum size
    if (w < 5 || h < 5) {
      chrome.runtime.sendMessage({ type: "ERROR", error: "Selection too small or cancelled." });
      return;
    }

    const rect = {
      x: Math.round(x),
      y: Math.round(y),
      width: Math.round(w),
      height: Math.round(h),
      devicePixelRatio: window.devicePixelRatio || 1
    };
    chrome.runtime.sendMessage({ type: "SELECTION_ESTABLISHED", rect });
  }

  overlay.addEventListener('mouseup', finishSelection);
  overlay.addEventListener('mouseleave', (e) => {
    if (dragging) finishSelection(e);
  });

  // esc key cancel
  function onKey(e) {
    if (e.key === "Escape") {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (selection && selection.parentNode) selection.parentNode.removeChild(selection);
      window.__custom_screenshot_active = false;
      window.removeEventListener('keydown', onKey);
      chrome.runtime.sendMessage({ type: "ERROR", error: "Selection cancelled" });
    }
  }
  window.addEventListener('keydown', onKey);
})();
