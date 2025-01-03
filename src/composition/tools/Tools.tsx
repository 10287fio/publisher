import {CanvasComponentProps, CurrentId} from '@/ts';
import shapeUtil from '@/util/shape.util';
import {ToolsObjectEnum, ToolsEnum} from '@/store/enum/shape.enum'

function checkShift(toolId: String, currentId: CurrentId | undefined): Boolean {
    let resultFlag = true;

    if (currentId != undefined && currentId.is_closed) {
        let selectedTool = ToolsObjectEnum.filter(x => x.value == toolId);

        if (selectedTool.length == 1) {
            resultFlag = !selectedTool[0].atomicity;
        }
    }

    return resultFlag;
}

const Tools = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {

    const currentId: CurrentId | undefined = shapeStateProps.currentId;

    const setShape = updateShapeStateProps.setShape;

    function toolsClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        if (checkShift(event.currentTarget.id, currentId)) {
            let shapeId: string = "";

            if (currentId?.shape_id == undefined) {
                shapeId = "s1"
            } else {
                shapeId = shapeUtil.generationIdNum(currentId?.shape_id);
            }

            setShape


        }

        switch (event.currentTarget.id) {
            case ToolsEnum.Line :
                console.log("l");
                break;
            case ToolsEnum.Arc :
                console.log("a");
                break;
            case ToolsEnum.Triangle :
                console.log("t");
                break;
            case ToolsEnum.Quadrangle :
                console.log("q");
                break;
            case ToolsEnum.Sector :
                console.log("s");
                break;
            case ToolsEnum.Circle :
                console.log("c");
                break;
        }
    }

    return (
        <div>
            <button id={ToolsEnum.Line} onClick={toolsClickEventListener}>{ToolsEnum.Line}</button>
            &nbsp;
            <button id={ToolsEnum.Arc} onClick={toolsClickEventListener}>{ToolsEnum.Arc}</button>
            &nbsp;
            <button id={ToolsEnum.Triangle} onClick={toolsClickEventListener}>{ToolsEnum.Triangle}</button>
            &nbsp;
            <button id={ToolsEnum.Quadrangle} onClick={toolsClickEventListener}>{ToolsEnum.Quadrangle}</button>
            &nbsp;
            <button id={ToolsEnum.Sector} onClick={toolsClickEventListener}>{ToolsEnum.Sector}</button>
            &nbsp;
            <button id={ToolsEnum.Circle} onClick={toolsClickEventListener}>{ToolsEnum.Circle}</button>
        </div>
    );
};

export default Tools;