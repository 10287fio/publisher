import {CanvasComponentProps, CurrentId} from '@/ts';
import {ToolType} from '@/store/enum/shape'

function checkClose(currentId:CurrentId):Boolean{
    let resultFlag = true;

    if(currentId.is_closed){

    }

    return resultFlag;
}

const Tools = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {
    const currentId:CurrentId | undefined = shapeStateProps.currentId;

    function toolsClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {


        switch (event.currentTarget.id) {
            case ToolType.Line :
                console.log("l");
                break;
            case ToolType.Arc :
                console.log("a");
                break;
            case ToolType.Triangle :
                console.log("t");
                break;
            case ToolType.Quadrangle :
                console.log("q");
                break;
            case ToolType.Sector :
                console.log("s");
                break;
            case ToolType.Circle :
                console.log("c");
                break;
        }
    }

    return (
        <div>
            <button id={ToolType.Line} onClick={toolsClickEventListener}>{ToolType.Line}</button>
            &nbsp;
            <button id={ToolType.Arc} onClick={toolsClickEventListener}>{ToolType.Arc}</button>
            &nbsp;
            <button id={ToolType.Triangle} onClick={toolsClickEventListener}>{ToolType.Triangle}</button>
            &nbsp;
            <button id={ToolType.Quadrangle} onClick={toolsClickEventListener}>{ToolType.Quadrangle}</button>
            &nbsp;
            <button id={ToolType.Sector} onClick={toolsClickEventListener}>{ToolType.Sector}</button>
            &nbsp;
            <button id={ToolType.Circle} onClick={toolsClickEventListener}>{ToolType.Circle}</button>
        </div>
    );
};

export default Tools;