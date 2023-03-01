import classes from "./Container.module.css";
import Link from "next/link";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";


const Container = (props) => {
    const user = useSelector(state => state.user.userData);
    const router = useRouter();
    function isLoggedIn () {
        if(user){
            router.push("/" + user);
        } else {
            router.push("/log-in")
        }
    }
    return(
        <div className={classes.Cntnr}>
            <div className={`${classes.Nav} ${classes.border} ${classes.align}`}>
                <Link href={"/"}>Home</Link>
                <div> Comming Soon </div>
                <button onClick={isLoggedIn}>create+</button>
            </div>
            <div className={`${classes.SideL} ${classes.border} ${classes.center}`}>광고 배너</div>
            <div className={`${classes.SideR} ${classes.border} ${classes.center}`}>광고 배너</div>
            <div className={`${classes.Content} ${classes.border}`}>{props.children}</div>
            <div className={`${classes.Footer} ${classes.border} ${classes.center}`}>© Made By 정우, 상민</div>
        </div>
    )
}

export default Container;