const fileManager = document.querySelector(".desktop-icon");
const runningApps = document.querySelector("#running-apps");

let fileManagerWindow = null;
let appButton = null;

fileManager.addEventListener("dblclick", () => {

    if (fileManagerWindow) {
        fileManagerWindow.style.display = "block";

        if (appButton) {
            appButton.remove();
            appButton = null;
        }

        return;
    }

    const windowElement = document.createElement("div");

    fileManagerWindow = windowElement;
    windowElement.className = "window";

    windowElement.style.left = "200px";
    windowElement.style.top = "100px";

    windowElement.innerHTML = `<div class="window-content">
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

        <div class="file-item">
            <span>📄</span>
            <p>README.txt</p>
        </div>

        <div class="file-item">
            <span>📄</span>
            <p>notes.txt</p>
        </div>
    </div>
</div>
    `;

    document.querySelector(".desktop").appendChild(windowElement);

    const closeButton = windowElement.querySelector(".close-button");

    closeButton.addEventListener("click", () => {
        windowElement.remove();

        if (appButton) {
            appButton.remove();
            appButton = null;
        }

        fileManagerWindow = null;
    });

    const minimizeButton =
        windowElement.querySelector(".minimize-button");

    minimizeButton.addEventListener("click", () => {
        windowElement.style.display = "none";

        if (appButton) return;

        appButton = document.createElement("button");
        appButton.textContent = "📁";
        appButton.className = "running-app-button";

        runningApps.appendChild(appButton);

        appButton.addEventListener("click", () => {
            windowElement.style.display = "block";
            appButton.remove();
            appButton = null;
        });
    });

    const header =
        windowElement.querySelector(".window-header");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", (event) => {
        isDragging = true;

        offsetX =
            event.clientX - windowElement.offsetLeft;

        offsetY =
            event.clientY - windowElement.offsetTop;
    });

    document.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        windowElement.style.left =
            `${event.clientX - offsetX}px`;

        windowElement.style.top =
            `${event.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
});