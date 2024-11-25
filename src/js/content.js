import { filters, svgFilters } from './filters.js';
import { getStorageData } from './storage.js';

// Insert SVG filters into the page
document.body.insertAdjacentHTML('beforeend', svgFilters);

// Initialize extension state
let currentMode = 'normal';
let isEnabled = true;

// Apply color vision filter to the page
function applyFilter(mode) {
  if (!isEnabled) {
    document.documentElement.style.filter = '';
    return;
  }
  document.documentElement.style.filter = filters[mode];
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateMode') {
    currentMode = request.mode;
    applyFilter(currentMode);
  } else if (request.action === 'toggleSite') {
    isEnabled = request.enabled;
    applyFilter(currentMode);
  }
});

// Initialize with stored settings
async function init() {
  const { mode, siteSettings } = await getStorageData(['mode', 'siteSettings']);
  const hostname = window.location.hostname;
  currentMode = mode || 'normal';
  isEnabled = siteSettings?.[hostname] ?? true;
  applyFilter(currentMode);
}

init();