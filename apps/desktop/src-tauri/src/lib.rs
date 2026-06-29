use pub_core::{preview_items, IntakeItem, JobPreview};

#[tauri::command]
fn preview_queue(items: Vec<IntakeItem>) -> JobPreview {
    preview_items(&items)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![preview_queue])
        .run(tauri::generate_context!())
        .expect("error while running Pong's Utility Box");
}
