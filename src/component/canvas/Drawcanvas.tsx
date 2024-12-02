import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect} from 'react';
import {Draw, Reserve, Result, Shape, Point, Line, Arc, CurrentId, ShapeStateProps, ShapeChildComponentProps} from '@/ts';

function calQuadCoord(lastPoint: { x: number, y: number }, x: number, y: number) {
    if (((lastPoint?.x < x) && (lastPoint?.y > y)) || ((lastPoint?.x > x) && (lastPoint?.y < y))) {
        if ((Math.round((y - lastPoint?.y) / (x - lastPoint?.x) * 10) / 10) > -1) {
            return "x";
        } else {
            return "y";
        }
    } else if (((lastPoint?.x < x) && (lastPoint?.y < y)) || ((lastPoint?.x > x) && (lastPoint?.y > y))) {
        if ((Math.round((y - lastPoint?.y) / (x - lastPoint?.x) * 10) / 10) < 1) {
            return "x";
        } else {
            return "y";
        }
    }

    return "x";
}

const Drawcanvas: React.FC<ShapeChildComponentProps> = ({shapeStateProps, updateShapeStateProps}) => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        console.log(shapeStateProps.reserve);

        if (drawCanvasRef.current) {
            const drawCanvas: HTMLCanvasElement = drawCanvasRef.current;

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

                    drawCanvas.addEventListener("click", () => {

                    });
                }
            }
        }
    });

    return (
        <canvas className={sketchbookStyle.canvas} id={canvasStyle.drawCanvas} ref={drawCanvasRef}></canvas>
    )
};

export default Drawcanvas;