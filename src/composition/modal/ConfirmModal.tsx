import {ConfirmEnum} from '@/store/enum/system.enum';
import modalStyle from './Modal.module.scss';
import {useEffect, Dispatch, SetStateAction} from 'react';
import {ModalComponentProps} from '@/ts';

const ConfirmModal = ({
                          isOpen, onYes, onNo, message
                      }: ModalComponentProps) => {

    const modalClickListener = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.id == ConfirmEnum.Yes) {
            onYes();
        } else if (event.currentTarget.id == ConfirmEnum.No) {
            onNo();
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return isOpen ? (
        <div className={modalStyle.modalBackground}>
            <div className={modalStyle.modalContainer} onClick={(e) => e.stopPropagation()}
            >
                {message}
                <div className={modalStyle.modalButtonContainer}>
                    <button className={modalStyle.modalButton} id={ConfirmEnum.Yes}
                            onClick={modalClickListener}>{ConfirmEnum.Yes}</button>
                    <button className={modalStyle.modalButton} id={ConfirmEnum.No}
                            onClick={modalClickListener}>{ConfirmEnum.No}</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default ConfirmModal;