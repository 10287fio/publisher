import {CanvasComponentProps, Current, ShapeArray} from '@/ts';
import {Dispatch, SetStateAction, useEffect} from 'react';
import shapeUtil from '@/util/shape.util';
import {ShapeTypeEnum, ToolObjectEnum, ShapeStatusEnum, OperationEnum, ToolEnum} from '@/store/enum/shape.enum'

const Tool = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {

    const current: Current | undefined = shapeStateProps.current;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    const shape: ShapeArray = shapeStateProps.shape;
    const setShape = updateShapeStateProps.setShape;

    function toolsClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        if (shapeUtil.checkShift(event.currentTarget.id, current)) {
            let shapeId: string = "";

            if (current?.shape_id == undefined) {
                shapeId = "s1"
            } else {
                shapeId = shapeUtil.generationIdNum(current?.shape_id);
            }

            let shapeType: ShapeTypeEnum | null = null;

            if (shapeUtil.checkAtomicity(event.currentTarget.id)) {
                shapeType = ShapeTypeEnum[event.currentTarget.id as typeof ShapeTypeEnum[keyof typeof ShapeTypeEnum]];
            }

            setShape((prevShapes: ShapeArray) => [...prevShapes, {
                id: shapeId,
                shapeId: shapeType,
                status: ShapeStatusEnum["New"]
            }]);

            let toolType = ToolEnum[event.currentTarget.id as typeof ToolEnum[keyof typeof ToolEnum]]

            setCurrent({
                shape_id: shapeId,
                shape_status: ShapeStatusEnum["New"],
                tool_type: toolType,
                operation: OperationEnum["Append"],
                cur_point_id: undefined,
                pre_point_id1: undefined,
                pre_point_id2: undefined,
                pre_point_id3: undefined
            });
        } else {
            alert("It is not possible to create new shape.");
        }
    }

    useEffect(() => {
    });

    return (
        <div>
            {Object.values(ToolEnum).map((tool) => (
                <button key={tool} id={tool} onClick={toolsClickEventListener} style={{marginRight: "3px"}}>
                    {tool}
                </button>))
            }
        </div>
    );
};

export default Tool;