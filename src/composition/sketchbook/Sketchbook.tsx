import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useEffect, useState} from 'react';
import {Draw, Reserve, Result, Shape, Point, Line, Arc, CurrentId} from '@/ts';
import ReserveCanvas from '@/component/canvas/ReserveCanvas';
import ResultCanvas from '@/component/canvas/ResultCanvas';
import DrawCanvas from '@/component/canvas/DrawCanvas';
import Tools from '@/composition/tools/Tools';

const Sketchbook = (props: any): JSX.Element => {
    const [draw, setDraw] = useState<Draw>({id: "d1"});
    const [reserve, setReserve] = useState<Reserve[]>([{id: "rv1"}]);
    const [result, setResult] = useState<Result>({id: "rt1"});
    const [shape, setShape] = useState<Shape[]>([]);
    const [point, setPoint] = useState<Point[]>([]);
    const [line, setLine] = useState<Line[]>([]);
    const [arc, setArc] = useState<Arc[]>([]);
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
        <div className={sketchbookStyle.canvasContainer}>
            <Tools shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}></Tools>
            {/*<ReserveCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>*/}
            {/*<ResultCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>*/}
            <DrawCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>
        </div>
    )
};

export default Sketchbook;