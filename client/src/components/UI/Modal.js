import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import {addActions} from "@/store/addMenu-slice";
import {useDispatch} from "react-redux";

const Backdrop = (props) => {
    const dispatch = useDispatch();
    const close = () => {dispatch(addActions.close())}
    return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    );
};
const crtPortal = () => window ? document.getElementById("overlay-root") : null;

const Modal = (props) => {



    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, crtPortal())}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>, crtPortal()
            )}
        </>
    );
};

export default Modal;