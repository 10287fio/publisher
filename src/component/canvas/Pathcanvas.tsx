import canvasStyle from '@/component/canvas/Canvas.module.scss';
import {useRef, useEffect} from 'react';

const Pathcanvas = (): JSX.Element => {
    const pathCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (pathCanvasRef.current) {

        }
    });

    return (
        <canvas id={canvasStyle.pathCanvas} ref={pathCanvasRef}></canvas>
    );
}

export default Pathcanvas;