import {CurrentId} from '@/ts';
import {ShapeStatusEnum, ShapeStatusObjectEnum, ToolObjectEnum} from '@/store/enum/shape.enum';

function generationIdNum(id: string): string {
    let idNum: number = Number(id.slice(1));
    idNum++;
    return id.slice(0, 1).concat(idNum.toString());
}

function calQuadCoord(lastPoint: { x: number, y: number }, x: number, y: number) {
    if (((lastPoint?.x < x) && (lastPoint?.y > y)) || ((lastPoint?.x > x) && (lastPoint?.y < y))) {
        if ((Math.round((y - lastPoint?.y) / (x - lastPoint?.x) * 10) / 10) > -1) {
            return "x";
        } else {
            return "y";
        }
    } else if (((lastPoint?.x < x) && (lastPoint?.y < y)) || ((lastPoint?.x > x) && (lastPoint?.y > y))) {
        if ((Math.round((y - lastPoint?.y) / (x - lastPoint?.x) * 10) / 10) < 1) {
            return "x";
        } else {
            return "y";
        }
    }

    return "x";
}

function checkShift(toolId: String, currentId: CurrentId | undefined): Boolean {
    // let resultFlag: boolean = true;

    if (currentId != undefined && !checkFinal(currentId.shape_status)) {
        return false;
        // let selectedTool = ToolObjectEnum.filter(x => x.value == toolId);
        //
        // if (selectedTool.length == 1) {
        //     resultFlag = !selectedTool[0].atomicity;
        // }
    }

    return true;
}

function checkFinal(shape_status: keyof typeof ShapeStatusObjectEnum): Boolean {
    let result: boolean = false;
    const shapeStatus = ShapeStatusObjectEnum.find((shapeStatusObject) => shapeStatusObject.key == shape_status);

    if (shapeStatus) {
        result = shapeStatus.finalization;
    }

    return result;
}

function checkAtomicity(toolId: String): Boolean {
    let resultFlag = false;

    let selectedTool = ToolObjectEnum.filter(x => x.value == toolId);

    if (selectedTool.length == 1) {
        resultFlag = selectedTool[0].atomicity;
    }

    return resultFlag;
}

export default {generationIdNum, calQuadCoord, checkShift, checkAtomicity};