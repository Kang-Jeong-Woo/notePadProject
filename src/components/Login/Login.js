import classes from "./Login.module.css";
import {useRouter} from "next/router";
const Login = () => {
    const router = useRouter();
    function goMainTrigger() {
        router.push("/"+"userid")
    }
    return(
        <div className={classes.Cntnr}>
            <div>
            <div className={classes.m1}>
                <div className={classes.labelCntnr}><label htmlFor={"id"}>username</label></div>
                <input type="text" id={"id"}/>
            </div>
            <div>
                <div className={classes.labelCntnr}><label htmlFor={"pw"}>Password</label></div>
                <input type="text" id={"pw"}/>
            </div>
            <button onClick={goMainTrigger}>login</button>
            </div>
        </div>
    )
}

export default Login;