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
