import ReactDOM from 'react-dom';
import classes from './Modal.module.css';
import {addActions} from "@/store/addMenu-slice";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {CSSTransition, Transition} from "react-transition-group";
import {useRef} from "react";

const PostItMoal = styled.div`
  background-image: url("/postItModal.png");
  background-size: cover;
  background-repeat: round;
  position: fixed;
  top: 10vh;
  left: 15%;
  width: 70%;
  height: 80vh;
  padding: 6em;
  z-index: 100000;
`

const duration = 600;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}
const transitionStyles = {
    entering: { opacity: 0.5 , display:"absolute" , left: "100px"},
    entered:  { opacity: 1, display:"absolute" , left: "100px"},
    exiting:  { opacity: 0.5, display:"absolute" , left: "100px"},
    exited:  { opacity: 0 , display:"absolute" , left: "100px"},
};

const Backdrop = (props) => {
    const dispatch = useDispatch();
    const close = () => {
        dispatch(addActions.close())
    };
    const onClose = (event) => {
        event.preventDefault();
        // close();
        props.onClose();
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
        <PostItMoal>
            <div style={{ rotate: "-7deg" }}>{props.children}</div>
        </PostItMoal>
    );
};

const crtPortal = () => window ? document.getElementById("overlay-root") : null;

const Modal = (props) => {

    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, crtPortal())}
            {ReactDOM.createPortal(
                    <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay> , crtPortal())}
        </>
    );
};

export default Modal;
// <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
//style={{...defaultStyle, ...transitionStyles[props.onState]}}