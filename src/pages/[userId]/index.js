import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styles from"@/styles/Home.module.css"

function HomePage(props) {
    async function positionHandler(posData){
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
    async function sizePositionHandler(posData){
        //fetch DB에 id 찾아서 바꿔주는 query
        // console.log(posData.id);
        // console.log(posData.x);
        // console.log(posData.y);
        // console.log(posData.h);
        // console.log(posData.w);
    }
    async function zIndexHandler(posData){
        //fetch DB에 id 찾아서 기존z인덱스 z값으로 치환하는 query
        // console.log(posData.id);
        // console.log(posData.z);
    }
    return(
        <div className={styles.homeCtnr}>
            <SideBar/>
            <BulletinBoard postits={props.postits} onDragPst={positionHandler} onSizePst={sizePositionHandler} onZPst={zIndexHandler}/>

        </div>
    )
};

export async function getServerSideProps(){
    const res = await fetch("https://react-http-e4fe2-default-rtdb.asia-southeast1.firebasedatabase.app/postit.json");
    const data = await res.json();
    const TEMP_DATA = [];
    for(const key in data){
        TEMP_DATA.push({
            id:data[key].id,
            title:data[key].title,
            content:data[key].content,
            pinned:data[key].pinned,
            style:data[key].style,
            positionX:data[key].positionX,
            positionY:data[key].positionY,
            positionZ:data[key].positionZ
        })
    };
    return{
        props:{
            postits:TEMP_DATA
        }
    };
};

export default HomePage;