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

let lastSelectedText = "";
function selectedText(): string {
  const selection = window.getSelection();
  const selectedText = selection?.toString();

  let newText = "";
  if (!selectedText) {
    newText = insertSpace(lastSelectedText);
    navigator.clipboard.writeText(newText);
    return newText;
  }

  newText = insertSpace(selectedText);
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

document.addEventListener("mousedown", () => {
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

  // アイコンを作成
  const icon = document.createElement("img");
  icon.id = "TextSpacer-0.0.4";
  icon.src = chrome.runtime.getURL("configTS.svg");
  icon.style.position = "absolute";
  icon.style.cursor = "pointer";
  icon.style.left = `${x - 30}px`;
  icon.style.top = `${y - 5}px`;

  document.body.appendChild(icon);

  icon.addEventListener("mousedown", () => {
    console.log("mousedown");
    selectedText();
  });
});
