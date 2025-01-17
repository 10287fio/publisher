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

export const OperationObjectEnum: { key: string, value: string, upperKey: string | null, spot: ShapeSpotEnum }[] = [
    {key: "Append", value: "Append", upperKey: null, spot: ShapeSpotEnum.Default},
    {key: "Free", value: "Free", upperKey: "Append", spot: ShapeSpotEnum.Preview},
    {key: "Preset", value: "Preset", upperKey: "Append", spot: ShapeSpotEnum.Preview},
    {key: "Cancel", value: "Cancel", upperKey: null, spot: ShapeSpotEnum.Side},
    {key: "Entire Cancel", value: "Entire Cancel", upperKey: null, spot: ShapeSpotEnum.Vertex},
    {key: "Confirm", value: "Confirm", upperKey: null, spot: ShapeSpotEnum.Final_Vertex},
    {key: "Close", value: "Close", upperKey: null, spot: ShapeSpotEnum.Final_Vertex},
    {key: "Complete", value: "Complete", upperKey: null, spot: ShapeSpotEnum.All},
    {key: "Reflect", value: "Reflect", upperKey: null, spot: ShapeSpotEnum.All},
    {key: "Undo", value: "Undo", upperKey: null, spot: ShapeSpotEnum.All},
    {key: "Redo", value: "Redo", upperKey: null, spot: ShapeSpotEnum.All}
] as const;

export const OperationEnum = Object.fromEntries(
    OperationObjectEnum.map((operation) => [operation.key, operation.value])
) as { [key in typeof OperationObjectEnum[number]["key"]]: string };

export const ToolObjectEnum: { key: string, value: string, atomicity: boolean }[] = [
    {key: "Line", value: "Line", atomicity: false},
    {key: "Arc", value: "Arc", atomicity: false},
    {key: "Triangle", value: "Triangle", atomicity: true},
    {key: "Quadrangle", value: "Quadrangle", atomicity: true},
    {key: "Sector", value: "Sector", atomicity: true},
    {key: "Circle", value: "Circle", atomicity: true}
] as const;

export const ToolEnum = Object.fromEntries(
    ToolObjectEnum.map((tool) => [tool.key, tool.value])
) as { [key in typeof ToolObjectEnum[number]["key"]]: string };