import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect, MouseEvent} from 'react';
import {
    Draw,
    Reserve,
    Result,
    Shape,
    Point,
    Line,
    Arc,
    CurrentId,
    ShapeStateProps,
    ShapeChildComponentProps
} from '@/ts';

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
    const point: Point[] = shapeStateProps.point;
    const setPoint = updateShapeStateProps.setPoint;

    function test() {
        updateShapeStateProps.setReserve("test");
    }

    function drawcanvasMoveEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement) {
        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

        offsetX = event.offsetX;
        offsetY = event.offsetY;

        drawCtx.beginPath();
        drawCtx.moveTo(0, 0);
        drawCtx.lineTo(offsetX, offsetY);
        drawCtx.closePath();
        drawCtx.stroke();

    }

    function drawcanvasClickEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement) {
        let offsetX = event.offsetX;
        let offsetY = event.offsetY;

        console.log(point.at(-1));

        // setPoint([...point, {
        //     id: "p1",
        //     shape_id: "s1",
        //     x: 200,
        //     y: 200
        // }]);
    }

    useEffect(() => {
        if (drawCanvasRef.current) {
            const drawCanvas: HTMLCanvasElement = drawCanvasRef.current;

            drawCanvas.width = window.innerWidth;
            drawCanvas.height = window.innerWidth;

            if (drawCanvas.getContext) {
                const drawCtx = drawCanvas.getContext("2d");

                if (drawCtx) {
                    drawCtx.strokeStyle = "blue";

                    const handleMouseMove =

                        drawCanvas.addEventListener("mousemove", (event: MouseEvent) => {
                            drawcanvasMoveEventListener(event, drawCanvas);
                        });

                    drawCanvas.addEventListener("click", (event: Event) => {
                        drawcanvasClickEventListener(event, drawCanvas)
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