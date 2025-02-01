import {Current, ShapeArray} from '@/ts';
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

function checkClosed(current: Current, shape: ShapeArray): boolean {
    let result: boolean = true;

    if (current != undefined) {
        let is_closed = shape.find((s) => s.id == current.shape_id)?.is_closed;

        if (is_closed != undefined) {
            result = is_closed;
        }
    }

    return result;
}

function checkFinal(shape_status: keyof typeof ShapeStatusObjectEnum): Boolean {
    let result: boolean = true;

    const shapeStatus = ShapeStatusObjectEnum.find((shapeStatusObject) => shapeStatusObject.key == shape_status);

    if (shapeStatus) {
        result = shapeStatus.finalization;
    }

    return result;
}

function getAtomicityByToolId(toolId: String): boolean {
    let resultFlag = false;

    let selectedTool = ToolObjectEnum.find(x => x.value == toolId);

    if (selectedTool != undefined) {
        resultFlag = selectedTool.atomicity;
    }

    return resultFlag;
}

function checkAtomicity(current: Current, toolId: String): Boolean {
    let resultFlag: boolean = false;

    let preToolAtomicity: boolean = false;
    let postToolAtomicity: boolean = false;

    if (current != undefined) {
        preToolAtomicity = getAtomicityByToolId(current.tool);
        postToolAtomicity = getAtomicityByToolId(toolId);

        if (preToolAtomicity || postToolAtomicity) {
            resultFlag = true;
        }
    }

    return resultFlag;
}

export default {generationIdNum, calQuadCoord, checkClosed, checkFinal, getAtomicityByToolId, checkAtomicity};