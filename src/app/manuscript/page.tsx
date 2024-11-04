'use client';

import {useEffect, useRef} from "react";

export default function Manuscript(): JSX.Element {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if(canvasRef.current){
            const canvas = canvasRef.current;
            if(canvas.getContext){
                const context = canvas.getContext("2d");

                if(context){
                    context.strokeStyle = "blue";
                    context.strokeRect(0, 0, 150, 150);
                }
            }
        }
    }, []);

    const manuscript = <div>
        <canvas ref={canvasRef} id="canvas" width="200" height="200"></canvas>
    </div>;

    return manuscript;
};