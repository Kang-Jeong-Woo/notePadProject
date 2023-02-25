import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {tableActions} from "@/store/table-slice";
import {fontActions} from "@/store/font-slice";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage(props) {

    const router = useRouter();
    const dispatch = useDispatch();

    // 로그인 확인
    const [isLogin, setIsLogin] = useState(false);
    // 데이터셋
    const [user, setUser] = useState();   
    const [postIts, setPostIts] = useState()
    const [drawData, setDrawData] = useState()

    // 로그인 성공시 데이터 가져오기 
    useEffect(() => {
        try {
            axios.get("http://localhost:8123/api/login/success", { withCredentials: true })
            .then((result) => {
              if (result.data) {
                setIsLogin(true);
                setUser(result.data.userData);
                dispatch(tableActions.setTable(result.data.tableData));
                dispatch(fontActions.setFont(result.data.fontData));
                setDrawData(result.data.drawData);
                setPostIts(result.data.postIts)
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }, []);
    
    // 2시간마다 토큰 갱신
    setInterval((()=>{
        axios.get("http://localhost:8123/api/refreshtoken", { withCredentials: true })
            .then((result) => {
              console.log(result.data)
            })
            .catch((error) => {
              console.log(error);
            });
    }), 7200000) 

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

    async function addDrawData(drawData) {
        const inputData = {
            userId: user,
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

    return (
        <>
            { isLogin && 
                <div className={styles.homeCtnr}>
                    <SideBar user={user} />
                    <BulletinBoard user={user} postIts={postIts} drewData={drawData} onDragPst={positionHandler} onSaveDraw={addDrawData} onZPst={zIndexHandler} />
                </div>    
            }
        </>
    );
};

export default HomePage;