import classes from "@/components/SideBar/SideBar.module.css";
import {useRef} from "react";
import {tableActions} from "@/store/table-slice";
import {useDispatch} from "react-redux";
import {fontAction} from "@/store/font-slice";
const FontSection = (props) => {
    const inputRef = useRef();
    const styleRef = useRef();
    const colorRef = useRef("#000000");
    const dispatch = useDispatch();
    const addFontSlice = (data) => {dispatch(fontAction.addFont(data))};
    const addFont = (event) => {
        event.preventDefault();
        if(inputRef.current.value.trim().length !== 0 && styleRef.current.value !== "원하는 글자체를 선택하세요"){
            const data = {
                content: inputRef.current.value,
                style: styleRef.current.value,
                color: colorRef.current.value
            }
            addFontSlice(data);
            // props.onAddFont(data);
            return
        }
        alert("내용이나 폰트 스타일을 다시 한 번 확인해 주세요");
    }
    return (
        <>
            <h1 className={classes.ih}>폰트 hud</h1>
            <form onSubmit={addFont}>
                <label htmlFor={"content"}>내용</label>
                <input type="text" id={"content"} name={"content"} ref={inputRef}/>
                <select ref={styleRef} defaultValue={""}>
                    <option defaultValue={""}>원하는 글자체를 선택하세요</option>
                    <option value={"cursive"} style={{fontFamily:"cursive"}}>cursive</option>
                    <option value={"fantasy"} style={{fontFamily:"fantasy"}}>fantasy</option>
                    <option value={"monospace"} style={{fontFamily:"monospace"}}>monospace</option>
                    <option value={"serif"} style={{fontFamily:"serif"}}>serif</option>
                </select>
                <label htmlFor={"color"}>색깔</label>
                <input type={"color"} id={"color"} name={"color"} ref={colorRef}/>
                <button>전송</button>
            </form>
        </>
    )
}
export default FontSection