import classes from "src/components/SideBar/SideBar.module.css";
import Card from "@/components/UI/Card";
import {useState} from "react";
import Modal from "@/components/UI/Modal";
const PlusSection = (props) => {
    const [isModal, setIsModal] = useState(false);
    const modalOn = (data) => {
        setIsModal(true);
    }
    const onClose = () => {
        setIsModal(false);
    }

    return (
        <>
            <h1 className={classes.ih}>추가 hud</h1>
            <Card onClick={modalOn}>카드 모양 1</Card>
            <Card onClick={modalOn}>카드 모양 2</Card>
            <Card onClick={modalOn}>카드 모양 3</Card>
            <Card onClick={modalOn}>카드 모양 4</Card>
            {isModal && <Modal onAddPost={props.onAddPost} onClose={onClose}/>}
        </>
    )
}
export default PlusSection