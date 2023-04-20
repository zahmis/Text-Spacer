chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request, 2);
  if (request.action === "updateResult") {
    document.getElementById("result").textContent = request.text;
  }
});
