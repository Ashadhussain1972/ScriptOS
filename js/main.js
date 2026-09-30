// ================================
// DOM & APPLICATION STATE
// ================================

const fileManager = document.querySelector(".desktop-icon");
const runningApps = document.querySelector("#running-apps");

let fileManagerWindow = null;
let appButton = null;
let currentFolder = null;
let parentFolder = null;

// ================================
// VIRTUAL FILE SYSTEM
// ================================

const fileSystem = {
  Documents: [
    { type: "folder", name: "Projects" },
    { type: "file", name: "Resume.docx" },
  ],

  Downloads: [
    { type: "file", name: "setup.txt" },
    { type: "file", name: "notes.txt" },
  ],

  Pictures: [
    { type: "file", name: "image1.png" },
  ],

  Music: [
    { type: "file", name: "song1.mp3" },
  ],

  Projects: [
    { type: "file", name: "project1.txt" },
    { type: "file", name: "project2.txt" },
  ],
};

// ================================
// SYSTEM STATUS
// ================================

function statusIndicator() {
  const status = document.querySelector(".status");

  if (navigator.onLine) {
    status.style.color = "green";
    status.textContent = "●";
  } else {
    status.style.color = "red";
    status.textContent = "●";
  }
}

function updateTime() {
  const now = new Date();

  document.querySelector(".clock").textContent =
    now.toLocaleTimeString();
}

setInterval(() => {
  updateTime();
  statusIndicator();
}, 1000);

// ================================
// FILE MANAGER
// ================================

fileManager.addEventListener("dblclick", () => {

  // Restore existing File Manager
  if (fileManagerWindow) {
    fileManagerWindow.style.display = "block";

    if (appButton) {
      appButton.remove();
      appButton = null;
    }

    return;
  }

  // ================================
  // CREATE FILE MANAGER WINDOW
  // ================================

  const windowElement = document.createElement("div");

  fileManagerWindow = windowElement;

  windowElement.className = "window";

  windowElement.style.left = "200px";
  windowElement.style.top = "100px";

  // ================================
  // FILE MANAGER UI
  // ================================

  windowElement.innerHTML = `
    <div class="window-header">
      <span>📁 File Manager</span>

      <div>
        <button class="minimize-button">−</button>
        <button class="close-button">×</button>
      </div>
    </div>

    <div class="window-content">

      <div class="navigation-bar">
        <button class="back-button">← Back</button>
        <span class="current-folder">This PC</span>
      </div>

      <div class="file-grid">

        <div class="file-item">
          <span>📁</span>
          <p>Documents</p>
        </div>

        <div class="file-item">
          <span>📁</span>
          <p>Downloads</p>
        </div>

        <div class="file-item">
          <span>📁</span>
          <p>Pictures</p>
        </div>

        <div class="file-item">
          <span>📁</span>
          <p>Music</p>
        </div>

      </div>

    </div>
  `;

  document.querySelector(".desktop").appendChild(windowElement);

  const backButton =
    windowElement.querySelector(".back-button");

  const currentFolderElement =
    windowElement.querySelector(".current-folder");

  // ================================
  // FOLDER NAVIGATION
  // ================================

  function renderHome() {
    const fileGrid =
      windowElement.querySelector(".file-grid");

    fileGrid.innerHTML = "";

    Object.keys(fileSystem).forEach((folderName) => {

      const folderItem =
        document.createElement("div");

      folderItem.className = "file-item";

      folderItem.innerHTML = `
        <span>📁</span>
        <p>${folderName}</p>
      `;

      fileGrid.appendChild(folderItem);
    });

    currentFolder = null;

    currentFolderElement.textContent = "This PC";

    attachFileEvents();
  }

  function openFolder(folderName) {
    const fileGrid =
      windowElement.querySelector(".file-grid");

    fileGrid.innerHTML = "";

    parentFolder = currentFolder;
    currentFolder = folderName;

    currentFolderElement.textContent = folderName;

    fileSystem[folderName].forEach((item) => {

      const fileItem =
        document.createElement("div");

      fileItem.className = "file-item";

      if (item.type === "folder") {

        fileItem.innerHTML = `
          <span>📁</span>
          <p>${item.name}</p>
        `;

      } else {

        fileItem.innerHTML = `
          <span>📄</span>
          <p>${item.name}</p>
        `;
      }

      fileGrid.appendChild(fileItem);
    });

    attachFileEvents();
  }

  // ================================
  // FILE & FOLDER EVENTS
  // ================================

  function attachFileEvents() {

    const fileItems =
      windowElement.querySelectorAll(".file-item");

    fileItems.forEach((item) => {

      item.addEventListener("dblclick", () => {

        const name =
          item.querySelector("p").textContent;

        // Open folder
        if (fileSystem[name]) {

          openFolder(name);

        } else {

          // Open file
          console.log(`You opened ${name}`);
        }
      });
    });
  }

  // ================================
  // BACK BUTTON
  // ================================

 backButton.addEventListener("click", () => {
    if (currentFolder === null) return;

    if (parentFolder === null) {
        renderHome();
        return;
    }

    openFolder(parentFolder);
    parentFolder = null;
});

  // ================================
  // FILE MANAGER CONTROLS
  // ================================

  const closeButton =
    windowElement.querySelector(".close-button");

  const minimizeButton =
    windowElement.querySelector(".minimize-button");

  // ================================
  // CLOSE WINDOW
  // ================================

  closeButton.addEventListener("click", () => {

    windowElement.remove();

    if (appButton) {
      appButton.remove();
      appButton = null;
    }

    fileManagerWindow = null;
    currentFolder = null;
  });

  // ================================
  // MINIMIZE WINDOW
  // ================================

  minimizeButton.addEventListener("click", () => {

    windowElement.style.display = "none";

    if (appButton) return;

    appButton =
      document.createElement("button");

    appButton.textContent = "📁";

    appButton.className =
      "running-app-button";

    runningApps.appendChild(appButton);

    // Restore window from taskbar
    appButton.addEventListener("click", () => {

      windowElement.style.display = "block";

      appButton.remove();
      appButton = null;
    });
  });

  // ================================
  // WINDOW DRAGGING
  // ================================

  const header =
    windowElement.querySelector(".window-header");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Start dragging
  header.addEventListener("mousedown", (event) => {

    isDragging = true;

    offsetX =
      event.clientX - windowElement.offsetLeft;

    offsetY =
      event.clientY - windowElement.offsetTop;
  });

  // Move window
  document.addEventListener("mousemove", (event) => {

    if (!isDragging) return;

    windowElement.style.left =
      `${event.clientX - offsetX}px`;

    windowElement.style.top =
      `${event.clientY - offsetY}px`;
  });

  // Stop dragging
  document.addEventListener("mouseup", () => {

    isDragging = false;
  });

  // ================================
  // INITIAL FILE EVENTS
  // ================================

  attachFileEvents();
});