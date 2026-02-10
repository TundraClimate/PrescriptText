import { onMount, createEffect } from "solid-js";
import { is_available, gen_data, gen_cursor_data } from "./wasm";

type PxCanvasProp = {
    children: string;
    onClick?: () => void;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
    scale?: number;
    alpha?: number;
};

export const PxCanvas = (props: PxCanvasProp) => {
    let canvas!: HTMLCanvasElement;
    const calcScale = () => props.scale ?? 4;
    const calcAlpha = () => props.alpha ?? 255;

    const text = () => {
        let res = "";

        [...props.children].forEach((child) => {
            if (is_available(child)) {
                res += child;
            } else {
                res += " ";
            }
        });

        return res;
    };

    const draw = () => {
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;

        const textLen = text().length;

        const charW = 5 * calcScale();
        const charH = 9 * calcScale();
        const pad = 1 * calcScale();

        const width = textLen * charW + pad * (textLen - 1);
        const height = charH;

        canvas.width = width;
        canvas.height = height;

        ctx.clearRect(0, 0, width, height);

        [...props.children].forEach((child, i) => {
            let data = gen_data(child, calcScale(), calcAlpha())!;

            if (child == "|") {
                data = gen_cursor_data(calcScale(), calcAlpha());
            }

            const img = new ImageData(new Uint8ClampedArray(data), charW, charH);

            ctx.putImageData(img, i * charW + i * pad, 0);
        });

        ctx.shadowColor = "rgba(80,180,255,0.8)";
        ctx.shadowBlur = 8;
        ctx.drawImage(canvas, 0, 0);
    };

    onMount(draw);
    createEffect(draw);

    return (
        <canvas
            class="pxcanvas"
            ref={canvas}
            onClick={props.onClick}
            onPointerEnter={props.onPointerEnter}
            onPointerLeave={props.onPointerLeave}
        />
    );
};
