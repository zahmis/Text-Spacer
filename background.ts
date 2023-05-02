chrome.contextMenus.create({
  id: "textSpacer",
  title: "Insert space between English and Japanese",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "textSpacer") {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          chrome.tabs.sendMessage(
            activeTab.id!,
            { action: "processSelectedText" },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error sending message:",
                  chrome.runtime.lastError
                );
              } else {
                console.log("Message sent successfully:", response);
              }
            }
          );
        } else {
          console.error("Active tab is undefined.");
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
});
