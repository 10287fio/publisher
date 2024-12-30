import {GessoComponentProps} from '@/ts';
import {useRef} from 'react';

const MagnifierGesso: React.FC<GessoComponentProps> = ({shapeStateProps}) => {
    const magnifierGessoRef = useRef<HTMLCanvasElement|null>(null);

    return (
        <canvas ref={magnifierGessoRef}></canvas>
    );
}

export default MagnifierGesso;