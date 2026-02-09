use wasm_bindgen::prelude::*;

mod glyph;

#[wasm_bindgen]
pub fn is_available(ch: char) -> bool {
    glyph::get_glyph(ch).is_some()
}

#[wasm_bindgen]
pub fn gen_data(ch: char, scale: usize, alpha: u8) -> Vec<u8> {
    glyph::scale_glyph(ch, scale, alpha)
}

#[wasm_bindgen]
pub fn roll_glyph(target: char, max_roll: usize) -> Vec<String> {
    let roll_list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,._";

    glyph::rolln(roll_list, target, max_roll)
        .into_iter()
        .map(|c| c.to_string())
        .collect()
}

#[wasm_bindgen]
pub fn roll_random() -> String {
    let roll_list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz,._";

    glyph::roll_one(roll_list).to_string()
}
