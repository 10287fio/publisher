import {CanvasComponentProps, Current, PointArray, ShapeArray} from '@/ts';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import shapeUtil from '@/util/shape.util';
import {ToolEnum, ToolObjectEnum} from '@/store/enum/shape.enum';
import ConfirmModal from '@/composition/modal/ConfirmModal';
import toolStyle from './Tool.module.scss';

function checkShift(current: Current, toolId: String, shape: ShapeArray): boolean {
    let is_shift: boolean = false;
    let shift_type: number = 0;

    if (current?.tool == undefined) {

    } else if (!shapeUtil.checkAtomicity(current, toolId)) {
        is_shift = shapeUtil.checkClosed(current, shape);

    } else if (shapeUtil.checkAtomicity(current, toolId)){
        is_shift = shapeUtil.checkClosed(current, shape);
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

    function toolClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        setTool(event.currentTarget.id);

        if (checkShift(current, event.currentTarget.id, shape)) {
            shapeUtil.shiftTool(shape, setShape, event.currentTarget.id, setCurrent);

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
                              shapeUtil.cleanedUpShape(current, setCurrent, setShape, setPoint);
                              shapeUtil.shiftTool(shape, setShape, tool, setCurrent);
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