import classes from "./BulletinBoard.module.css";
import PostIt from "@/components/UI/PostIt";
import {useState} from "react";


const BulletinBoard = props => {
    return (
        <div className={classes.Cntnr}>
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
                />
            ))}
        </div>
    );
}

export default BulletinBoard
