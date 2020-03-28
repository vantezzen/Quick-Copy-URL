chrome.runtime.onMessage.addListener(
  (type) => {
    chrome.browserAction.setIcon({
      path: {
        32: `../icons/${type}-32.png`,
        48: `../icons/${type}-48.png`,
      }
    });

    setTimeout(() => {
      chrome.browserAction.setIcon({
        path: {
          32: '../icons/icon-32.png',
          48: '../icons/icon-48.png',
        }
      });
    }, 500);
  }
);