import { Scramble } from "./Scramble";
import { InputCanvas } from "./InputCanvas";
import { ButtonScramble } from "./ButtonCanvas";
import { createSignal } from "solid-js";

export default () => {
    const [reroll, setReroll] = createSignal(false);
    const [input, setInput] = createSignal("");

    const takeThis = () => {
        if (!reroll() && input().length != 0) {
            setReroll(true);
        }
    };

    const clearThis = () => {
        if (reroll() && input().length != 0) {
            setReroll(false);
        }
    };

    const openMyPage = () => {
        const a = document.createElement("a");

        a.href = "https://github.com/TundraClimate";
        a.click();
    };

    const downloadCanvas = () => {
        const container = document.getElementById("view-box");

        if (container == null) {
            return;
        }

        const canvases = Array.from(container.querySelectorAll("canvas"));
        const width = Math.max(...canvases.map((c) => c.width));
        const height = canvases.reduce((sum, c) => sum + c.height, 0);

        const merged = document.createElement("canvas");
        merged.width = width;
        merged.height = height;

        const ctx = merged.getContext("2d")!;

        let y = 0;
        for (const c of canvases) {
            const x = (width - c.width) / 2;

            ctx.drawImage(c, x, y);
            y += c.height;
        }

        merged.toBlob((blob) => {
            if (blob != null) {
                const url = URL.createObjectURL(blob!);

                const a = document.createElement("a");
                a.href = url;
                a.download = "prescript.png";
                a.click();

                URL.revokeObjectURL(url);
            }
        });
    };

    return (
        <div class="content">
            <header>
                <Scramble scale={8} maxPerRoll={5}>
                    _Make Your Prescript._
                </Scramble>
            </header>
            <div class="view">
                <InputCanvas
                    scale={8}
                    trigger={reroll}
                    onInput={(ref) => setInput(ref)}
                />
            </div>
            <footer>
                <ButtonScramble scale={3} maxPerRoll={10} wait={3} onClick={openMyPage}>
                    DEV:Tundra
                </ButtonScramble>
                {reroll() ? (
                    <ButtonScramble scale={3} onClick={clearThis}>
                        _CLEAR._
                    </ButtonScramble>
                ) : (
                    <ButtonScramble scale={3} onClick={takeThis}>
                        _Take THIS._
                    </ButtonScramble>
                )}
                <ButtonScramble
                    scale={3}
                    maxPerRoll={10}
                    wait={3}
                    onClick={downloadCanvas}
                >
                    Download
                </ButtonScramble>
            </footer>
        </div>
    );
};
