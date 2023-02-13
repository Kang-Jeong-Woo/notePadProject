import classes from "./BulletinBoard.module.css";
import PostIt from "@/components/UI/PostIt";
import Canvas from "@/components/Canvas/Canvas";

const BulletinBoard = props => {


    return (
        <div className={classes.Cntnr}>
            <div className={classes.canvasCntnr}>
            <Canvas/>
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
