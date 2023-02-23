import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faTable, faFont,} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {tableActions} from "@/store/table-slice";
import Modal from "@/components/UI/Modal";
import {useState} from "react";
import PostItForm from "@/components/Form/PostItForm";
import FontSection from "@/components/Form/FontPoistItForm";

const SideBar = (props) => {
    const [isModalSate, setIsModalState] = useState({
        modal: false,
        post: false,
        font: false,
    });
    const dispatch = useDispatch();
    const addTable = () => {
        dispatch(tableActions.addTable())
    };
    const addPost = () => {
        setIsModalState(prevState => {
            return {...prevState, modal: true, post: !prevState.post}
        })
    }
    const addFont = () => {
        setIsModalState(prevState => {
            return {...prevState, modal: true, font: !prevState.font}
        })

    }
    const onClose = () => {
        setIsModalState(prevState => {
            return {...prevState, modal: !prevState.modal}
        });
    }

    return (
        <div className={classes.Cntnr}>
            <ul>

                <li onClick={addPost}>
                    <FontAwesomeIcon icon={faImage}/>
                    {isModalSate.modal && isModalSate.post &&
                        <Modal onClose={onClose}><PostItForm onAddPost={props.onAddPost}/></Modal>}
                </li>

                <li onClick={addTable}>
                    <FontAwesomeIcon icon={faTable}/>
                </li>

                <li onClick={addFont}>
                    <FontAwesomeIcon icon={faFont}/>
                    {isModalSate.modal && isModalSate.font && <Modal onClose={onClose} ><FontSection/></Modal>}
                </li>

            </ul>
        </div>
    )
}

export default SideBar;