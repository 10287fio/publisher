import {OperationEnum} from '@/store/enum/shape.enum'

const Operation = () => {
    return (
        <div>{
            Object.values(OperationEnum).map((operation) => (
                <button key={operation} id={operation} style={{marginRight: "3px"}}>{operation}</button>
            ))}
        </div>
    );
}

export default Operation;