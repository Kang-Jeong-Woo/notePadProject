import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styles from "@/styles/Home.module.css"
import {MongoClient} from "mongodb";
import {useRouter} from "next/router";

function HomePage(props) {
    const router = useRouter();

    async function positionHandler(posData) {
        // console.log(posData);
        // const res = await fetch("https://react-http-e4fe2-default-rtdb.asia-southeast1.firebasedatabase.app/postit.json",{
        //     method: "POST",
        //     body:JSON.stringify(객체),
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // });
        // const data = await res.json();
        // console.log(data);
    }

    async function sizePositionHandler(posData) {
        //fetch DB에 id 찾아서 바꿔주는 query
        // console.log(posData.id);
        // console.log(posData.x);
        // console.log(posData.y);
        // console.log(posData.h);
        // console.log(posData.w);
    }

    async function zIndexHandler(posData) {
        //fetch DB에 id 찾아서 기존z인덱스 z값으로 치환하는 query
        // console.log(posData.id);
        // console.log(posData.z);
    }

    async function addPostIt(postData) {

        const postIt = {
            title: postData.content,
            content: postData.img,
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
            }
        });
        const data = await res.json();
        console.log(data);
        router.reload();
    }

    return (
        <div className={styles.homeCtnr}>
            <SideBar addPostIt={addPostIt}/>
            <BulletinBoard postits={props.postits} onDragPst={positionHandler} onSizePst={sizePositionHandler}
                           onZPst={zIndexHandler}/>
        </div>
    )
};

export async function getServerSideProps() {
    const client = await MongoClient.connect("mongodb+srv://zzangkbc1:ML5svjETdraNKLuV@cluster0.snz22kc.mongodb.net/?retryWrites=true&w=majority")
    const db = client.db();
    const postItCollection = db.collection("postIts");
    const postItsAry = await postItCollection.find().toArray();
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
            }))
        }
    };
};

export default HomePage;