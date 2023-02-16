import {useState} from "react";
import CanvasDraw from "react-canvas-draw";
import {Rnd} from "react-rnd";

const CanvasTest2 = (props) => {
    console.log(props.drewData[0].dbDrawData);

    let saveableCanvas;

    return (
        <>
            <button
                onClick={() => {
                    props.onSaveDraw(saveableCanvas.getSaveData());
                }}
            >
                Save
            </button>
            <button
                onClick={() => {
                    saveableCanvas.eraseAll();
                }}
            >
                Erase
            </button>
            <button
                onClick={() => {
                    saveableCanvas.undo();
                }}
            >
                Undo
            </button>
            <CanvasDraw
                ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
                saveData={props.drewData[0].dbDrawData}
                canvasWidth={2000}
                canvasHeight={1080}
                hideGrid={true}
                style={{backgroundColor: "pink"}}
                disabled={false}
                lazyRadius={0}
                brushRadius={5}
                brushColor={"hotpink"} // 지우개는 배경이랑 같은 색으로 하면 됨.
                catenaryColor={"#0a0302"}

            >
            </CanvasDraw>
        </>
    );
}

export default CanvasTest2;