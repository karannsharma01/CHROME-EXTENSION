chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      const website = new URL(changeInfo.url).hostname;
      chrome.storage.local.get([website], (data) => {
        const timeSpent = data[website] || 0;
        chrome.storage.local.set({ [website]: timeSpent + 1 });
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getTrackedData") {
      chrome.storage.local.get(null, (data) => sendResponse(data));
      return true; // Keep the message channel open for async response
    }
  });
  