import {OperationEnum} from '@/store/enum/shape.enum'
import {CanvasComponentProps, Current} from '@/ts';
import {Dispatch, SetStateAction} from 'react';

const Operation = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {
    const current: Current = shapeStateProps.current;
    const setCurrent: Dispatch<SetStateAction<Current>> = updateShapeStateProps.setCurrent;

    function operationClickListener(event: React.MouseEvent<HTMLButtonElement>) {

        let operation = OperationEnum[event.currentTarget.id as keyof typeof OperationEnum];

        // setCurrent();

    }

    return (
        <div>{
            Object.values(OperationEnum).map((operation) => (
                <button key={operation} id={operation} onClick={operationClickListener}
                        style={{marginRight: "3px"}}>{operation}</button>
            ))}
        </div>
    );
}

export default Operation;