import {ShapeStatusEnum, OperationEnum, ToolEnum} from '@/store/enum/shape.enum'

export type Current = Partial<{
    tool: ToolEnum;
    pre_tool: ToolEnum;
    shape_id: string;
    shape_status: ShapeStatusEnum;
    operation: OperationEnum;
    pre_operation: OperationEnum;
    cur_point_id: string;
    pre_point_id1: string;
    pre_point_id2: string;
    pre_point_id3: string;
}>;