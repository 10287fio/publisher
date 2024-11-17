import canvasStyle from '@/component/canvas/Canvas.module.scss';
import {useRef, useEffect} from 'react';

const Drawcanvas = (): JSX.Element => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (drawCanvasRef.current) {
            const drawCanvas:HTMLCanvasElement = drawCanvasRef.current;

            drawCanvas.width = window.innerWidth;
            drawCanvas.height = window.innerWidth;

            if (drawCanvas.getContext) {
                const drawCtx = drawCanvas.getContext("2d");

                if (drawCtx) {
                    let offsetX;
                    let offsetY;

                    drawCtx.strokeStyle = "blue";
                    drawCtx.strokeRect(0, 0, 150, 150);

                    drawCanvas.addEventListener("mousemove", (e: MouseEvent) => {
                        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

                        offsetX = e.offsetX;
                        offsetY = e.offsetY;

                        drawCtx.beginPath();
                        drawCtx.moveTo(0, 0);
                        drawCtx.lineTo(offsetX, offsetY);
                        drawCtx.closePath();
                        drawCtx.stroke();
                    });
                }
            }
        }
    });

    return (
        <canvas className={canvasStyle.canvas} id={canvasStyle.drawCanvas} ref={drawCanvasRef}></canvas>
    )
};

export default Drawcanvas;