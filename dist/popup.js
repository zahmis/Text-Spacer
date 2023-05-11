"use strict";
function updateResult() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        if (activeTab == null)
            return console.error("Popup Error: Active tab is null.");
        if (activeTab.id == null)
            return console.error("Popup Error: Active id is null.");
        chrome.tabs.sendMessage(activeTab.id, { action: "getProcessedText" }, function (response) {
            if (chrome.runtime.lastError) {
                return console.error("Popup Runtime lastError:", chrome.runtime.lastError);
            }
            if (!response.success)
                return console.error("Popup Error: Response Failed.");
            var resultElement = document.getElementById("result");
            if (!resultElement)
                return console.error("Popup Error: result element is null.");
            if (!response.processedText)
                return console.error("Popup Error: processedText is null.");
            resultElement.innerHTML = response.processedText.replace(/\n/g, "<br>");
        });
    });
}
document.addEventListener("DOMContentLoaded", updateResult);
