import {GessoComponentProps, Point} from '@/ts';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useEffect, useRef} from 'react';

const DisplayGesso: React.FC<GessoComponentProps> = ({shapeStateProps}) => {
    const displayGessoRef = useRef<HTMLCanvasElement | null>(null);
    const point: Point[] = shapeStateProps.point;

    useEffect(() => {
        if (displayGessoRef.current) {
            const displayGesso: HTMLCanvasElement = displayGessoRef.current;
console.log(point);
            displayGesso.width = window.innerWidth;
            displayGesso.height = window.innerHeight;

            const displayGessoCtx = displayGesso.getContext("2d");

            if (displayGessoCtx) {
                displayGessoCtx.beginPath();
                displayGessoCtx.moveTo(0, 0);
                displayGessoCtx.lineTo(100, 100);
                displayGessoCtx.closePath();
                displayGessoCtx.stroke();
            }
        }
    });

    return (
        <>
            <canvas ref={displayGessoRef} id={sketchbookStyle.reserveCanvas}
                    className={sketchbookStyle.canvas}></canvas>
        </>
    );
}

export default DisplayGesso;