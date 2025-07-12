const sidebarCheckbox = document.getElementById("toggleSidebar");
const commentsCheckbox = document.getElementById("toggleComments");

chrome.storage.sync.get(["hideSidebar", "hideComments"],({ hideSidebar, hideComments }) => {
    sidebarCheckbox.checked = hideSidebar ?? false;
    commentsCheckbox.checked = hideComments ?? false;

    toggleSidebar(hideSidebar);
    toggleComments(hideComments);
  }
);

sidebarCheckbox.addEventListener("change", (e) => {
  const value = e.target.checked;
  chrome.storage.sync.set({ hideSidebar: value }, () => {
    if (chrome.runtime.lastError) {
      console.error("Storage error:", chrome.runtime.lastError);
    } else {
      toggleSidebar(value);
    }
  });
});

commentsCheckbox.addEventListener("change", (e) => {
  const value = e.target.checked;
  chrome.storage.sync.set({ hideComments: value }, () => {
    if (chrome.runtime.lastError) {
      console.error("Storage error:", chrome.runtime.lastError);
    } else {
      toggleComments(value);
    }
  });
});

async function toggleSidebar(isHidden) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (hidden) => {
      const sidebar = document.querySelector(
        "ytd-watch-next-secondary-results-renderer"
      );
      if (sidebar) {
        sidebar.style.display = hidden ? "none" : "block";
      }
    },
    args: [isHidden],
  });
}

async function toggleComments(isHidden) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (hidden) => {
      const comments = document.querySelector("#comments");
      if (comments) {
        comments.style.display = hidden ? "none" : "block";
      }
    },
    args: [isHidden],
  });
}
