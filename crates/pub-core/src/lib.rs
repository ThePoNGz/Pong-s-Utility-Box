use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IntakeItem {
    pub kind: IntakeKind,
    pub value: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum IntakeKind {
    Url,
    File,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JobPreview {
    pub title: String,
    pub item_count: usize,
    pub next_action: String,
}

pub fn preview_items(items: &[IntakeItem]) -> JobPreview {
    let title = match items.len() {
        0 => "Nothing queued".to_string(),
        1 => "1 item queued".to_string(),
        count => format!("{count} items queued"),
    };

    JobPreview {
        title,
        item_count: items.len(),
        next_action: "Downloader and converter backends will plug in here next.".to_string(),
    }
}
