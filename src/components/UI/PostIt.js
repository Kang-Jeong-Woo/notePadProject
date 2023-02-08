import classes from "./PostIt.module.css";
import {useRef} from "react";

const PostIt = props => {
    const postionRef = useRef();
    const moveTrigger = (event) => {
        postionRef.current.style.position = "absolute";
        document.body.append(postionRef);
        function moveAt(pageX,pageY) {
            postionRef.current.style.left = pageX - postionRef.offsetWidth / 2 + "px";
            postionRef.current.style.top = pageY - postionRef.offsetHeight / 2 + "px";
        }

        console.log(postionRef.offsetHeight);
        moveAt(event.pageX, event.pageY);
    }


    return(
        <div onMouseDown={moveTrigger} className={classes.postIt} ref={postionRef}>{props.content}</div>
    )
}
export default PostIt;