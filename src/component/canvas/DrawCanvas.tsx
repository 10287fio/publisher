'use client'

import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect, MouseEvent, Dispatch, SetStateAction} from 'react';
import {
    Draw,
    Reserve,
    Result,
    Shape,
    ShapeArray,
    Point,
    PointArray,
    Line,
    LineArray,
    Arc,
    Current,
    ShapeStateProps,
    CanvasComponentProps
} from '@/ts';
import shapeUtil from '@/util/shape.util';

const DrawCanvas = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const shape: ShapeArray = shapeStateProps.shape;
    const point: PointArray = shapeStateProps.point;
    const line: LineArray = shapeStateProps.line;
    const current: Current | undefined = shapeStateProps.current;
    const setShape: Dispatch<SetStateAction<ShapeArray>> = updateShapeStateProps.setShape;
    const setPoint: Dispatch<SetStateAction<PointArray>> = updateShapeStateProps.setPoint;
    const setLine: Dispatch<SetStateAction<LineArray>> = updateShapeStateProps.setLine;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

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

    function drawCanvasClickEventListener(event: React.MouseEvent, drawCanvas: HTMLCanvasElement | null) {
        if (drawCanvas == null) return false;

        if (current != undefined && current?.shape_id && !shapeUtil.checkFinal(current.shape_status)) {
            if (drawCanvas.getContext) {
                const drawCtx = drawCanvas.getContext("2d");

                if (drawCtx) {
                    let offsetX: number = event.nativeEvent.offsetX;
                    let offsetY: number = event.nativeEvent.offsetY;

                    setPoint((prevPoints: PointArray) => [...prevPoints, {
                        id: "p1",
                        shape_id: current?.shape_id,
                        x: offsetX,
                        y: offsetY,
                        is_deleted: false,
                        to_close: false
                    }]);
                }
            }
        }
    }

    useEffect(() => {
        // if (typeof window !== 'undefined' && 'OffscreenCanvas' in window) {
        //     const offscreenCanvas = new OffscreenCanvas(500, 500);
        // }

        console.log(point);

        if (drawCanvasRef.current) {
            const drawCanvas: HTMLCanvasElement = drawCanvasRef.current;

            drawCanvas.width = 2000;
            drawCanvas.height = 2000;

            const drawCtx = drawCanvas.getContext("2d");

        }
    });

    return (
        <>
            <canvas id={sketchbookStyle.drawCanvas} ref={drawCanvasRef} className={sketchbookStyle.canvas}
                    onClick={(event: React.MouseEvent) => drawCanvasClickEventListener(event, drawCanvasRef.current)}
                    onMouseMove={(event: React.MouseEvent) => drawCanvasMoveEventListener(event, drawCanvasRef.current)}></canvas>
        </>
    );
};


export default DrawCanvas;