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
    ArcArray,
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
        const arc: ArcArray = shapeStateProps.arc;
        const current: Current | undefined = shapeStateProps.current;
        const setShape: Dispatch<SetStateAction<ShapeArray>> = updateShapeStateProps.setShape;
        const setPoint: Dispatch<SetStateAction<PointArray>> = updateShapeStateProps.setPoint;
        const setLine: Dispatch<SetStateAction<LineArray>> = updateShapeStateProps.setLine;
        const setArc: Dispatch<SetStateAction<ArcArray>> = updateShapeStateProps.setArc;
        const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;


        const shapeId: string | undefined = current.shape_id;

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


            if (current != undefined && shapeId != undefined && !shapeUtil.checkFinal(current.shape_status)) {
                if (drawCanvas.getContext) {
                    const drawCtx = drawCanvas.getContext("2d");

                    if (drawCtx) {
                        let pointId: string | undefined = point.at(-1)?.id;

                        if (pointId == undefined) {
                            pointId = "p1";
                        } else {
                            pointId = shapeUtil.generationIdNum(pointId);
                        }

                        let offsetX: number = event.nativeEvent.offsetX;
                        let offsetY: number = event.nativeEvent.offsetY;
                        let radius: number = 0;

                        let foundPoint: Point | undefined;

                        let prePoint: { id: string, x: number, y: number } | undefined;

                        let curPoint: { id: string, x: number, y: number } = {
                            id: pointId,
                            x: offsetX,
                            y: offsetY
                        };

                        if (current?.tool == ToolEnum.Line) {

                            foundPoint = point.findLast(p => p.id == current?.cur_point_id);

                            prePoint = foundPoint ? {
                                id: foundPoint.id,
                                x: foundPoint.x,
                                y: foundPoint.y
                            } : undefined;

                            if (prePoint != undefined) {
                                if (current?.operation == OperationEnum.AP_Preset) {
                                    if (shapeUtil.calQuadCoord(prePoint, curPoint) == "x") {
                                        curPoint.y = prePoint.y;
                                    } else if (shapeUtil.calQuadCoord(prePoint, curPoint) == "y") {
                                        curPoint.x = prePoint.x;
                                    }
                                }
                            }
                        } else if (current?.tool == ToolEnum.Circle) {
                            let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

                            if (foundArc == undefined) {

                                let arcId: string | undefined = arc.at(-1)?.id;

                                if (arcId == undefined) {
                                    arcId = "a1";
                                } else {
                                    arcId = shapeUtil.generationIdNum(arcId);
                                }

                                setArc((prevState: ArcArray) => [...prevState, {
                                    id: arcId,
                                    shape_id: shapeId,
                                    center_point_id: curPoint.id,
                                    start_point_id: undefined,
                                    end_point_id: undefined,
                                    radius: undefined
                                }]);
                            } else {
                                if (foundArc.start_point_id == undefined) {
                                    setArc((prevState: ArcArray) => prevState.map(arc => arc.shape_id == shapeId ?
                                        {...arc, center_point_id: curPoint.id} : arc));
                                } else if (foundArc.end_point_id == undefined) {
                                    foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

                                    prePoint = foundPoint ? {
                                        id: foundPoint.id,
                                        x: foundPoint.x,
                                        y: foundPoint.y
                                    } : undefined;

                                    if (prePoint != undefined) {
                                        let arcId: string | undefined = arc.findLast(a => a.shape_id == shapeId)?.id;

                                        if (arcId != undefined) {
                                            radius = Math.sqrt((curPoint.x - prePoint.x) ** 2 + (prePoint.y - curPoint.y) ** 2);

                                            setArc((prevState: ArcArray) => prevState.map(arc => arc.id == arcId ? {
                                                ...arc,
                                                end_point_id: curPoint.id,
                                                radius: radius
                                            } : arc));
                                        }
                                    }
                                }
                            }
                        }

                        setPoint((prevPoints: PointArray) => [...prevPoints, {
                            id: curPoint.id,
                            shape_id: current?.shape_id,
                            x: curPoint.x,
                            y: curPoint.y,
                            is_deleted: false,
                            to_close: false
                        }]);

                        setCurrent((prevState: Current) => ({
                            ...prevState,
                            cur_point_id: curPoint.id,
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