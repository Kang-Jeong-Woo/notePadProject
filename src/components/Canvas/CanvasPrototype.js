import {useCallback, useEffect, useRef, useState} from "react";

const CanvasPrototype = ( ) => {
    const canvasRef = useRef();
    const contextRef = useRef();
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.width = parent.innerWidth * 2;
        canvas.height = parent.innerHeight * 2;
        canvas.style.width = `${parent.innerWidth}px`;
        canvas.style.height = `${parent.innerHeight}px`;

        const context = canvas.getContext("2d");
        context.scale(2,2)
        context.lineCap = "round" // "square"
        context.strokeStyle = "black"
        context.shadowColor = "red";        // 불어펜 기능
        context.shadowOffsetX = 10;        // 불어펜 기능
        context.shadowOffsetY = 10;        // 불어펜 기능
        context.lineWidth = 5
        context.save();
        contextRef.current = context;
        context.restore();
    },[]);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    };

    const draw = ({nativeEvent}) => {
        if(!isDrawing){
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
        contextRef.current.save();
    };

    return(<canvas onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw}
                   ref={canvasRef}></canvas>
    );
};

export default CanvasPrototype;