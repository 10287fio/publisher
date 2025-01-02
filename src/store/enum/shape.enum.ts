export enum ShapeTypeEnum {
    Triangle = "Triangle",
    Quadrangle = "Quadrangle",
    Polygon = "Polygon",
    Sector = "Sector",
    Circle = "Circle",
    Composition = "Composition"
}

export const ToolsObjectEnum: { value: string, key: string, atomicity: boolean }[] = [
    {value: "Line", key: "Line", atomicity: false}
    , {value: "Arc", key: "Arc", atomicity: false}
    , {value: "Triangle", key: "Triangle", atomicity: true}
    , {value: "Quadrangle", key: "Quadrangle", atomicity: true}
    , {value: "Sector", key: "Sector", atomicity: true}
    , {value: "Circle", key: "Circle", atomicity: true}
] as const;

export const ToolsEnum = Object.fromEntries(
    ToolsObjectEnum.map((tool) => [tool.key, tool.value])
) as { [key in typeof ToolsObjectEnum[number]["key"]]: string };