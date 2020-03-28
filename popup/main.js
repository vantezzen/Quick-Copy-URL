/**
 * Quick Copy URL Browser Extension.
 * Quickly copy the URL of your current tab with a click.
 * 
 * @copyright   Copyright vantezzen (https://github.com/vantezzen)
 * @link        https://github.com/vantezzen/quick-copy-url
 * @license     https://opensource.org/licenses/mit-license.php MIT License
 */
const copyUrlToClipboard = () => {
  // Get current page url
  chrome.tabs.query({currentWindow: true, active: true}, tabs => {
    // Get domain of current tab
    const url = tabs[0].url;
    
    // Copy URL to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        chrome.runtime.sendMessage('success');
        console.debug('Text copied to clipboard');

        window.close();
      })
      .catch(err => {
        chrome.runtime.sendMessage('failed');
        console.debug('Could not copy text: ', err);

        window.close();
      });
  });
}

if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
  // Firefox doesn't have clipboard-write permission - directly try to copy
  copyUrlToClipboard();
} else {
  // Get clipboard write permissions
  navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      copyUrlToClipboard();
    } else {
      chrome.runtime.sendMessage('failed');
      // User has not granted access to the clipboard - abort
      console.debug('Cannot use clipboard');
  
      window.close();
    }
  });
}