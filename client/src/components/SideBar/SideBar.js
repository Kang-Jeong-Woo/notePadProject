import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faTable, faFont,} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {tableActions} from "@/store/table-slice";
import Modal from "@/components/UI/Modal";
import PostItForm from "@/components/Form/PostItForm";
import FontSection from "@/components/Form/FontPoistItForm";
import {addActions} from "@/store/addMenu-slice";
import { useRouter } from "next/router";
import axios from "axios";

const SideBar = (props) => {
    // const [isModalSate, setIsModalState] = useState({
    //     modal: false,
    //     post: false,
    //     font: false,
    // });
    const addMenu = useSelector(state => state.add);
    const router = useRouter();
    const dispatch = useDispatch();
    const addTable = () => {
        dispatch(tableActions.addTable())
    };
    const setFont = () => {dispatch(addActions.setFont())}
    const setPost = () => {dispatch(addActions.setPost())}
    const close = () => {dispatch(addActions.close())}

    console.log( addMenu.modal, addMenu.font, addMenu.post)
    // const addPost = () => {
    //     setIsModalState(prevState => {
    //         return {...prevState, modal: true, post: !prevState.post}
    //     })
    // }
    // const addFont = () => {
    //     setIsModalState(prevState => {
    //         return {...prevState, modal: true, font: !prevState.font}
    //     })
    // }
    // const onClose = () => {
    //     setIsModalState(prevState => {
    //         return {...prevState, modal: !prevState.modal}
    //     });
    // }

    return (
        <div className={classes.Cntnr}>
            <ul>

                <li onClick={setPost}>
                    <FontAwesomeIcon icon={faImage}/>
                    {addMenu.modal && addMenu.post &&
                        <Modal onClose={close}><PostItForm onAddPost={props.onAddPost}/></Modal>}
                </li>

                <li onClick={addTable}>
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