import { PxCanvas } from "./PxCanvas";
import { Scramble } from "./Scramble";
import { createSignal } from "solid-js";

export default () => {
    const [devHover, setDevHover] = createSignal(false);

    return (
        <div class="content">
            <input />
            <header>
                <Scramble trigger={() => true} scale={8} maxPerRoll={5}>
                    _Make Your Prescript._
                </Scramble>
            </header>
            <div class="view">
                <PxCanvas scale={8}>Hello</PxCanvas>
            </div>
            <div class="nav"></div>
            <footer>
                <div class="btn">
                    <Scramble
                        trigger={() => true}
                        scale={3}
                        maxPerRoll={10}
                        wait={3}
                        alpha={devHover() ? 60 : 255}
                        onPointerEnter={() => setDevHover(true)}
                        onPointerLeave={() => setDevHover(false)}
                    >
                        DEVELOP:TundraClimate
                    </Scramble>
                </div>
            </footer>
        </div>
    );
};
