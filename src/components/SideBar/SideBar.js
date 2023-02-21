import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faFillDrip, faPalette, faPaintbrush, faPlus, faTable, faFont, faCamera, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {tableActions} from "@/store/table-slice";
import Modal from "@/components/UI/Modal";
import {useState} from "react";
import PostItForm from "@/components/Form/PostItForm";
import FontPostIt from "@/components/BulletinBoard/FontPostIt";
import FontSection from "@/components/Form/FontPoistItForm";

const SideBar = (props) => {
    const [isModal, setIsModal] = useState(false);
    const [isPost, setIsPost] = useState(false);
    const [isFont, setIsFont] = useState(false);
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state.table.tableData);
    const fontData = useSelector(state => state.font.fontData);
    const addDB = () => {props.onSaveDB(tableData, fontData)};
    const addTable = () => {dispatch(tableActions.addTable());};
    const addPost = () => {
        setIsModal(true);
        setIsPost(true);
    }
    const addFont = () => {
        setIsModal(true);
        setIsFont(true);
    }
    const onClose = () => {
        setIsModal(false);
        setIsPost(false);
        setIsFont(false);
    }

    const cheeze = () => {alert("찰캌!")}



    return(
        <div className={classes.Cntnr}>
            <div className={classes.choice}>
                <ul className={classes.list}>
                    <li><FontAwesomeIcon onClick={addDB} icon={faFloppyDisk}/></li>
                    <li><FontAwesomeIcon onClick={addPost} icon={faPlus}/>{isModal && isPost && <Modal onClose={onClose}><PostItForm onAddPost={props.onAddPost}/></Modal>}</li>
                    <li><FontAwesomeIcon onClick={addTable} icon={faTable}/></li>
                    <li><FontAwesomeIcon onClick={addFont} icon={faFont}/>{isModal && isFont && <Modal onClose={onClose}><FontSection/></Modal>}</li>
                    <li><FontAwesomeIcon onClick={cheeze} icon={faCamera}/></li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;