import {
    ArcArray,
    Current,
    DrawCanvasMoveListenerProps,
    Point,
    PointArray,
    Arc,
    DrawCanvasClickListenerProps, ShapeArray
} from '@/ts';
import {ShapeTypeEnum, OperationEnum, ShapeStatusEnum} from '@/store/enum/shape.enum';
import shapeUtil from '@/util/shape.util';
import {Dispatch, SetStateAction} from 'react';

export function lineMoveListener({
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

export function arcMoveListener({
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

export function circleMoveListener({
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

export function lineClickListener({
                                      shapeStateProps,
                                      updateShapeStateProps,
                                      shapeId,
                                      curPoint,
                                      drawCtx
                                  }: DrawCanvasClickListenerProps) {
    const point: PointArray = shapeStateProps.point;
    const current: Current | undefined = shapeStateProps.current;

    const setPoint: Dispatch<SetStateAction<PointArray>> = updateShapeStateProps.setPoint;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    let prePoint: { id: string, x: number, y: number } | undefined;

    let foundPoint: Point | undefined;

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
}

export function arcClickListener({
                                     shapeStateProps,
                                     updateShapeStateProps,
                                     shapeId,
                                     curPoint,
                                     drawCtx
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
    let radius: number = 0;

    let foundPoint: Point | undefined;
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
            radius: undefined,
            startAngle: undefined,
            endAngle: undefined
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

            startPoint = foundPoint ? {
                id: foundPoint.id,
                x: foundPoint.x,
                y: foundPoint.y
            } : undefined;

            if (startPoint != undefined) {
                radius = Math.sqrt((curPoint.x - startPoint.x) ** 2 + (startPoint.y - curPoint.y) ** 2);
                let startAngle: number | undefined = shapeUtil.calStartAngle(curPoint, startPoint);

                if (startAngle != undefined) {
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

            let radius: number | undefined = foundArc?.radius;
            let startAngle: number | undefined = foundArc?.startAngle;

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

                let endAngle: number | undefined = shapeUtil.calEndAngle(centerPoint, endPoint, startAngle);

                if (endAngle != undefined) {
                    setPoint((prevPoints: PointArray) => [...prevPoints, {
                        id: endPoint.id,
                        shape_id: current?.shape_id,
                        x: endPoint.x,
                        y: endPoint.y,
                        is_deleted: false,
                        to_close: false
                    }]);

                    setArc((prevState: ArcArray) => prevState.map(arc => arc.shape_id == shapeId ?
                        {...arc, end_point_id: endPoint.id, endAngle: endAngle} : arc));

                    setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == shapeId ?
                        {
                            ...shape,
                            type: ShapeTypeEnum.Arc,
                            status: ShapeStatusEnum.Closed,
                            is_closed: true
                        } : shape));

                    setCurrent((prevState: Current) => ({
                        ...prevState,
                        cur_point_id: endPoint.id,
                        pre_point_id1: prevState.cur_point_id,
                        pre_point_id2: prevState.pre_point_id1,
                        pre_point_id3: prevState.pre_point_id2
                    }));
                }
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
                center_point_id: undefined,
                start_point_id: curPoint.id,
                end_point_id: undefined,
                radius: undefined,
                startAngle: undefined,
                endAngle: undefined
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

export function circleClickListener({
                                        shapeStateProps,
                                        updateShapeStateProps,
                                        shapeId,
                                        curPoint,
                                        drawCtx
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

            centerPoint = foundPoint ? {
                id: foundPoint.id,
                x: foundPoint.x,
                y: foundPoint.y
            } : undefined;

            if (centerPoint != undefined) {
                radius = Math.sqrt((curPoint.x - centerPoint.x) ** 2 + (centerPoint.y - curPoint.y) ** 2);

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
                radius: undefined,
                startAngle: undefined,
                endAngle: undefined
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