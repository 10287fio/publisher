import {Current} from '@/ts';
import {ShapeTypeEnum, ShapeStatusEnum} from '@/store/enum/shape.enum';

export interface Article {
    id: string;
    title: string;
    author_id: string;
}

export interface Draw {
    id: string;
    article_id: string;
}

export interface Reserve {
    id: string;
    article_id: string;
    is_closed: boolean;
}

export interface ReserveArray extends Array<Reserve> {
}

export interface Result {
    id: string;
    article_id: string;
}

export interface ShapeOfCanvas {
    canvas_id: string;
    shape_id: string;
    is_deleted: boolean;
}

export interface Shape {
    id: string;
    type: ShapeTypeEnum | undefined;
    status: ShapeStatusEnum | undefined;
    pre_status: ShapeStatusEnum | undefined;
    is_closed: boolean;
    is_deleted: boolean;
}

export interface ShapeArray extends Array<Shape> {
}

export interface Point {
    id: string;
    shape_id: string | undefined;
    x: number;
    y: number;
    is_deleted: boolean;
    to_close: boolean;
}

export interface PointArray extends Array<Point> {
}

export interface Line {
    id: string;
    shape_id: string | undefined;
    equation: string | undefined;
    pre_point_id: string;
    post_point_id: string;
}

export interface LineArray extends Array<Line> {
}

export interface Arc {
    id: string;
    shape_id: string;
    center_point_id: string;
    start_point_id: string | undefined;
    end_point_id: string | undefined;
    radius: number | undefined;
}

export interface ArcArray extends Array<Arc> {
}

export interface ShapeStateProps {
    draw: Draw;
    reserve: ReserveArray;
    result: Result;
    shape: ShapeArray;
    point: PointArray;
    line: LineArray;
    arc: ArcArray;
    current: Current;
}

export interface UpdateShapeStateProps {
    setDraw: Dispatch<SetStateAction<Draw>>;
    setReserve: Dispatch<SetStateAction<Reserve>>;
    setResult: Dispatch<SetStateAction<Result>>;
    setShape: Dispatch<SetStateAction<ShapeArray>>;
    setPoint: Dispatch<SetStateAction<PointArray>>;
    setLine: Dispatch<SetStateAction<LineArray>>;
    setArc: Dispatch<SetStateAction<ArcArray>>;
    setCurrent: Dispatch<SetStateAction<Current>>;
}