interface ProcessedTextResponse {
  success: boolean;
  processedText?: string;
}

function updateResult(): void {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab) return console.error("Active tab is undefined.");

    chrome.tabs.sendMessage(
      activeTab.id!,
      { action: "getProcessedText" },
      (response: ProcessedTextResponse) => {
        if (chrome.runtime.lastError) {
          return console.error(
            "Error runtime lastError:",
            chrome.runtime.lastError
          );
        }

        if (response.success) {
          const resultElement = document.getElementById("result");
          if (resultElement && response.processedText)
            resultElement.innerHTML = response.processedText.replace(
              /\n/g,
              "<br>"
            );
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", updateResult);
