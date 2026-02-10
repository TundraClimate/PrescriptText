import { Scramble } from "./Scramble";
import { createSignal, onMount, on, createEffect } from "solid-js";

type InputCanvasProps = {
    scale?: number;
    trigger: () => boolean;
    onInput: (ref: string) => void;
};

export const InputCanvas = (props: InputCanvasProps) => {
    const [input, setInput] = createSignal("");
    const [swi, setSwitch] = createSignal(true);
    const [isFocus, setIsFocus] = createSignal(false);
    const [rolln, setRoll] = createSignal(0);

    const focusInput = () => {
        if (rolln() != 0) {
            return;
        }

        document.getElementById("hidden-input")!.focus();
        setIsFocus(true);
    };

    const outFocusInput = () => {
        setIsFocus(false);
    };

    const putGlyph = (ev: string | null) => {
        if (ev != null) {
            setInput(ev);
            props.onInput(ev);
        }
    };

    onMount(async () => {
        while (true) {
            setSwitch((s) => !s);

            await new Promise((r) => setTimeout(r, 1000));
        }
    });

    createEffect(
        on(props.trigger, (v) => {
            if (v) {
                setRoll(10);
            } else {
                setRoll(0);

                if (input().length != 0) {
                    focusInput();
                }
            }
        }),
    );

    return (
        <div class={rolln() == 0 ? "input-type" : ""}>
            <textarea
                id="hidden-input"
                onFocusOut={outFocusInput}
                onInput={(ev) => putGlyph(ev.target.value)}
            />
            {input() || isFocus() ? (
                <div id="view-box">
                    {input()
                        .split("\n")
                        .map((line, i) => {
                            if (i + 1 == input().split("\n").length) {
                                return (
                                    <div>
                                        <span class={line.length == 0 ? "nothing" : ""}>
                                            <Scramble
                                                maxPerRoll={rolln()}
                                                fillFirst={rolln() == 10}
                                                initialize={line}
                                                trigger={props.trigger}
                                                scale={props.scale}
                                                onClick={focusInput}
                                            >
                                                {line}
                                            </Scramble>
                                        </span>
                                        {isFocus() ? (
                                            <span class="view-cursor">
                                                <Scramble
                                                    maxPerRoll={rolln()}
                                                    fillFirst={rolln() == 10}
                                                    scale={props.scale}
                                                    onClick={focusInput}
                                                    alpha={swi() ? 120 : 60}
                                                >
                                                    |
                                                </Scramble>
                                            </span>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <div>
                                    <Scramble
                                        maxPerRoll={rolln()}
                                        fillFirst={rolln() == 10}
                                        initialize={line}
                                        trigger={props.trigger}
                                        scale={props.scale}
                                        onClick={focusInput}
                                    >
                                        {line}
                                    </Scramble>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <Scramble
                    scale={props.scale}
                    maxPerRoll={5}
                    onClick={focusInput}
                    alpha={swi() ? 120 : 60}
                >
                    _Click here._
                </Scramble>
            )}
        </div>
    );
};
