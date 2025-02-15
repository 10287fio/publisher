import {CanvasComponentProps, Current, PointArray, ShapeArray} from '@/ts';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import shapeUtil from '@/util/shape.util';
import {
    ShapeTypeEnum,
    ToolObjectEnum,
    ShapeStatusEnum,
    OperationEnum,
    ToolEnum,
    OperationObjectEnum
} from '@/store/enum/shape.enum';
import {ConfirmEnum} from '@/store/enum/system.enum';
import ConfirmModal from '@/composition/modal/ConfirmModal';
import toolStyle from './Tool.module.scss';

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

    const point: PointArray = shapeStateProps.point;
    const setPoint: Dispatch<SetStateAction<PointArray>> = updateShapeStateProps.setPoint;

    const [tool, setTool] = useState<string>(ToolEnum.Line);

    const [modalOpenFlag, setModalOpenFlag] = useState<boolean>(false);

    function cleanedUpShape() {
        setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == current.shape_id ?
            {...shape, is_deleted: true} : shape));

        setPoint((prevState: PointArray) => prevState.map(point => point.shape_id == current.shape_id ?
            {...point, is_deleted: true} : point));

        setCurrent((prevState) => ({
            tool: undefined,
            pre_tool: prevState?.tool,
            shape_id: undefined,
            shape_status: undefined,
            operation: undefined,
            pre_operation: undefined,
            cur_point_id: undefined,
            pre_point_id1: undefined,
            pre_point_id2: undefined,
            pre_point_id3: undefined
        }));
    }

    function shiftTool(tool: string) {
        let shapeId: string | undefined = shape?.at(-1)?.id;

        if (shapeId == undefined) {
            shapeId = "s1";
        } else {
            shapeId = shapeUtil.generationIdNum(shapeId);
        }

        let shapeType: ShapeTypeEnum | undefined;

        shapeType = Object.values(ShapeTypeEnum).find(shapeType => shapeType == tool);

        setShape((prevShapes: ShapeArray) => [...prevShapes, {
            id: shapeId,
            type: shapeType,
            status: ShapeStatusEnum.New,
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
            shape_status: ShapeStatusEnum.New,
            operation: OperationEnum.AP_Free,
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
                              cleanedUpShape();
                              shiftTool(tool);
                              setModalOpenFlag(false);
                          }}
                          onNo={() => {
                              setModalOpenFlag(false);
                          }}
                          message="Would you convert shape?">
            </ConfirmModal>
            {Object.values(ToolEnum).map((tool) => (
                <button className={toolStyle.toolButton} key={ToolObjectEnum.find(x => x.value == tool)?.key}
                        id={ToolObjectEnum.find(x => x.value == tool)?.key} onClick={toolClickEventListener}>
                    {tool}
                </button>))
            }
        </div>
    );
};

export default Tool;