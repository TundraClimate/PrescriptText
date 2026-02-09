import { PxCanvas } from "./PxCanvas";
import { createSignal, createEffect, on } from "solid-js";
import { roll_glyph, roll_random } from "./wasm";

type ScrambleProps = {
    children: string;
    trigger: () => boolean;
    maxPerRoll?: number;
    scale?: number;
};

export const Scramble = (props: ScrambleProps) => {
    const [scramble, setScramble] = createSignal("");

    const startScramble = async () => {
        setScramble("");

        for (let i = 0; props.children.length > i; i++) {
            const rolled = roll_glyph(props.children[i]!, props.maxPerRoll ?? 10);
            let tmpScramble = Array.from(scramble());

            for (let char of rolled) {
                tmpScramble[i] = char;

                if (i + 1 != props.children.length) {
                    for (let j = i + 1; props.children.length > j; j++) {
                        tmpScramble[j] = roll_random();
                    }
                }

                setScramble(tmpScramble.join(""));
                await new Promise((r) => setTimeout(r, 10));
            }
        }
    };

    createEffect(
        on([props.trigger], () => {
            startScramble();
        }),
    );

    return <PxCanvas scale={props.scale ?? 4}>{scramble()}</PxCanvas>;
};
