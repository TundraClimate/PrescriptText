import { onMount, createEffect } from "solid-js";
import { is_available, gen_data } from "./wasm";

type PxCanvasProp = {
    children: string;
    scale?: number;
};

export const PxCanvas = ({ children, scale }: PxCanvasProp) => {
    let canvas!: HTMLCanvasElement;
    const calcScale = () => scale ?? 4;

    const text = () => {
        let res = "";

        [...children].forEach((child) => {
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

        [...children].forEach((child, i) => {
            const data = gen_data(child, calcScale())!;
            const img = new ImageData(new Uint8ClampedArray(data), charW, charH);

            ctx.putImageData(img, i * charW + i * pad, 0);
        });

        ctx.shadowColor = "rgba(80,180,255,0.8)";
        ctx.shadowBlur = 8;
        ctx.drawImage(canvas, 0, 0);
    };

    onMount(draw);
    createEffect(draw);

    return <canvas class="pxcanvas" ref={canvas} />;
};
