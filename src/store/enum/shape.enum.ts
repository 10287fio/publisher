import {sortEnumByOrder, convertEnumByKeyAndValue} from '@/util/enum.util';

export enum ShapeTypeEnum {
    Triangle = "Triangle",
    Quadrangle = "Quadrangle",
    Polygon = "Polygon",
    Sector = "Sector",
    Circle = "Circle",
    Composition = "Composition"
}

export enum ShapeSpotEnum {
    Default = "Default",
    All = "All",
    Side = "Side",
    Vertex = "Vertex",
    Middle_Vertex = "Middle_Vertex",
    Final_Vertex = "Final_Vertex",
    Preview = "Preview"
}

export const CommonFunctionObjectEnum: { key: string, value: string, order: number }[] = [
    {key: "Complete", value: "Complete", order: 1},
    {key: "TempSave", value: "Temporary Save", order: 2},
    {key: "Save", value: "Save", order: 3},
    {key: "Cancel", value: "Cancel", order: 4}
] as const;

const sortedCommonFunctionObjectEnum = sortEnumByOrder(CommonFunctionObjectEnum);

export const CommonFunctionEnum = convertEnumByKeyAndValue(sortedCommonFunctionObjectEnum);

export const ShapeStatusObjectEnum: { key: string, value: string, finalization: boolean, order: number }[] = [
    {key: "New", value: "New", finalization: false, order: 1},
    {key: "Updated", value: "Updated", finalization: false, order: 2},
    {key: "Inprogress", value: "Inprogress", finalization: false, order: 3},
    {key: "Closed", value: "Closed", finalization: true, order: 4},
    {key: "Complete", value: "Complete", finalization: true, order: 5},
    {key: "Modified", value: "Modified", finalization: true, order: 6}
] as const;

const sortedShapeStatusObjectEnum = sortEnumByOrder(ShapeStatusObjectEnum);

export const ShapeStatusEnum = convertEnumByKeyAndValue(sortedShapeStatusObjectEnum);

export const OperationObjectEnum: {
    key: string,
    value: string,
    upperKey: string | null,
    spot: ShapeSpotEnum,
    order: number
}[] = [
    {key: "Append", value: "Append", upperKey: null, spot: ShapeSpotEnum.Default, order: 1},
    {key: "AP_Free", value: "Free", upperKey: "Append", spot: ShapeSpotEnum.Preview, order: 2},
    {key: "AP_Preset", value: "Preset", upperKey: "Append", spot: ShapeSpotEnum.Preview, order: 3},
    {key: "Delete", value: "Delete", upperKey: null, spot: ShapeSpotEnum.Side, order: 4},
    {key: "EntireDelete", value: "Entire Delete", upperKey: null, spot: ShapeSpotEnum.Vertex, order: 5},
    {key: "Confirm", value: "Confirm", upperKey: null, spot: ShapeSpotEnum.Final_Vertex, order: 6},
    {key: "Close", value: "Close", upperKey: null, spot: ShapeSpotEnum.Final_Vertex, order: 7},
    {key: "Complete", value: "Complete", upperKey: null, spot: ShapeSpotEnum.All, order: 8},
    {key: "Reflect", value: "Reflect", upperKey: null, spot: ShapeSpotEnum.All, order: 9},
    {key: "Undo", value: "Undo", upperKey: null, spot: ShapeSpotEnum.All, order: 10},
    {key: "Redo", value: "Redo", upperKey: null, spot: ShapeSpotEnum.All, order: 11}
] as const;

const sortedOperationObjectEnum = sortEnumByOrder(OperationObjectEnum);

export const OperationEnum = convertEnumByKeyAndValue(sortedOperationObjectEnum);

export const ToolObjectEnum: { key: string, value: string, atomicity: boolean, order: number }[] = [
    {key: "Line", value: "Line", atomicity: false, order: 1},
    {key: "Arc", value: "Arc", atomicity: false, order: 2},
    {key: "Triangle", value: "Triangle", atomicity: true, order: 3},
    {key: "Quadrangle", value: "Quadrangle", atomicity: true, order: 4},
    {key: "Sector", value: "Sector", atomicity: true, order: 5},
    {key: "Circle", value: "Circle", atomicity: true, order: 6}
] as const;

const sortedToolObjectEnum = sortEnumByOrder(ToolObjectEnum);

export const ToolEnum = convertEnumByKeyAndValue(sortedToolObjectEnum);