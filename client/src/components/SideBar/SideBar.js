import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faTable, faFont, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {tableActions} from "@/store/table-slice";
import {fontActions} from "@/store/font-slice";
import {postItActions} from "@/store/postIt-slice";
import {canvasActions} from "@/store/canvas-slice"
import Modal from "@/components/UI/Modal";
import PostItForm from "@/components/Form/PostItForm";
import {addActions} from "@/store/addMenu-slice";
import {useRef} from "react";
import Button from "@/components/UI/Button";
import FontSection from "@/components/Form/FontPoistItForm";
import axios from "axios";
import { useRouter } from "next/router";

const SideBar = (props) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const userRef = useRef();
    const addMenu = useSelector(state => state.add);
    const userId = props.user.userId
    const addTable = (userId) => {dispatch(tableActions.addTable(userId))};
    const setFont = () => {dispatch(addActions.setFont())}
    const setPost = () => {dispatch(addActions.setPost())}
    const close = () => {dispatch(addActions.close())}
    const mouseEnter = () => {
        userRef.current.style.left = "70px"
        userRef.current.style.opacity = "1"
    }
    const mouseLeave = () => {
        userRef.current.style.left = "-200px"
        userRef.current.style.opacity = "0"
    }

    const logout = () => {
        axios.post(
            "http://localhost:8123/api/logout",
            { withCredentials: true }
        ).then((result) => {
            if (result.status === 200) {
                dispatch(tableActions.clear());
                dispatch(fontActions.clear());
                dispatch(postItActions.clear());
                dispatch(canvasActions.clear());
                router.push("/");
            }
          })
        .catch((error)=>{
            console.log(error)
        });
    }


    return (
        <div className={classes.Cntnr}>
            <ul>

                <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                    <FontAwesomeIcon icon={faUser}/>
                    <div className={classes.userInfoCntnr} ref={userRef}>
                        <div className={classes.userInfo} style={{fontSize:"20px", fontWeight:"bold", letterSpacing:"2px", marginBottom:"-5px"}}>{props.user.nick}</div>
                        <div className={classes.btnCntnr}>
                        <Button onClick={logout}>LogOut</Button>
                        </div>
                    </div>
                </li>

                <li onClick={setPost}>
                    <FontAwesomeIcon icon={faImage}/>
                    {addMenu.modal && addMenu.post && <Modal onClose={close}><PostItForm userId ={props.user.userId}/></Modal>}
                </li>

                <li onClick={()=>{addTable(userId)}}>
                    <FontAwesomeIcon icon={faTable}/>
                </li>

                <li onClick={setFont}>
                    <FontAwesomeIcon icon={faFont}/>
                    {addMenu.modal && addMenu.font && <Modal onClose={close}><FontSection userId = {props.user.userId}/></Modal>}
                </li>

            </ul>
        </div>
    )
}

export default SideBar;