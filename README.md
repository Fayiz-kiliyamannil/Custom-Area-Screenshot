<h6> Custom Area Screenshot Chrome Extension </h6>

Table of Contents

* Overview
* Features
Installation
Usage
Keyboard Shortcuts
Permissions and Why They're Needed
Development and Contributing

File Structure
Building and Testing
Potential Improvements


License

Overview
This Chrome extension allows users to capture a custom-selected area of a webpage, preview the screenshot in the extension's popup, and download it as a PNG file. It also provides keyboard shortcuts to quickly capture and download the entire visible tab area without manual selection.
The extension is built using Chrome's Manifest V3 and includes features like area selection with drag-and-drop, error handling, and storage for the last capture.
Features

Custom Area Selection: Click "Capture area" in the popup, then drag to select a region on the current tab. The selected area is captured and displayed in the popup for preview.
Preview and Download: After capture, the screenshot appears in the popup. Click "Download" to save it as a PNG file with a timestamped filename (e.g., screenshot-2025-08-20T12-00-00-000Z.png).
Full Visible Tab Capture: Use keyboard shortcuts to capture the entire visible tab and automatically download it (e.g., visible-screenshot-2025-08-20T12-00-00-000Z.png).
Error Handling: Displays messages for issues like small selections, cancellations (via Esc key), or capture failures.
Persistent Last Capture: The most recent capture is stored locally and auto-loaded in the popup for quick access.
Crosshair Cursor and Overlay: During selection, an overlay darkens the page with a crosshair cursor for precise area picking.

Installation

Download the Extension Files:

Clone or download the repository containing the extension files: manifest.json, popup.html, popup.js, content.js, background.js, and icon files (icon16.png, icon48.png, icon128.png).


Load the Extension in Chrome:

Open Chrome and navigate to chrome://extensions/.
Enable "Developer mode" in the top-right corner.
Click "Load unpacked" and select the folder containing the extension files.
The extension should now appear in your toolbar with the title "Custom Screenshot".


Optional: Publish to Chrome Web Store:

For production use, package the extension as a ZIP file and upload it to the Chrome Web Store Developer Dashboard.



Usage

Open the Popup:

Click the extension icon in the Chrome toolbar to open the popup.


Capture a Custom Area:

In the popup, click the "Capture area" button.
The page will show a darkened overlay with a crosshair cursor.
Click and drag to select the desired area.
Release the mouse to capture. (Press Esc to cancel.)
The captured screenshot will appear in the popup preview.
If the selection is too small (less than 5x5 pixels), an error message will display.


Download the Screenshot:

Once previewed, click the "Download" button in the popup.
The file will download automatically with a timestamp.


Full Visible Tab Capture:

Use the keyboard shortcuts (see below) to capture the entire visible tab and download it directly, bypassing the popup.


Error Messages:

Common messages include "Selection too small or cancelled.", "Selection cancelled", "No active tab.", or "Capture failed".
These appear in the popup for user feedback.



Keyboard Shortcuts
The extension defines two commands for capturing the full visible tab and downloading it immediately:

Ctrl+Shift+Q (or Command+Shift+Q on Mac): Capture and download with filename ending in "Q" (via capture_visible_area_Q command).
Ctrl+Shift+X (or Command+Shift+X on Mac): Capture and download with filename ending in "X" (via capture_visible_area_X command).

Note: These shortcuts can be customized in Chrome's extension settings at chrome://extensions/shortcuts.
Permissions and Why They're Needed
The extension requires the following permissions (defined in manifest.json):

tabs: To query the active tab for capture.
activeTab: To interact with the current tab during selection and capture.
scripting: To inject content.js for handling area selection on the page.
storage: To store the last capture locally for quick preview reload.
downloads: To save the screenshot files to the user's device.
Host Permissions: <all_urls>: To allow the extension to work on any webpage.

These permissions are minimal and focused on the extension's core functionality. No data is sent externally.
Development and Contributing
File Structure

manifest.json: Defines the extension's metadata, permissions, popup, background script, icons, and commands.
popup.html: The UI for the popup, including buttons, preview image, and message display.
popup.js: Handles popup logic, like button clicks, image processing with Canvas, and message listening.
content.js: Injected into the tab for area selection (overlay, drag logic, and Esc cancellation).
background.js: Service worker for handling capture requests, storing results, and downloading full tab screenshots.

Building and Testing

Use Chrome's developer tools to debug the popup (right-click in popup > Inspect) and background script (via chrome://extensions/ > Inspect views).
Test on various pages, including those with high DPI (devicePixelRatio handling is included).
Ensure icons are provided in the specified sizes.

Potential Improvements

Add options for different image formats (e.g., JPEG).
Support full-page capture (beyond visible tab).
Enhance UI with zoom or edit features in the preview.

Contributions are welcome! Fork the repository, make changes, and submit a pull request.
License
This extension is open-source and released under the MIT License (or specify your preferred license). See LICENSE file for details