import {ConfirmEnum} from '@/store/enum/system.enum';
import modalStyle from './Modal.module.scss';
import {useEffect, Dispatch, SetStateAction} from 'react';
import {ModalComponentProps} from '@/ts';

const ConfirmModal: React.FC<ModalComponentProps> = ({
                                                         modalStateProps,
                                                         updateModalStateProps,
                                                         children
                                                     }) => {
    const modalOpenFlag = modalStateProps.modalOpenFlag;
    const modalResult = modalStateProps.modalResult;
    const setModalOpenFlag = updateModalStateProps.setModalOpenFlag;
    const setModalResult = updateModalStateProps.setModalResult;

    const modalClickListener = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.id == ConfirmEnum.Yes) {
            setModalResult(ConfirmEnum.Yes);
        } else if (event.currentTarget.id == ConfirmEnum.No) {
            setModalResult(ConfirmEnum.No);
        }

        setModalOpenFlag(false);
    }

    useEffect(() => {
        if (modalOpenFlag) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [modalOpenFlag]);

    return modalOpenFlag ? (
        <div className={modalStyle.modalBackground}>
            <div className={modalStyle.modalContainer} onClick={(e) => e.stopPropagation()}
            >
                {children}
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