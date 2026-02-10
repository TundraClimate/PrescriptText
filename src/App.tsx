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
                <ButtonScramble scale={3} maxPerRoll={10} wait={3}>
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
                <ButtonScramble scale={3} maxPerRoll={10} wait={3}>
                    Download
                </ButtonScramble>
            </footer>
        </div>
    );
};
