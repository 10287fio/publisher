import {ToolEnum} from '@/store/enum/shape.enum'

export type CurrentId = {
    shape_id: string;
    tool_type: ToolEnum;
    cur_point_id: string | undefined;
    pre_point_id1: string | undefined;
    pre_point_id2: string | undefined;
    pre_point_id3: string | undefined;
    is_closed: boolean;
}