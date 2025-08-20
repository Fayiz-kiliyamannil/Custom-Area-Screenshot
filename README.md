# Custom Area Screenshot – Chrome Extension

## 📑 Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Keyboard Shortcuts](#keyboard-shortcuts)  
6. [Permissions and Why They're Needed](#permissions-and-why-theyre-needed)  
7. [Development and Contributing](#development-and-contributing)  
8. [File Structure](#file-structure)  
9. [Building and Testing](#building-and-testing)  
10. [Potential Improvements](#potential-improvements)  
11. [License](#license)  

---

## 1. Overview  
This Chrome extension allows users to:  
- Capture a **custom-selected area** of a webpage.  
- Preview the screenshot in the extension popup.  
- Download it as a PNG file.  

It also supports:  
- **Keyboard shortcuts** for capturing the entire visible tab instantly.  
- **Persistent storage** for last captured screenshot.  
- Built with **Chrome Manifest V3**.  

---

## 2. Features  
1. **Custom Area Selection** – Drag and select a region of the page to capture.  
2. **Preview & Download** – Captured screenshot is previewed in popup and downloadable as a PNG.  
3. **Full Visible Tab Capture** – Capture entire visible tab via shortcuts.  
4. **Error Handling** – Messages for small selections, cancellations (Esc), or failures.  
5. **Persistent Last Capture** – Last screenshot is auto-loaded in popup.  
6. **Crosshair Cursor & Overlay** – Dark overlay and crosshair cursor for precise selection.  

---

## 3. Installation  

### 🔹 Download the Extension Files  
- Clone or download repository with:  
  - `manifest.json`  
  - `popup.html`  
  - `popup.js`  
  - `content.js`  
  - `background.js`  
  - `icon16.png`, `icon48.png`, `icon128.png`  

### 🔹 Load into Chrome  
1. Open **`chrome://extensions/`**  
2. Enable **Developer mode**  
3. Click **Load unpacked** → Select extension folder  
4. Extension will appear in toolbar as **"Custom Screenshot"**  

### 🔹 Optional: Publish to Chrome Web Store  
- Package as ZIP and upload via **Chrome Web Store Developer Dashboard**  

---

## 4. Usage  

1. **Open Popup** → Click extension icon.  
2. **Capture Area** → Click "Capture area", drag to select, release mouse.  
   - Press **Esc** to cancel.  
   - If too small (<5x5 px), error message shows.  
3. **Download Screenshot** → Click "Download" (auto-saved with timestamp).  
4. **Full Visible Tab Capture** → Use shortcuts (see next section).  
5. **Error Messages**:  
   - `"Selection too small or cancelled."`  
   - `"Selection cancelled"`  
   - `"No active tab."`  
   - `"Capture failed"`  

---

## 5. Keyboard Shortcuts  

1. **Ctrl+Shift+Q** (Mac: **Cmd+Shift+Q**)  
   - Capture & download with filename ending in `Q`.  
2. **Ctrl+Shift+X** (Mac: **Cmd+Shift+X**)  
   - Capture & download with filename ending in `X`.  

👉 Shortcuts can be customized at **`chrome://extensions/shortcuts`**  

---

## 6. Permissions and Why They’re Needed  

- **`tabs`** → Query active tab for capture.  
- **`activeTab`** → Interact with current tab.  
- **`scripting`** → Inject `content.js` for selection.  
- **`storage`** → Save last capture locally.  
- **`downloads`** → Save files to device.  
- **`<all_urls>`** → Work on any webpage.  

⚠️ No external data is sent. Permissions are minimal & essential.  

---

## 7. Development and Contributing  

- Fork repo → Make changes → Submit PR.  
- Debugging:  
  - **Popup** → Right-click popup → Inspect.  
  - **Background script** → Inspect from `chrome://extensions/`.  

---

## 8. File Structure  

```
/Custom-Area-Screenshot
 ├── manifest.json       # Extension metadata & permissions
 ├── popup.html          # Popup UI
 ├── popup.js            # Popup logic
 ├── content.js          # Handles area selection
 ├── background.js       # Service worker (capture, downloads)
 ├── icons/              # icon16.png, icon48.png, icon128.png
```

---

## 9. Building and Testing  

- Use Chrome DevTools for debugging.  
- Test on multiple pages & high DPI screens.  
- Provide required icons in all sizes.  

---

## 10. Potential Improvements  

- [ ] Add JPEG & other image formats.  
- [ ] Support full-page (scrollable) capture.  
- [ ] Add zoom/edit features in preview UI.  

---

## 11. License  

📜 Open-source under **MIT License**.  
See [LICENSE](./LICENSE) for details.  
