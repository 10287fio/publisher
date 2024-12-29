import {GessoComponentProps} from '@/ts';
import {useEffect, useRef} from 'react';

const DisplayGesso: React.FC<GessoComponentProps> = ({shapeStateProps}) => {
    const displayGessoRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (displayGessoRef.current) {
            const displayGesso: HTMLCanvasElement = displayGessoRef.current;

            displayGesso.width = window.innerWidth;
            displayGesso.height = window.innerHeight;

        }
    });

    return (
        <canvas ref={displayGessoRef}></canvas>
    )
}

export default DisplayGesso;