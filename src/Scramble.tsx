import { PxCanvas } from "./PxCanvas";
import { createSignal, createEffect, on } from "solid-js";
import { roll_glyph, roll_random } from "./wasm";

type ScrambleProps = {
    children: string;
    trigger?: () => boolean;
    onClick?: () => void;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
    maxPerRoll?: number;
    wait?: number;
    scale?: number;
    alpha?: number;
};

export const Scramble = (props: ScrambleProps) => {
    const [scramble, setScramble] = createSignal("");
    const text = () => props.children;
    const wait = () => props.wait ?? 0;
    const scale = () => props.scale ?? 4;
    const maxPerRoll = () => props.maxPerRoll ?? 10;

    const startScramble = async () => {
        setScramble("");

        const textLen = text().length;

        if (wait() != 0) {
            let tmpScramble = Array.from(scramble());
            const endTime = Date.now() + wait() * 1000;

            while (endTime > Date.now()) {
                for (let i = 0; textLen > i; i++) {
                    tmpScramble[i] = roll_random();
                }

                setScramble(tmpScramble.join(""));

                await new Promise((r) => setTimeout(r, 0));
            }
        }

        for (let i = 0; textLen > i; i++) {
            const rolled = roll_glyph(text()[i]!, maxPerRoll());
            let tmpScramble = Array.from(scramble());

            for (let char of rolled) {
                tmpScramble[i] = char;

                if (i + 1 != textLen) {
                    for (let j = i + 1; textLen > j; j++) {
                        tmpScramble[j] = roll_random();
                    }
                }

                setScramble(tmpScramble.join(""));
                await new Promise((r) => setTimeout(r, 10));
            }
        }
    };

    createEffect(
        on([props.trigger ? props.trigger : () => true], () => {
            startScramble();
        }),
    );

    return (
        <PxCanvas
            scale={scale()}
            alpha={props.alpha}
            onClick={props.onClick}
            onPointerEnter={props.onPointerEnter}
            onPointerLeave={props.onPointerLeave}
        >
            {scramble()}
        </PxCanvas>
    );
};
