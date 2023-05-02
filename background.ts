chrome.contextMenus.create({
  id: "textSpacer",
  title: "Spacer",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, _tab) => {
  if (info.menuItemId !== "textSpacer") return;

  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab) return console.error("Active tab is undefined.");

      chrome.tabs.sendMessage(
        activeTab.id!,
        { action: "processSelectedText" },
        (_response) => {
          if (chrome.runtime.lastError)
            return console.error(
              "Error runtime lastError:",
              chrome.runtime.lastError
            );

          // 成功したら、選択したテキストを表示する
          chrome.runtime.sendMessage({
            action: "updateResult",
            text: info.selectionText,
          });
        }
      );
    });
  } catch (err) {
    console.error("AddListener Error:", err);
  }
});