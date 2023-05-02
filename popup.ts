chrome.runtime.onMessage.addListener(
  (
    request: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log(request, 2);
    if (request.action === "updateResult") {
      const resultElement = document.getElementById("result");
      if (resultElement) {
        resultElement.textContent = request.text;
      }
    }
  }
);
