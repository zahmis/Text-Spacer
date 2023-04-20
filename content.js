function insertSpaceBetweenLanguages(text) {
  text = text.replace(
    /([a-zA-Z])([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])/g,
    "$1 $2"
  );
  text = text.replace(
    /([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([a-zA-Z0-9])/g,
    "$1 $2"
  );
  text = text.replace(
    /([a-zA-Z0-9])([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])/g,
    "$1 $2"
  );
  return text;
}

function processSelectedText() {
  const selection = window.getSelection();
  const selectedText = selection.toString();

  if (selectedText) {
    const newText = insertSpaceBetweenLanguages(selectedText);
    navigator.clipboard.writeText(newText);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "processSelectedText") {
    processSelectedText();
    sendResponse({ success: true });
  }
});
