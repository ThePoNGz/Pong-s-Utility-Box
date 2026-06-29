# Pong's Utility Box

Pong's Utility Box is a Rust-first desktop utility app for everyday quality-of-life tasks: downloading public media, converting files, inspecting metadata, and wrapping tools like `ffmpeg` behind a normal app window.

The first goal is simple:

```sh
pub
```

That command should open a normal desktop window where users can paste links, drag files, choose settings, and run jobs without fighting terminal input behavior.

## Project Shape

```text
crates/pub-core/
  Shared Rust logic for queueing, jobs, tool checks, downloads, and conversion.

apps/desktop/
  Tauri desktop app. The GUI talks to Rust commands, and Rust calls `pub-core`.
```

The GUI should stay thin. Real behavior belongs in `pub-core` so future terminal commands can reuse the same logic.

## Planned MVP

- Launch GUI from `pub`
- Paste links into a queue
- Drag and drop files into a queue
- Preview jobs through the Rust backend
- Add `yt-dlp` and `ffmpeg` discovery through `pub-core`
- Add media download options: video, audio only, quality, output folder
- Add file conversion jobs

## Development

Install Rust, then run the desktop app with the Tauri CLI:

```sh
cargo install tauri-cli --version "^2"
cd apps/desktop/src-tauri
cargo tauri dev
```

The current UI is static HTML/CSS/JS on purpose. A frontend framework can be added later if the UI grows enough to justify it.
