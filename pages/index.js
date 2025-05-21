"use client";
import { useState, useEffect } from "react";

export default function Popup() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("hideSidebar", ({ hideSidebar }) => {
      setChecked(hideSidebar ?? false);
    });
  });

  const toggleSidebar = async (isHidden) => {
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
  };

  const onToggle = (value) => {
    setChecked(value);
    chrome.storage.sync.set({ hideSidebar: value });
    toggleSidebar(value);
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="logo">
            <span className="logo-icon" />
            FocusTube
          </div>
          <span className="settings-icon" />
        </div>

        <div>
          <div className="section-title">Hide Recommendations</div>
          <div className="section-description">
            Toggle to remove sidebar distractions on YouTube
          </div>

          <label className="toggleswitch" id="toggle-switch">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onToggle(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <hr style={{ margin: "20px 0", borderColor: "#e5e7eb" }} />

        <div>
          <div className="tip">Focus Tip</div>
          <div className="tip-text">
            Hiding recommendations can reduce the temptation to click on
            unrelated videos, helping you stay focused on your current task.
          </div>
        </div>
      </div>

      <div className="footer">
        FocusTube Chrome Extension – Hide YouTube recommendations to stay
        focused on your current video.
      </div>
    </>
  );
}
