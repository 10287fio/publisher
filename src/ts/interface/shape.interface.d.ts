export interface Draw {
    id: string;
}

export interface Reserve {
    id: string;
}

export interface Result {
    id: string;
}

export interface Shape {
    id: string;
    type: string;
    status: string;
    canvas_id: string;
}

export interface Point {
    id: string;
    shape_id: string;
    x: number;
    y: number;
}

export interface Line {
    id: string;
    shape_id: string;
    equation: string;
    pre_point_id: string;
    post_point_id: string;
}

export interface Arc {
    id: string;
    shape_id: string;
    equation: string;
    center_point_id: string;
    start_point_id: string;
    end_point_id: string;
    radius: number;
}