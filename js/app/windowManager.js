import WindowManager from "./core/windowManager.js";

const windowManager = new WindowManager();
// ========================================
// ScriptOS Window Manager
// ========================================

class WindowManager {

    constructor() {
        this.windows = new Map();
        this.nextWindowId = 1;
        this.zIndex = 100;
    }


    // ========================================
    // CREATE WINDOW
    // ========================================

    createWindow(config) {

        const windowId = `window-${this.nextWindowId++}`;

        const windowElement = document.createElement("div");

        windowElement.className = "os-window";

        windowElement.id = windowId;

        windowElement.style.zIndex = ++this.zIndex;

        windowElement.innerHTML = `
            <div class="window-header">

                <div class="window-title">
                    <span>${config.icon || "▣"}</span>
                    <span>${config.title || "Application"}</span>
                </div>

                <div class="window-controls">

                    <button class="window-minimize">
                        −
                    </button>

                    <button class="window-maximize">
                        □
                    </button>

                    <button class="window-close">
                        ×
                    </button>

                </div>

            </div>

            <div class="window-content">
                ${config.content || ""}
            </div>
        `;


        // Position

        windowElement.style.left =
            `${100 + (this.windows.size * 30)}px`;

        windowElement.style.top =
            `${80 + (this.windows.size * 30)}px`;


        // Size

        windowElement.style.width =
            config.width || "500px";

        windowElement.style.height =
            config.height || "350px";


        document.body.appendChild(windowElement);


        // Store window

        this.windows.set(windowId, {
            id: windowId,
            element: windowElement,
            title: config.title,
            state: "normal"
        });


        this.setupWindowEvents(windowId);

        this.focusWindow(windowId);

        return windowId;
    }


    // ========================================
    // WINDOW EVENTS
    // ========================================

    setupWindowEvents(windowId) {

        const windowData = this.windows.get(windowId);

        const element = windowData.element;


        // Focus

        element.addEventListener("mousedown", () => {

            this.focusWindow(windowId);

        });


        // Close

        const closeButton =
            element.querySelector(".window-close");

        closeButton.addEventListener("click", (event) => {

            event.stopPropagation();

            this.closeWindow(windowId);

        });


        // Minimize

        const minimizeButton =
            element.querySelector(".window-minimize");

        minimizeButton.addEventListener("click", (event) => {

            event.stopPropagation();

            this.minimizeWindow(windowId);

        });


        // Maximize

        const maximizeButton =
            element.querySelector(".window-maximize");

        maximizeButton.addEventListener("click", (event) => {

            event.stopPropagation();

            this.maximizeWindow(windowId);

        });


        // Dragging

        this.enableDragging(windowId);
    }


    // ========================================
    // FOCUS
    // ========================================

    focusWindow(windowId) {

        const windowData = this.windows.get(windowId);

        if (!windowData) return;

        windowData.element.style.zIndex = ++this.zIndex;
    }


    // ========================================
    // CLOSE
    // ========================================

    closeWindow(windowId) {

        const windowData = this.windows.get(windowId);

        if (!windowData) return;

        windowData.element.remove();

        this.windows.delete(windowId);

        console.log(`Closed ${windowId}`);
    }


    // ========================================
    // MINIMIZE
    // ========================================

    minimizeWindow(windowId) {

        const windowData = this.windows.get(windowId);

        if (!windowData) return;

        windowData.element.classList.add("minimized");

        windowData.state = "minimized";
    }


    // ========================================
    // MAXIMIZE
    // ========================================

    maximizeWindow(windowId) {

        const windowData = this.windows.get(windowId);

        if (!windowData) return;


        if (windowData.state !== "maximized") {

            windowData.previousPosition = {
                left: windowData.element.style.left,
                top: windowData.element.style.top,
                width: windowData.element.style.width,
                height: windowData.element.style.height
            };


            windowData.element.classList.add("maximized");

            windowData.state = "maximized";

        } else {

            const previous =
                windowData.previousPosition;


            windowData.element.style.left =
                previous.left;

            windowData.element.style.top =
                previous.top;

            windowData.element.style.width =
                previous.width;

            windowData.element.style.height =
                previous.height;


            windowData.element.classList.remove(
                "maximized"
            );

            windowData.state = "normal";
        }


        this.focusWindow(windowId);
    }


    // ========================================
    // RESTORE
    // ========================================

    restoreWindow(windowId) {

        const windowData = this.windows.get(windowId);

        if (!windowData) return;

        windowData.element.classList.remove(
            "minimized"
        );

        windowData.state = "normal";

        this.focusWindow(windowId);
    }


    // ========================================
    // DRAGGING
    // ========================================

    enableDragging(windowId) {

        const windowData = this.windows.get(windowId);

        const element = windowData.element;

        const header =
            element.querySelector(".window-header");


        let isDragging = false;

        let offsetX = 0;

        let offsetY = 0;


        header.addEventListener("mousedown", (event) => {

            if (
                event.target.closest(".window-controls")
            ) {
                return;
            }


            isDragging = true;

            const rect =
                element.getBoundingClientRect();


            offsetX =
                event.clientX - rect.left;

            offsetY =
                event.clientY - rect.top;


            this.focusWindow(windowId);
        });


        document.addEventListener("mousemove", (event) => {

            if (!isDragging) return;


            element.style.left =
                `${event.clientX - offsetX}px`;

            element.style.top =
                `${event.clientY - offsetY}px`;
        });


        document.addEventListener("mouseup", () => {

            isDragging = false;

        });
    }
}


export default WindowManager;
