import classes from "./PostIt.module.css";
import {useRef, useState} from "react";
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
        const id = await props.id;
        const delData = {id: id, colName: "postIts"}
        props.onDel(delData);
    }
    const mouseIn = () => {
        tabRef.current.style.top = "0px";
    }
    const mouseOut = () => {
        tabRef.current.style.top = "-23px";
    }
    const dragStart = (e, d, id = props.id) => {
        const setIndex = setZIndex(d.node.style.zIndex, +d.node.style.zIndex + 1);
        d.node.style.zIndex = setIndex
        const Z = {id: id, z: setIndex, colName: "postIts"};
        props.onZpst(Z);
    }
    const dragStop = (e, d, id = props.id) => {
        const XY = {id: id, x: d.y, y: d.x, colName: "postIts"}
        props.onDragPst(XY);
    }
    const resizeStart = (e, d, ref, delta, position) => {
        setFirstLoad(false);
        setPicWidth(+ref.style.width.replace("px", ""));
        setPicHeight(+ref.style.height.replace("px", ""));
        setDiagramWidth(ref.style.width);
        setDiagramHeight(ref.style.height);
    }
    const resizeStop = (e, d, ref, delta, position, id = props.id) => {
        const width = props.width + delta.width
        const height = props.height + delta.height
        const XYHW = {id: id, x: position.y, y: position.x, h: height, w: width, colName: "postIts"}
        props.onSizePst(XYHW);
    }
    return (
        <Rnd minWidth={100}
             minHeight={100}
             bounds={"parent"}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: props.height + 23}}
             disableDragging={dragable}
             onDragStart={dragStart}
             onDragStop={dragStop}
             onResize={resizeStart}
             onResizeStop={resizeStop}
             style={{zIndex: props.positionZ}}
        >
            <div className={classes.postIt} style={{width: diagramWidth, height: diagramHeight + 23}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
                <span className={classes.tab} ref={tabRef}>
                    <span onClick={pinEvent}>고정</span>
                    <span onClick={closeEvent}>삭제</span>
                </span>
                <div className={classes.content}>
                    <Image src={props.content} alt={props.title} width={isFirstLoad ? props.width : +picWidth}
                           height={isFirstLoad ? props.height : +picHeight - 23}/>
                </div>
            </div>
        </Rnd>
    );
}
export default PostIt;