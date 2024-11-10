import canvasStyle from '@/component/canvas/Canvas.module.scss';
import {useRef, useEffect} from 'react';

const Drawcanvas = (): JSX.Element => {
    const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (drawCanvasRef.current) {

        }
    });

    return (
        <canvas id={canvasStyle.drawCanvas} ref={drawCanvasRef}></canvas>
    )
};

export default Drawcanvas;