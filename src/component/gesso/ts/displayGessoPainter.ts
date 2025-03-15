import {PointArray, Point, LineArray, Line, Arc, DisplayGessoPainterProps, ArcArray} from '@/ts';

function linePainter({
                         shapeStateProps,
                         shapeId,
                         displayGessoCtx
                     }: DisplayGessoPainterProps) {
    const point: PointArray = shapeStateProps.point;
    const line : LineArray = shapeStateProps.line;

    let fixedPoint = point.filter((p: Point) => p.shape_id == shapeId && !p.is_deleted);

    if (fixedPoint.length >= 2) {
        displayGessoCtx.beginPath();

        for (let i = 0; i < fixedPoint.length; i++) {
            if (i == 0) {
                displayGessoCtx.moveTo(fixedPoint[i].x, fixedPoint[i].y);
            } else {
                displayGessoCtx.lineTo(fixedPoint[i].x, fixedPoint[i].y);
                displayGessoCtx.stroke();
            }
        }
    }
}

function arcPaint({
                      shapeStateProps,
                      shapeId,
                      displayGessoCtx
                  }: DisplayGessoPainterProps){
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;

    let foundArc: Arc | undefined = arc.find(a => a.shape_id == shapeId);

    if (foundArc != undefined && foundArc?.start_point_id != undefined && foundArc?.center_point_id != undefined && foundArc?.end_point_id != undefined && foundArc?.radius != undefined && foundArc?.startAngle != undefined && foundArc?.endAngle != undefined) {

        let startPoint: Point | undefined = point.find(p => p.id == foundArc.start_point_id);
        let centerPoint: Point | undefined = point.find(p => p.id == foundArc.center_point_id);
        let endPoint: Point | undefined = point.find(p => p.id == foundArc.end_point_id);

        if (startPoint && centerPoint && endPoint) {
            displayGessoCtx.beginPath();
            displayGessoCtx.arc(centerPoint.x, centerPoint.y, foundArc.radius, foundArc.startAngle, foundArc.endAngle, true);
            displayGessoCtx.stroke();
        }
    }
}

function circlePainter({
                           shapeStateProps,
                           shapeId,
                           displayGessoCtx
                       }: DisplayGessoPainterProps){
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;

    let foundArc: Arc | undefined = arc.find(a => a.shape_id == shapeId);

    if (foundArc != undefined && foundArc?.center_point_id && foundArc?.end_point_id && foundArc?.radius) {

        let centerPoint: Point | undefined = point.find(p => p.id == foundArc.center_point_id);
        let radius: number = foundArc.radius;

        if (centerPoint != undefined) {
            displayGessoCtx.beginPath();
            displayGessoCtx.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI);
            displayGessoCtx.stroke();
        }
    }
}

export default {
    linePainter,
    arcPaint,
    circlePainter
}