import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import {addActions} from "@/store/addMenu-slice";
import {useDispatch} from "react-redux";

const Backdrop = (props) => {
    const dispatch = useDispatch();
    const close = () => {dispatch(addActions.close())};
    const onClose = (event) => {
        event.preventDefault();
        close();
    }
    return (
        <>
            <form onSubmit={onClose}>
                <button className={classes.backdrop}></button>
            </form>
        </>
    )
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const crtPortal = () => window ? document.getElementById("overlay-root") : null;

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, crtPortal())}
            {ReactDOM.createPortal(
                <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>, crtPortal()
            )}
        </>
    );
};

export default Modal;