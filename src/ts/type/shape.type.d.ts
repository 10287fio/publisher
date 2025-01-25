import {ShapeStatusEnum, OperationEnum, ToolEnum} from '@/store/enum/shape.enum'

export type Current = {
    shape_id: string | undefined;
    shape_status: ShapeStatusEnum | undefined;
    tool: ToolEnum | undefined;
    operation: OperationEnum | undefined;
    cur_point_id: string | undefined;
    pre_point_id1: string | undefined;
    pre_point_id2: string | undefined;
    pre_point_id3: string | undefined;
}

export type History = {
    target: string | undefined;
    before: string | undefined;
    after: string | undefined;
}