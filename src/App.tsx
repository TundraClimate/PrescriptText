import { Scramble } from "./Scramble";

export default () => {
    return (
        <div class="content">
            <header>
                <Scramble trigger={() => true} scale={8} maxPerRoll={5}>
                    _Make Your Prescript._
                </Scramble>
            </header>
            <footer>
                <Scramble trigger={() => true} scale={3} maxPerRoll={10} wait={3}>
                    DEVELOP:TundraClimate
                </Scramble>
            </footer>
        </div>
    );
};
