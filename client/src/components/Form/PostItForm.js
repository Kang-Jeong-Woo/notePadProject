import {useMemo, useRef, useState} from "react";
import {postItActions} from "@/store/postIt-slice";
import {addActions} from "@/store/addMenu-slice";
import { useDispatch } from "react-redux";
import ShowFileImage from "@/components/Form/ShowFileImage";
import classes from "./Form.module.css";
import axios from "axios";
import path from "path";
import Image from "next/image";

const PostItForm = (props) => {
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);
    const descriptionInputRef = useRef();

    const userId = props.userId
    const addPostIt= (data)=>{dispatch(postItActions.addPostIt(data))};
    const close = () => {dispatch(addActions.close())};

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
        return <ShowFileImage src={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput}/>
    }, [imageFile]);

    const submitHandler = (event) => {
        event.preventDefault();
        const uploadedImage = imageFile.file;
        const enteredTitle = descriptionInputRef.current.value;

        // 이미지 확장자
        const ext = path.extname(imageFile.path);
        // 파일명 중복이름 방지
        const fileName = userId + "-" + Date.now() + ext
        //파일 경로
        const imgPath =  "/" + userId + "/" + fileName
        addPostIt({userId: userId, title: enteredTitle, content: imgPath})
        //폼데이터 생성
        const formData = new FormData()
        formData.set('image', uploadedImage, fileName)

        try {
            axios.post("http://localhost:8123/api/saveImg",
                formData,
                { withCredentials: true }
            )
            .then((result) => {
                // console.log(result)
            })
            .catch((error) => {
                // console.log(error);
            });
        } catch (error) {
            // console.log(error);
        }

        close();
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
                    <input id={"image"} name={'image'} type={"file"} accept={"image/jpg, image/jpeg, image/png"}
                           ref={fileInputRef} onChange={uploadFile}/>
                    <div className={classes.imgCntnr}>
                        <div>
                            {showImage}
                        </div>
                    </div>
                </div>

                <div className={classes.btnCntnr}>
                    <button type={"submit"} className={classes.button}>post!</button>
                </div>
            </form>
        </>
    )
}

export default PostItForm;