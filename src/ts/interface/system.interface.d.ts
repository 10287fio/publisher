import {ConfirmEnum} from '@/store/enum/system.enum';
import {Dispatch, SetStateAction} from 'react';
import {OperationEnum} from '@/store/enum/shape.enum';

export interface HistoryStack {
    order: number;
    target: string;
    operation: OperationEnum | undefined;
}

export interface HistroyStackArray extends Array<HistoryStack> {
}

export interface HistoryBack {
    order: number;
    stack_order: number;
    target: string;
    operation: OperationEnum | undefined;
}

export interface HistoryBackArray extends Array<HistoryBack> {
}

export interface ModalStateProps {
    modalOpenFlag: boolean;
    modalResult: ConfirmEnum;
}

export interface UpdateModalStateProps {
    setModalOpenFlag: Dispatch<SetStateAction<boolean>>;
    setModalResult: Dispatch<SetStateAction<ConfirmEnum>>;
}

export interface ModalComponentProps {
    modalStateProps: ModalStateProps,
    updateModalStateProps: UpdateModalStateProps,
    children?: React.ReactNode
}