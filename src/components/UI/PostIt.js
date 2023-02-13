import classes from "./PostIt.module.css";
import {useEffect, useRef, useState} from "react";
import {Rnd} from "react-rnd";
import Image from "next/image";

const PostIt = props => {
    const tabRef = useRef(undefined);
    const [dragable, setDragable] = useState(false);
    const [diagramWidth, setDiagramWidth] = useState();
    const [diagramHeight, setDiagramHeight] = useState();
    const [picWidth, setPicWidth] = useState();
    const [picHeight, setPicHeight] = useState();
    const [isFirstLoad, setFirstLoad] = useState(true);
    const setZIndex = (current, next) => {
        return next > current ? next : current;
    };
    const pinEvent = () => {
        setDragable(!dragable);
    }
    const closeEvent = async () => {
        const data = await props.id;
        props.onDel(data);
    }
    const mouseIn = () => {
        tabRef.current.style.top = "0px";
    }
    const mouseOut = () => {
        tabRef.current.style.top = "-23px";
    }

    return (
        <Rnd minWidth={100}
             minHeight={100}
             bounds={"parent"}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: props.height+23}}
             disableDragging={dragable}
             onResize={(e, direction, ref, delta, position) => {
                 setFirstLoad(false);
                 setPicWidth(+ref.style.width.replace("px", ""));
                 setPicHeight(+ref.style.height.replace("px", ""));
                 setDiagramWidth(ref.style.width);
                 setDiagramHeight(ref.style.height);
             }}
             onDragStart={(e, d, id = props.id) => {
                 d.node.style.zIndex = props.positionZ;
                 const setIndex = setZIndex(d.node.style.zIndex, +d.node.style.zIndex + 1);
                 const Z = {id: id, z: setIndex};
                 props.onZpst(Z);
             }}
             onDragStop={(e, d, id = props.id) => {
                 const XY = {id: id, x: d.y, y: d.x}
                 props.onDragPst(XY);
             }}
             onResizeStop={(e, direction, ref, delta, position, id = props.id) => {
                 const width = props.width + delta.width
                 const height = props.height + delta.height
                 const XYHW = {id: id, x: position.y, y: position.x, h: height, w: width}
                 props.onSizePst(XYHW);
             }}
            //여기여 useEffect를 걸어야하나.. 아님 클릭이벤트...?
             style={{zIndex: props.positionZ}}
        >
            <div className={classes.postIt} style={{width: diagramWidth, height: diagramHeight+23}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
            <span className={classes.tab} ref={tabRef}>
                <span onClick={pinEvent}>고정</span>
                <span onClick={closeEvent}>삭제</span>
            </span>
                <div className={classes.content}>
                    <Image src={props.content} alt={props.title} width={isFirstLoad ? props.width : +picWidth}
                           height={isFirstLoad ? props.height : +picHeight-23}/>
                </div>
            </div>
        </Rnd>
    );
}
export default PostIt;