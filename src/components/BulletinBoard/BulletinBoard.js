import classes from "./BulletinBoard.module.css";
import PostIt from "@/components/UI/PostIt";
import {useEffect, useRef, useState} from "react";


const BulletinBoard = props => {
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
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = 5
        contextRef.current = context;
    },[])
    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    const draw = ({nativeEvent}) => {
        if(!isDrawing){
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    return (
        <div className={classes.Cntnr}>
            <canvas onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw}
                    ref={canvasRef}></canvas>
            {props.postits.map((post) => (
                <PostIt
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    positionX={post.positionX}
                    positionY={post.positionY}
                    positionZ={post.positionZ}
                    onDragPst={props.onDragPst}
                    onSizePst={props.onSizePst}
                    onZpst={props.onZPst}
                />
            ))}
        </div>
    );
}

export default BulletinBoard
