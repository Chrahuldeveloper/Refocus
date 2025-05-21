// document.getElementById("toggle-switch").addEventListener("change", async (e) => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: toggleSidebar,
//     args: [e.target.checked],
//   });
// });

// function toggleSidebar(isHidden) {
//   const sidebar = document.querySelector("ytd-watch-next-secondary-results-renderer");
//   if (sidebar) {
//     sidebar.style.display = isHidden ? "none" : "block";
//   }
// }
