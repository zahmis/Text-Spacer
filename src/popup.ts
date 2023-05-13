import { SendMessageResponse } from "./types";

const updatePopup = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab == null)
      return console.error("Popup Error: Active tab is null.");

    if (activeTab.id == null)
      return console.error("Popup Error: Active id is null.");

    chrome.tabs.sendMessage(
      activeTab.id,
      { action: "getProcessedText" },
      (response: SendMessageResponse) => {
        if (chrome.runtime.lastError) {
          return console.error(
            "Popup Runtime lastError:",
            chrome.runtime.lastError
          );
        }
        if (!response.isSentMessage)
          return console.error("Popup Error: Response Failed.");

        const resultElement = document.getElementById("result");
        if (!resultElement)
          return console.error("Popup Error: result element is null.");

        if (!response.processedText)
          return console.error("Popup Error: processedText is null.");

        resultElement.innerHTML = response.processedText.replace(/\n/g, "<br>");
      }
    );
  });
};

// 画面を開いたときに実行される
document.addEventListener("DOMContentLoaded", updatePopup);
