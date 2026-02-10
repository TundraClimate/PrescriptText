import { PxCanvas } from "./PxCanvas";
import { createSignal, onMount } from "solid-js";

type InputCanvasProps = {
    scale?: number;
};

export const InputCanvas = (props: InputCanvasProps) => {
    const [input, setInput] = createSignal("");
    const [swi, setSwitch] = createSignal(true);
    const [isFocus, setIsFocus] = createSignal(false);

    const focusInput = () => {
        document.getElementById("hidden-input")!.focus();
        setIsFocus(true);
    };

    const outFocusInput = () => {
        setIsFocus(false);
    };

    const putGlyph = (ev: string | null) => {
        if (ev == null) {
            if (input().length > 1) {
                setInput((i) => i.slice(0, i.length - 1));
            } else {
                setInput("");
            }
        } else {
            setInput((i) => i + ev);
        }
    };

    onMount(async () => {
        while (true) {
            setSwitch((s) => !s);

            await new Promise((r) => setTimeout(r, 1000));
        }
    });

    return (
        <div class="input-type">
            <input
                id="hidden-input"
                onFocusOut={outFocusInput}
                onInput={(ev) => putGlyph(ev.data)}
            />
            {input() || isFocus() ? (
                <div>
                    <span class={input().length == 0 ? "nothing" : ""}>
                        <PxCanvas scale={props.scale} onClick={focusInput}>
                            {input()}
                        </PxCanvas>
                    </span>
                    <span class="view-cursor">
                        <PxCanvas
                            scale={props.scale}
                            onClick={focusInput}
                            alpha={swi() ? 120 : 60}
                        >
                            {isFocus() ? "|" : " "}
                        </PxCanvas>
                    </span>
                </div>
            ) : (
                <PxCanvas
                    scale={props.scale}
                    onClick={focusInput}
                    alpha={swi() ? 120 : 60}
                >
                    _Click here._
                </PxCanvas>
            )}
        </div>
    );
};
