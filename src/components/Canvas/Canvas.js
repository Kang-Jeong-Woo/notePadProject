import {useEffect, useRef, useState} from "react";
import CanvasDraw from "react-canvas-draw";
import classes from "./Canvas.module.css";
import {useDispatch, useSelector} from "react-redux";
import {canvasActions} from "@/store/canvas-slice";
import {
    faPen,
    faPalette,
    faPaintbrush,
    faFloppyDisk,
    faEraser,
    faArrowRotateBackward
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Canvas = (props) => {
    const dispatch = useDispatch();
    const canvasRef = useRef();
    const penRef = useRef();
    const saveRef = useRef();
    const canvasObj = useSelector((state) => state.canvas);
    const [width, setWidth] = useState(500);
    const [height, setHeight] = useState(500);
    const tableData = useSelector((state) => state.table.tableData);
    const fontData = useSelector(state => state.font.fontData);
    const heightFn = () => Math.ceil(window.innerHeight - 5);
    const widthFn = () => Math.ceil(window.innerWidth - 5);
    useEffect(() => {
        setWidth(widthFn());
        setHeight(heightFn());
    }, [])
    const setColor = (data) => {
        dispatch(canvasActions.setColor(data))
    };
    const setRadius = (data) => {
        dispatch(canvasActions.setRadius(data))
    };
    const setIsDraw = () => {
        dispatch(canvasActions.setIsDraw())
    };
    const eraseAll = () => {
        canvasRef.current.eraseAll();
    };
    const undo = () => {
        canvasRef.current.undo();
    };
    const changeColor = (event) => {
        setColor(event.target.value);
    };
    const changeRadius = (event) => {
        setRadius(event.target.value);
    };
    const changeDraw = () => {
        setIsDraw();
    };
    const onSaveDB = () => {
        const drawData = {userId: "userid", drawData: canvasRef.current.getSaveData()}
        props.onSaveDB(tableData, fontData, drawData);
    };
    const menuMouseEnter = () => {
        penRef.current.style.left = "80px"
        penRef.current.style.opacity = "1"
    }
    const menuMouseLeave = () => {
        penRef.current.style.left = "-200px"
        penRef.current.style.opacity = "0"
    }
    const saveMouseEnter = () => {
        saveRef.current.style.left = "80px"
        saveRef.current.style.opacity = "1"
    }
    const saveMouseLeave = () => {
        saveRef.current.style.left = "-200px"
        saveRef.current.style.opacity = "0"
    }

    return (
        <>
            <div className={classes.btnCntnr}>
                <div className={classes.iconCntnr} onMouseEnter={menuMouseEnter} onMouseLeave={menuMouseLeave}>
                    <FontAwesomeIcon icon={faPaintbrush}/>
                    <div className={classes.penMenu} ref={penRef}>
                        <div>
                            <FontAwesomeIcon className={classes.icon} icon={faPen}/>
                            <label htmlFor={"onOff"} id={"onnOff"} className={classes.toggleSwitch}>
                                <input hidden={true} type="checkbox" id={"onOff"} value={canvasObj.drawingOn | ""}
                                       onChange={changeDraw}/>
                                <span className={classes.toggleButton}></span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor={"color"} id={"color"}>
                                <FontAwesomeIcon className={classes.icon} icon={faPalette}/>
                                <input type={"color"} id={"color"} name={"color"} value={canvasObj.color}
                                       onChange={changeColor}/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor={"radius"} id={"radius"}>
                                <FontAwesomeIcon className={classes.icon} icon={faPaintbrush}/>
                                <input type="range" id={"radius"} name={"radius"} min={1} max={20} step={0.5}
                                       value={canvasObj.radius | ""} onChange={changeRadius}/>
                            </label>
                        </div>
                        <div>
                            <button onClick={eraseAll}><FontAwesomeIcon className={classes.iconB} icon={faEraser}
                                                                        id={"eraser"}/></button>
                            <button onClick={undo}><FontAwesomeIcon className={classes.iconB}
                                                                    icon={faArrowRotateBackward} id={"backWard"}/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={classes.saveCntnr} onClick={onSaveDB} onMouseEnter={saveMouseEnter}
                     onMouseLeave={saveMouseLeave}>
                    <FontAwesomeIcon className={classes.icon} icon={faFloppyDisk} id={"save"}/>
                    <label htmlFor={"save"}></label>
                    <div className={classes.save} ref={saveRef}>Save</div>
                </div>

            </div>
            <CanvasDraw
                ref={canvasRef}
                saveData={props.drewData[0]?.dbDrawData}
                canvasWidth={width}
                canvasHeight={height}
                style={{backgroundColor: "#FFC0CB"}}
                hideGrid={true}
                disabled={canvasObj.drawingOn}
                lazyRadius={0}
                brushRadius={+canvasObj.radius}
                brushColor={canvasObj.color}
                catenaryColor={"#0a0302"}
                immediateLoading={true}
            />
        </>
    );
}

export default Canvas;