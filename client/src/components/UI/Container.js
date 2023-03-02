import classes from "./Container.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";
import dynamic from "next/dynamic";

const Container = (props) => {
    const router = useRouter();
    // function isLoggedInFn (isUser) {
    //     const userUrl = isUser ? "notePad" : "/"
    //     router.push(userUrl);
    // }
    // useEffect(()=>{
    //     if(typeof window !=="undefined"){
    //         const isLoggedIn = localStorage.getItem("accessToken");
    //         isLoggedInFn(isLoggedIn)
    //     }
    // },[])

    const isLoggedInFn = () => {
        if(typeof window !=="undefined"){
            const isLoggedIn = localStorage.getItem("accessToken");
            const userUrl = isLoggedIn ? "notepad" : "log-in"
            router.push(userUrl);
        }
    }

    return(
        <div className={classes.Cntnr}>
            <div className={`${classes.Nav} ${classes.border} ${classes.align}`}>
                <Link href={"/"}>Home</Link>
                <div> Comming Soon </div>
                <button onClick={isLoggedInFn}>create+</button>
            </div>
            <div className={`${classes.SideL} ${classes.border} ${classes.center}`}>광고 배너</div>
            <div className={`${classes.SideR} ${classes.border} ${classes.center}`}>광고 배너</div>
            <div className={`${classes.Content} ${classes.border}`}>{props.children}</div>
            <div className={`${classes.Footer} ${classes.border} ${classes.center}`}>© Made By 정우, 상민</div>
        </div>
    )
}

export default Container;