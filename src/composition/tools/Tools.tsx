import {CanvasComponentProps, CurrentId} from '@/ts';

const Tools = ({shapeStateProps, updateShapeStateProps}: CanvasComponentProps): JSX.Element => {
    const currentId:CurrentId | undefined = shapeStateProps.currentId;


    function toolsClickEventListener(event: React.MouseEvent<HTMLButtonElement>) {
        if(currentId?.is_closed){

        }

        switch (event.currentTarget.id) {
            case "line" :
                console.log("l");
                break;
            case "arc" :
                console.log("a");
                break;
            case "triangle" :
                console.log("t");
                break;
            case "quadrangle" :
                console.log("q");
                break;
            case "sector" :
                console.log("s");
                break;
            case "circle" :
                console.log("c");
                break;
        }
    }

    return (
        <div>
            <button id="line" onClick={toolsClickEventListener}>Line</button>
            &nbsp;
            <button id="arc" onClick={toolsClickEventListener}>Arc</button>
            &nbsp;
            <button id="triangle" onClick={toolsClickEventListener}>Triangle</button>
            &nbsp;
            <button id="quadrangle" onClick={toolsClickEventListener}>Quadrangle</button>
            &nbsp;
            <button id="sector" onClick={toolsClickEventListener}>Sector</button>
            &nbsp;
            <button id="circle" onClick={toolsClickEventListener}>Circle</button>
        </div>
    );
};

export default Tools;