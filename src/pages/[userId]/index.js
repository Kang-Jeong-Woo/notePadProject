import MainPage from "@/components/MainPage";

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
    return(
        <MainPage postits={props.postits}/>
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