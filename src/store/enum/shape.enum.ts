export enum ShapeTypeEnum {
    Triangle = "Triangle",
    Quadrangle = "Quadrangle",
    Polygon = "Polygon",
    Sector = "Sector",
    Circle = "Circle",
    Composition = "Composition"
}

export enum ShapeStatusEnum {
    New = "New",
    Changed = "Changed",
    Inprogress = "Inprogress",
    Closed = "Closed",
    Complete = "Complete"
}

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