import classes from "./BulletinBoard.module.css";
import PostIt from "@/components/BulletinBoard/PostIt";
import React from "react";
import Canvas from "@/components/Canvas/Canvas";
import FontPostIt from "@/components/BulletinBoard/FontPostIt";

const BulletinBoard = props => {
    console.log()
    return (
        <div className={classes.Cntnr}>
            <div className={classes.canvasCntnr}>
                {props.postIts?.map((post) => (
                    <PostIt
                        key={post.id}
                        id={post.id}
                        content={post.content}
                        title={post.title}
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
                {props.fontData.map((fonts) => (
                    <FontPostIt
                        key={fonts.id}
                        id={fonts.id}
                        content={fonts.content}
                        width={fonts.width}
                        height={fonts.height}
                        positionX={fonts.positionX}
                        positionY={fonts.positionY}
                        positionZ={fonts.positionZ}
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
                        onDel={props.onDel}
                    />
                ))}
                <Canvas drewData={props.drewData} onSaveDraw={props.onSaveDraw}/>
            </div>
        </div>
    );
}

export default BulletinBoard
