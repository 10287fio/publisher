export enum ShapeTypeEnum {
    Triangle = "Triangle",
    Quadrangle = "Quadrangle",
    Polygon = "Polygon",
    Sector = "Sector",
    Circle = "Circle",
    Composition = "Composition"
};

export enum ShapeSpotEnum {
    Default = "Default",
    All = "All",
    Side = "Side",
    Vertex = "Vertex",
    Middle_Vertex = "Middle_Vertex",
    Final_Vertex = "Final_Vertex",
    Preview = "Preview"
}

export const ShapeStatusObjectEnum: { key: string, value: string, finalization: boolean }[] = [
    {key: "New", value: "New", finalization: false},
    {key: "Updated", value: "Updated", finalization: false},
    {key: "Inprogress", value: "Inprogress", finalization: false},
    {key: "Closed", value: "Closed", finalization: false},
    {key: "Complete", value: "Complete", finalization: true},
    {key: "Modified", value: "Modified", finalization: true}
] as const;

export const ShapeStatusEnum = Object.fromEntries(
    ShapeStatusObjectEnum.map((shapeStatus) => [shapeStatus.key, shapeStatus.value])
) as { [key in typeof ShapeStatusObjectEnum[number]["key"]]: string };

export const OperationObjectEnum: {
    key: string,
    value: string,
    upperKey: string | null,
    spot: ShapeSpotEnum,
    order: number
}[] = [
    {key: "Append", value: "Append", upperKey: null, spot: ShapeSpotEnum.Default, order: 1},
    {key: "Free", value: "Free", upperKey: "Append", spot: ShapeSpotEnum.Preview, order: 2},
    {key: "Preset", value: "Preset", upperKey: "Append", spot: ShapeSpotEnum.Preview, order: 3},
    {key: "Cancel", value: "Cancel", upperKey: null, spot: ShapeSpotEnum.Side, order: 4},
    {key: "Entire Cancel", value: "Entire Cancel", upperKey: null, spot: ShapeSpotEnum.Vertex, order: 5},
    {key: "Confirm", value: "Confirm", upperKey: null, spot: ShapeSpotEnum.Final_Vertex, order: 6},
    {key: "Close", value: "Close", upperKey: null, spot: ShapeSpotEnum.Final_Vertex, order: 7},
    {key: "Complete", value: "Complete", upperKey: null, spot: ShapeSpotEnum.All, order: 8},
    {key: "Reflect", value: "Reflect", upperKey: null, spot: ShapeSpotEnum.All, order: 9},
    {key: "Undo", value: "Undo", upperKey: null, spot: ShapeSpotEnum.All, order: 10},
    {key: "Redo", value: "Redo", upperKey: null, spot: ShapeSpotEnum.All, order: 11}
] as const;

const sortedOperationObjectEnum = [...OperationObjectEnum].sort((a, b) => a.order - b.order);

export const OperationEnum = Object.fromEntries(
    sortedOperationObjectEnum.map((operation) => [operation.key, operation.value])
) as { [key in typeof OperationObjectEnum[number]["key"]]: string };

export const ToolObjectEnum: { key: string, value: string, atomicity: boolean, order: number }[] = [
    {key: "Line", value: "Line", atomicity: false, order: 1},
    {key: "Arc", value: "Arc", atomicity: false, order: 2},
    {key: "Triangle", value: "Triangle", atomicity: true, order: 3},
    {key: "Quadrangle", value: "Quadrangle", atomicity: true, order: 4},
    {key: "Sector", value: "Sector", atomicity: true, order: 5},
    {key: "Circle", value: "Circle", atomicity: true, order: 6}
] as const;

const sortedToolObjectEnum = [...ToolObjectEnum].sort((a, b) => a.order - b.order);

export const ToolEnum = Object.fromEntries(
    sortedToolObjectEnum.map((tool) => [tool.key, tool.value])
) as { [key in typeof ToolObjectEnum[number]["key"]]: string };