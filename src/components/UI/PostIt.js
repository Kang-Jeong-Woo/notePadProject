import classes from "./PostIt.module.css";
import {Fragment, useRef, useState} from "react";
import {Transition} from "react-transition-group";


const PostIt = props => {
    const postionRef = useRef(undefined);
    const tabRef = useRef(undefined);

    let shiftX;
    let shiftY;

    function moveAt(pageX, pageY) {
        postionRef.current.style.left = pageX - shiftX + "px";
        postionRef.current.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY)
    }

    const moveTrigger = (event) => {
        shiftX = event.clientX-postionRef.current.getBoundingClientRect().left;
        shiftY = event.clientY-postionRef.current.getBoundingClientRect().top;
        postionRef.current.style.position = "absolute";
        moveAt(event.pageX, event.pageY);
        document.addEventListener("mousemove", onMouseMove);
    }

    const stopTrigger = (event) => {
        document.removeEventListener("mousemove", onMouseMove);
    }

    const mouseIn = (event) => {
        tabRef.current.style.top = "5px"
    }
    const mouseOut = (event) => {
        tabRef.current.style.top = "-20px"
    }

    const pinEvent = () => {
        console.log("고정!");
    }
    const closeEvent = () => {
        console.log("삭제!");
    }

    return (
        <div onMouseDown={moveTrigger} onMouseUp={stopTrigger} onMouseEnter={mouseIn} onMouseLeave={mouseOut}
             ref={postionRef} className={classes.postIt}>
            <div style={{position: "relative", height:"0px"}}>
            <span className={classes.tab} ref={tabRef}>
                <span onClick={pinEvent}>pin</span>
                <span onClick={closeEvent}>X</span>
            </span>
                <div className={classes.content}>{props.content}</div>
            </div>
        </div>
    );
}
export default PostIt;