import {ShapeStateProps, UpdateShapeStateProps} from '@/ts';

export interface CanvasComponentProps {
    shapeStateProps: ShapeStateProps;
    updateShapeStateProps: UpdateShapeStateProps;
}

export interface CanvasListenerProps {
    shapeStateProps: ShapeStateProps;
    updateShapeStateProps: UpdateShapeStateProps;
    shapeId: string;
    curPoint: { x: number, y: number };
    drawCtx: CanvasRenderingContext2D;
}

export interface GessoComponentProps {
    shapeStateProps: ShapeStateProps;
}