import {useRef} from "react";
import {useDispatch} from "react-redux";
import {fontActions} from "@/store/font-slice";
import classes from "./Form.module.css";

const FontSection = (props) => {
    const inputRef = useRef();
    const styleRef = useRef();
    const colorRef = useRef("#000000");
    const dispatch = useDispatch();
    const addFontSlice = (data) => {dispatch(fontActions.addFont(data))};
    const addFont = (event) => {
        event.preventDefault();
        if(inputRef.current.value.trim().length !== 0 && styleRef.current.value !== "Choose the font."){
            const data = {
                id: props.userId,
                content: inputRef.current.value,
                style: styleRef.current.value,
                color: colorRef.current.value
            }
            addFontSlice(data);
            return
        }
        alert("Please check the content and font style again.");
    }
    return (
        <>
            <h1 className={classes.header}>Font Upload</h1>
            <form className={classes.fontForm} onSubmit={addFont}>

                <div className={classes.contentCntnr}>
                    <h2><label htmlFor={"content"}>1. Please enter the content.</label></h2>
                    <div className={classes.center}>
                        <input className={classes.input} type="text" id={"content"} name={"content"} ref={inputRef}/>
                    </div>
                </div>

                <div className={classes.fontCntnr}>
                    <h2><label htmlFor={"select"}>2. Choose the font you want.</label></h2>
                    <div className={classes.center}>
                        <select className={classes.select} ref={styleRef} defaultValue={""} id={"select"}>
                            <option defaultValue={""} style={{textAlign:"center"}}>Choose the font.</option>
                            <option value={"fantasy"} style={{fontFamily:"fantasy"}}>fantasy</option>
                            <option value={"cursive"} style={{fontFamily:"cursive"}}>cursive</option>
                            <option value={"serif"} style={{fontFamily:"serif"}}>serif</option>
                            <option value={"monospace"} style={{fontFamily:"monospace"}}>monospace</option>
                        </select>
                    </div>
                </div>

                <div className={classes.colorCntnr}>
                    <h2><label htmlFor={"color"}>3. Select the color of the font you want.</label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} ref={colorRef}/>
                    </div>
                </div>

                <div className={classes.sendCntnr}>
                    <button className={classes.button}>Send</button>
                </div >
            </form>
        </>
    )
}

export default FontSection