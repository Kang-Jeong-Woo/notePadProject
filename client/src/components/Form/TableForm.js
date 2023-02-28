import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import { tableActions } from "@/store/table-slice";
import classes from "./Form.module.css";
import styled from "styled-components";

const TableForm = (props) => {
    const [font, setFont] = useState();
    const [fontColor, setFontColor] = useState(undefined);
    const [borderColor, setBorderColor] = useState(undefined);
    const [bgColor, setBgColor] = useState(undefined);

    const dispatch = useDispatch();
    const addTableSlice = (data) => {dispatch(tableActions.addTable(data))};
    const setFontColorFn = (event) => {setFontColor(event.target.value)}
    const setBorderColorFn = (event) => {setBorderColor(event.target.value)}
    const setBgColorFn = (event) => {setBgColor(event.target.value)}
    const setFontFn = (event) => {setFont(event.target.value)}
    const addTable = (event) => {
        event.preventDefault();
        if(font !== "Choose the font you want."){
            const data = {
                userId: props.userId,
                style: {font: font},
                color: {
                        font: fontColor,
                        border: borderColor,
                        back: bgColor
                        }
            }
            addTableSlice(data);
            return
        }
        alert("Please check the content and font style again.");
    }
    return (
        <>
            <div className={classes.tableHeader}>
                <h1 className={classes.header}>Table Upload</h1>
                <div style={{display:"flex"}}>
                <div className={classes.tableExample}>
                example :
                </div>
                <table bgcolor={bgColor} style={{border:`${borderColor} 1px solid`, color:fontColor, fontFamily:font }}>
                    <tbody>
                    <tr>
                        <td>example</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <form className={classes.tableForm} onSubmit={addTable}>

                <div className={classes.fontCntnr}>
                    <h2><label htmlFor={"content"}>1. Choose the font style you want.</label></h2>
                    <div className={classes.center}>
                        <select className={classes.select} defaultValue={""} style={{textAlign:"center"}} onChange={setFontFn}>
                            <option defaultValue={""} style={{textAlign:"center"}}>Choose the font you want.</option>
                            <option value={"fantasy"} style={{fontFamily:"fantasy"}}>fantasy</option>
                            <option value={"cursive"} style={{fontFamily:"cursive"}}>cursive</option>
                            <option value={"serif"} style={{fontFamily:"serif"}}>serif</option>
                            <option value={"monospace"} style={{fontFamily:"monospace"}}>monospace</option>
                        </select>
                    </div>
                </div>

                <div className={classes.fontColorCntnr}>
                    <h2><label htmlFor={"color"}>2. Select the color of the font you want.</label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} value={fontColor||"#ffffff"} onChange={setFontColorFn}/>
                    </div>
                </div>

                <div className={classes.borderColorCntnr}>
                    <h2><label htmlFor={"color"}>3. Select the color of the border you want.</label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} value={borderColor||"#ffffff"} onChange={setBorderColorFn}/>
                    </div>
                </div>

                <div className={classes.backColorCntnr}>
                    <h2><label htmlFor={"color"}>4. Select the color of the bg you want.</label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} value={bgColor||"#ffffff"} onChange={setBgColorFn}/>
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