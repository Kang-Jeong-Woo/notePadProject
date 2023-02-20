import {useState} from "react";
import CanvasDraw from "react-canvas-draw";
import classes from "./Canvas.module.css";

const Canvas = (props) => {
    const [color, setColor] = useState("#ffffff");
    const [radius, setRadius] = useState();
    const [canDraw, setCanDraw] = useState(true);
    let saveableCanvas;
    const height = () => typeof window !== "undefined" ? Math.ceil(window.innerHeight - 25) : 1270;
    const drawSave = () => {
        props.onSaveDraw(saveableCanvas.getSaveData());
    };
    const eraseAll = () => {
        saveableCanvas.eraseAll();
    };
    const undo = () => {
        saveableCanvas.undo();
    };
    const changeColor = (event) => {
        setColor(event.target.value);
    };
    const changeRadius = (event) => {
        setRadius(event.target.value);
    };
    const chagneDraw = () => {
        setCanDraw(!canDraw);
    };
    return (
        <>
            <label className={classes.switch}>그리기
                <input type="checkbox" value={canDraw|""} onChange={chagneDraw}/>
                <span className={classes.slider}></span>
            </label>

            <label htmlFor={"color"}>색깔</label>
            <input type={"color"} id={"color"} name={"color"} value={color|""} onChange={changeColor}/>

            <label htmlFor={"radius"}>두께</label>
            <input type="range" id={"radius"} name={"radius"} min={1} max={20} step={0.5} value={radius|""}
                   onChange={changeRadius}/>

            <button onClick={drawSave}>Save</button>
            <button onClick={eraseAll}>Erase</button>
            <button onClick={undo}>Undo</button>
            <CanvasDraw
                ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
                saveData={props.drewData[0]?.dbDrawData}
                canvasWidth={1700}
                canvasHeight={900}
                style={{backgroundColor: "#FFC0CB"}}
                hideGrid={true}
                disabled={canDraw}
                lazyRadius={0}
                brushRadius={+radius}
                brushColor={color}
                catenaryColor={"#0a0302"}
            />
        </>
    );
}

export default Canvas;