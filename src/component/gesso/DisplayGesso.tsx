import {ArcArray, Current, DisplayGessoPainterProps, GessoComponentProps, PointArray, Shape, ShapeArray} from '@/ts';
import {ShapeTypeEnum} from '@/store/enum/shape.enum';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useEffect, useRef} from 'react';
import shapeUtil from '@/util/shape.util';
import displayGessoPainter from '@/component/gesso/ts/displayGessoPainter';

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

            if (displayGessoCtx) {
                displayGessoCtx.clearRect(0, 0, displayGesso.width, displayGesso.height);
                displayGessoCtx.strokeStyle = "orange";

                let fixedShape: ShapeArray = shape.filter((s: Shape) => !s.is_deleted);

                for (let i = 0; i < fixedShape.length; i++) {
                    let shapeId: string = fixedShape[i].id;

                    const displayGessoPainterProps: DisplayGessoPainterProps = {
                        shapeStateProps, shapeId, displayGessoCtx
                    };

                    if (fixedShape[i].type == ShapeTypeEnum.Line) {
                        displayGessoPainter.linePainter(displayGessoPainterProps);
                        
                    } else if (fixedShape[i].type == ShapeTypeEnum.Arc) {
                        displayGessoPainter.arcPaint(displayGessoPainterProps);

                    } else if (fixedShape[i].type == ShapeTypeEnum.Circle) {
                        displayGessoPainter.circlePainter(displayGessoPainterProps);

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