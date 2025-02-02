chrome.commands.onCommand.addListener((command) => {
  if (command === "copy_url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: (url) => {
          navigator.clipboard
            .writeText(url)
            .then(() => {
              const toast = document.createElement("div");
              toast.textContent = "Copied: " + url;

              toast.style.position = "fixed";
              toast.style.top = "10px";
              toast.style.right = "10px";
              toast.style.padding = "8px 12px";
              toast.style.backgroundColor = "#0a2cef";
              toast.style.color = "#fff";
              toast.style.borderRadius = "4px";
              toast.style.fontSize = "14px";
              toast.style.zIndex = 9999;
              toast.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";

              document.body.appendChild(toast);

              setTimeout(() => {
                toast.remove();
              }, 2000);
            })
            .catch((err) => {
              console.error("Failed to copy URL:", err);
            });
        },
        args: [activeTab.url],
      });
    });
  }
});
