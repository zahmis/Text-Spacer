// 全体の処理
// 拡張機能ロード時の初回実行

chrome.contextMenus.create({
  id: "textSpacer",
  title: "Spacer",
  contexts: ["selection"],
});

// メニューを右クリックの特定の項目(Text Spacer)を押したときの処理
chrome.contextMenus.onClicked.addListener(async (info, _tab) => {
  if (info.menuItemId !== "textSpacer")
    return console.error("Back Error: Invalid menu id.");

  try {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab == null)
        return console.error("Back Error: Active tab is null.");

      chrome.tabs.sendMessage(
        activeTab.id!,
        { action: "processSelectedText" },
        (response) => {
          if (chrome.runtime.lastError)
            return console.error(
              "Back Runtime lastError:",
              chrome.runtime.lastError
            );

          // 成功したら、選択したテキストを表示する
          chrome.runtime.sendMessage({
            action: "updateResult",
            text: response.processedText,
          });
        }
      );
    });
  } catch (err) {
    console.error("Back AddListener Error:", err);
  }
});

//
