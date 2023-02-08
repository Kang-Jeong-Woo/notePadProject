import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import classes from "./MainPage.module.css";
const MainPage = props => {
    return(
        <div className={classes.homeCtnr}>
            <SideBar/>
            <BulletinBoard postits={props.postits}/>
        </div>
    )
}
export default MainPage