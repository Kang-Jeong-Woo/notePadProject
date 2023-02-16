import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styles from "@/styles/Home.module.css"
import {MongoClient} from "mongodb";
import {useRouter} from "next/router";

function HomePage(props) {
    const router = useRouter();
    async function positionHandler(posData) {
        const positionData = {id:posData.id, x:posData.x, y:posData.y}
        const res = await fetch("/api/fetch-position",{
            method: "POST",
            body:JSON.stringify(positionData),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
    }
    async function sizePositionHandler(posData) {
        const positionData = {id:posData.id, x:posData.x, y:posData.y, w:posData.w, h:posData.h}
        const res = await fetch("/api/fetch-resize",{
            method: "POST",
            body:JSON.stringify(positionData),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
    }
    async function zIndexHandler(posData) {
        const positionData = {id:posData.id, z:posData.z}
        const res = await fetch("/api/fetch-zindex",{
            method: "POST",
            body:JSON.stringify(positionData),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
    }
    async function delHandler(posData){
        const res = await fetch("/api/fetch-delete",{
            method:"POST",
            body: JSON.stringify(posData),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        router.reload();
    }
    async function addPostIt(postData) {
        const postIt = {
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
        const res = await fetch("/api/new-postIt",{
            method:"POST",
            body: JSON.stringify(postIt),
            headers:{
                "Content-Type":"application/json"
            },
            file:postData
        });
        const data = await res.json();
        router.reload();
    }
    async function addDrawData(drawData) {
        const inputData = {
            id:"userid",
            saveImage: drawData,
        }
        const res = await fetch("/api/fetch-draw",{
            method: "POST",
            body: JSON.stringify(inputData),
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        router.reload();
    }

    return (
        <div className={styles.homeCtnr}>
            <SideBar addPostIt={addPostIt}/>
            <BulletinBoard postits={props.postits} drawDatas={props.drawData} onDragPst={positionHandler} onSizePst={sizePositionHandler}
                           onZPst={zIndexHandler} onDel={delHandler} onSaveDraw={addDrawData}/>
        </div>
    );
};

export async function getServerSideProps() {
    const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db();
    const postItCollection = db.collection("postIts");
    const postItsAry = await postItCollection.find().toArray();
    const drawCollection = db.collection("drawData");
    const drawAry = await drawCollection.find({id:"userid"}).toArray();
    client.close();
    return {
        props: {
            postits: postItsAry.map(postIts => ({
                id: postIts._id.toString(),
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
            drawData:drawAry.map(drawdata=>({
                id:"userid",
                dbDrawData:drawdata.saveImage
            }))
        }
    };
};

export default HomePage;