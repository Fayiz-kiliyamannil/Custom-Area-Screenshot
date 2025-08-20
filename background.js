chrome.runtime.onMessage.addListener((message, sender) => {
  if (message && message.type === "SELECTION_ESTABLISHED") {
    const rect = message.rect;
    chrome.tabs.captureVisibleTab({format: "png"}, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        chrome.runtime.sendMessage({ type: "ERROR", error: chrome.runtime.lastError?.message || "Capture failed" });
        return;
      }
      chrome.storage.local.set({ lastCapture: { dataUrl, rect }}, () => {
        chrome.runtime.sendMessage({ type: "CAPTURE_RESULT", dataURL, rect });
        chrome.action.openPopup().catch(() => {});
      });
    });
  }
});
