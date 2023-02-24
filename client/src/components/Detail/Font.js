import {useRef} from "react";
import {useDispatch} from "react-redux";
import {fontActions} from "@/store/font-slice";
const FontSection = (props) => {
    const inputRef = useRef();
    const styleRef = useRef();
    const colorRef = useRef("#000000");
    const dispatch = useDispatch();
    const addFontSlice = (data) => {dispatch(fontActions.addFont(data))};
    const addFont = (event) => {
        event.preventDefault();
        if(inputRef.current.value.trim().length !== 0 && styleRef.current.value !== "Choose the font you want."){
            const data = {
                content: inputRef.current.value,
                style: styleRef.current.value,
                color: colorRef.current.value
            }
            addFontSlice(data);
            // props.onAddFont(data);
            return
        }
        alert("Please check the content and font style again.");
    }
    return (
        <>
            <h1>폰트 업로드</h1>
            <form onSubmit={addFont}>
                <h2><label htmlFor={"content"}>Content</label></h2>
                <input type="text" id={"content"} name={"content"} ref={inputRef}/>
                <h2><label htmlFor={"content"}>Choose the font you want.</label></h2>
                <select ref={styleRef} defaultValue={""}>
                    <option defaultValue={""}>Choose the font you want.</option>
                    <option value={"cursive"} style={{fontFamily:"cursive"}}>cursive</option>
                    <option value={"fantasy"} style={{fontFamily:"fantasy"}}>fantasy</option>
                    <option value={"monospace"} style={{fontFamily:"monospace"}}>monospace</option>
                    <option value={"serif"} style={{fontFamily:"serif"}}>serif</option>
                </select>
                <h2><label htmlFor={"color"}>Select the color of the font you want.</label></h2>
                <input type={"color"} id={"color"} name={"color"} ref={colorRef}/>
                <button>전송</button>
            </form>
        </>
    )
}
export default FontSection