'use client'

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

function generationIdNum(id: string): string {
    let idNum: number = Number(id.slice(1));
    idNum++;
    return id.slice(0, 1).concat(idNum.toString());
}

const DrawCanvas = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const shape: Shape[] = shapeStateProps.shape;
    const point: Point[] = shapeStateProps.point;
    const line: Line[] = shapeStateProps.line;
    const CurrentId: CurrentId | undefined = shapeStateProps.currentId;
    const setShape = updateShapeStateProps.setShape;
    const setPoint = updateShapeStateProps.setPoint;
    const setLine = updateShapeStateProps.setLine;
    const setCurrentId = updateShapeStateProps.setCurrentId;

    function drawCanvasMoveEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement | null) {
        if (drawCanvas == null) return false;

        if (drawCanvas.getContext) {
            const drawCtx = drawCanvas.getContext("2d");

            if (drawCtx) {
                drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
                let offsetX: number = event.nativeEvent.offsetX;
                let offsetY: number = event.nativeEvent.offsetY;
console.log(offsetX);
console.log(offsetY);
                drawCtx.beginPath();
                drawCtx.moveTo(0, 0);
                drawCtx.lineTo(offsetX, offsetY);
                drawCtx.closePath();
                drawCtx.stroke();
            }
        }
    }

    function drawCanvasClickEventListener(event: React.MouseEvent, drawCanvas: HTMLCanvasElement | null) {
        if (drawCanvas == null) return false;

        if (drawCanvas.getContext) {
            const drawCtx = drawCanvas.getContext("2d");

            if (drawCtx) {
                let offsetX: number = event.nativeEvent.offsetX;
                let offsetY: number = event.nativeEvent.offsetY;

                // In case of shape's nonexistence
                if (CurrentId?.shape_id == undefined) {
                    // setShape((preShape: Shape[]) => [...preShape, {}]);


                } // In case of shape's existence
                else {
                    generationIdNum("s1111");
                    //
                }

            }
        }
    }

    useEffect(() => {
        // if (typeof window !== 'undefined' && 'OffscreenCanvas' in window) {
        //     const offscreenCanvas = new OffscreenCanvas(500, 500);
        // }

        if (drawCanvasRef.current) {
            const drawCanvas: HTMLCanvasElement = drawCanvasRef.current;

            drawCanvas.width = window.innerWidth;
            drawCanvas.height = window.innerWidth;

            const drawCtx = drawCanvas.getContext("2d");

            if (drawCtx) {
                drawCtx.beginPath();
                drawCtx.moveTo(0, 0);
                drawCtx.lineTo(50, 50);
                drawCtx.closePath();
                drawCtx.stroke();
            }

        }
    });

    return (
        <div>
            <canvas className={canvasStyle.canvas} id={canvasStyle.drawCanvas} ref={drawCanvasRef}
                    onClick={(event: React.MouseEvent) => drawCanvasClickEventListener(event, drawCanvasRef.current)}
                    onMouseMove={(event: React.MouseEvent) => drawCanvasMoveEventListener(event, drawCanvasRef.current)}></canvas>
        </div>

    )
};


export default DrawCanvas;