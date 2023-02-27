import classes from "./PostIt.module.css";
import {useRef, useState} from "react";
import {Rnd} from "react-rnd";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {postItActions} from "@/store/postIt-slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faThumbtack} from "@fortawesome/free-solid-svg-icons";

const PostIt = props => {
    const dispatch = useDispatch();
    const tabRef = useRef(undefined);
    const [dragable, setDragable] = useState(false);
    const [diagramWidth, setDiagramWidth] = useState();
    const [diagramHeight, setDiagramHeight] = useState();
    const [picWidth, setPicWidth] = useState();
    const [picHeight, setPicHeight] = useState();
    const [isFirstLoad, setFirstLoad] = useState(true);
    const updateZIndex= (data)=>{dispatch(postItActions.updateZIndex(data))};
    const updateXYPosition= (data)=>{dispatch(postItActions.updateXYPosition(data))};
    const updateWHPosition= (data)=>{dispatch(postItActions.updateWHPosition(data))};
    const deletePostIt= (data)=>{dispatch(postItActions.deletePostIt(data))};
    const setZIndex = (current, next) => {
        return next > current ? next : current;
    };
    const pinEvent = () => {
        setDragable(!dragable);
    }
    const closeEvent = () => {
        deletePostIt(props.id);
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
        updateZIndex(Z);
    }
    const dragStop = (e, d, id = props.id) => {
        const XY = {id: id, x: d.x, y: d.y, colName: "postIts"}
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
        const XYHW = {id: id, x: position.x, y: position.y, h: height, w: width, colName: "postIts"}
        updateWHPosition(XYHW);
    }

    return (
        <Rnd minWidth={100}
             minHeight={100}
             bounds={"parent"}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: +props.height + 23}}
             disableDragging={dragable}
             onDragStart={dragStart}
             onDragStop={dragStop}
             onResize={resizeStart}
             onResizeStop={resizeStop}
             style={{zIndex: props.positionZ}}
        >
            <div className={classes.postIt} style={{width: diagramWidth, height: +diagramHeight + 23}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
                <span className={classes.tab} ref={tabRef}>
                    <span onClick={closeEvent}><FontAwesomeIcon className={classes.icon} style={{color:"red"}} icon={faCircleXmark}/></span>
                    <span onClick={pinEvent}><FontAwesomeIcon className={classes.icon} style={{color:dragable?"green":"#D6D01F"}} icon={faThumbtack}/></span>
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