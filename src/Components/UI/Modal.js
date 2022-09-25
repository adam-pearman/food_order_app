import classes from './Modal.module.css'
import {createPortal} from "react-dom";

const ModalBackdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClick}/>
    )
}

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            {props.children}
        </div>
    )
}

const portalBackdropElement = document.getElementById('backdrop-root')
const portalOverlayElement = document.getElementById('overlay-root')

const Modal = (props) => {
    return (
        <>
            {createPortal(<ModalBackdrop onClick={props.onClose}/>, portalBackdropElement)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalOverlayElement)}
        </>
    )
}

export default Modal