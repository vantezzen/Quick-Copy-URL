/**
 * Quick Copy URL Browser Extension.
 * Quickly copy the URL of your current tab with a click.
 * 
 * @copyright   Copyright vantezzen (https://github.com/vantezzen)
 * @link        https://github.com/vantezzen/quick-copy-url
 * @license     https://opensource.org/licenses/mit-license.php MIT License
 */
const copyURL = (sendResponse) => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      sendResponse('success');
      console.debug('[Quick Copy URL] Text copied to clipboard');
    })
    .catch(err => {
      sendResponse('failed');
      console.debug('[Quick Copy URL] Could not copy text: ', err);
    });
}

chrome.runtime.onMessage.addListener((type, s, sendResponse) => {
  if (type === "copy") {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      // Firefox doesn't have clipboard-write permission - directly try to copy
      copyURL(sendResponse);
    } else {
      // Get clipboard write permissions
      navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
          copyURL(sendResponse);
        } else {
          sendResponse('failed');
          // User has not granted access to the clipboard - abort
          console.debug('[Quick Copy URL] Cannot use clipboard');
        }
      });
    }
    return true;
  }
})