# WhiteboardJS

> A tiny, open-source whiteboard that runs in any browser on any device — desktop, tablet, or phone. Draw, write, and save your boards as standalone HTML files.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ Features

- **Works everywhere** — runs in any modern browser (Chrome, Firefox, Safari, Edge) on desktop, tablet, and mobile
- **Touch-friendly** — full touch support for drawing and interacting on phones and tablets
- **Save as HTML** — use your browser's built-in *File → Save As* to save your whiteboard as a standalone HTML file that you can reopen anytime
- **No account needed** — just open and draw, no sign-up required
- **Lightweight** — built with simple HTML, CSS, and JavaScript (jQuery, Bootstrap, jQuery-UI, TinyMCE)
- **Rich text** — add formatted text with bold, italic, colors, and font sizes
- **Shapes** — add rectangles and circles, drag and resize them freely
- **Infinite canvas** — drag the board to expand in any direction

## 🚀 Try it now

Go to **https://ionutfinta.github.io/WhiteboardJS/** and start drawing!

### Save your work

1. Create your whiteboard content
2. Use **File → Save As** (or `Ctrl+S` / `Cmd+S`) in your browser
3. Save the HTML file to your computer
4. Reopen the file in any browser to see your board exactly as you left it

## 🛠️ Developer Setup

### Requirements

- [Node.js](https://nodejs.org/) (any recent version)

### Quick start

```bash
git clone https://github.com/ionutfinta/WhiteboardJS.git
cd WhiteboardJS
npm install
npm start
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080) in your browser.

### Project structure

```
WhiteboardJS/
├── src/
│   ├── index.html              # Main whiteboard app
│   ├── jquery.whiteboard.js    # Whiteboard logic (tools, elements, touch)
│   ├── style.css               # Whiteboard styles
│   ├── app.js                  # Simple Node.js dev server
│   └── favicon.ico             # App icon
├── index.html                  # Landing / demo page
├── package.json                # Project config
├── LICENSE                     # GPL-3.0
├── CONTRIBUTING.md             # How to contribute
└── CODE_OF_CONDUCT.md          # Community guidelines
```

## 🤝 Contributing

We welcome contributions from everyone! Whether you're fixing a typo, adding a feature, or reporting a bug — every contribution matters.

Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

### Quick contribution ideas

- 🐛 Report bugs via [GitHub Issues](https://github.com/ionutfinta/WhiteboardJS/issues)
- 💡 Suggest features via [GitHub Issues](https://github.com/ionutfinta/WhiteboardJS/issues)
- 🌍 Help translate the UI
- 📖 Improve documentation
- 🧪 Add tests
- 🎨 Improve the UI/UX

## 📄 License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

