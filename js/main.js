const fileManager = document.querySelector(".desktop-icon");
const runningApps = document.querySelector("#running-apps");

let fileManagerWindow = null;
let appButton = null;

const fileSystem = {
    Documents: [
        {type: "file", name: "Projects"},
        {type: "file", name: "Resume.docx"},
    ],
    Downloads: [
        {type: "file", name: "setup.txt"},
        {type: "file", name: "notes.txt"}
    ],
    Pictures: [
        {type: "file", name: "image1.png"},
    ],
    Music: [
        {type: "file", name: "song1.mp3"},
    ]
}

function statusIndicator() {
    let status = document.querySelector(".status")
    if (navigator.onLine) {
        status.style.color = "green";
        status.textContent = "●";
    }else {
        status.style.color = "red";
        status.textContent = "●";
    }

}

function updateTime() {
    const now = new Date();
    document.querySelector(".clock").textContent = now.toLocaleTimeString();
}
setInterval(() => {
    updateTime();
    statusIndicator();
}, 1000);
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

    windowElement.innerHTML = `
    <div class="window-header">
        <span>📁 File Manager</span>

        <div>
            <button class="minimize-button">−</button>
            <button class="close-button">×</button>
        </div>
    </div>

    <div class="window-content">
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

    function openFolder(folderName) {
    const fileGrid = windowElement.querySelector(".file-grid");

    fileGrid.innerHTML = "";

    fileSystem[folderName].forEach((item) => {
        const fileItem = document.createElement("div");
        fileItem.className = "file-item";

        if (item.type === "file") {
            fileItem.innerHTML = `
                <span>📄</span>
                <p>${item.name}</p>
            `;
        }

        fileGrid.appendChild(fileItem);
    });
}


    const fileItems = windowElement.querySelectorAll(".file-item");
    fileItems.forEach((item) => {
        item.addEventListener("dblclick", () => {
            const name = item.querySelector("p").textContent;
if (fileSystem[name]) {
    openFolder(name);
} else {
    console.log(`You opened ${name}`);
}        })
    })

});