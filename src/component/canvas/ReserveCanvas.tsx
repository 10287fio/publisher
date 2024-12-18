import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect} from 'react';
import {CanvasComponentProps} from '@/ts';

const ReserveCanvas: React.FC<CanvasComponentProps> = (): JSX.Element => {
    const reserveCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (reserveCanvasRef.current) {

        }
    });

    return (
        <canvas className={sketchbookStyle.canvas} id={canvasStyle.reserveCanvas} ref={reserveCanvasRef}></canvas>
    );
}

export default ReserveCanvas;