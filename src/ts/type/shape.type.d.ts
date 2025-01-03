import {ToolsEnum} from '@/store/enum/shape.enum'

export type CurrentId = {
    shape_id: string;
    tool_type: ToolsEnum;
    cur_point_id: string;
    pre_point_id1: string;
    pre_point_id2: string;
    pre_point_id3: string;
    is_closed: boolean;
}