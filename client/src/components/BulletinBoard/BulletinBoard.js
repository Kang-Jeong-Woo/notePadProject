import classes from "./BulletinBoard.module.css";
import PostIt from "@/components/BulletinBoard/PostIt";
import React from "react";
import Canvas from "@/components/Canvas/Canvas";
import FontPostIt from "@/components/BulletinBoard/FontPostIt";
import {useSelector} from "react-redux";
import TablePostIt from "@/components/BulletinBoard/TablePostIt";

const BulletinBoard = props => {

    const tablesData = useSelector((state) => {
        return state.table.tableData
    });
    const fontsData = useSelector((state) => {
        return state.font.fontData
    });
    const postItData = useSelector((state)=>{
        return state.postIt.postItData
    });
    return (
        <div className={classes.Cntnr}>
            <div className={classes.canvasCntnr}>

                {postItData.map((post) => (
                    post.isDelete === false && <PostIt
                        key={post.id}
                        id={post.id}
                        content={post.content}
                        title={post.title}
                        width={post.width}
                        height={post.height}
                        pinned={post.pinned}
                        positionX={post.positionX}
                        positionY={post.positionY}
                        positionZ={post.positionZ}
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
                    />
                ))}
                {fontsData.map((font) => (
                    font.isDelete === false && <FontPostIt
                        key={font.id}
                        id={font.id}
                        content={font.content}
                        style={font.style}
                        degree={font.degree}
                        color={font.color}
                        pinned={font.pinned}
                        width={font.width}
                        height={font.height}
                        positionX={font.positionX}
                        positionY={font.positionY}
                        positionZ={font.positionZ}
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
                    />
                ))}
                {tablesData.map((table)=>(
                    table.isDelete === false && <TablePostIt
                        key={table.id}
                        id={table.id}
                        table={table.contents}
                        width={table.width}
                        height={table.height}
                        pinned={table.pinned}
                        positionX={table.positionX}
                        positionY={table.positionY}
                        positionZ={table.positionZ}
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
                    />
                ))}
                <Canvas user={props.user} drawData={props.drawData} onSaveDraw={props.onSaveDraw} />
            </div>
        </div>
    );
}

export default BulletinBoard
