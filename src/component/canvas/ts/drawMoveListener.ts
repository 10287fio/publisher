import {ArcArray, CanvasListenerProps, Current, LineArray, Point, PointArray, ShapeArray} from '@/ts';
import {OperationEnum} from '@/store/enum/shape.enum';
import shapeUtil from '@/util/shape.util';
import {Dispatch, SetStateAction} from 'react';


export function lineMoveCanvas({
                                   shapeStateProps,
                                   updateShapeStateProps,
                                   shapeId,
                                   curPoint,
                                   drawCtx
                               }: CanvasListenerProps) {

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
}