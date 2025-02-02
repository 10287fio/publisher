import {CanvasComponentProps, Current, ShapeArray} from '@/ts';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import shapeUtil from '@/util/shape.util';
import {ShapeTypeEnum, ToolObjectEnum, ShapeStatusEnum, OperationEnum, ToolEnum} from '@/store/enum/shape.enum';
import {ConfirmEnum} from '@/store/enum/system.enum';
import ConfirmModal from '@/composition/modal/ConfirmModal';

function checkShift(current: Current, toolId: String, shape: ShapeArray): boolean {
    let is_shift: boolean = false;

    if (shapeUtil.checkAtomicity(current, toolId)) {
        is_shift = shapeUtil.checkClosed(current, shape);

    } else {
        is_shift = true;
    }
    return is_shift;
}


const Tool = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {

    const current: Current = shapeStateProps.current;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    const shape: ShapeArray = shapeStateProps.shape;
    const setShape: Dispatch<SetStateAction<ShapeArray>> = updateShapeStateProps.setShape;

    const [tool, setTool] = useState<string>(ToolEnum.Line);

    const [modalOpenFlag, setModalOpenFlag] = useState<boolean>(false);

    function shiftTool(tool: string) {
        let shapeId: string = "";

        if (current?.shape_id == undefined) {
            shapeId = "s1";
        } else {
            shapeId = shapeUtil.generationIdNum(current.shape_id);
        }

        setShape((prevShapes: ShapeArray) => [...prevShapes, {
            id: shapeId,
            type: undefined,
            status: ShapeStatusEnum["New"],
            pre_status: undefined,
            is_closed: false,
            is_deleted: false
        }]);

        let toolType = ToolEnum[tool as keyof typeof ToolEnum]

        setCurrent((prevState: Current) => ({
            ...prevState,
            tool: toolType,
            pre_tool: prevState.tool,
            shape_id: shapeId,
            shape_status: ShapeStatusEnum["New"],
            operation: OperationEnum["AP_Free"],
            pre_operation: prevState.operation
        }));
    }

    function toolClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        setTool(event.currentTarget.id);

        if (checkShift(current, event.currentTarget.id, shape)) {
            shiftTool(event.currentTarget.id);

        } else {
            setModalOpenFlag(true);
        }
    }

    useEffect(() => {
    });

    return (
        <div>
            <ConfirmModal isOpen={modalOpenFlag}
                          onYes={() => {
                              shiftTool(tool);
                              setModalOpenFlag(false);
                          }}
                          onNo={() => setModalOpenFlag(false)}
                          message="Would you convert shape?">
            </ConfirmModal>
            {Object.values(ToolEnum).map((tool) => (
                <button key={tool} id={tool} onClick={toolClickEventListener} style={{marginRight: "3px"}}>
                    {tool}
                </button>))
            }
        </div>
    );
};

export default Tool;