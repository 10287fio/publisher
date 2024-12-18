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
    CanvasComponentProps
} from '@/ts';
import DisplayGesso from '@/component/gesso/DisplayGesso';
import MagnifierGesso from '@/component/gesso/MagnifierGesso';

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

const DrawCanvas: React.FC<CanvasComponentProps> = ({shapeStateProps, updateShapeStateProps}) => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const point: Point[] = shapeStateProps.point;
    const setPoint = updateShapeStateProps.setPoint;

    function test() {
        updateShapeStateProps.setReserve("test");
    }

    function drawcanvasMoveEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement | null) {
        if (drawCanvas == null) return false;

        if (drawCanvas.getContext) {
            const drawCtx = drawCanvas.getContext("2d");

            if (drawCtx) {
                drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
                let offsetX: number = event.nativeEvent.offsetX;
                let offsetY: number = event.nativeEvent.offsetY;

                drawCtx.beginPath();
                drawCtx.moveTo(0, 0);
                drawCtx.lineTo(offsetX, offsetY);
                drawCtx.closePath();
                drawCtx.stroke();
            }
        }
    }

    function drawcanvasClickEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement) {
        // let offsetX = event.offsetX;
        // let offsetY = event.offsetY;

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

        }
    });

    return (
        <canvas className={sketchbookStyle.canvas} id={canvasStyle.drawCanvas} ref={drawCanvasRef}
                onMouseMove={(event: MouseEvent) => drawcanvasMoveEventListener(event, drawCanvasRef.current)}></canvas>
    )
};


export default DrawCanvas;