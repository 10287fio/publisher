import {ShapeStateProps, UpdateShapeStateProps} from '@/ts';

export interface CanvasComponentProps {
    shapeStateProps: ShapeStateProps;
    updateShapeStateProps: UpdateShapeStateProps;
}

export interface CanvasMoveListenerProps {
    shapeStateProps: ShapeStateProps;
    shapeId: string;
    curPoint: { x: number, y: number };
    drawCtx: CanvasRenderingContext2D;
}

export interface CanvasClickListenerProps {
    shapeStateProps: ShapeStateProps;
    updateShapeStateProps: UpdateShapeStateProps;
    shapeId: string;
    curPoint: { x: number, y: number };
    drawCtx: CanvasRenderingContext2D;
}

export interface GessoComponentProps {
    shapeStateProps: ShapeStateProps;
}