/**
 * Quick Copy URL Browser Extension.
 * Quickly copy the URL of your current tab with a click.
 * 
 * @copyright   Copyright vantezzen (https://github.com/vantezzen)
 * @link        https://github.com/vantezzen/quick-copy-url
 * @license     https://opensource.org/licenses/mit-license.php MIT License
 */
chrome.runtime.sendMessage('copy');
window.close();
