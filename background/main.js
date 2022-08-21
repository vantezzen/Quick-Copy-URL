const setIcon = (type) => {
  chrome.browserAction.setIcon({
    path: {
      32: `../icons/${type}-32.png`,
      48: `../icons/${type}-48.png`,
    },
  });
};

const animateIcon = (type) => {
  if (type !== "success" && type !== "failed") {
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
    setIcon("icon");
  }, 550);
};

chrome.runtime.onMessage.addListener((type) => {
  animateIcon(type);
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "copy-url") {
    console.log("Received shortcut");
    chrome.browserAction.openPopup();
  }
});

window.onerror = () => {
  animateIcon("failed");
};
