import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styles from "@/styles/Home.module.css"
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {tableActions} from "@/store/table-slice";
import {fontActions} from "@/store/font-slice";
import {postItActions} from "@/store/postIt-slice";
import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import {userActions} from "@/store/user-slice";


function HomePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    // 로그인 확인
    const [isLogin, setIsLogin] = useState(false);
    // 데이터셋
    const [user, setUser] = useState();   
    const [drawData, setDrawData] = useState()

    // 로그인 성공시 데이터 가져오기 
    useEffect(() => {
        try {
            axios.get("http://localhost:8123/api/login/success", { withCredentials: true })
            .then((result) => {
              if (result.data) {
                setIsLogin(true);
                setUser(result.data.userData);
                dispatch(userActions.setUser(result.data.userData));
                dispatch(tableActions.setTable(result.data.tableData));
                dispatch(fontActions.setFont(result.data.fontData));
                dispatch(postItActions.setPostIt(result.data.postIts));
                setDrawData(result.data.drawData);
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
        router.reload();
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>DuckZil Pad | Create</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                <meta name="description" content="마음껏 꾸밀 수 있는 나만의 다이어리"/>
                <meta name="keywords" content="다이어리 diary"/>
                <meta name="author" content="KangJeongWoo"/>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="theme-color" content="#000000"/>
            </Head>
            { isLogin && 
                <div className={styles.homeCtnr}>
                    <SideBar user={user}/>
                    <BulletinBoard user={user} drawData={drawData} onDragPst={positionHandler} onSaveDraw={addDrawData} onZPst={zIndexHandler}/>
                </div>
            }
        </>
    );
};

export default HomePage;