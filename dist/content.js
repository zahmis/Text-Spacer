"use strict";
// web page のコンテキストで実行される
var regexPatterns = [
    /([a-zA-Z])([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])/g,
    /([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([a-zA-Z0-9])/g,
    /([a-zA-Z0-9])([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])/g,
];
function insertSpace(text) {
    return regexPatterns.reduce(function (currentText, pattern) { return currentText.replace(pattern, "$1 $2"); }, text // 初期値
    );
}
function selectedText() {
    var selection = window.getSelection();
    var selectedText = selection === null || selection === void 0 ? void 0 : selection.toString();
    if (!selectedText)
        return "";
    var newText = insertSpace(selectedText);
    navigator.clipboard.writeText(newText);
    return newText;
}
chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
    switch (request.action) {
        case "processSelectedText":
            sendResponse({ success: true, processedText: selectedText() });
            break;
        case "getProcessedText":
            sendResponse({ success: true, processedText: selectedText() });
            break;
        default:
            sendResponse({ success: false });
    }
});
var lastSelectedText = "";
document.addEventListener("mousedown", function (event) {
    var _a;
    var exist = document.getElementById("TextSpacer-0.0.4");
    if (exist)
        exist.remove();
    lastSelectedText = ((_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().trim()) || "";
});
document.addEventListener("mouseup", function (event) {
    var _a;
    var exist = document.getElementById("TextSpacer-0.0.4");
    if (exist)
        return;
    // 選択範囲を取得
    var selection = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().trim();
    if (!selection)
        return;
    if (lastSelectedText === selection)
        return;
    var x = event === null || event === void 0 ? void 0 : event.pageX;
    var y = event === null || event === void 0 ? void 0 : event.pageY;
    if (x == null || y == null)
        return;
    // アイコンを作成
    var icon = document.createElement("img");
    icon.id = "TextSpacer-0.0.4";
    icon.src = chrome.runtime.getURL("configTS.png");
    icon.style.position = "absolute";
    icon.style.cursor = "pointer";
    icon.style.left = "".concat(x - 30, "px");
    icon.style.top = "".concat(y - 5, "px");
    document.body.appendChild(icon);
    // アイコンをクリックしたときの処理
    icon.addEventListener("click", function (event) {
        console.info("icon click");
        this.remove();
        return;
    });
});
