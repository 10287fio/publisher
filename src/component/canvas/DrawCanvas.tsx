'use client'

import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {MouseEvent, useEffect, useRef} from 'react';
import {
    CanvasComponentProps,
    Current,
    DrawCanvasClickListenerProps,
    DrawCanvasMoveListenerProps,
    PointArray
} from '@/ts';
import shapeUtil from '@/util/shape.util';
import {ToolEnum} from '@/store/enum/shape.enum';
import {
    arcClickListener,
    arcMoveListener,
    circleClickListener,
    circleMoveListener,
    lineClickListener,
    lineMoveListener
} from '@/component/canvas/ts/drawCanvasListener';

const DrawCanvas = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {
        const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
        const point: PointArray = shapeStateProps.point;
        const current: Current | undefined = shapeStateProps.current;

        function drawCanvasMoveEventListener(event: MouseEvent, drawCanvas: HTMLCanvasElement | null) {
            if (drawCanvas == null) return false;

            const shapeId: string | undefined = current?.shape_id;

            if (current != undefined && shapeId != undefined && !shapeUtil.checkFinal(current.shape_status)) {
                if (drawCanvas.getContext) {
                    const drawCtx = drawCanvas.getContext("2d");

                    if (drawCtx) {
                        drawCtx.fillStyle = "pink";
                        drawCtx.strokeStyle = "red";
                        drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

                        let offsetX: number = event.nativeEvent.offsetX;
                        let offsetY: number = event.nativeEvent.offsetY;
                        offsetY = drawCanvas.height - offsetY;

                        let setX: number = offsetX;
                        let setY: number = offsetY;

                        let curPoint: { x: number, y: number } = {x: offsetX, y: offsetY};

                        const drawCanvasMoveListenerProps: DrawCanvasMoveListenerProps = {
                            shapeStateProps, shapeId, curPoint, drawCtx
                        };

                        if (current?.tool == ToolEnum.Line) {
                            let setPoint: {
                                setX: number,
                                setY: number
                            } | undefined = lineMoveListener(drawCanvasMoveListenerProps);

                            if (setPoint != undefined) {
                                setX = setPoint.setX;
                                setY = setPoint.setY;
                            }
                        } else if (current?.tool == ToolEnum.Arc) {
                            arcMoveListener(drawCanvasMoveListenerProps);

                        } else if (current?.tool == ToolEnum.Circle) {
                            let setPoint: {
                                setX: number,
                                setY: number
                            } | undefined = circleMoveListener(drawCanvasMoveListenerProps);

                            if (setPoint != undefined) {
                                setX = setPoint.setX;
                                setY = setPoint.setY;
                            }
                        }

                        drawCtx.beginPath();
                        drawCtx.arc(setX, setY, 5, 0, 2 * Math.PI);
                        drawCtx.fill();
                    }
                }
            }
        }

        function drawCanvasClickEventListener(event: React.MouseEvent, drawCanvas: HTMLCanvasElement | null) {
            if (drawCanvas == null) return false;

            const shapeId: string | undefined = current?.shape_id;

            if (current != undefined && shapeId != undefined && !shapeUtil.checkFinal(current.shape_status)) {
                if (drawCanvas.getContext) {
                    const drawCtx = drawCanvas.getContext("2d");

                    if (drawCtx) {
                        let pointId: string | undefined = point.at(-1)?.id;

                        pointId = shapeUtil.generationId("p", pointId);

                        let offsetX: number = event.nativeEvent.offsetX;
                        let offsetY: number = event.nativeEvent.offsetY;

                        offsetY = drawCanvas.height - offsetY;

                        let curPoint: { id: string, x: number, y: number } = {
                            id: pointId,
                            x: offsetX,
                            y: offsetY
                        };

                        const drawCanvasClickListenerProps: DrawCanvasClickListenerProps = {
                            shapeStateProps, updateShapeStateProps, shapeId, curPoint, drawCtx
                        };

                        if (current?.tool == ToolEnum.Line) {
                            lineClickListener(drawCanvasClickListenerProps);

                        } else if (current?.tool == ToolEnum.Arc) {
                            arcClickListener(drawCanvasClickListenerProps);

                        } else if (current?.tool == ToolEnum.Circle) {
                            circleClickListener(drawCanvasClickListenerProps);

                        }
                    }
                }
            }
        }

        useEffect(() => {
            shapeUtil.invertYAxis(drawCanvasRef.current);

            return () => {
                shapeUtil.invertYAxis(drawCanvasRef.current);
            }
        }, []);

        return (
            <>
                <canvas id={sketchbookStyle.drawCanvas} ref={drawCanvasRef} className={sketchbookStyle.canvas}
                        width={"1000px"} height={"1000px"}
                        onClick={(event: React.MouseEvent) => drawCanvasClickEventListener(event, drawCanvasRef.current)}
                        onMouseMove={(event: React.MouseEvent) => drawCanvasMoveEventListener(event, drawCanvasRef.current)}></canvas>
            </>
        );
    }
;


export default DrawCanvas;