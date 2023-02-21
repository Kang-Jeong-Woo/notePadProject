import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styles from "@/styles/Home.module.css"
import {MongoClient} from "mongodb";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {tableActions} from "@/store/table-slice";
import {useEffect} from "react";
import {fontAction} from "@/store/font-slice";

function HomePage(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(tableActions.setTable(props.tableData));
    },[])
    useEffect(()=>{
        dispatch(fontAction.setFont(props.fontData));
    },[])
    async function positionHandler(posData) {
        const positionData = {id: posData.id, x: Math.floor(posData.x), y: Math.floor(posData.y), colName: posData.colName}
        const res = await fetch("/api/fetch-position", {
            method: "POST",
            body: JSON.stringify(positionData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    }

    async function sizePositionHandler(posData) {
        const positionData = {
            id: posData.id,
            x: Math.floor(posData.x),
            y: Math.floor(posData.y),
            w: posData.w,
            h: posData.h,
            colName: posData.colName
        }
        const res = await fetch("/api/fetch-resize", {
            method: "POST",
            body: JSON.stringify(positionData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    }

    async function delHandler(posData) {
        const positionData = {id: posData.id, colName: posData.colName}
        const res = await fetch("/api/fetch-delete", {
            method: "POST",
            body: JSON.stringify(positionData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        router.reload();
    }

    async function zIndexHandler(posData) {
        const positionData = {id: posData.id, z: posData.z, colName: posData.colName}
        const res = await fetch("/api/fetch-zindex", {
            method: "POST",
            body: JSON.stringify(positionData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    }

    async function degreeHandler(degreeData) {
        const res = await fetch("/api/fetch-degree", {
            method: "POST",
            body: JSON.stringify(degreeData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
    }

    async function addPostIt(postData) {
        const postIt = {
            userId: "userid",
            title: postData.content,
            content: postData.path,
            pinned: false,
            style: "",
            width: 300,
            height: 200,
            positionX: 0,
            positionY: 0,
            positionZ: 10
        }
        const res = await fetch("/api/new-postIt", {
            method: "POST",
            body: JSON.stringify(postIt),
            headers: {
                "Content-Type": "application/json"
            },
            file: postData
        });
        const data = await res.json();
        router.reload();
    }

    async function addDrawData(drawData) {
        const inputData = {
            userId: "userid",
            saveImage: drawData,
        }
        const res = await fetch("/api/new-draw", {
            method: "POST",
            body: JSON.stringify(inputData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        router.reload();
    }

    async function addFontData(fontData) {
        const inputData = {
            userId: "userid",
            content: fontData.content,
            pinned: false,
            style: fontData.style,
            degree: 0,
            color:fontData.color,
            width: 300,
            height: 200,
            positionX: 0,
            positionY: 0,
            positionZ: 10
        }
        const res = await fetch("/api/new-font", {
            method: "POST",
            body: JSON.stringify(inputData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        router.reload();
    }

    async function addDB(tableData, fontData){
        const resTable = await fetch("/api/fetch-table", {
            method: "POST",
            body: JSON.stringify(tableData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resFont = await fetch("/api/fetch-font", {
            method: "POST",
            body: JSON.stringify(fontData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resTableData = await resTable.json();
        const resFontData = await resFont.json();
        router.reload();
    }

    return (
        <div className={styles.homeCtnr}>
            <SideBar onAddPost={addPostIt} onAddFont={addFontData} onSaveDB={addDB}/>
            <BulletinBoard postIts={props.postIts} drewData={props.drawData} fontData={props.fontData}
                           onDragPst={positionHandler} onSizePst={sizePositionHandler} onSetDegree={degreeHandler}
                           onZPst={zIndexHandler} onDel={delHandler} onSaveDraw={addDrawData} />
        </div>
    );
};

export async function getServerSideProps() {
    const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db();
    const postItCollection = db.collection("postIts");
    const postItsAry = await postItCollection.find({"userId": "userid"}).toArray();
    const drawCollection = db.collection("drawData");
    const drawAry = await drawCollection.find({"userId": "userid"}).toArray();
    const fontCollection = db.collection("fontData");
    const fontAry = await fontCollection.find({"userId": "userid"}).toArray();
    const tableCollection = db.collection("tableData");
    const tableAry = await tableCollection.find({"userId": "userid"}).toArray();
    client.close();
    return {
        props: {
            postIts: postItsAry.map(postIts => ({
                id: postIts._id.toString(),
                userId: postIts.userId,
                title: postIts.title,
                content: postIts.content,
                pinned: postIts.pinned,
                style: postIts.style,
                width: postIts.width,
                height: postIts.height,
                positionX: postIts.positionX,
                positionY: postIts.positionY,
                positionZ: postIts.positionZ
            })),
            drawData: drawAry.map(drawdata => ({
                userId: drawdata.userId,
                dbDrawData: drawdata.saveImage
            })),
            fontData: fontAry.map(fontData => ({
                id: fontData._id.toString(),
                userId: fontData.userId,
                content: fontData.content,
                pinned: fontData.pinned,
                style: fontData.style,
                degree:fontData.degree,
                color: fontData.color,
                width: fontData.width,
                height: fontData.height,
                positionX: fontData.positionX,
                positionY: fontData.positionY,
                positionZ: fontData.positionZ
            })),
            tableData: tableAry.map(tableData => ({
                id: tableData._id.toString(),
                userId: tableData.userId,
                contents: tableData.contents,
                pinned: tableData.pinned,
                style: tableData.style,
                width: tableData.width,
                height: tableData.height,
                positionX: tableData.positionX,
                positionY: tableData.positionY,
                positionZ: tableData.positionZ
            }))
        }
    };
};

export default HomePage;