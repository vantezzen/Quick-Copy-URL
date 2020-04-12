const setIcon = (type) => {
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
};

const copyUrlToClipboard = () => {
  // Get current page url
  try {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
      console.log('TABS', tabs);
      chrome.tabs.sendMessage(tabs[0].id, 'copy', (type) => {
        if (type) {
          setIcon(type);
        }
      });
    });
  } catch (e) {
    console.debug('Could not copy URL', e);
    setIcon('failed');
  }
}

chrome.runtime.onMessage.addListener(
  (type) => {
    if (type === "copy") {
      copyUrlToClipboard();
    } else {
      setIcon(type);
    }
  }
);

chrome.commands.onCommand.addListener(function (command) {
  if (command === "copy-url") {
    console.log("Received shortcut");
    copyUrlToClipboard();
  }
});