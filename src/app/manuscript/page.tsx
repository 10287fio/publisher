'use client';

import {useEffect, useRef} from "react";

export default function Manuscript(): JSX.Element {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if(canvasRef.current){
            const canvas = canvasRef.current;
            if(canvas.getContext){
                const ctx = canvas.getContext("2d");

                let offsetX;
                let offsetY;

                if(ctx){
                    ctx.strokeStyle = "blue";
                    ctx.strokeRect(0, 0, 150, 150);
                    canvas.addEventListener("mousemove", (e:MouseEvent) => {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        offsetX = e.offsetX;
                        offsetY = e.offsetY;

                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(offsetX, offsetY);
                        ctx.closePath();
                        ctx.stroke();
                    });
                }
            }
        }
    }, []);

    const manuscript = <div>
        <canvas ref={canvasRef} id="canvas" width="1000" height="1000"></canvas>
    </div>;

    return manuscript;
};