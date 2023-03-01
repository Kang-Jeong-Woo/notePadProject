import classes from "./MainPage.module.css";
import Image from "next/image";
import postEx from "/public/postEx.png";
import canvasEx from "/public/canvasEx.png";
import saveEx from "/public/saveEx.png";

const MainPage = () => {

    return (
        <>
            <div className={classes.mainCntnr}>
                <h2 className={classes.titles}>1. Draw with canvas feature!</h2>
                <div className={`${classes.contentCntnr}`}>
                    <div className={classes.videoCntnr}><Image src={canvasEx} alt={"없어"} width={300} height={300}/>
                    </div>
                    <span>U can easily on/off pen feature<br/>also u can adjust pen size<br/>And choose the color u want!</span>
                </div>

                <h2 className={classes.titles}>2. Add this and that!</h2>
                <div className={`${classes.contentCntnr}`}>
                <span>Bring pictures to ur sketchBook!<br/>
                    Organize pictures, fonts, tables and decorate something you like.<br/></span>
                    <div className={classes.videoCntnr}><Image src={postEx} alt={"없어"} width={300} height={300}/></div>
                </div>

                <h2 className={classes.titles}>3. Save the last work you did!</h2>
                <div className={`${classes.contentCntnr}`}>
                    <div className={classes.videoCntnr}><Image src={saveEx} alt={"없어"} width={300} height={300}/></div>
                    <span>U can save the work u did with the Save button!</span>
                </div>
            </div>
        </>
    )
}
export default MainPage;