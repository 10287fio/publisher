import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect} from 'react';
import {CanvasComponentProps} from '@/ts';
import DisplayGesso from '@/component/gesso/DisplayGesso';
import MagnifierGesso from '@/component/gesso/MagnifierGesso';

const ReserveCanvas: React.FC<CanvasComponentProps> = (): JSX.Element => {
    const reserveCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (reserveCanvasRef.current) {

        }
    });

    return (
        <>
            {/*<DisplayGesso className={canvasStyle.canvas} id={canvasStyle.reserveCanvas} ref={reserveCanvasRef}></DisplayGesso>*/}
            {/*<MagnifierGesso></MagnifierGesso>*/}
        </>
    );
}

export default ReserveCanvas;