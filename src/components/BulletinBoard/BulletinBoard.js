import classes from "./BulletinBoard.module.css";
import PostIt from "@/components/UI/PostIt";
import Canvas from "@/components/Canvas/Canvas";
import React,{useState} from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import CanvasTest from "@/components/Canvas/CanvasTest";
import CanvasTest2 from "@/components/Canvas/CanvasTest2";

const BulletinBoard = props => {

    return (
        <div className={classes.Cntnr}>
            <div className={classes.canvasCntnr}>
                <CanvasTest2 drewData={props.drawDatas} onSaveDraw={props.onSaveDraw}/>
            {props.postits.map((post) => (
                <PostIt
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    title = {post.title}
                    width={post.width}
                    height={post.height}
                    positionX={post.positionX}
                    positionY={post.positionY}
                    positionZ={post.positionZ}
                    onDragPst={props.onDragPst}
                    onSizePst={props.onSizePst}
                    onZpst={props.onZPst}
                    onDel={props.onDel}
                />
            ))}
            </div>
        </div>
    );
}

export default BulletinBoard
