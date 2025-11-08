# Docs Viewer (site)

This folder contains a small static viewer that merges the repository docs into a single page
and provides a minimal UI for topic/category selection and local API-key configuration.

How to use
1. Open `docs/site/index.html` in a browser (preferably via a local static server for full fetch support).
2. If no API key is saved, the API Key modal auto-opens. Enter and save a key to store it in localStorage.
3. Select a Category (required) and optionally a Topic. Click Generate (demo) to see a quick confirmation.

Notes
- The Generate button is a demo in this viewer. The full application (Angular) should use these selections
  to call the AI provider service following the app architecture.
- The merged docs content is loaded from `docs/ALL_DOCS.md`.

Opening locally
- If you double-click `index.html` the browser will open it via file://; some browsers may restrict the fetch used to load `ALL_DOCS.md`.
- For best results run a tiny static server inside the repo root, e.g. using Python:

  ```
  # Windows (cmd.exe)
  python -m http.server 8000
  # then open http://localhost:8000/docs/site/
  ```
