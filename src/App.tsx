import { Scramble } from "./Scramble";
import { InputCanvas } from "./InputCanvas";
import { ButtonScramble } from "./ButtonCanvas";

export default () => {
    return (
        <div class="content">
            <header>
                <Scramble scale={8} maxPerRoll={5}>
                    _Make Your Prescript._
                </Scramble>
            </header>
            <div class="view">
                <InputCanvas scale={8} />
            </div>
            <footer>
                <ButtonScramble scale={3} maxPerRoll={10} wait={3}>
                    DEVELOP:TundraClimate
                </ButtonScramble>
            </footer>
        </div>
    );
};
