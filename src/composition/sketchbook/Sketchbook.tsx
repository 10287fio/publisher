import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useEffect, useState} from 'react';
import {
    Draw,
    Reserve,
    ReserveArray,
    Result,
    Shape,
    ShapeArray,
    Point,
    PointArray,
    Line,
    LineArray,
    Arc,
    ArcArray,
    CurrentId
} from '@/ts';
import ReserveCanvas from '@/component/canvas/ReserveCanvas';
import DisplayGesso from '@/component/gesso/DisplayGesso';
import ResultCanvas from '@/component/canvas/ResultCanvas';
import DrawCanvas from '@/component/canvas/DrawCanvas';
import Tools from '@/composition/tools/Tools';
import canvasStyle from '@/component/canvas/Canvas.module.scss';

const Sketchbook = (props: any): JSX.Element => {
    const [draw, setDraw] = useState<Draw>({id: "d1"});
    const [reserve, setReserve] = useState<ReserveArray>([{id: "rv1"}]);
    const [result, setResult] = useState<Result>({id: "rt1"});
    const [shape, setShape] = useState<ShapeArray>([]);
    const [point, setPoint] = useState<PointArray>([]);
    const [line, setLine] = useState<LineArray>([]);
    const [arc, setArc] = useState<ArcArray>([]);
    const [currentId, setCurrentId] = useState<CurrentId | undefined>();

    const shapeStateProps = {
        draw, reserve, result, shape, point, line, arc, currentId
    };

    const updateShapeStateProps = {
        setDraw, setReserve, setResult, setShape, setPoint, setLine, setArc, setCurrentId
    };

    useEffect(() => {
    });

    return (
        <div>
            <Tools shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>
            <div className={sketchbookStyle.canvasContainer}>
                {/*<ResultCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>*/}
                <DrawCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>
                <ReserveCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>
            </div>
        </div>
    )
};

export default Sketchbook;