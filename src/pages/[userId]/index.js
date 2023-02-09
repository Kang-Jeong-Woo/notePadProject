import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styles from"@/styles/Home.module.css"

const DUMMY_POSTITS=[{
    id:"p1",
    title:"제목1",
    content: "내용1",
    style:"",
    pinned:false,
    positionX:0,
    positionY:0,
    positionZ:100
},{
    id:"p2",
    title:"제목2",
    content: "내용2",
    style:"",
    pinned:false,
    positionX:0,
    positionY:0,
    positionZ:100
}]

function HomePage(props) {
    async function positionHandler(posData){
        //fetch DB에 id 찾아서 바꿔주는 query
        console.log(posData.id);
        console.log(posData.x);
        console.log(posData.y);
    }
    async function sizePositionHandler(posData){
        //fetch DB에 id 찾아서 바꿔주는 query
        console.log(posData.id);
        console.log(posData.x);
        console.log(posData.y);
        console.log(posData.h);
        console.log(posData.w);
    }
    return(
        <div className={styles.homeCtnr}>
            <SideBar/>
            <BulletinBoard postits={props.postits} onDragPst={positionHandler} onSizePst={sizePositionHandler}/>
        </div>
    )
};

export function getServerSideProps(){
    // fetch update 예정
    return{
        props:{
            postits:DUMMY_POSTITS
        }
    }
}

export default HomePage;