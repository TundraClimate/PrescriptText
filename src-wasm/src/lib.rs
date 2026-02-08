use wasm_bindgen::prelude::*;

mod glyph;

#[wasm_bindgen]
pub fn is_available(ch: char) -> bool {
    glyph::get_glyph(ch).is_some()
}

#[wasm_bindgen]
pub fn gen_data(ch: char, scale: usize) -> Vec<u8> {
    glyph::scale_glyph(ch, scale)
}
