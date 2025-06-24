const checkbox = document.getElementById("toggleSidebar");

      chrome.storage.sync.get("hideSidebar", ({ hideSidebar }) => {
        checkbox.checked = hideSidebar ?? false;
      });

      checkbox.addEventListener("change", async (e) => {
        const value = e.target.checked;

        chrome.storage.sync.set({ hideSidebar: value }, () => {
          if (chrome.runtime.lastError) {
            console.error("Storage error:", chrome.runtime.lastError);
          } else {
            toggleSidebar(value);
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