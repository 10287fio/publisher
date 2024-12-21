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

function generationID() {

}

const DrawCanvas: React.FC<CanvasComponentProps> = ({shapeStateProps, updateShapeStateProps}) => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const shape: Shape[] = shapeStateProps.shape;
    const point: Point[] = shapeStateProps.point;
    const line: Line[] = shapeStateProps.line;
    const CurrentId: CurrentId | undefined = shapeStateProps.currentId;
    const setShape = updateShapeStateProps.setShape;
    const setPoint = updateShapeStateProps.setPoint;
    const setLine = updateShapeStateProps.setLine;
    const setCurrentId = updateShapeStateProps.setCurrentId;

    function test() {
        updateShapeStateProps.setReserve("test");
    }

    function drawCanvasMoveEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement | null) {
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

    function drawCanvasClickEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement | null) {
        if (drawCanvas == null) return false;

        if (drawCanvas.getContext) {
            const drawCtx = drawCanvas.getContext("2d");

            if (drawCtx) {
                let offsetX: number = event.nativeEvent.offsetX;
                let offsetY: number = event.nativeEvent.offsetY;

            }
        }
    }

    useEffect(() => {
        if (drawCanvasRef.current) {
            const drawCanvas: HTMLCanvasElement = drawCanvasRef.current;

            drawCanvas.width = window.innerWidth;
            drawCanvas.height = window.innerWidth;

        }
    });

    return (
        <>
            <canvas className={sketchbookStyle.canvas} id={canvasStyle.drawCanvas} ref={drawCanvasRef}
                    onMouseMove={(event: MouseEvent) => drawCanvasMoveEventListener(event, drawCanvasRef.current)}
                    onClick={(event: MouseEvent) => drawCanvasClickEventListener(event, drawCanvasRef.current)}></canvas>
        </>

    )
};


export default DrawCanvas;