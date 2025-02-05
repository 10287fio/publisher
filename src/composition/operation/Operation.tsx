import {OperationEnum, OperationObjectEnum} from '@/store/enum/shape.enum'
import {CanvasComponentProps, Current} from '@/ts';
import {Dispatch, SetStateAction} from 'react';
import operationStyle from './Operation.module.scss';

const Operation = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {
    const current: Current = shapeStateProps.current;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    function operationClickListener(event: React.MouseEvent<HTMLButtonElement>) {

        let operation = OperationEnum[event.currentTarget.id as keyof typeof OperationEnum];

        setCurrent((prevState: Current) => ({
            ...prevState,
            operation: operation,
            pre_operation: prevState.operation
        }));
    }

    return (
        <div>{
            Object.values(OperationEnum).map((operation) => (
                <button className={operationStyle.operationButton}
                        key={OperationObjectEnum.find(x => x.value == operation)?.key}
                        id={OperationObjectEnum.find(x => x.value == operation)?.key}
                        onClick={operationClickListener}>{operation}</button>
            ))}
        </div>
    );
}

export default Operation;