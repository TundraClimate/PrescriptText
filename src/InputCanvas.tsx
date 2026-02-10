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
        if (ev != null) {
            setInput(ev);
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
            <textarea
                id="hidden-input"
                onFocusOut={outFocusInput}
                onInput={(ev) => putGlyph(ev.target.value)}
            />
            {input() || isFocus() ? (
                <div class="view-box">
                    {input()
                        .split("\n")
                        .map((line, i) => {
                            if (i + 1 == input().split("\n").length) {
                                return (
                                    <div>
                                        <span class={line.length == 0 ? "nothing" : ""}>
                                            <PxCanvas scale={props.scale} onClick={focusInput}>
                                                {line}
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
                                );
                            }

                            return (
                                <div>
                                    <PxCanvas scale={props.scale} onClick={focusInput}>
                                        {line}
                                    </PxCanvas>
                                </div>
                            );
                        })}
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
