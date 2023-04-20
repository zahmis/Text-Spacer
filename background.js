chrome.contextMenus.create({
  id: "textSpacer",
  title: "Insert space between English and Japanese",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "textSpacer") {
    try {
      chrome.tabs.sendMessage(
        tab.id,
        { action: "processSelectedText" },
        (response) => {
          if (chrome.runtime.lastError) {
          } else {
            console.log("Message sent successfully:", response);
          }
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
});

function insertSpaceBetweenLanguages(text) {
  text = text.replace(
    /([a-zA-Z])([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])/g,
    "$1 $2"
  );
  text = text.replace(
    /([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([a-zA-Z])/g,
    "$1 $2"
  );
  return text;
}
