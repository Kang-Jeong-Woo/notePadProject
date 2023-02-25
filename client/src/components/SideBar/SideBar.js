import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faTable, faFont,} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {tableActions} from "@/store/table-slice";
import Modal from "@/components/UI/Modal";
import PostItForm from "@/components/Form/PostItForm";
import FontSection from "@/components/Form/FontPoistItForm";
import {addActions} from "@/store/addMenu-slice";

const SideBar = (props) => {

    const dispatch = useDispatch();
    
    const userId = props.user.userId
    const addMenu = useSelector(state => state.add);

    const addTable = (userId) => {dispatch(tableActions.addTable(userId))};
    const setFont = () => {dispatch(addActions.setFont())}
    const setPost = () => {dispatch(addActions.setPost())}
    const close = () => {dispatch(addActions.close())}

    console.log( addMenu.modal, addMenu.font, addMenu.post)

    return (
        <div className={classes.Cntnr}>
            <ul>

                <li onClick={setPost}>
                    <FontAwesomeIcon icon={faImage}/>
                    {addMenu.modal && addMenu.post &&
                        <Modal onClose={close}><PostItForm onAddPost={props.onAddPost}/></Modal>}
                </li>

                <li onClick={()=>{addTable(userId)}}>
                    <FontAwesomeIcon icon={faTable}/>
                </li>

                <li onClick={setFont}>
                    <FontAwesomeIcon icon={faFont}/>
                    {addMenu.modal && addMenu.font && <Modal onClose={close}><FontSection/></Modal>}
                </li>

            </ul>

        </div>
    )
}

export default SideBar;