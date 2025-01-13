export enum ShapeTypeEnum {
    Triangle = "Triangle",
    Quadrangle = "Quadrangle",
    Polygon = "Polygon",
    Sector = "Sector",
    Circle = "Circle",
    Composition = "Composition"
};

export const ShapeStatusObjectEnum: { value: string, key: string, finalization: boolean }[] = [
    {value: "New", key: "New", finalization: false}
    , {value: "Changed", key: "Changed", finalization: false}
    , {value: "Inprogress", key: "Inprogress", finalization: false}
    , {value: "Closed", key: "Closed", finalization: false}
    , {value: "Complete", key: "Complete", finalization: true}
    , {value: "Modified", key: "Modified", finalization: true}
] as const;

export const ShapeStatusEnum = Object.fromEntries(
    ShapeStatusObjectEnum.map((shapeStatus) => [shapeStatus.key, shapeStatus.value])
) as { [key in typeof ShapeStatusObjectEnum[number]["key"]]: string };

export const OperationObjectEnum: { value: string, key: string }[] = [
    {value: "Undo", key: "Undo"}
    , {value: "Redo", key: "Redo"}
    , {value: "Delete", key: "Delete"}
    , {value: "Cancel", key: "Cancel"}
    , {value: "Close", key: "Close"}
] as const;

export const OperationEnum = Object.fromEntries(
    OperationObjectEnum.map((operation) => [operation.key, operation.value])
) as { [key in typeof OperationObjectEnum[number]["key"]]: string };

export const ToolObjectEnum: { value: string, key: string, atomicity: boolean }[] = [
    {value: "Line", key: "Line", atomicity: false}
    , {value: "Arc", key: "Arc", atomicity: false}
    , {value: "Triangle", key: "Triangle", atomicity: true}
    , {value: "Quadrangle", key: "Quadrangle", atomicity: true}
    , {value: "Sector", key: "Sector", atomicity: true}
    , {value: "Circle", key: "Circle", atomicity: true}
] as const;

export const ToolEnum = Object.fromEntries(
    ToolObjectEnum.map((tool) => [tool.key, tool.value])
) as { [key in typeof ToolObjectEnum[number]["key"]]: string };