import {useRef, useState} from "react";
import CanvasDraw from "react-canvas-draw";

const CanvasTest = () => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState();

    const handleExport = () => {
        const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
        console.log(base64);
        setDrawing(base64);
    };

    return(
        <div className="App">
            <button
                type="button"
                style={{ backgroundColor: "#0A71F1", color: "white" }}
                onClick={handleExport}
            >
                Export Drawing
            </button>
            <img src={drawing} alt="exported drawing" />
            <CanvasDraw
                lazyRadius={0}
                brushRadius={2}
                canvasWidth={2000}
                canvasHeight={1020}
                ref={canvasRef}
            />
        </div>
    )
}

export default CanvasTest;