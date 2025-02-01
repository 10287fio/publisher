export interface ModalComponentProps {
    isOpen: boolean,
    onYes: () => void,
    onNo:() => void,
    message: string
}