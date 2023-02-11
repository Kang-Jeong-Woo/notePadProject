import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
    // 여기에 input form 작성
    return (
        <div className={classes.modal}>
            <div className={classes.content}></div>
        </div>
    );
};
const crtPortal = () => window ? document.getElementById("overlay-root") : null;

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, crtPortal())}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,crtPortal()
            )}
        </>
    );
};

export default Modal;