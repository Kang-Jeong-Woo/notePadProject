import {useMemo, useRef, useState} from "react";
import ShowFileImage from "@/components/Form/ShowFileImage";
import classes from "./Form.module.css";
import axios from "axios";

const PostItForm = (props) => {
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const descriptionInputRef = useRef();
    const handleClickFileInput = () => {
        fileInputRef.current.click();
    }
    const uploadFile = (event) => {
        // 멀티 업로드 기능을 염두한 코드
        const fileList = event.target.files;
        const len = fileList.length;
        if (fileList && fileList[0]) {
            const url = URL.createObjectURL(fileList[0]);
            setImageFile({
                file: fileList[0],
                thumbnail: url,
                type: fileList[0].type.slice(0, 5),
                path: `/${fileList[0].name}`
            })
        }
    }
    const showImage = useMemo(() => {
        if (!imageFile && imageFile === null) {
            return <img src={""} alt="사진 없음"/>
        }
        return <ShowFileImage scr={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput}/>
    }, [imageFile]);
    const submitHandler = (event) => {
        event.preventDefault();
        const uploadedImage = imageFile.file;
        const enteredTitle = descriptionInputRef.current.value;
        const imagePath = imageFile.path;
        const postItData = {
            userId: props.userId,
            title: enteredTitle,
            content: imagePath,
            pinned: false,
            isDelete: false,
            width: 300,
            height: 300,
            positionX: 0,
            positionY: 0,
            positionZ: 10,
        }
        try {
            axios.post("http://localhost:8123/api/saveImg",
                { postItData:postItData },
                { withCredentials: true }
            )
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1 className={classes.header}>Img Upload</h1>
            <form className={classes.imgForm} onSubmit={submitHandler} encType={"multipart/form-data"}>

                <div className={classes.titleCntnr}>
                    <h2><label htmlFor="description">1. Please enter a title of the image</label></h2>
                    <div className={classes.textAreaCntnr}>
                        <textarea className={classes.textArea} id={"description"} rows={"1"} ref={descriptionInputRef}></textarea>
                    </div>
                </div>

                <div className={classes.imgContentCntnr}>
                    <h2><label htmlFor="image">2. Please post a photo of your favorite celebrity or Idol.</label></h2>
                    <input id={"image"} name={"file"} type="file" accept={"image/jpg, image/jpeg, image/png"}
                           ref={fileInputRef} onChange={uploadFile}/>
                    <div className={classes.imgCntnr}>
                        <div>
                            {showImage}
                        </div>
                    </div>
                </div>

                <div className={classes.btnCntnr}>
                    <button className={classes.button}>post!</button>
                </div>
            </form>
        </>
    )
}
export default PostItForm;