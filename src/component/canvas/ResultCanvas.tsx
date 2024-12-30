import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect} from 'react';
import {CanvasComponentProps} from '@/ts';
import DisplayGesso from '@/component/gesso/DisplayGesso';
import MagnifierGesso from '@/component/gesso/MagnifierGesso';

const ResultCanvas: React.FC<CanvasComponentProps> = ({shapeStateProps, updateShapeStateProps}) => {
    const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        console.log("result : " + shapeStateProps.point[0]?.id);

        if (resultCanvasRef.current) {

        }
    });

    return (
        <>
            <DisplayGesso shapeStateProps={shapeStateProps}></DisplayGesso>
            <MagnifierGesso shapeStateProps={shapeStateProps}></MagnifierGesso>
        </>
    );
}

export default ResultCanvas;