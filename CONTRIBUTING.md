# Contributing to WhiteboardJS

Thank you for your interest in contributing to WhiteboardJS! We welcome contributions from everyone, regardless of experience level.

## How to Contribute

### Reporting Bugs

1. Check the [existing issues](https://github.com/ionutfinta/WhiteboardJS/issues) to avoid duplicates
2. Open a new issue using the **Bug Report** template
3. Include steps to reproduce, expected behavior, and your browser/device info

### Suggesting Features

1. Check the [existing issues](https://github.com/ionutfinta/WhiteboardJS/issues) for similar ideas
2. Open a new issue using the **Feature Request** template
3. Describe the feature, why it's useful, and how it might work

### Submitting Code Changes

1. **Fork** the repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/WhiteboardJS.git
   cd WhiteboardJS
   npm install
   npm start
   ```
3. Create a **branch** for your change:
   ```bash
   git checkout -b my-feature
   ```
4. Make your changes — keep them small and focused
5. **Test** your changes in at least one desktop and one mobile browser
6. **Commit** with a clear message:
   ```bash
   git commit -m "Add freehand pen tool"
   ```
7. **Push** to your fork and open a **Pull Request**

### Code Style

- Keep things simple — this project uses plain HTML, CSS, and JavaScript
- Follow the existing code style in the repository
- Use meaningful variable and function names
- Add comments for non-obvious logic

### What Makes a Good Pull Request

- **Small and focused** — one feature or fix per PR
- **Tested** — verify your changes work on desktop and mobile
- **Documented** — update the README if your change adds a new feature
- **Descriptive** — explain what your PR does and why

## Project Architecture

WhiteboardJS is intentionally simple:

- `src/index.html` — The main whiteboard app (loads all dependencies from CDN so it works with "Save As")
- `src/jquery.whiteboard.js` — Whiteboard logic: tools, element creation, drag/resize, touch support
- `src/style.css` — Styles for the whiteboard and UI
- `src/app.js` — A minimal Node.js HTTP server for local development
- `index.html` — Landing/demo page (served on GitHub Pages)

### Key Design Decisions

1. **CDN dependencies** — All libraries are loaded from CDN so that saved HTML files work standalone
2. **No build step** — The project works without any bundler or transpiler
3. **Touch support** — jQuery UI Touch Punch enables touch on mobile devices

## Getting Help

If you have questions, open an issue or start a discussion. We're happy to help!

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to making this project welcoming for everyone.
