chrome.contextMenus.create({
  id: "textSpacer",
  title: "Text Spacer",
  contexts: ["selection"],
});

// メニューを右クリックの特定の項目(Text Spacer)を押したときの処理
chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId !== "textSpacer")
    return console.error("Back Error: Invalid menu id.");

  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab == null)
        return console.error("Back Error: Active tab is null.");

      // content.tsにメッセージを送信
      chrome.tabs.sendMessage(
        activeTab.id!,
        { action: "processSelectedText" },
        () => {
          if (chrome.runtime.lastError) {
            return console.error(
              "Back Runtime lastError:",
              chrome.runtime.lastError
            );
          }
        }
      );
    });
  } catch (err) {
    console.error("Back AddListener Error:", err);
  }
});

//
