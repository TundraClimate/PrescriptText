import { createSignal } from "solid-js";
import { Scramble } from "./Scramble";

type BtnCanvasProps = {
    children: string;
    trigger?: () => boolean;
    onClick?: () => void;
    maxPerRoll?: number;
    wait?: number;
    scale?: number;
};

export const ButtonScramble = (props: BtnCanvasProps) => {
    const [hover, setHover] = createSignal(false);

    return (
        <div class="btn">
            <Scramble
                trigger={props.trigger}
                onClick={props.onClick}
                maxPerRoll={props.maxPerRoll}
                wait={props.wait}
                scale={props.scale}
                alpha={hover() ? 60 : 255}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
            >
                {props.children}
            </Scramble>
        </div>
    );
};
