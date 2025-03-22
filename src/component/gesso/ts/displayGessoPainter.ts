import {PointArray, Point, LineArray, Line, Arc, DisplayGessoPainterProps, ArcArray} from '@/ts';

function linePainter({
                         shapeStateProps,
                         shapeId,
                         displayGessoCtx
                     }: DisplayGessoPainterProps) {
    const point: PointArray = shapeStateProps.point;
    const line: LineArray = shapeStateProps.line;

    let foundLine: LineArray = line.filter(l => l.shape_id == shapeId);
    let foundPoint: Point | undefined;

    if (foundLine.length >= 1) {
        for (let i = 0; i < foundLine.length; i++) {
            displayGessoCtx.beginPath();
            foundPoint = point.find((p: Point) => p.id == foundLine[i].pre_point_id);
            if (foundPoint != undefined) {
                displayGessoCtx.moveTo(foundPoint.x, foundPoint.y);
            }
            foundPoint = point.find((p: Point) => p.id == foundLine[i].post_point_id);
            if (foundPoint != undefined) {
                displayGessoCtx.lineTo(foundPoint.x, foundPoint.y);
            }
            displayGessoCtx.stroke();
        }
    }

}

function arcPaint({
                      shapeStateProps,
                      shapeId,
                      displayGessoCtx
                  }: DisplayGessoPainterProps) {
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;
    let foundArcArray: ArcArray = arc.filter(a => a.shape_id == shapeId);
    let foundArc: Arc;

    for (let i = 0; i < foundArcArray.length; i++) {
        foundArc = foundArcArray[i];

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
}

function circlePainter({
                           shapeStateProps,
                           shapeId,
                           displayGessoCtx
                       }: DisplayGessoPainterProps) {
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