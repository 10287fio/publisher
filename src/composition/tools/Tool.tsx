import {CanvasComponentProps, CurrentId, ShapeArray} from '@/ts';
import {Dispatch, SetStateAction, useEffect} from 'react';
import shapeUtil from '@/util/shape.util';
import {ShapeTypeEnum, ToolObjectEnum, ToolEnum, ShapeStatusEnum} from '@/store/enum/shape.enum'

const Tool = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {

    const currentId: CurrentId | undefined = shapeStateProps.currentId;
    const setCurrentId: Dispatch<SetStateAction<CurrentId>> = updateShapeStateProps.setCurrentId;

    const shape: ShapeArray = shapeStateProps.shape;
    const setShape = updateShapeStateProps.setShape;

    function toolsClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        if (shapeUtil.checkShift(event.currentTarget.id, currentId)) {
            let shapeId: string = "";

            if (currentId?.shape_id == undefined) {
                shapeId = "s1"
            } else {
                shapeId = shapeUtil.generationIdNum(currentId?.shape_id);
            }

            let shapeType: ShapeTypeEnum | null = null;

            if (shapeUtil.checkAtomicity(event.currentTarget.id)) {
                shapeType = ShapeTypeEnum[event.currentTarget.id as typeof ShapeTypeEnum[keyof typeof ShapeTypeEnum]];
            }

            setShape((prevShapes: ShapeArray) => [...prevShapes, {
                id: shapeId,
                shapeId: shapeType,
                status: ShapeStatusEnum.New
            }]);

            let toolType = ToolEnum[event.currentTarget.id as typeof ToolEnum[keyof typeof ToolEnum]]

            setCurrentId({
                shape_id: shapeId, tool_type: toolType, cur_point_id: undefined,
                pre_point_id1: undefined,
                pre_point_id2: undefined,
                pre_point_id3: undefined, is_closed: false
            });
        }
    }

    useEffect(() => {
    });

    return (
        <div>
            <button id={ToolEnum.Line} onClick={toolsClickEventListener}>{ToolEnum.Line}</button>
            &nbsp;
            <button id={ToolEnum.Arc} onClick={toolsClickEventListener}>{ToolEnum.Arc}</button>
            &nbsp;
            <button id={ToolEnum.Triangle} onClick={toolsClickEventListener}>{ToolEnum.Triangle}</button>
            &nbsp;
            <button id={ToolEnum.Quadrangle} onClick={toolsClickEventListener}>{ToolEnum.Quadrangle}</button>
            &nbsp;
            <button id={ToolEnum.Sector} onClick={toolsClickEventListener}>{ToolEnum.Sector}</button>
            &nbsp;
            <button id={ToolEnum.Circle} onClick={toolsClickEventListener}>{ToolEnum.Circle}</button>
        </div>
    );
};

export default Tool;