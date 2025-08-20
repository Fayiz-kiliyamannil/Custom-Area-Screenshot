chrome.runtime.onMessage.addListener((message, sender) => {
    if (message && message.type === "SELECTION_ESTABLISHED") {
      const rect = message.rect;
      chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          chrome.runtime.sendMessage({
            type: "ERROR",
            error: chrome.runtime.lastError?.message || "Capture failed",
          });
          return;
        }

        chrome.storage.local.set({ lastCapture: { dataUrl, rect } }, () => {
          chrome.runtime.sendMessage({ type: "CAPTURE_RESULT", dataUrl, rect });
  
          if (chrome.action.openPopup) {
            chrome.action.openPopup().catch(() => {});
          }
        });
      });
    }

    if (message && message.type === "CAPTURE_VISIBLE_REQUEST") {
      captureVisibleAndDownload();
    }
  });

  chrome.commands.onCommand.addListener((command) => {
    console.log("command recieved", command);
    if (command === "capture_visible_area_Q"|| command === "capture_visible_area_X") {
      captureVisibleAndDownload();
    }
  });

  function captureVisibleAndDownload() {
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) return;
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      chrome.downloads.download({
        url: dataUrl,
        filename: `visible-screenshot-${timestamp}.png`,
      });
    });
  }
  