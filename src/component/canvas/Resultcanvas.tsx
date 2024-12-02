import canvasStyle from '@/component/canvas/Canvas.module.scss';
import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useRef, useEffect} from 'react';
import {ShapeChildComponentProps} from "@/ts";

const Resultcanvas: React.FC<ShapeChildComponentProps> = ({shapeStateProps, updateShapeStateProps}) => {
    const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        console.log("result : "+shapeStateProps.point[0]?.id);

        if (resultCanvasRef.current) {

        }
    });

    return (
        <canvas className={sketchbookStyle.canvas} id={canvasStyle.resultCanvas} ref={resultCanvasRef}></canvas>
    );
}

export default Resultcanvas;