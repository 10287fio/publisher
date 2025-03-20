import {CanvasComponentProps, Current, PointArray, ShapeArray} from '@/ts';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import shapeUtil from '@/util/shape.util';
import {ToolEnum, ToolObjectEnum} from '@/store/enum/shape.enum';
import ConfirmModal from '@/composition/modal/ConfirmModal';
import toolStyle from './Tool.module.scss';

function checkShift(current: Current, toolId: string, shape: ShapeArray): number {
    let shift_type: number = 0;

    let pre_tool: string | undefined = current?.tool;
    let cur_tool: string = toolId;

    if (current?.tool == undefined) {
        shift_type = 1;
    } else if (shapeUtil.checkClosed(current, shape)) {
        shift_type = 1;
    } else if (!shapeUtil.checkClosed(current, shape)) {
        if (shapeUtil.checkAtomicity(current, toolId)) {
            shift_type = 2;
        } else if (!shapeUtil.checkAtomicity(current, toolId)) {
            if (pre_tool == cur_tool) {
                shift_type = 2;
            } else if (pre_tool != cur_tool) {
                shift_type = 3;
            }
        }
    }

    return shift_type;
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

    function toolClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        setTool(event.currentTarget.id);

        let shift_type: number = 0;

        shift_type = checkShift(current, event.currentTarget.id, shape);

        if (shift_type == 1) {
            shapeUtil.shiftShape(shape, setShape, event.currentTarget.id, setCurrent);

        } else if (shift_type == 2) {
            setModalOpenFlag(true);

        } else if (shift_type == 3) {
            shapeUtil.carryOnShape(event.currentTarget.id, setShape, current, setCurrent);
        }
    }

    useEffect(() => {
    });

    return (
        <div>
            <ConfirmModal isOpen={modalOpenFlag}
                          onYes={() => {
                              shapeUtil.cleanedUpShape(current, setCurrent, setShape, setPoint);
                              shapeUtil.shiftShape(shape, setShape, tool, setCurrent);
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