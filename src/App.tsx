import { PxCanvas } from "./PxCanvas";
import { Scramble } from "./Scramble";
import { createSignal } from "solid-js";

export default () => {
    const [trigger, setTrigger] = createSignal(true);

    return (
        <div>
            <Scramble trigger={trigger} maxPerRoll={20} wait={1}>
                Sacrifice is the easy path
            </Scramble>
            <br />
            <Scramble trigger={trigger} maxPerRoll={20} wait={1}>
                And S is not for sayonara
            </Scramble>
            <br />
            <Scramble trigger={trigger} maxPerRoll={20} wait={1}>
                Will you forgive me at last?
            </Scramble>
            <br />
            <button onClick={() => setTrigger((b) => !b)} />
            <br />
            <PxCanvas>0123456789</PxCanvas>
            <br />
            <PxCanvas>ABCDEFG</PxCanvas>
            <br />
            <PxCanvas>HIJKLMN</PxCanvas>
            <br />
            <PxCanvas>OPQRSTU</PxCanvas>
            <br />
            <PxCanvas>VWXYZ</PxCanvas>
            <br />
            <PxCanvas>abcdefg</PxCanvas>
            <br />
            <PxCanvas>hijklmn</PxCanvas>
            <br />
            <PxCanvas>opqrstu</PxCanvas>
            <br />
            <PxCanvas>vwxyz</PxCanvas>
            <br />
            <PxCanvas>,._</PxCanvas>
        </div>
    );
};
