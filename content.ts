// web page のコンテキストで実行される

const regexPatterns = [
  /([a-zA-Z])([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])/g,
  /([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([a-zA-Z0-9])/g,
  /([a-zA-Z0-9])([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])/g,
];

function insertSpace(text: string): string {
  return regexPatterns.reduce(
    (currentText, pattern) => currentText.replace(pattern, "$1 $2"),
    text // 初期値
  );
}

function selectedText(): string {
  const selection = window.getSelection();
  const selectedText = selection?.toString();
  if (!selectedText) return "";

  const newText = insertSpace(selectedText);
  navigator.clipboard.writeText(newText);

  return newText;
}

chrome.runtime.onMessage.addListener(
  (
    request: any,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
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
  }
);

let lastSelectedText = "";
document.addEventListener("mousedown", function (event) {
  const exist = document.getElementById("TextSpacer-0.0.4");
  if (exist) exist.remove();

  lastSelectedText = window.getSelection()?.toString().trim() || "";
});

document.addEventListener("mouseup", function (event) {
  const exist = document.getElementById("TextSpacer-0.0.4");
  if (exist) return;

  // 選択範囲を取得
  const selection = window.getSelection()?.toString().trim();
  if (!selection) return;
  if (lastSelectedText === selection) return;

  const x = event?.pageX;
  const y = event?.pageY;
  if (x == null || y == null) return;

  // アイコンを作成
  const icon = document.createElement("img");
  icon.id = "TextSpacer-0.0.4";
  icon.src = chrome.runtime.getURL("configTS.png");
  icon.style.position = "absolute";
  icon.style.cursor = "pointer";
  icon.style.left = `${x - 30}px`;
  icon.style.top = `${y - 5}px`;

  document.body.appendChild(icon);

  // アイコンをクリックしたときの処理
  icon.addEventListener("click", function (event) {
    console.info("icon click");
    this.remove();
    return;
  });
});
