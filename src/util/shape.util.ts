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

function invertYAxis(canvas: HTMLCanvasElement | null) {
    if (canvas) {
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.translate(0, canvas.height);
                ctx.scale(1, -1);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }
}

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
    if (((prePoint.x < curPoint.x) && (prePoint.y > curPoint.y)) || ((prePoint.x > curPoint.x) && (prePoint.y < curPoint.y))) {
        if ((Math.round((curPoint.y - prePoint?.y) / (curPoint.x - prePoint?.x) * 10) / 10) > -1) {
            return "x";
        } else {
            return "y";
        }
    } else if (((prePoint.x < curPoint.x) && (prePoint.y < curPoint.y)) || ((prePoint.x > curPoint.x) && (prePoint.y > curPoint.y))) {
        if ((Math.round((curPoint.y - prePoint.y) / (curPoint.x - prePoint.x) * 10) / 10) < 1) {
            return "x";
        } else {
            return "y";
        }
    } else if ((prePoint.x == curPoint.x) && (prePoint.y != curPoint.y)) {
        return "y";
    } else if ((prePoint.x != curPoint.x) && (prePoint.y == curPoint.y)) {
        return "x";
    }

    return "x";
}

function calStartAngle(centerPoint: { x: number, y: number }, startPoint: {
    x: number,
    y: number
}): number | undefined {
    let vectorA: { x: number, y: number } = {
        x: centerPoint.x - startPoint.x,
        y: centerPoint.y - startPoint.y
    };

    let startQuadrant: number = determineQuadrant(centerPoint, startPoint);

    let startAngle: number | undefined = 0;
    let rightAngle: number = Math.PI / 2;

    if (startQuadrant == 0 || startQuadrant == -99) {
        startAngle = undefined;
    } else if (startQuadrant == -1) {
        startAngle = rightAngle;
    } else if (startQuadrant == 1) {
        startAngle = Math.atan(vectorA.y / vectorA.x);
    } else if (startQuadrant == -2) {
        startAngle = 0;
    } else if (startQuadrant == 2) {
        startAngle = Math.atan(vectorA.y / vectorA.x);
    } else if (startQuadrant == -3) {
        startAngle = -1 * rightAngle;
    } else if (startQuadrant == 3) {
        startAngle = (-1 * rightAngle) + (-1 * Math.atan(vectorA.x / vectorA.y));
    } else if (startQuadrant == -4) {
        startAngle = -2 * rightAngle;
    } else if (startQuadrant == 4) {
        startAngle = (-2 * rightAngle) + Math.atan(vectorA.y / vectorA.x);
    }

    return startAngle;
}


function calEndAngle(centerPoint: { x: number, y: number }, startPoint: {
    x: number,
    y: number
}, startAngle: number): number | undefined {
    let vectorB: { x: number, y: number } = {
        x: centerPoint.x - startPoint.x,
        y: centerPoint.y - startPoint.y
    };

    let endQuadrant: number = determineQuadrant(centerPoint, startPoint);

    let endAngle: number | undefined = 0;
    let rightAngle: number = Math.PI / 2;
    let oneRotationAngle: number = Math.PI * 2;

    if (endQuadrant == 0 || endQuadrant == -99) {
        endAngle = undefined;
    } else if (endQuadrant == -1) {
        if (startAngle > rightAngle) {
            endAngle = rightAngle;
        } else {
            endAngle = -3 * rightAngle;
        }
    } else if (endQuadrant == 1) {
        if (startAngle > Math.atan(vectorB.y / vectorB.x)) {
            endAngle = Math.atan(vectorB.y / vectorB.x);
        } else {
            endAngle = (-1 * oneRotationAngle) + Math.atan(vectorB.y / vectorB.x);
        }
    } else if (endQuadrant == -2) {
        if (startAngle > 0) {
            endAngle = 0;
        } else {
            endAngle = -4 * rightAngle;
        }
    } else if (endQuadrant == 2) {
        if (startAngle > Math.atan(vectorB.y / vectorB.x)) {
            endAngle = Math.atan(vectorB.y / vectorB.x);
        } else {
            endAngle = (-1 * oneRotationAngle) + Math.atan(vectorB.y / vectorB.x);
        }
    } else if (endQuadrant == -3) {
        if (startAngle > -1 * rightAngle) {
            endAngle = -1 * rightAngle;
        } else {
            endAngle = -5 * rightAngle;
        }
    } else if (endQuadrant == 3) {
        if (startAngle > (-1 * rightAngle) + (-1 * Math.atan(vectorB.x / vectorB.y))) {
            endAngle = (-1 * rightAngle) + (-1 * Math.atan(vectorB.x / vectorB.y));
        } else {
            endAngle = (-1 * oneRotationAngle) + (-1 * rightAngle) + (-1 * Math.atan(vectorB.x / vectorB.y));
        }
    } else if (endQuadrant == -4) {
        if (startAngle > -2 * rightAngle) {
            endAngle = -2 * rightAngle;
        } else {
            endAngle = -6 * rightAngle;
        }
    } else if (endQuadrant == 4) {
        if (startAngle > (-2 * rightAngle) + Math.atan(vectorB.y / vectorB.x)) {
            endAngle = (-2 * rightAngle) + Math.atan(vectorB.y / vectorB.x);
        } else {
            endAngle = (-1 * oneRotationAngle) + (-2 * rightAngle) + Math.atan(vectorB.y / vectorB.x);
        }
    }

    return endAngle;
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

function checkAtomicity(current: Current, toolId: String): boolean {
    let resultFlag: boolean = false;

    let preToolAtomicity: boolean = false;
    let postToolAtomicity: boolean = false;

    if (current?.tool) {
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
        {...shape, status: ShapeStatusEnum.Deleted, is_deleted: true} : shape));

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

function shiftTool(shape: ShapeArray, setShape: Dispatch<SetStateAction<ShapeArray>>, tool: string, setCurrent: Dispatch<SetStateAction<Current>>) {
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

    let toolType = ToolEnum[tool as keyof typeof ToolEnum];

    setCurrent((prevState: Current) => ({
        tool: toolType,
        pre_tool: prevState.tool,
        shape_id: shapeId,
        shape_status: ShapeStatusEnum.New,
        operation: OperationEnum.AP_Free,
        pre_operation: prevState.operation,
        cur_point_id: undefined,
        pre_point_id1: undefined,
        pre_point_id2: undefined,
        pre_point_id3: undefined
    }));
}

function carryOnTool(tool: string, setShape: Dispatch<SetStateAction<ShapeArray>>, current: Current, setCurrent: Dispatch<SetStateAction<Current>>) {
    setShape((prevState: ShapeArray) => prevState.map(shape => shape.id == current.shape_id ?
        {
            ...shape,
            type: ShapeTypeEnum.Composition,
            status: ShapeStatusEnum.Inprogress,
            pre_status: shape.status
        } : shape));

    let toolType = ToolEnum[tool as keyof typeof ToolEnum];

    if(toolType == ToolEnum.Arc){
        // let arcId: string | undefined = arc.at(-1)?.id;
        //
        // arcId = generationId("a", arcId);
    }

    setCurrent((prevState: Current) => ({
        ...prevState,
        tool: toolType,
        pre_tool: prevState.tool,
        shape_status: ShapeStatusEnum.Inprogress,
        operation: OperationEnum.AP_Free,
        pre_operation: prevState.operation,
    }));
}

function shiftShape(shape: ShapeArray, setShape: Dispatch<SetStateAction<ShapeArray>>, current: Current, setCurrent: Dispatch<SetStateAction<Current>>): string {
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

    cleanedUpCurrent(setCurrent);

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

function determineQuadrant(centerPoint: { x: number, y: number }, objectPoint: { x: number, y: number }): number {
    if (centerPoint.x == objectPoint.x && centerPoint.y < objectPoint.y) {
        return -1;
    } else if (centerPoint.x < objectPoint.x && centerPoint.y == objectPoint.y) {
        return -2
    } else if (centerPoint.x == objectPoint.x && centerPoint.y > objectPoint.y) {
        return -3
    } else if (centerPoint.x > objectPoint.x && centerPoint.y == objectPoint.y) {
        return -4
    } else if (centerPoint.x == objectPoint.x && centerPoint.y == objectPoint.y) {
        return 0;
    } else if (centerPoint.x <= objectPoint.x && centerPoint.y < objectPoint.y) {
        return 1;
    } else if (centerPoint.x < objectPoint.x && centerPoint.y >= objectPoint.y) {
        return 2;
    } else if (centerPoint.x >= objectPoint.x && centerPoint.y > objectPoint.y) {
        return 3;
    } else if (centerPoint.x > objectPoint.x && centerPoint.y <= objectPoint.y) {
        return 4;
    } else {
        return -99;
    }
}

export default {
    invertYAxis,
    numberingId,
    generationId,
    calQuadCoord,
    calStartAngle,
    calEndAngle,
    checkClosed,
    checkFinal,
    getAtomicityByToolId,
    checkAtomicity,
    cleanedUpCurrent,
    cleanedUpShape,
    shiftTool,
    carryOnTool,
    shiftShape,
    determineQuadrant
};