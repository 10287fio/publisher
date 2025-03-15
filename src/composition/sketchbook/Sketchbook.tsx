import sketchbookStyle from '@/composition/sketchbook/Sketchbook.module.scss';
import {useEffect, useState} from 'react';
import {ArcArray, Current, Draw, LineArray, PointArray, ReserveArray, Result, ShapeArray} from '@/ts';
import ReserveCanvas from '@/component/canvas/ReserveCanvas';
import DrawCanvas from '@/component/canvas/DrawCanvas';
import Tool from '@/composition/tool/Tool';
import Operation from '@/composition/operation/Operation';

const Sketchbook = (props: any): JSX.Element => {
    const [draw, setDraw] = useState<Draw>({id: "d1", article_id: "a1"});
    const [reserve, setReserve] = useState<ReserveArray>([{id: "rv1", article_id: "a1", is_closed: false}]);
    const [result, setResult] = useState<Result>({id: "rt1", article_id: "a1"});
    const [shape, setShape] = useState<ShapeArray>([]);
    const [point, setPoint] = useState<PointArray>([]);
    const [line, setLine] = useState<LineArray>([]);
    const [arc, setArc] = useState<ArcArray>([]);
    const [current, setCurrent] = useState<Current>({
        tool: undefined,
        pre_tool: undefined,
        shape_id: undefined,
        shape_status: undefined,
        operation: undefined,
        pre_operation:undefined,
        cur_point_id: undefined,
        pre_point_id1: undefined,
        pre_point_id2: undefined,
        pre_point_id3: undefined
    });

    const shapeStateProps = {
        draw, reserve, result, shape, point, line, arc, current
    };

    const updateShapeStateProps = {
        setDraw, setReserve, setResult, setShape, setPoint, setLine, setArc, setCurrent
    };

    useEffect(() => {
    });

    return (
        <div>
            <Tool shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>
            <Operation shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}></Operation>
            <div className={sketchbookStyle.canvasContainer}>
                {/*<ResultCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>*/}
                <DrawCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>
                <ReserveCanvas shapeStateProps={shapeStateProps} updateShapeStateProps={updateShapeStateProps}/>
            </div>
        </div>
    )
};

export default Sketchbook;