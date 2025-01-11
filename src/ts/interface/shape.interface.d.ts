import {CurrentId, ShapeType} from '@/ts';

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
    type: ShapeType | undefined;
    status: string | undefined;
    canvas_id: string | undefined;
}

export interface Point {
    id: string;
    shape_id: string | undefined;
    x: number;
    y: number;
}

export interface Line {
    id: string;
    shape_id: string | undefined;
    equation: string | undefined;
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

export interface ShapeStateProps {
    draw: Draw;
    reserve: Reserve[];
    result: Result;
    shape: Shape[];
    point: Point[];
    line: Line[];
    arc: Arc[];
    currentId?: CurrentId;
}

export interface UpdateShapeStateProps {
    setDraw: Dispatch<SetStateAction<Draw>>;
    setReserve: Dispatch<SetStateAction<Reserve>>;
    setResult: Dispatch<SetStateAction<Result>>;
    setShape: Dispatch<SetStateAction<Shape>>;
    setPoint: Dispatch<SetStateAction<Point>>;
    setLine: Dispatch<SetStateAction<Line>>;
    setArc: Dispatch<SetStateAction<Arc>>;
    setCurrentId: Dispatch<SetStateAction<CurrentId>>;
}