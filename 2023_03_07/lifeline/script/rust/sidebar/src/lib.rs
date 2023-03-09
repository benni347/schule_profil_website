use wasm_bindgen::prelude::*;
use web_sys::{window, HtmlSelectElement};

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn retrieve_selected_value() -> JsValue {
    let selected_value = get_selected_value();

    alert(&format!("{}", selected_value));
    JsValue::from_str(&selected_value)
}

fn get_selected_value() -> String {
    let window = window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    let dropdown = document
        .get_element_by_id("mydropdown")
        .expect("should have #mydropdown on the page")
        .dyn_into::<HtmlSelectElement>()
        .map_err(|_| ())
        .unwrap();

    let selected_option = dropdown.value();

    selected_option
}
