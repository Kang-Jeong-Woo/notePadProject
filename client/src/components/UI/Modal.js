import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import PostItForm from "@/components/Form/PostItForm";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}/>;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}><PostItForm onAddPost={props.onAddPost}/></div>
        </div>
    );
};
const crtPortal = () => window ? document.getElementById("overlay-root") : null;

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, crtPortal())}
            {ReactDOM.createPortal(
                <ModalOverlay onAddPost={props.onAddPost}>{props.children}</ModalOverlay>,crtPortal()
            )}
        </>
    );
};

export default Modal;