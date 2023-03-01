import {useState} from "react";
import Button from "@/components/UI/Button";
import CSSTransition from "react-transition-group/CSSTransition";

const Lab = () => {
    const [A, setA] = useState(false);
    const onClick = () => {
        setA((prevState)=>!prevState);
    }
    return(
        <>
        <Button onClick={onClick}></Button>
            <CSSTransition in={A} tiemout={500} classNames={"myclass"} mountOnEnter unmountOnExit>
                <h2 style={{color:"black"}}>hello plz help me...</h2>
            </CSSTransition>
        </>
    )
}

export default Lab;