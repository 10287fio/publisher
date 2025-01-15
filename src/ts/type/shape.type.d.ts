import {ShapeStatusEnum, OperationEnum, ToolEnum} from '@/store/enum/shape.enum'

export type Current = {
    shape_id: string;
    shape_status: ShapeStatusEnum;
    tool_type: ToolEnum;
    operation: OperationEnum;
    cur_point_id: string | undefined;
    pre_point_id1: string | undefined;
    pre_point_id2: string | undefined;
    pre_point_id3: string | undefined;
}