"use strict";
function updateResult() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        if (!activeTab)
            return console.error("Active tab is undefined.");
        chrome.tabs.sendMessage(activeTab.id, { action: "getProcessedText" }, function (response) {
            if (chrome.runtime.lastError) {
                return console.error("Error runtime lastError:", chrome.runtime.lastError);
            }
            if (response.success) {
                var resultElement = document.getElementById("result");
                if (resultElement && response.processedText)
                    resultElement.innerHTML = response.processedText.replace(/\n/g, "<br>");
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", updateResult);
