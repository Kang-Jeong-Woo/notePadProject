import {Rnd} from "react-rnd";
import {useRef, useState} from "react";
import classes from "./FontPostIt.module.css";

const FontPostIt = (props) => {
    const tabRef = useRef(undefined);
    const borderRef = useRef(undefined);
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
        const delData = {id: id, colName: "fontData"}
        props.onDel(delData);
    }
    const mouseIn = () => {
        tabRef.current.style.top = "0px";
        borderRef.current.style.border = "#000 1px solid";
    }
    const mouseOut = () => {
        tabRef.current.style.top = "-23px";
        borderRef.current.style.border = "0px";
    }
    const dragStart = (e, d, id = props.id) => {
        d.node.style.border="#000000 dot-dash 4px";
        const setIndex = setZIndex(d.node.style.zIndex, +d.node.style.zIndex + 1);
        d.node.style.zIndex = setIndex
        const Z = {id: id, z: setIndex, colName: "fontData"};
        props.onZpst(Z);
    }
    const dragStop = (e, d, id = props.id) => {
        const XY = {id: id, x: d.y, y: d.x, colName: "fontData"}
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
        const XYHW = {id: id, x: position.y, y: position.x, h: height, w: width, colName: "fontData"}
        props.onSizePst(XYHW);
    }
    return (
        <Rnd minWidth={100} minHeight={100} bounds={"parent"} disableDragging={dragable}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: props.height + 23}}
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
                <div className={classes.content} style={{
                    width: isFirstLoad ? props.width : +picWidth,
                    height: isFirstLoad ? props.height : +picHeight - 23,
                    fontStyle: props.style
                }} ref={borderRef}>
                    {props.content}
                </div>
            </div>
        </Rnd>
    )
}

export default FontPostIt;