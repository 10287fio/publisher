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
import {OperationEnum, ToolEnum, ShapeStatusEnum} from '@/store/enum/shape.enum';

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

                    drawCtx.fillStyle = "pink";
                    drawCtx.strokeStyle = "red";
                    drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

                    let offsetX: number = event.nativeEvent.offsetX;
                    let offsetY: number = event.nativeEvent.offsetY;
                    let setX: number = offsetX;
                    let setY: number = offsetY;
                    let radius: number = 0;

                    let foundPoint: Point | undefined = point.findLast(p => p.id == current?.cur_point_id);

                    let prePoint: { x: number, y: number } | undefined = foundPoint ? {
                        x: foundPoint.x,
                        y: foundPoint.y
                    } : undefined;

                    let curPoint: { x: number, y: number } = {x: offsetX, y: offsetY};

                    if (current?.tool == ToolEnum.Line) {
                        if (prePoint != undefined) {
                            if (current?.operation == OperationEnum.AP_Preset) {
                                if (shapeUtil.calQuadCoord(prePoint, curPoint) == "x") {
                                    setX = curPoint.x;
                                    setY = prePoint.y;
                                } else if (shapeUtil.calQuadCoord(prePoint, curPoint) == "y") {
                                    setX = prePoint.x;
                                    setY = curPoint.y;
                                }
                            }

                            drawCtx.beginPath();
                            drawCtx.moveTo(prePoint.x, prePoint.y);
                            drawCtx.lineTo(setX, setY);
                            drawCtx.stroke();
                        }

                        drawCtx.beginPath();
                        drawCtx.arc(setX, setY, 5, 0, 2 * Math.PI);
                        drawCtx.fill();

                    } else if (current?.tool == ToolEnum.Circle) {
                        if (prePoint != undefined) {
                            radius = Math.sqrt((curPoint.x - prePoint.x) ** 2 + (prePoint.y - curPoint.y) ** 2);

                            setX = prePoint.x;
                            setY = prePoint.y;

                            drawCtx.beginPath();
                            drawCtx.arc(setX, setY, radius, 0, 2 * Math.PI);
                            drawCtx.stroke();
                        }
                    }
                }
            }
        }

        function drawCanvasClickEventListener(event: React.MouseEvent, drawCanvas: HTMLCanvasElement | null) {
            if (drawCanvas == null) return false;

            if (current != undefined && current?.shape_id && !shapeUtil.checkFinal(current.shape_status)) {
                if (drawCanvas.getContext) {
                    const drawCtx = drawCanvas.getContext("2d");

                    if (drawCtx) {
                        let pointId: string = "";

                        if (current?.cur_point_id == undefined) {
                            pointId = "p1";
                        } else {
                            pointId = shapeUtil.generationIdNum(current.cur_point_id);
                        }

                        let offsetX: number = event.nativeEvent.offsetX;
                        let offsetY: number = event.nativeEvent.offsetY;
                        let setX: number = offsetX;
                        let setY: number = offsetY;
                        let radius: number = 0;

                        let foundPoint: Point | undefined = point.findLast(p => p.id == current?.cur_point_id);

                        let prePoint: { x: number, y: number } | undefined = foundPoint ? {
                            x: foundPoint.x,
                            y: foundPoint.y
                        } : undefined;

                        let curPoint: { x: number, y: number } = {x: offsetX, y: offsetY};

                        if (current?.tool == ToolEnum.Line) {
                            if (prePoint != undefined) {
                                if (current?.operation == OperationEnum.AP_Preset) {
                                    if (shapeUtil.calQuadCoord(prePoint, curPoint) == "x") {
                                        setX = curPoint.x;
                                        setY = prePoint.y;
                                    } else if (shapeUtil.calQuadCoord(prePoint, curPoint) == "y") {
                                        setX = prePoint.x;
                                        setY = curPoint.y;
                                    }
                                }
                            }
                        } else if (current?.tool == ToolEnum.Circle) {
                        }

                        setPoint((prevPoints: PointArray) => [...prevPoints, {
                            id: pointId,
                            shape_id: current?.shape_id,
                            x: setX,
                            y: setY,
                            is_deleted: false,
                            to_close: false
                        }]);

                        setCurrent((prevState: Current) => ({
                            ...prevState,
                            cur_point_id: pointId,
                            pre_point_id1: prevState.cur_point_id,
                            pre_point_id2: prevState.pre_point_id1,
                            pre_point_id3: prevState.pre_point_id2
                        }));
                    }
                }
            }
        }

        useEffect(() => {
        });

        return (
            <>
                <canvas id={sketchbookStyle.drawCanvas} ref={drawCanvasRef} className={sketchbookStyle.canvas}
                        width={"2000px"} height={"2000px"}
                        onClick={(event: React.MouseEvent) => drawCanvasClickEventListener(event, drawCanvasRef.current)}
                        onMouseMove={(event: React.MouseEvent) => drawCanvasMoveEventListener(event, drawCanvasRef.current)}></canvas>
            </>
        );
    }
;


export default DrawCanvas;