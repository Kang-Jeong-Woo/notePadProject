import {useRef} from "react";
import {useDispatch} from "react-redux";
import { tableActions } from "@/store/table-slice";
import classes from "./Form.module.css";

const TableForm = (props) => {

    const fontStyleRef = useRef();
    const fontColorRef = useRef("#000000");
    const borderColorRef = useRef("#000000");
    const backColorRef = useRef("#ffffff");
    const dispatch = useDispatch();
    const addTableSlice = (data) => {dispatch(tableActions.addTable(data))};
    const addTable = (event) => {
        event.preventDefault();
        if(fontStyleRef.current.value !== "Choose the font you want."){
            const data = {
                userId: props.userId,
                style: {font: fontStyleRef.current.value},
                color: {
                        font: fontColorRef.current.value,
                        border: borderColorRef.current.value,
                        back: backColorRef.current.value
                        }
            }
            addTableSlice(data);
            return
        }
        alert("Please check the content and font style again.");
    }
    return (
        <>
            <h1 className={classes.header}>Table Upload</h1>
            <form className={classes.tableForm} onSubmit={addTable}>

                <div className={classes.fontCntnr}>
                    <h2><label htmlFor={"content"}>1. Choose the font style you want.</label></h2>
                    <div className={classes.center}>
                        <select className={classes.select} ref={fontStyleRef} defaultValue={""} style={{textAlign:"center"}}>
                            <option defaultValue={""} style={{textAlign:"center"}}>Choose the font you want.</option>
                            <option value={"cursive"} style={{fontFamily:"cursive"}}>cursive</option>
                            <option value={"fantasy"} style={{fontFamily:"fantasy"}}>fantasy</option>
                            <option value={"monospace"} style={{fontFamily:"monospace"}}>monospace</option>
                            <option value={"serif"} style={{fontFamily:"serif"}}>serif</option>
                        </select>
                    </div>
                </div>

                <div className={classes.fontColorCntnr}>
                    <h2><label htmlFor={"color"}>2. Select the color of the font you want.</label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} ref={fontColorRef}/>
                    </div>
                </div>

                <div className={classes.borderColorCntnr}>
                    <h2><label htmlFor={"color"}>3. Select the color of the border you want.</label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} ref={borderColorRef}/>
                    </div>
                </div>

                <div className={classes.backColorCntnr}>
                    <h2><label htmlFor={"color"}>4. Select the color of the bg you want.</label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} defaultValue={"#ffffff"} ref={backColorRef}/>
                    </div>
                </div>

                <div className={classes.sendCntnr}>
                    <button className={classes.button}>Send</button>
                </div >
            </form>
        </>
    )
}

export default TableForm