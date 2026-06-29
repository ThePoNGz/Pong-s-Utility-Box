const queue = [];

const clearButton = document.querySelector("#clear-button");
const addLinkButton = document.querySelector("#add-link-button");
const previewButton = document.querySelector("#preview-button");
const urlInput = document.querySelector("#url-input");
const dropZone = document.querySelector("#drop-zone");
const queueCount = document.querySelector("#queue-count");
const queueList = document.querySelector("#queue-list");
const statusBox = document.querySelector("#status-box");

function renderQueue() {
  queueCount.textContent = `${queue.length} ${queue.length === 1 ? "item" : "items"}`;
  queueList.replaceChildren(
    ...queue.map((item) => {
      const row = document.createElement("li");
      const kind = document.createElement("small");
      const value = document.createElement("span");

      kind.textContent = item.kind;
      value.textContent = item.value;
      row.append(kind, value);

      return row;
    }),
  );
}

function setStatus(title, detail) {
  statusBox.replaceChildren();

  const strong = document.createElement("strong");
  const span = document.createElement("span");

  strong.textContent = title;
  span.textContent = detail;
  statusBox.append(strong, span);
}

function addUrl() {
  const value = urlInput.value.trim();

  if (!value) {
    setStatus("Nothing to add", "Paste a link first.");
    return;
  }

  queue.push({ kind: "url", value });
  urlInput.value = "";
  renderQueue();
  setStatus("Added link", value);
}

function addFiles(files) {
  for (const file of files) {
    queue.push({ kind: "file", value: file.path || file.name });
  }

  renderQueue();
  setStatus("Added files", `${files.length} ${files.length === 1 ? "file" : "files"} queued.`);
}

async function previewJob() {
  if (!window.__TAURI__?.core?.invoke) {
    setStatus("Backend unavailable", "Run this screen through Tauri to call Rust commands.");
    return;
  }

  try {
    const preview = await window.__TAURI__.core.invoke("preview_queue", { items: queue });
    setStatus(preview.title, preview.next_action);
  } catch (error) {
    setStatus("Preview failed", String(error));
  }
}

clearButton.addEventListener("click", () => {
  queue.length = 0;
  renderQueue();
  setStatus("Ready", "Queue cleared.");
});

addLinkButton.addEventListener("click", addUrl);

urlInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addUrl();
  }
});

previewButton.addEventListener("click", previewJob);

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragging");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragging");
  addFiles(event.dataTransfer.files);
});

renderQueue();
