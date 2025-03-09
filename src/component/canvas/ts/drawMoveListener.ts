import {ArcArray, CanvasListenerProps, Current, LineArray, Point, PointArray, ShapeArray} from '@/ts';
import {OperationEnum} from '@/store/enum/shape.enum';
import shapeUtil from '@/util/shape.util';
import {Dispatch, SetStateAction} from 'react';


export function lineMoveCanvas({shapeStateProps, updateShapeStateProps, shapeId, curPoint, drawCtx}: CanvasListenerProps) {

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

    // useEffect(() => {
    //
    // }, [drawCtx])
    let radius: number = 0;
    let foundPoint: Point | undefined;
    let prePoint: { x: number, y: number } | undefined;
    let prePoint2: { x: number, y: number } | undefined;

    // let offsetX: number = event.nativeEvent.offsetX;
    // let offsetY: number = event.nativeEvent.offsetY;
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