const setIcon = (type) => {
  chrome.browserAction.setIcon({
    path: {
      32: `../icons/${type}-32.png`,
      48: `../icons/${type}-48.png`,
    }
  });
};

const animateIcon = (type) => {
  if (type !== 'success' && type !== 'failed') {
    console.debug(`Invalid icon animation "${type}".`);
    return;
  }

  // Animate in
  setIcon(`${type}/1`);
  setTimeout(() => {
    setIcon(`${type}/2`);
  }, 50);
  setTimeout(() => {
    setIcon(`${type}/3`);
  }, 100);

  // Animate out
  setTimeout(() => {
    setIcon(`${type}/2`);
  }, 450);
  setTimeout(() => {
    setIcon(`${type}/1`);
  }, 500);
  setTimeout(() => {
    setIcon('icon');
  }, 550);
}

const copyUrlToClipboard = () => {
  // Get current page url
  chrome.tabs.query({currentWindow: true, active: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, 'copy', (type) => {
      if (type) {
        animateIcon(type);
      } else {
        animateIcon('failed');
      }
    });
  });
}

chrome.runtime.onMessage.addListener(
  (type) => {
    if (type === "copy") {
      copyUrlToClipboard();
    } else {
      animateIcon(type);
    }
  }
);

chrome.commands.onCommand.addListener(function (command) {
  if (command === "copy-url") {
    console.log("Received shortcut");
    copyUrlToClipboard();
  }
});

window.onerror = () => {
  animateIcon('failed');
}