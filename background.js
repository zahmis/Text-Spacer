chrome.contextMenus.create({
  id: "textSpacer",
  title: "Insert space between English and Japanese",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "textSpacer") {
    chrome.tabs.sendMessage(tab.id, { action: "processSelectedText" });
  }
});
