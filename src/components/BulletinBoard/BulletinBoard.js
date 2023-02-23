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
                {fontsData.map((font) => (
                    <FontPostIt
                        key={font.id}
                        id={font.id}
                        content={font.content}
                        style={font.style}
                        degree={font.degree}
                        color={font.color}
                        width={font.width}
                        height={font.height}
                        positionX={font.positionX}
                        positionY={font.positionY}
                        positionZ={font.positionZ}
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
                        onDel={props.onDel}
                        onSetDegree={props.onSetDegree}
                    />
                ))}
                {tablesData.map((table)=>(
                    <TablePostIt
                        key={table.id}
                        id={table.id}
                        table={table.contents}
                        width={table.width}
                        height={table.height}
                        positionX={table.positionX}
                        positionY={table.positionY}
                        positionZ={table.positionZ}
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
                        onDel={props.onDel}
                    />
                ))}
                <Canvas drewData={props.drewData} onSaveDraw={props.onSaveDraw} onSaveDB={props.onSaveDB}/>
            </div>
        </div>
    );
}

export default BulletinBoard
