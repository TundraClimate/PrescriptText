import { PxCanvas } from "./PxCanvas";
import { Scramble } from "./Scramble";
import { ButtonScramble } from "./ButtonCanvas";
import { onMount } from "solid-js";

export default () => {
    const focusInput = () => {
        document.getElementById("hidden-input")!.focus();
    };

    onMount(focusInput);

    return (
        <div class="content">
            <input id="hidden-input" onInput={(input) => console.log(input.data)} />
            <header>
                <Scramble scale={8} maxPerRoll={5}>
                    _Make Your Prescript._
                </Scramble>
            </header>
            <div class="view">
                <PxCanvas scale={8} onClick={focusInput}>
                    Hello
                </PxCanvas>
            </div>
            <div class="nav"></div>
            <footer>
                <ButtonScramble scale={3} maxPerRoll={10} wait={3}>
                    DEVELOP:TundraClimate
                </ButtonScramble>
            </footer>
        </div>
    );
};
