/**
 * Quick Copy URL Browser Extension.
 * Quickly copy the URL of your current tab with a click.
 *
 * @copyright   Copyright vantezzen (https://github.com/vantezzen)
 * @link        https://github.com/vantezzen/quick-copy-url
 * @license     https://opensource.org/licenses/mit-license.php MIT License
 */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
  const currentUrl = tabs[0].url;

  let status = "failed";
  for (let i = 0; i < 10; i++) {
    try {
      await navigator.clipboard.writeText(currentUrl);
      status = "success";
      break;
    } catch (e) {
      // Extension popup needs to be focused for clipboard access
      // This might take a few milliseconds for the browser to do
      await wait(100);
    }
  }

  chrome.runtime.sendMessage(status);
  window.close();
});
