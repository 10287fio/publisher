import {
    ArcArray,
    Current,
    DrawCanvasMoveListenerProps,
    Shape,
    Point,
    PointArray,
    Arc,
    DrawCanvasClickListenerProps, ShapeArray, LineArray
} from '@/ts';
import {ShapeTypeEnum, OperationEnum, ShapeStatusEnum} from '@/store/enum/shape.enum';
import shapeUtil from '@/util/shape.util';
import {Dispatch, SetStateAction} from 'react';

function lineMoveListener({
                              shapeStateProps,
                              shapeId,
                              curPoint,
                              drawCtx
                          }: DrawCanvasMoveListenerProps): { setX: number, setY: number } {
    const point: PointArray = shapeStateProps.point;
    const current: Current | undefined = shapeStateProps.current;

    let foundPoint: Point | undefined;
    let prePoint: { x: number, y: number } | undefined;

    let setX: number = curPoint.x;
    let setY: number = curPoint.y;

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

    return {setX, setY};
}

function arcMoveListener({
                             shapeStateProps,
                             shapeId,
                             curPoint,
                             drawCtx
                         }: DrawCanvasMoveListenerProps) {
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;

    let startPoint: { x: number, y: number } | undefined;
    let centerPoint: { x: number, y: number } | undefined;
    let radius: number = 0;

    let foundPoint: Point | undefined;
    let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

    if (foundArc?.start_point_id != undefined && foundArc?.center_point_id == undefined && foundArc?.end_point_id == undefined) {
        foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

        startPoint = foundPoint ? {
            x: foundPoint.x,
            y: foundPoint.y
        } : undefined;

        if (startPoint != undefined) {
            drawCtx.beginPath();
            drawCtx.moveTo(startPoint.x, startPoint.y);
            drawCtx.lineTo(curPoint.x, curPoint.y);
            drawCtx.stroke();
        }
    } else if (foundArc?.start_point_id != undefined && foundArc?.center_point_id != undefined && foundArc?.radius != undefined && foundArc?.end_point_id == undefined) {
        foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

        startPoint = foundPoint ? {
            x: foundPoint.x,
            y: foundPoint.y
        } : undefined;

        foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

        centerPoint = foundPoint ? {
            x: foundPoint.x,
            y: foundPoint.y
        } : undefined;

        radius = foundArc.radius;

        if (startPoint != undefined && centerPoint != undefined) {
            drawCtx.beginPath();
            drawCtx.moveTo(startPoint.x, startPoint.y);
            drawCtx.lineTo(centerPoint.x, centerPoint.y);
            drawCtx.stroke();

            if (startPoint && radius) {
                let d: number = Math.sqrt((curPoint.x - centerPoint.x) ** 2 + (centerPoint.y - curPoint.y) ** 2);
                let endPointX: number = centerPoint.x + radius * ((curPoint.x - centerPoint.x) / d);
                let endPointY: number = centerPoint.y + radius * ((curPoint.y - centerPoint.y) / d);

                let endPoint: { x: number, y: number } = {
                    x: endPointX,
                    y: endPointY
                };

                let startAngle: number | undefined = shapeUtil.calStartAngle(centerPoint, startPoint);

                if (startAngle != undefined) {
                    let endAngle: number | undefined = shapeUtil.calEndAngle(centerPoint, endPoint, startAngle);

                    if (endAngle != undefined) {
                        drawCtx.beginPath();
                        drawCtx.moveTo(centerPoint.x, centerPoint.y);
                        drawCtx.lineTo(endPoint.x, endPoint.y);
                        drawCtx.stroke();

                        drawCtx.beginPath();
                        drawCtx.moveTo(centerPoint.x, centerPoint.y);
                        drawCtx.arc(centerPoint.x, centerPoint.y, radius, startAngle, endAngle, true);
                        drawCtx.fill();
                    }
                }
            }
        }
    }
}

function circleMoveListener({
                                shapeStateProps,
                                shapeId,
                                curPoint,
                                drawCtx
                            }: DrawCanvasMoveListenerProps): { setX: number, setY: number } {
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;

    let centerPoint: { x: number, y: number } | undefined;
    let radius: number = 0;

    let foundPoint: Point | undefined;
    let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

    let setX: number = curPoint.x;
    let setY: number = curPoint.y;

    if (foundArc?.center_point_id != undefined && foundArc?.end_point_id == undefined) {
        foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

        centerPoint = foundPoint ? {
            x: foundPoint.x,
            y: foundPoint.y
        } : undefined;

        if (centerPoint != undefined) {
            radius = Math.sqrt((curPoint.x - centerPoint.x) ** 2 + (centerPoint.y - curPoint.y) ** 2);

            setX = centerPoint.x;
            setY = centerPoint.y;

            drawCtx.beginPath();
            drawCtx.arc(setX, setY, radius, 0, 2 * Math.PI);
            drawCtx.stroke();
        }
    }

    return {setX, setY};
}

function lineClickListener({
                               shapeStateProps,
                               updateShapeStateProps,
                               shapeId,
                               curPoint
                           }: DrawCanvasClickListenerProps) {
    const point: PointArray = shapeStateProps.point;
    const line: LineArray = shapeStateProps.line;
    const current: Current | undefined = shapeStateProps.current;

    const setShape: Dispatch<SetStateAction<ShapeArray>> = updateShapeStateProps.setShape;
    const setPoint: Dispatch<SetStateAction<PointArray>> = updateShapeStateProps.setPoint;
    const setLine: Dispatch<SetStateAction<LineArray>> = updateShapeStateProps.setLine;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    let prePoint: { id: string, x: number, y: number } | undefined;

    let foundPointArray: PointArray | undefined;
    let foundPoint: Point | undefined;

    let slope_x: number | undefined;
    let slope_y: number | undefined;
    let y_intercept: number | undefined;

    foundPointArray = point.filter(p => p.shape_id == shapeId);
    foundPoint = foundPointArray.findLast(p => p.id == current?.cur_point_id);

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

        slope_x = curPoint.x - prePoint.x;
        slope_y = curPoint.y - prePoint.y;

        if (slope_x != 0 && slope_y != 0) {
            y_intercept = Math.round((curPoint.y - (slope_y / slope_x * curPoint.x)) * 1000) / 1000;
        }
    }

    if ((prePoint?.x != curPoint.x) || (prePoint?.y != curPoint.y)) {
        setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
            {...shape, status: ShapeStatusEnum.Inprogress} : shape));

        setPoint((prevState: PointArray) => [...prevState, {
            id: curPoint.id,
            shape_id: shapeId,
            x: curPoint.x,
            y: curPoint.y,
            is_deleted: false,
            to_close: false
        }]);

        if (prePoint != undefined) {
            let lineId: string | undefined = line.at(-1)?.id;

            lineId = shapeUtil.generationId("l", lineId);

            setLine((prevState: LineArray) => [...prevState, {
                id: lineId,
                shape_id: shapeId,
                slope_x: slope_x,
                slope_y: slope_y,
                y_intercept: y_intercept,
                vertical: slope_x == 0,
                horizontal: slope_y == 0,
                pre_point_id: prePoint.id,
                post_point_id: curPoint.id
            }]);
        }

        setCurrent((prevState: Current) => ({
            ...prevState,
            shape_status: ShapeStatusEnum.Inprogress,
            cur_point_id: curPoint.id,
            pre_point_id1: prevState.cur_point_id,
            pre_point_id2: prevState.pre_point_id1,
            pre_point_id3: prevState.pre_point_id2
        }));
    }
}

function arcClickListener({
                              shapeStateProps,
                              updateShapeStateProps,
                              shapeId,
                              curPoint
                          }: DrawCanvasClickListenerProps) {
    const shape: ShapeArray = shapeStateProps.shape;
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;
    const current: Current | undefined = shapeStateProps.current;

    const setShape: Dispatch<SetStateAction<ShapeArray>> = updateShapeStateProps.setShape;
    const setPoint: Dispatch<SetStateAction<PointArray>> = updateShapeStateProps.setPoint;
    const setArc: Dispatch<SetStateAction<ArcArray>> = updateShapeStateProps.setArc;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    let startPoint: { id: string, x: number, y: number } | undefined;
    let centerPoint: { id: string, x: number, y: number } | undefined;
    let radius: number | undefined;
    let startPointId: string | undefined = curPoint.id;
    let centerPointId: string | undefined;
    let startAngle: number | undefined;
    let endAngle: number | undefined;

    let foundShape: Shape | undefined = shape.findLast(s => s.id == shapeId);
    let foundPoint: Point | undefined;
    let foundArc: Arc | undefined = arc.findLast(a => a.end_point_id == current.cur_point_id || a.center_point_id == current.cur_point_id || a.start_point_id == current.cur_point_id);

    if (foundArc == undefined) {
        let arcId: string | undefined = arc.at(-1)?.id;

        arcId = shapeUtil.generationId("a", arcId);

        setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
            {...shape, status: ShapeStatusEnum.Inprogress} : shape));

        setPoint((prevPoints: PointArray) => [...prevPoints, {
            id: curPoint.id,
            shape_id: current?.shape_id,
            x: curPoint.x,
            y: curPoint.y,
            is_deleted: false,
            to_close: false
        }]);

        if (foundShape?.type == ShapeTypeEnum.Composition && foundShape?.status == ShapeStatusEnum.Inprogress) {
            startPointId = current.cur_point_id;
            centerPointId = curPoint.id;

            foundPoint = point.findLast(p => p.id == startPointId);

            startPoint = foundPoint ? {
                id: foundPoint.id,
                x: foundPoint.x,
                y: foundPoint.y
            } : undefined;

            if (startPoint != undefined) {
                radius = Math.sqrt((curPoint.x - startPoint.x) ** 2 + (startPoint.y - curPoint.y) ** 2);
                startAngle = shapeUtil.calStartAngle(curPoint, startPoint);
            }
        }

        setArc((prevState: ArcArray) => [...prevState, {
            id: arcId,
            shape_id: shapeId,
            start_point_id: startPointId,
            center_point_id: centerPointId,
            end_point_id: undefined,
            radius: radius,
            startAngle: startAngle,
            endAngle: undefined
        }]);

        setCurrent((prevState: Current) => ({
            ...prevState,
            shape_status: ShapeStatusEnum.Inprogress,
            cur_point_id: curPoint.id,
            pre_point_id1: prevState.cur_point_id,
            pre_point_id2: prevState.pre_point_id1,
            pre_point_id3: prevState.pre_point_id2
        }));
    } else {
        if (foundArc.center_point_id == undefined) {
            foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

            startPoint = foundPoint ? {
                id: foundPoint.id,
                x: foundPoint.x,
                y: foundPoint.y
            } : undefined;

            if (startPoint != undefined) {
                radius = Math.sqrt((curPoint.x - startPoint.x) ** 2 + (startPoint.y - curPoint.y) ** 2);
                startAngle = shapeUtil.calStartAngle(curPoint, startPoint);

                if (startAngle != undefined) {
                    setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                        {...shape, status: ShapeStatusEnum.Inprogress} : shape));

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
                            radius: radius,
                            startAngle: startAngle
                        } : arc));

                    setCurrent((prevState: Current) => ({
                        ...prevState,
                        shape_status: ShapeStatusEnum.Inprogress,
                        cur_point_id: curPoint.id,
                        pre_point_id1: prevState.cur_point_id,
                        pre_point_id2: prevState.pre_point_id1,
                        pre_point_id3: prevState.pre_point_id2
                    }));
                }
            }
        } else if (foundArc.end_point_id == undefined) {
            foundPoint = point.findLast(p => p.id == foundArc.start_point_id);

            startPoint = foundPoint ? {
                id: foundPoint.id,
                x: foundPoint.x,
                y: foundPoint.y
            } : undefined;

            foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

            centerPoint = foundPoint ? {
                id: foundPoint.id,
                x: foundPoint.x,
                y: foundPoint.y
            } : undefined;

            radius = foundArc?.radius;
            startAngle = foundArc?.startAngle;

            if (startPoint != undefined && centerPoint != undefined && radius != undefined && startAngle != undefined) {
                let d: number = Math.sqrt((curPoint.x - centerPoint.x) ** 2 + (centerPoint.y - curPoint.y) ** 2);
                let endPointX: number = centerPoint.x + radius * ((curPoint.x - centerPoint.x) / d);
                let endPointY: number = centerPoint.y + radius * ((curPoint.y - centerPoint.y) / d);

                let endPoint: { id: string, x: number, y: number } = {
                    id: curPoint.id,
                    x: endPointX,
                    y: endPointY
                };

                // let vectorA: { x: number, y: number } = {
                //     x: prePoint2.x - prePoint.x,
                //     y: prePoint2.y - prePoint.y
                // };
                // let vectorB: { x: number, y: number } = {
                //     x: endPoint.x - prePoint2.x,
                //     y: endPoint.y - prePoint2.y
                // };
                // let angle: number | undefined = Math.acos((vectorA.x * vectorB.x + vectorA.y * vectorB.y) / (Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2) * Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2)));

                endAngle = shapeUtil.calEndAngle(centerPoint, endPoint, startAngle);

                if (endAngle != undefined) {
                    setPoint((prevPoints: PointArray) => [...prevPoints, {
                        id: endPoint.id,
                        shape_id: current?.shape_id,
                        x: endPoint.x,
                        y: endPoint.y,
                        is_deleted: false,
                        to_close: false
                    }]);

                    setArc((prevState: ArcArray) => prevState.map(arc => arc.id == foundArc.id ?
                        {...arc, end_point_id: endPoint.id, endAngle: endAngle} : arc));

                    setCurrent((prevState: Current) => ({
                        ...prevState,
                        // shape_status: ShapeStatusEnum.Closed,
                        cur_point_id: endPoint.id,
                        pre_point_id1: prevState.cur_point_id,
                        pre_point_id2: prevState.pre_point_id1,
                        pre_point_id3: prevState.pre_point_id2
                    }));
                }
            }
        } else {
            if (foundShape?.is_closed != undefined && foundShape?.is_closed) {
                let shapeId = shapeUtil.appendShape(current?.tool, shape, setShape, setCurrent);

                let arcId: string | undefined = arc.at(-1)?.id;

                arcId = shapeUtil.generationId("a", arcId);

                setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                    {...shape, status: ShapeStatusEnum.Inprogress} : shape));

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
                    radius: undefined,
                    startAngle: undefined,
                    endAngle: undefined
                }]);

                setCurrent((prevState: Current) => ({
                    ...prevState,
                    shape_status: ShapeStatusEnum.Inprogress,
                    cur_point_id: curPoint.id,
                    pre_point_id1: prevState.cur_point_id,
                    pre_point_id2: prevState.pre_point_id1,
                    pre_point_id3: prevState.pre_point_id2
                }));
            } else if (foundShape?.is_closed != undefined && foundShape?.is_closed == false) {
                let arcId: string | undefined = arc.at(-1)?.id;

                arcId = shapeUtil.generationId("a", arcId);

                setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                    {...shape, status: ShapeStatusEnum.Inprogress} : shape));

                setPoint((prevPoints: PointArray) => [...prevPoints, {
                    id: curPoint.id,
                    shape_id: current?.shape_id,
                    x: curPoint.x,
                    y: curPoint.y,
                    is_deleted: false,
                    to_close: false
                }]);

                startPointId = current.cur_point_id;
                centerPointId = curPoint.id;

                foundPoint = point.findLast(p => p.id == startPointId);

                startPoint = foundPoint ? {
                    id: foundPoint.id,
                    x: foundPoint.x,
                    y: foundPoint.y
                } : undefined;

                if (startPoint != undefined) {
                    radius = Math.sqrt((curPoint.x - startPoint.x) ** 2 + (startPoint.y - curPoint.y) ** 2);
                    startAngle = shapeUtil.calStartAngle(curPoint, startPoint);
                }

                setArc((prevState: ArcArray) => [...prevState, {
                    id: arcId,
                    shape_id: shapeId,
                    start_point_id: startPointId,
                    center_point_id: centerPointId,
                    end_point_id: undefined,
                    radius: radius,
                    startAngle: startAngle,
                    endAngle: undefined
                }]);

                setCurrent((prevState: Current) => ({
                    ...prevState,
                    shape_status: ShapeStatusEnum.Inprogress,
                    cur_point_id: curPoint.id,
                    pre_point_id1: prevState.cur_point_id,
                    pre_point_id2: prevState.pre_point_id1,
                    pre_point_id3: prevState.pre_point_id2
                }));
            }
        }
    }
}

function circleClickListener({
                                 shapeStateProps,
                                 updateShapeStateProps,
                                 shapeId,
                                 curPoint
                             }: DrawCanvasClickListenerProps) {
    const shape: ShapeArray = shapeStateProps.shape;
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;
    const current: Current | undefined = shapeStateProps.current;

    const setShape: Dispatch<SetStateAction<ShapeArray>> = updateShapeStateProps.setShape;
    const setPoint: Dispatch<SetStateAction<PointArray>> = updateShapeStateProps.setPoint;
    const setArc: Dispatch<SetStateAction<ArcArray>> = updateShapeStateProps.setArc;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    let centerPoint: { id: string, x: number, y: number } | undefined;
    let radius: number = 0;

    let foundPoint: Point | undefined;
    let foundArc: Arc | undefined = arc.findLast(a => a.shape_id == shapeId);

    if (foundArc == undefined) {
        let arcId: string | undefined = arc.at(-1)?.id;

        arcId = shapeUtil.generationId("a", arcId);

        setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
            {...shape, status: ShapeStatusEnum.Inprogress} : shape));

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
            radius: undefined,
            startAngle: undefined,
            endAngle: undefined
        }]);

        setCurrent((prevState: Current) => ({
            ...prevState,
            shape_status: ShapeStatusEnum.Inprogress,
            cur_point_id: curPoint.id,
            pre_point_id1: prevState.cur_point_id,
            pre_point_id2: prevState.pre_point_id1,
            pre_point_id3: prevState.pre_point_id2
        }));
    } else {
        if (foundArc.center_point_id == undefined) {
            setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                {...shape, status: ShapeStatusEnum.Inprogress} : shape));

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
                shape_status: ShapeStatusEnum.Inprogress,
                cur_point_id: curPoint.id,
                pre_point_id1: prevState.cur_point_id,
                pre_point_id2: prevState.pre_point_id1,
                pre_point_id3: prevState.pre_point_id2
            }));
        } else if (foundArc.end_point_id == undefined) {
            foundPoint = point.findLast(p => p.id == foundArc.center_point_id);

            centerPoint = foundPoint ? {
                id: foundPoint.id,
                x: foundPoint.x,
                y: foundPoint.y
            } : undefined;

            if (centerPoint != undefined) {
                radius = Math.sqrt((curPoint.x - centerPoint.x) ** 2 + (centerPoint.y - curPoint.y) ** 2);

                setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                    {...shape, status: ShapeStatusEnum.Closed, is_closed: true} : shape));

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

                setCurrent((prevState: Current) => ({
                    ...prevState,
                    shape_status: ShapeStatusEnum.Closed,
                    cur_point_id: curPoint.id,
                    pre_point_id1: prevState.cur_point_id,
                    pre_point_id2: prevState.pre_point_id1,
                    pre_point_id3: prevState.pre_point_id2
                }));
            }
        } else {
            let shapeId = shapeUtil.appendShape(current?.tool, shape, setShape, setCurrent);

            let arcId: string | undefined = arc.at(-1)?.id;

            arcId = shapeUtil.generationId("a", arcId);

            setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                {...shape, status: ShapeStatusEnum.Inprogress} : shape));

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
                radius: undefined,
                startAngle: undefined,
                endAngle: undefined
            }]);

            setCurrent((prevState: Current) => ({
                ...prevState,
                shape_status: ShapeStatusEnum.Inprogress,
                cur_point_id: curPoint.id,
                pre_point_id1: prevState.cur_point_id,
                pre_point_id2: prevState.pre_point_id1,
                pre_point_id3: prevState.pre_point_id2
            }));
        }
    }
}

export default {
    lineMoveListener,
    arcMoveListener,
    circleMoveListener,
    lineClickListener,
    arcClickListener,
    circleClickListener
}