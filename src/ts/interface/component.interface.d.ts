import {ShapeStateProps, UpdateShapeStateProps} from '@/ts';

export interface CanvasComponentProps {
    shapeStateProps: ShapeStateProps;
    updateShapeStateProps: UpdateShapeStateProps;
}

export interface DrawCanvasMoveListenerProps {
    shapeStateProps: ShapeStateProps;
    shapeId: string;
    curPoint: { x: number, y: number };
    drawCtx: CanvasRenderingContext2D;
}

export interface DrawCanvasClickListenerProps {
    shapeStateProps: ShapeStateProps;
    updateShapeStateProps: UpdateShapeStateProps;
    shapeId: string;
    curPoint: { id: string, x: number, y: number };
    drawCtx: CanvasRenderingContext2D;
}

export interface GessoComponentProps {
    shapeStateProps: ShapeStateProps;
}