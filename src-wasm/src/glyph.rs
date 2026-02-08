const CHAR_W: usize = 5;
const CHAR_H: usize = 8;
const PIXEL_BIT: usize = 4;

fn convert(s: &str) -> u8 {
    u8::from_str_radix(&s.replace(|c| c != '.', "1").replace('.', "0"), 2).unwrap()
}

pub fn get_glyph(ch: char) -> Option<[u8; CHAR_H]> {
    match ch {
        'A' => Some([
            convert(".OOO."),
            convert("O...O"),
            convert("O...O"),
            convert("OOOOO"),
            convert("O...O"),
            convert("O...O"),
            convert("O...O"),
            convert("....."),
        ]),
        'C' => Some([
            convert(".OOOO"),
            convert("O...."),
            convert("O...."),
            convert("O...."),
            convert("O...."),
            convert("O...."),
            convert(".OOOO"),
            convert("....."),
        ]),
        'E' => Some([
            convert("OOOOO"),
            convert("O...."),
            convert("O...."),
            convert("OOOOO"),
            convert("O...."),
            convert("O...."),
            convert("OOOOO"),
            convert("....."),
        ]),
        'L' => Some([
            convert("O...."),
            convert("O...."),
            convert("O...."),
            convert("O...."),
            convert("O...."),
            convert("O...."),
            convert("OOOOO"),
            convert("....."),
        ]),
        'R' => Some([
            convert("OOOO."),
            convert("O...O"),
            convert("O...O"),
            convert("OOOO."),
            convert("O...O"),
            convert("O...O"),
            convert("O...O"),
            convert("....."),
        ]),
        '.' => Some([
            convert("....."),
            convert("....."),
            convert("....."),
            convert("....."),
            convert(".OO.."),
            convert(".OO.."),
            convert("....."),
            convert("....."),
        ]),
        '_' => Some([
            convert("....."),
            convert("....."),
            convert("....."),
            convert("....."),
            convert("....."),
            convert("....."),
            convert("OOOOO"),
            convert("....."),
        ]),
        _ => None,
    }
}

pub fn scale_glyph(ch: char, scale: usize) -> Vec<u8> {
    let scale = scale.max(1);
    let sw = CHAR_W * scale;
    let sh = CHAR_H * scale;

    let Some(base) = get_glyph(ch) else {
        return vec![0; sw * sh * 4];
    };

    let mut buf = vec![0u8; sw * sh * PIXEL_BIT];

    for (y, bpix) in base.iter().enumerate().take(CHAR_H) {
        for x in 0..CHAR_W {
            if (bpix >> (CHAR_W - 1 - x)) & 1 == 1 {
                for dy in 0..scale {
                    for dx in 0..scale {
                        let i = ((x * scale + dx) + (y * scale + dy) * sw) * PIXEL_BIT;
                        buf[i..i + 4].copy_from_slice(&[150, 220, 255, 255]);
                    }
                }
            }
        }
    }

    buf
}
