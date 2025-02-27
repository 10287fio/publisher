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
import {OperationEnum, ToolEnum, ShapeStatusEnum, ShapeTypeEnum} from '@/store/enum/shape.enum';

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
                        let setX: number = offsetX;
                        let setY: number = offsetY;
                        let radius: number = 0;

                        let foundPoint: Point | undefined;

                        let prePoint: { x: number, y: number } | undefined;
                        let prePoint2: { x: number, y: number } | undefined;
                        let curPoint: { x: number, y: number } = {x: offsetX, y: offsetY};

                        if (current?.tool == ToolEnum.Line) {
                            foundPoint = point.findLast(p => p.id == current?.cur_point_id);

                            prePoint = foundPoint?.shape_id == shapeId ? {
                                x: foundPoint.x,
                                y: foundPoint.y
                            } : undefined;

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
                        } else if (current?.tool == ToolEnum.Arc) {
                            let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

                            if (foundArc?.start_point_id && foundArc?.center_point_id == undefined && foundArc?.end_point_id == undefined) {
                                foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

                                prePoint = foundPoint ? {
                                    x: foundPoint.x,
                                    y: foundPoint.y
                                } : undefined;

                                if (prePoint != undefined) {
                                    drawCtx.beginPath();
                                    drawCtx.moveTo(prePoint.x, prePoint.y);
                                    drawCtx.lineTo(curPoint.x, curPoint.y);
                                    drawCtx.stroke();
                                }
                            } else if (foundArc?.start_point_id && foundArc?.center_point_id && foundArc?.radius && foundArc?.end_point_id == undefined) {
                                foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

                                prePoint = foundPoint ? {
                                    x: foundPoint.x,
                                    y: foundPoint.y
                                } : undefined;

                                foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

                                prePoint2 = foundPoint ? {
                                    x: foundPoint.x,
                                    y: foundPoint.y
                                } : undefined;

                                radius = foundArc.radius;

                                if (prePoint != undefined && prePoint2 != undefined) {
                                    drawCtx.beginPath();
                                    drawCtx.moveTo(prePoint.x, prePoint.y);
                                    drawCtx.lineTo(prePoint2.x, prePoint2.y);
                                    drawCtx.stroke();

                                    if (prePoint && radius) {
                                        let d: number = Math.sqrt((curPoint.x - prePoint2.x) ** 2 + (prePoint2.y - curPoint.y) ** 2);
                                        let endPointX: number = prePoint2.x + radius * ((curPoint.x - prePoint2.x) / d);
                                        let endPointY: number = prePoint2.y + radius * ((curPoint.y - prePoint2.y) / d);

                                        let endPoint: { x: number, y: number } = {
                                            x: endPointX,
                                            y: endPointY
                                        };

                                        drawCtx.beginPath();
                                        drawCtx.moveTo(prePoint2.x, prePoint2.y);
                                        drawCtx.lineTo(endPoint.x, endPoint.y);
                                        drawCtx.stroke();
                                    }
                                }


                            }

                        } else if (current?.tool == ToolEnum.Circle) {
                            let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

                            if (foundArc?.center_point_id && foundArc?.end_point_id == undefined) {
                                foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

                                prePoint = foundPoint ? {
                                    x: foundPoint.x,
                                    y: foundPoint.y
                                } : undefined;

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
                        } else if (current?.tool == ToolEnum.Arc) {
                            let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

                            if (foundArc == undefined) {
                                let arcId: string | undefined = arc.at(-1)?.id;

                                arcId = shapeUtil.generationId("a", arcId);

                                setPoint((prevPoints: PointArray) => [...prevPoints, {
                                    id: curPoint.id,
                                    shape_id: current?.shape_id,
                                    x: curPoint.x,
                                    y: curPoint.y,
                                    is_deleted: false,
                                    to_close: false
                                }]);

                                setArc((prevState: ArcArray) => [...prevState, {
                                    id: arcId,
                                    shape_id: shapeId,
                                    center_point_id: undefined,
                                    start_point_id: curPoint.id,
                                    end_point_id: undefined,
                                    radius: undefined
                                }]);

                                setCurrent((prevState: Current) => ({
                                    ...prevState,
                                    cur_point_id: curPoint.id,
                                    pre_point_id1: prevState.cur_point_id,
                                    pre_point_id2: prevState.pre_point_id1,
                                    pre_point_id3: prevState.pre_point_id2
                                }));
                            } else {
                                if (foundArc.center_point_id == undefined) {
                                    foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

                                    prePoint = foundPoint ? {
                                        id: foundPoint.id,
                                        x: foundPoint.x,
                                        y: foundPoint.y
                                    } : undefined;

                                    if (prePoint != undefined) {
                                        radius = Math.sqrt((curPoint.x - prePoint.x) ** 2 + (prePoint.y - curPoint.y) ** 2);

                                        setPoint((prevPoints: PointArray) => [...prevPoints, {
                                            id: curPoint.id,
                                            shape_id: current?.shape_id,
                                            x: curPoint.x,
                                            y: curPoint.y,
                                            is_deleted: false,
                                            to_close: false
                                        }]);

                                        setArc((prevState: ArcArray) => prevState.map(arc => arc.id == foundArc.id ?
                                            {
                                                ...arc,
                                                center_point_id: curPoint.id,
                                                radius: radius
                                            } : arc));

                                        setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                                            {...shape, status: ShapeStatusEnum.Inprogress} : shape));

                                        setCurrent((prevState: Current) => ({
                                            ...prevState,
                                            cur_point_id: curPoint.id,
                                            pre_point_id1: prevState.cur_point_id,
                                            pre_point_id2: prevState.pre_point_id1,
                                            pre_point_id3: prevState.pre_point_id2
                                        }));
                                    }
                                } else if (foundArc.end_point_id == undefined) {
                                    foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

                                    prePoint = foundPoint ? {
                                        id: foundPoint.id,
                                        x: foundPoint.x,
                                        y: foundPoint.y
                                    } : undefined;

                                    let radius: number | undefined = foundArc?.radius;

                                    if (prePoint && radius) {
                                        let d: number = Math.sqrt((curPoint.x - prePoint.x) ** 2 + (prePoint.y - curPoint.y) ** 2);
                                        let endPointX: number = prePoint.x + radius * ((curPoint.x - prePoint.x) / d);
                                        let endPointY: number = prePoint.y + radius * ((curPoint.y - prePoint.y) / d);

                                        let endPoint: { id: string, x: number, y: number } = {
                                            id: pointId,
                                            x: endPointX,
                                            y: endPointY
                                        };

                                        setPoint((prevPoints: PointArray) => [...prevPoints, {
                                            id: endPoint.id,
                                            shape_id: current?.shape_id,
                                            x: endPoint.x,
                                            y: endPoint.y,
                                            is_deleted: false,
                                            to_close: false
                                        }]);

                                        setArc((prevState: ArcArray) => prevState.map(arc => arc.shape_id == shapeId ?
                                            {...arc, end_point_id: endPoint.id} : arc));

                                        setCurrent((prevState: Current) => ({
                                            ...prevState,
                                            cur_point_id: endPoint.id,
                                            pre_point_id1: prevState.cur_point_id,
                                            pre_point_id2: prevState.pre_point_id1,
                                            pre_point_id3: prevState.pre_point_id2
                                        }));
                                    }
                                }
                            }
                        } else if (current?.tool == ToolEnum.Circle) {
                            let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

                            if (foundArc == undefined) {
                                let arcId: string | undefined = arc.at(-1)?.id;

                                arcId = shapeUtil.generationId("a", arcId);

                                setPoint((prevPoints: PointArray) => [...prevPoints, {
                                    id: curPoint.id,
                                    shape_id: current?.shape_id,
                                    x: curPoint.x,
                                    y: curPoint.y,
                                    is_deleted: false,
                                    to_close: false
                                }]);

                                setArc((prevState: ArcArray) => [...prevState, {
                                    id: arcId,
                                    shape_id: shapeId,
                                    center_point_id: curPoint.id,
                                    start_point_id: undefined,
                                    end_point_id: undefined,
                                    radius: undefined
                                }]);

                                setCurrent((prevState: Current) => ({
                                    ...prevState,
                                    cur_point_id: curPoint.id,
                                    pre_point_id1: prevState.cur_point_id,
                                    pre_point_id2: prevState.pre_point_id1,
                                    pre_point_id3: prevState.pre_point_id2
                                }));
                            } else {
                                if (foundArc.center_point_id == undefined) {
                                    setPoint((prevPoints: PointArray) => [...prevPoints, {
                                        id: curPoint.id,
                                        shape_id: current?.shape_id,
                                        x: curPoint.x,
                                        y: curPoint.y,
                                        is_deleted: false,
                                        to_close: false
                                    }]);

                                    setArc((prevState: ArcArray) => prevState.map(arc => arc.shape_id == shapeId ?
                                        {...arc, center_point_id: curPoint.id} : arc));

                                    setCurrent((prevState: Current) => ({
                                        ...prevState,
                                        cur_point_id: curPoint.id,
                                        pre_point_id1: prevState.cur_point_id,
                                        pre_point_id2: prevState.pre_point_id1,
                                        pre_point_id3: prevState.pre_point_id2
                                    }));
                                } else if (foundArc.end_point_id == undefined) {
                                    foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

                                    prePoint = foundPoint ? {
                                        id: foundPoint.id,
                                        x: foundPoint.x,
                                        y: foundPoint.y
                                    } : undefined;

                                    if (prePoint != undefined) {
                                        radius = Math.sqrt((curPoint.x - prePoint.x) ** 2 + (prePoint.y - curPoint.y) ** 2);

                                        setPoint((prevPoints: PointArray) => [...prevPoints, {
                                            id: curPoint.id,
                                            shape_id: current?.shape_id,
                                            x: curPoint.x,
                                            y: curPoint.y,
                                            is_deleted: false,
                                            to_close: false
                                        }]);

                                        setArc((prevState: ArcArray) => prevState.map(arc => arc.id == foundArc.id ?
                                            {
                                                ...arc,
                                                end_point_id: curPoint.id,
                                                radius: radius
                                            } : arc));

                                        setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                                            {...shape, status: ShapeStatusEnum.Closed, is_closed: true} : shape));

                                        setCurrent((prevState: Current) => ({
                                            ...prevState,
                                            cur_point_id: curPoint.id,
                                            pre_point_id1: prevState.cur_point_id,
                                            pre_point_id2: prevState.pre_point_id1,
                                            pre_point_id3: prevState.pre_point_id2
                                        }));
                                    }
                                } else {
                                    shapeUtil.cleanedUpCurrent(setCurrent);

                                    let shapeId = shapeUtil.shiftShape(current, setCurrent, shape, setShape);

                                    let arcId: string | undefined = arc.at(-1)?.id;

                                    arcId = shapeUtil.generationId("a", arcId);

                                    setPoint((prevPoints: PointArray) => [...prevPoints, {
                                        id: curPoint.id,
                                        shape_id: current?.shape_id,
                                        x: curPoint.x,
                                        y: curPoint.y,
                                        is_deleted: false,
                                        to_close: false
                                    }]);

                                    setArc((prevState: ArcArray) => [...prevState, {
                                        id: arcId,
                                        shape_id: shapeId,
                                        center_point_id: curPoint.id,
                                        start_point_id: undefined,
                                        end_point_id: undefined,
                                        radius: undefined
                                    }]);
                                }
                            }
                        }
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