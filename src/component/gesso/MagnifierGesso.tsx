import {GessoComponentProps} from '@/ts';
import {useRef, useEffect} from 'react';
import shapeUtil from '@/util/shape.util';

const MagnifierGesso: React.FC<GessoComponentProps> = ({shapeStateProps}) => {
    const magnifierGessoRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        shapeUtil.initCanvas(magnifierGessoRef.current);
    });
    return (
        <>
            <canvas ref={magnifierGessoRef}></canvas>
        </>
    );
}

export default MagnifierGesso;