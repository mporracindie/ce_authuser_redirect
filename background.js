chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    tab.url.includes("cloud.google.com") &&
    changeInfo.status === "complete"
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: modifyUrl,
    });
  }
});

function modifyUrl() {
  if (document.body.innerText.includes("No se pudo cargar la página.")) {
    const newUrl = window.location.href.includes("?")
      ? window.location.href + "&authuser=1"
      : window.location.href + "?authuser=1";
    window.location.href = newUrl;
  }
}
