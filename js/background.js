/**
 * @fileoverview Initializes the extension.
 *
 * @author Donald King <chronos@chronos-tachyon.net>
 */

var active;

function set(newActive) {
  if (active !== newActive) {
    active = newActive;
    chrome.storage.local.set({active: newActive});
  }
}

function react() {
  if (active) {
    chrome.browserAction.setBadgeText({text: chrome.i18n.getMessage("on")});
    chrome.browserAction.setBadgeBackgroundColor({color: [255,0,0,255]});
    chrome.proxy.settings.set({value: {mode: "direct"}});
  } else {
    chrome.browserAction.setBadgeText({text: chrome.i18n.getMessage("off")});
    chrome.browserAction.setBadgeBackgroundColor({color: [0,255,0,255]});
    chrome.proxy.settings.clear({});
  }
}

chrome.browserAction.onClicked.addListener(function () {
  set(!active);
  react();
});

chrome.storage.local.get({active: false}, function (result) {
  set(result.active);
  react();
});
