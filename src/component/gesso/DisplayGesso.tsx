import {GessoComponentProps, Point, PointArray, ShapeArray} from '@/ts';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useEffect, useRef} from 'react';

const DisplayGesso: React.FC<GessoComponentProps> = ({shapeStateProps}) => {
    const displayGessoRef = useRef<HTMLCanvasElement | null>(null);
    const shape: ShapeArray = shapeStateProps.shape;
    const point: PointArray = shapeStateProps.point;

    useEffect(() => {

        if (displayGessoRef.current) {
            const displayGesso: HTMLCanvasElement = displayGessoRef.current;
            // displayGesso.width = window.innerWidth;
            // displayGesso.height = window.innerHeight;

            const displayGessoCtx = displayGesso.getContext("2d");

            if (displayGessoCtx) {

                displayGessoCtx.clearRect(0, 0, displayGesso.width, displayGesso.height);

                let fixedPoint = point.filter((p: Point) => !p.is_deleted);

                if (fixedPoint.length >= 2) {
                    displayGessoCtx.strokeStyle = "orange";
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
        }
    });

    return (
        <>
            <canvas ref={displayGessoRef} id={sketchbookStyle.reserveCanvas} width={"2000px"} height={"2000px"}
                    className={sketchbookStyle.canvas}></canvas>
        </>
    );
}

export default DisplayGesso;