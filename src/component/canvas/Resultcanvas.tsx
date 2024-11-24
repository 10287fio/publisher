import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect} from 'react';

const Resultcanvas = (): JSX.Element => {
    const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (resultCanvasRef.current) {

        }
    });

    return (
        <canvas className={sketchbookStyle.canvas} id={canvasStyle.resultCanvas} ref={resultCanvasRef}></canvas>
    );
}

export default Resultcanvas;