const Button = (props) => {
    const clickTrigger = () => {
        props.onClick();
    }

    return(
        <button className="button-53" role="button" onClick={clickTrigger}>{props.children}</button>
    )
}

export default Button;


