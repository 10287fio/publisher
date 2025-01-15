export enum ShapeTypeEnum {
    Triangle = "Triangle",
    Quadrangle = "Quadrangle",
    Polygon = "Polygon",
    Sector = "Sector",
    Circle = "Circle",
    Composition = "Composition"
};

export const ShapeStatusObjectEnum: { key: string, value: string, finalization: boolean }[] = [
    {key: "New", value: "New", finalization: false}
    , {key: "Updated", value: "Updated", finalization: false}
    , {key: "Inprogress", value: "Inprogress", finalization: false}
    , {key: "Closed", value: "Closed", finalization: false}
    , {key: "Complete", value: "Complete", finalization: true}
    , {key: "Modified", value: "Modified", finalization: true}
] as const;

export const ShapeStatusEnum = Object.fromEntries(
    ShapeStatusObjectEnum.map((shapeStatus) => [shapeStatus.key, shapeStatus.value])
) as { [key in typeof ShapeStatusObjectEnum[number]["key"]]: string };

export const OperationObjectEnum: { key: string, value: string }[] = [
    {key: "Append", value: "Append"}
    , {key: "Cancel", value: "Cancel"}
    , {key: "Entire Cancel", value: "Entire Cancel"}
    , {key: "Confirm", value: "Confirm"}
    , {key: "Close", value: "Close"}
    , {key: "Complete", value: "Complete"}
    , {key: "Undo", value: "Undo"}
    , {key: "Redo", value: "Redo"}
] as const;

export const OperationEnum = Object.fromEntries(
    OperationObjectEnum.map((operation) => [operation.key, operation.value])
) as { [key in typeof OperationObjectEnum[number]["key"]]: string };

export const ToolObjectEnum: { key: string, value: string, atomicity: boolean }[] = [
    {key: "Line", value: "Line", atomicity: false}
    , {key: "Arc", value: "Arc", atomicity: false}
    , {key: "Triangle", value: "Triangle", atomicity: true}
    , {key: "Quadrangle", value: "Quadrangle", atomicity: true}
    , {key: "Sector", value: "Sector", atomicity: true}
    , {key: "Circle", value: "Circle", atomicity: true}
] as const;

export const ToolEnum = Object.fromEntries(
    ToolObjectEnum.map((tool) => [tool.key, tool.value])
) as { [key in typeof ToolObjectEnum[number]["key"]]: string };