import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faFillDrip, faPalette, faPaintbrush, faPlus, faTable, faFont, faCamera} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {choiceActions} from "@/store/choice-slice";
import PlusSection from "@/components/Detail/Plus";
import PenSection from "@/components/Detail/Pen";
import TableSection from "@/components/Detail/Table";
import FontSection from "@/components/Detail/Font";

const SideBar = () => {
    const dispatch = useDispatch();
    const choice = useSelector((state) => state.choice);
    const addPost = () => {dispatch(choiceActions.changePlus());};
    const drawing = () => {dispatch(choiceActions.changeDraw());};
    const addTable = () => {dispatch(choiceActions.changeTable());};
    const addFont = () => {dispatch(choiceActions.changeFont());};
    const cheeze = () => {alert("찰캌!")}

    return(
        <div className={classes.Cntnr}>
            <div className={classes.detail}>
                {choice.plus && <PlusSection/>}
                {choice.pen && <PenSection/>}
                {choice.table && <TableSection/>}
                {choice.font && <FontSection/>}
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