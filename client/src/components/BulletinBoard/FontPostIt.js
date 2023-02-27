import {Rnd} from "react-rnd";
import {useEffect, useRef, useState} from "react";
import classes from "./FontPostIt.module.css";
import {useDispatch} from "react-redux";
import {fontActions} from "@/store/font-slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faThumbtack} from "@fortawesome/free-solid-svg-icons";


const FontPostIt = (props) => {
    const tabRef = useRef(undefined);
    const borderRef = useRef(undefined);
    const [dragable, setDragable] = useState(false);
    const dispatch = useDispatch();
    const [diagramWidth, setDiagramWidth] = useState();
    const [diagramHeight, setDiagramHeight] = useState();
    const [picWidth, setPicWidth] = useState();
    const [picHeight, setPicHeight] = useState();
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [degree, setDegree] = useState(props.degree);
    const updateZIndex = (data) => {dispatch(fontActions.updateZIndex(data))};
    const updateXYPosition = (data) => {dispatch(fontActions.updateXYPosition(data))};
    const updateWHPosition = (data) => {dispatch(fontActions.updateWHPosition(data))};
    const updateDegree = (data) => {dispatch(fontActions.updateDegree(data))};
    const deleteFont = (id) => {dispatch(fontActions.deleteFont(id))};
    const setZIndex = (current, next) => {
        return next > current ? next : current;
    };
    const pinEvent = () => {
        setDragable(!dragable);
    }
    const closeEvent = () => {
        const id = props.id;
        deleteFont(id)
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
        d.node.style.border = "#000000 dot-dash 4px";
        const setIndex = setZIndex(d.node.style.zIndex, +d.node.style.zIndex + 1);
        d.node.style.zIndex = setIndex
        const Z = {id: id, z: setIndex, colName: "fontData"};
        updateZIndex(Z);
    }
    const dragStop = (e, d, id = props.id) => {
        const XY = {id: id, x: d.x, y: d.y, colName: "fontData"}
        updateXYPosition(XY);
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
        const XYHW = {id: id, x: position.x, y: position.y, h: height, w: width, colName: "fontData"}
        updateWHPosition(XYHW);
    }
    const wheelEvent = (event) => {
        if(event.deltaY<0){
            setDegree(degree - 10);
        }else{
            setDegree(degree + 10);
        }
    }
    useEffect(() => {
        const setDegree = setTimeout((id = props.id) => {
            const degreeData = {id:id, degree:degree, colName:"fontData"}
            updateDegree(degreeData);
            // props.onSetDegree(degreeData);
        }, 1000);
        return () => {
            clearTimeout(setDegree);
        }
    }, [wheelEvent]);
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
                    <span onClick={closeEvent}><FontAwesomeIcon className={classes.icon} style={{color:"red"}} icon={faCircleXmark}/></span>
                    <span onClick={pinEvent}><FontAwesomeIcon className={classes.icon} style={{color:dragable?"green":"#D6D01F"}} icon={faThumbtack}/></span>
                </span>
                <div className={classes.content} style={{
                    width: isFirstLoad ? props.width : +picWidth,
                    height: isFirstLoad ? props.height : +picHeight - 23,
                    rotate: `${degree}deg`,
                    fontFamily: props.style.toString(),
                    color: props.color,
                }} ref={borderRef} onWheel={wheelEvent}>
                    {props.content}
                </div>
            </div>
        </Rnd>
    )
}

export default FontPostIt;