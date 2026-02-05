use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn test_hello() -> String {
    String::from("Hello, World")
}
