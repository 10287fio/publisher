import {Arc, ArcArray, Current, GessoComponentProps, Point, PointArray, Shape, ShapeArray} from '@/ts';
import {ShapeTypeEnum} from '@/store/enum/shape.enum';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useEffect, useRef} from 'react';
import shapeUtil from '@/util/shape.util';

const DisplayGesso: React.FC<GessoComponentProps> = ({shapeStateProps}) => {
    const displayGessoRef = useRef<HTMLCanvasElement | null>(null);
    const shape: ShapeArray = shapeStateProps.shape;
    const point: PointArray = shapeStateProps.point;
    const arc: ArcArray = shapeStateProps.arc;
    const current: Current = shapeStateProps.current;


    useEffect(() => {
        shapeUtil.invertYAxis(displayGessoRef.current);

        return () => {
            shapeUtil.invertYAxis(displayGessoRef.current);
        }
    }, []);

    useEffect(() => {
        if (displayGessoRef.current) {
            const displayGesso: HTMLCanvasElement = displayGessoRef.current;

            const displayGessoCtx = displayGesso.getContext("2d");
            console.log(arc);
            if (displayGessoCtx) {
                displayGessoCtx.clearRect(0, 0, displayGesso.width, displayGesso.height);
                displayGessoCtx.strokeStyle = "orange";

                let fixedShape: ShapeArray = shape.filter((s: Shape) => !s.is_deleted);

                for (let i = 0; i < fixedShape.length; i++) {
                    if (fixedShape[i].type == ShapeTypeEnum.Arc) {
                        // console.log(fixedShape[i]);

                        let foundArc: Arc | undefined = arc.find(a => a.shape_id == fixedShape[i].id);

                        if (foundArc != undefined && foundArc?.start_point_id && foundArc?.center_point_id && foundArc?.end_point_id && foundArc?.radius != undefined && foundArc?.startAngle != undefined && foundArc?.endAngle != undefined) {

                            let startPoint: Point | undefined = point.find(p => p.id == foundArc.start_point_id);
                            let centerPoint: Point | undefined = point.find(p => p.id == foundArc.center_point_id);
                            let endPoint: Point | undefined = point.find(p => p.id == foundArc.end_point_id);

                            // console.log(foundArc);
                            // console.log(startPoint);
                            // console.log(centerPoint);
                            // console.log(endPoint);
                            if (startPoint && centerPoint && endPoint) {
                                displayGessoCtx.beginPath();
                                displayGessoCtx.arc(centerPoint.x, centerPoint.y, foundArc.radius, foundArc.startAngle, foundArc.endAngle, true);
                                displayGessoCtx.stroke();
                            }
                        }
                    } else if (fixedShape[i].type == ShapeTypeEnum.Pending) {
                        // console.log(fixedShape[i]);
                        let fixedPoint = point.filter((p: Point) => p.shape_id == fixedShape[i].id && !p.is_deleted);

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
                    } else if (fixedShape[i].type == ShapeTypeEnum.Circle) {
                        let foundArc: Arc | undefined = arc.find(a => a.shape_id == fixedShape[i].id);

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
                }
            }
        }
    });

    return (
        <>
            <canvas ref={displayGessoRef} id={sketchbookStyle.reserveCanvas} width={"1000px"} height={"1000px"}
                    className={sketchbookStyle.canvas}></canvas>
        </>
    );
}

export default DisplayGesso;