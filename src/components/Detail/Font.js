import classes from "src/components/SideBar/SideBar.module.css";
import {useRef} from "react";
const FontSection = (props) => {
    const inputRef = useRef();

    const addFont = (event) => {
        event.preventDefault();
        props.onAddFont(inputRef.current.value);
    }

    return (
        <>
            <h1 className={classes.ih}>폰트 hud</h1>
            <form onSubmit={addFont}>
                <input type="text" ref={inputRef}/>
                <button>전송</button>
            </form>
        </>
    )
}
export default FontSection