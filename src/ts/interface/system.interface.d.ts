import {ConfirmEnum} from '@/store/enum/system.enum';
import {Dispatch, SetStateAction} from 'react';

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