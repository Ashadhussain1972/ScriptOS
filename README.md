# ScriptOS

A browser-based desktop environment built with **HTML, CSS, and Vanilla JavaScript**.

ScriptOS is a project focused on building a desktop-like operating system experience inside the browser while demonstrating real-world JavaScript concepts such as DOM manipulation, event handling, application state, and browser APIs.

## 🚧 Current Status

**Development in progress**

The project is being developed step-by-step, with each feature tested before moving to the next stage.

## ✨ Current Features

### Desktop

* Desktop-style interface
* Desktop application icons
* Taskbar
* Start button
* System tray
* Clock placeholder

### File Manager

* Open File Manager with double-click
* Window creation
* Window dragging
* Minimize window
* Restore from taskbar
* Close window
* File and folder grid
* Hover interaction
* Double-click file/folder interaction
* Virtual filesystem
* Folder navigation
* Dynamic file rendering

### Current File Manager Structure

```text
📁 Documents
    📄 Resume.txt
    📄 Projects.txt

📁 Downloads
    📄 setup.txt
    📄 notes.txt

📁 Pictures
    📄 ScriptOS.png

📁 Music
    📄 song.txt
```

> The current filesystem is virtual and stored in JavaScript. Files are not yet stored as actual files on the computer.

## 🛠️ Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript
* ES6+
* Browser DOM APIs

No frontend framework is being used.

## 📂 Project Structure

```text
ScriptOS/

│
├── assets/
│
├── css/
│   └── style.css
│
├── js/
│   ├── core/
│   └── main.js
│
├── .gitignore
├── index.html
└── README.md
```

## 🧠 JavaScript Concepts

This project is being used to practice and demonstrate:

* DOM manipulation
* Event listeners
* Event handling
* Dynamic element creation
* Template literals
* Conditional logic
* Application state
* Mouse events
* Dragging
* Virtual filesystem state
* Dynamic rendering
* `querySelector()`
* `querySelectorAll()`
* `createElement()`
* `appendChild()`
* `remove()`
* `closest()`

More advanced concepts will be introduced as the project grows.

## 🗺️ Development Roadmap

### Phase 1 — Desktop Shell

* [x] Desktop interface
* [x] Desktop icons
* [x] Taskbar
* [x] Start button
* [ ] Functional clock
* [ ] Start menu

### Phase 2 — File Manager

* [x] File Manager window
* [x] Window dragging
* [x] Minimize
* [x] Restore
* [x] Close
* [x] File/folder display
* [x] Folder navigation
* [ ] Create file
* [ ] Create folder
* [ ] Rename
* [ ] Delete
* [ ] Move files
* [ ] Search
* [ ] Trash

### Phase 3 — Virtual File System

* [x] File system state
* [x] Basic folder hierarchy
* [ ] File metadata
* [ ] Persistent storage
* [ ] LocalStorage
* [ ] IndexedDB

### Phase 4 — Applications

* [ ] Text Editor
* [ ] Calculator
* [ ] Image Viewer
* [ ] Settings
* [ ] Music Player

### Phase 5 — Advanced Features

* [ ] Global search
* [ ] Notifications
* [ ] Keyboard shortcuts
* [ ] Import/export
* [ ] Application management
* [ ] PWA support

## 🎯 Project Goal

The goal of ScriptOS is not to create a real operating system.

The goal is to simulate an operating-system-like environment in the browser while building a deeper understanding of:

* JavaScript architecture
* State management
* DOM-based applications
* Browser APIs
* Event-driven programming
* Persistent data
* Modular application design

## 📈 Development Progress

| Feature               | Status         |
| --------------------- | -------------- |
| Desktop UI            | ✅ Complete     |
| Taskbar               | ✅ Complete     |
| File Manager Window   | ✅ Complete     |
| Window Dragging       | ✅ Complete     |
| Minimize / Restore    | ✅ Complete     |
| File & Folder Display | ✅ Complete     |
| Virtual File System   | 🔄 In Progress |
| Folder Navigation     | ✅ Complete     |
| Text Editor           | ⏳ Planned      |
| Calculator            | ⏳ Planned      |
| Settings              | ⏳ Planned      |
| Persistent Storage    | ⏳ Planned      |

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/Ashadhussain1972/ScriptOS.git
```

Open the project in VS Code and run `index.html` using **Live Server**.

## 📌 Development Approach

ScriptOS is being developed incrementally.

Each major feature is built, tested, and committed separately so the Git history reflects the development process.

Example commit structure:

```text
chore: initialize ScriptOS project

docs: add project roadmap

feat: build desktop shell

feat: build file manager window

feat: add window dragging

feat: add minimize and restore

feat: add file manager grid

feat: add virtual filesystem

feat: add folder navigation
```

## 👨‍💻 Author

**Ansari Ashad Hussain**

Frontend Developer | JavaScript | React

---

⭐ ScriptOS is a learning-focused project built to explore how far Vanilla JavaScript can go in creating a desktop-like web experience.
