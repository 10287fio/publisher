import {Current, PointArray, ShapeArray} from '@/ts';
import {
    OperationEnum,
    ShapeStatusEnum,
    ShapeStatusObjectEnum,
    ShapeTypeEnum,
    ToolEnum,
    ToolObjectEnum
} from '@/store/enum/shape.enum';
import {Dispatch, SetStateAction} from 'react';

function numberingId(id: string): string {
    let idNum: number = Number(id.slice(1));
    idNum++;
    return id.slice(0, 1).concat(idNum.toString());
}

function generationId(key: string, id: string | undefined) {
    if (id == undefined) {
        return key.concat("1");
    } else {
        return numberingId(id);
    }
}

function calQuadCoord(prePoint: { x: number, y: number }, curPoint: {
    x: number,
    y: number
}): "x" | "y" {
    if (((prePoint?.x < curPoint.x) && (prePoint?.y > curPoint.y)) || ((prePoint?.x > curPoint.x) && (prePoint?.y < curPoint.y))) {
        if ((Math.round((curPoint.y - prePoint?.y) / (curPoint.x - prePoint?.x) * 10) / 10) > -1) {
            return "x";
        } else {
            return "y";
        }
    } else if (((prePoint?.x < curPoint.x) && (prePoint?.y < curPoint.y)) || ((prePoint?.x > curPoint.x) && (prePoint?.y > curPoint.y))) {
        if ((Math.round((curPoint.y - prePoint?.y) / (curPoint.x - prePoint?.x) * 10) / 10) < 1) {
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

function cleanedUpCurrent(setCurrent: Dispatch<SetStateAction<Current>>) {
    setCurrent((prevState) => ({
        tool: undefined,
        pre_tool: prevState?.tool,
        shape_id: undefined,
        shape_status: undefined,
        operation: undefined,
        pre_operation: undefined,
        cur_point_id: undefined,
        pre_point_id1: undefined,
        pre_point_id2: undefined,
        pre_point_id3: undefined
    }));
}

function cleanedUpShape(current: Current, setCurrent: Dispatch<SetStateAction<Current>>, setShape: Dispatch<SetStateAction<ShapeArray>>, setPoint: Dispatch<SetStateAction<PointArray>>) {
    setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == current.shape_id ?
        {...shape, is_deleted: true} : shape));

    setPoint((prevState: PointArray) => prevState.map(point => point.shape_id == current.shape_id ?
        {...point, is_deleted: true} : point));

    setCurrent((prevState) => ({
        tool: undefined,
        pre_tool: prevState?.tool,
        shape_id: undefined,
        shape_status: undefined,
        operation: undefined,
        pre_operation: undefined,
        cur_point_id: undefined,
        pre_point_id1: undefined,
        pre_point_id2: undefined,
        pre_point_id3: undefined
    }));
}

function shiftTool(tool: string, setCurrent: Dispatch<SetStateAction<Current>>, shape: ShapeArray, setShape: Dispatch<SetStateAction<ShapeArray>>) {
    let shapeId: string | undefined = shape?.at(-1)?.id;

    shapeId = generationId("s", shapeId);

    let shapeType: ShapeTypeEnum | undefined;

    shapeType = Object.values(ShapeTypeEnum).find(shapeType => shapeType == tool) ?? ShapeTypeEnum.Pending;

    setShape((prevShapes: ShapeArray) => [...prevShapes, {
        id: shapeId,
        type: shapeType,
        status: ShapeStatusEnum.New,
        pre_status: undefined,
        is_closed: false,
        is_deleted: false
    }]);

    let toolType = ToolEnum[tool as keyof typeof ToolEnum]

    setCurrent((prevState: Current) => ({
        ...prevState,
        tool: toolType,
        pre_tool: prevState.tool,
        shape_id: shapeId,
        shape_status: ShapeStatusEnum.New,
        operation: OperationEnum.AP_Free,
        pre_operation: prevState.operation
    }));
}

function shiftShape(current: Current, setCurrent: Dispatch<SetStateAction<Current>>, shape: ShapeArray, setShape: Dispatch<SetStateAction<ShapeArray>>,): string {
    let shapeId: string | undefined = shape?.at(-1)?.id;

    shapeId = generationId("s", shapeId);

    let shapeType: ShapeTypeEnum | undefined;

    shapeType = Object.values(ShapeTypeEnum).find(shapeType => shapeType == current.tool) ?? ShapeTypeEnum.Pending;

    setShape((prevShapes: ShapeArray) => [...prevShapes, {
        id: shapeId,
        type: shapeType,
        status: ShapeStatusEnum.New,
        pre_status: undefined,
        is_closed: false,
        is_deleted: false
    }]);

    let toolType = ToolEnum[current.tool as keyof typeof ToolEnum];

    setCurrent((prevState: Current) => ({
        ...prevState,
        tool: toolType,
        pre_tool: prevState.tool,
        shape_id: shapeId,
        shape_status: ShapeStatusEnum.New,
        operation: OperationEnum.AP_Free,
        pre_operation: prevState.operation
    }));

    return shapeId;
}

export default {
    numberingId,
    generationId,
    calQuadCoord,
    checkClosed,
    checkFinal,
    getAtomicityByToolId,
    checkAtomicity,
    cleanedUpCurrent,
    cleanedUpShape,
    shiftTool,
    shiftShape
};