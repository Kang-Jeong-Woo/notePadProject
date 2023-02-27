import classes from "./DoddleBtn.module.css";



const Button = (props) => {
    const clickTrigger = () => {
        props.onClick();
    }
    return(
        <button className={classes.button} role="button" onClick={clickTrigger}>{props.children}</button>
    )
}

export default Button;


