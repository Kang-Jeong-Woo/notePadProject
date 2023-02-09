import classes from "./PostIt.module.css";
import {Fragment, useRef, useState} from "react";
import {Transition} from "react-transition-group";
import {Rnd} from "react-rnd";


const PostIt = props => {
    const tabRef = useRef(undefined);
    const [dragable, setDragable] = useState(false);
    const [diagramWidth, setDiagramWidth] = useState(300);
    const [diagramHeight, setDiagramHeight] = useState(200);

    const pinEvent = () => {
        setDragable(!dragable);
    }
    const closeEvent = () => {
        console.log("삭제!");
    }
    const mouseIn = () => {
        tabRef.current.style.top = "0px";
    }
    const mouseOut = () => {
        tabRef.current.style.top = "-23px";
    }
    const postionStop = (data) => {
        // y가 가로임
        console.log(data);
    }
    const sizeStop = (data) => {
        // y가 가로임
        console.log(data)
    }
    return (
        <Rnd minWidth={300}
             minHeight={200}
             default={{x: 50, y: 50, width: 300, height: 200}}
             disableDragging={dragable}
             onResize={(e, direction, ref, delta, position) => {
                 setDiagramWidth(ref.style.width);
                 setDiagramHeight(ref.style.height);
             }}
             onDragStop={(e, d)=>{
                 console.log("d.x : " + d.x);
                 console.log("d.y : " + d.y);
             }}
             onResizeStop={(e, direction, ref, delta, position)=>{
                 console.log("delta.height : " + delta.height);
                 console.log("delta.width : " + delta.width);
                 console.log("position.x : " + position.x);
                 console.log("position.y : " + position.y);
             }}
        >

            <div className={classes.postIt} style={{width: diagramWidth, height: diagramHeight}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
            <span className={classes.tab} ref={tabRef}>
                <span onClick={pinEvent}>고정</span>
                <span onClick={closeEvent}>삭제</span>
            </span>
                <div className={classes.content}>{props.content}</div>
            </div>
        </Rnd>
    );
}
export default PostIt;