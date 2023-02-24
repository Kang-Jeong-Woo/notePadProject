import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faFillDrip, faPalette, faPaintbrush, faPlus, faTable, faFont, faCamera} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {choiceActions} from "@/store/choice-slice";
import PlusSection from "@/components/Detail/Plus";
import PenSection from "@/components/Detail/Pen";
import TableSection from "@/components/Detail/Table";
import FontSection from "@/components/Detail/Font";
import {tableActions} from "@/store/table-slice";
import axios from "axios";
import { useRouter } from "next/router";

const SideBar = (props) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const choice = useSelector((state) => state.choice);
    const addPost = () => {dispatch(choiceActions.changePlus());};
    const drawing = () => {dispatch(choiceActions.changeDraw());};
    const addFont = () => {dispatch(choiceActions.changeFont());};
    const cheeze = () => {alert("찰캌!")}

    const addTable = () => {dispatch(tableActions.addTable());};

    return(
        <div className={classes.Cntnr}>
            <div className={classes.detail}>
                <h1 style={{display:"inline-flex", paddingLeft: '10px'}}>{props.user.nick}님의 다이어리</h1>
                <button onClick={()=>{
                    axios.post(
                        "http://localhost:8123/api/logout",
                        { withCredentials: true }
                    ).then((result) => {
                        if (result.status === 200) {
                            console.log(result.data.success)
                            router.push("/")
                        }})
                }} style={{display: 'inline-flex', margin: "10px", padding: "5px"}}>Logout</button>
                {choice.plus && <PlusSection onAddPost={props.addPostIt}/>}
                {choice.pen && <PenSection/>}
                {choice.table && <TableSection/>}
                {choice.font && <FontSection onAddFont={props.onAddFont}/>}
            </div>
            <div className={classes.choice}>
                <ul className={classes.list}>
                    <li><FontAwesomeIcon onClick={addPost} icon={faPlus}/></li>
                    <li><FontAwesomeIcon onClick={drawing} icon={faPen}/></li>
                    <li><FontAwesomeIcon onClick={addTable} icon={faTable}/></li>
                    <li><FontAwesomeIcon onClick={addFont} icon={faFont}/></li>
                    <li><FontAwesomeIcon onClick={cheeze} icon={faCamera}/></li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;