import { PxCanvas } from "./PxCanvas";
import { Scramble } from "./Scramble";
import { ButtonScramble } from "./ButtonCanvas";

export default () => {
    return (
        <div class="content">
            <input />
            <header>
                <Scramble scale={8} maxPerRoll={5}>
                    _Make Your Prescript._
                </Scramble>
            </header>
            <div class="view">
                <PxCanvas scale={8}>Hello</PxCanvas>
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
