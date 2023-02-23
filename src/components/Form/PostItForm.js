import {useMemo, useRef, useState} from "react";
import ShowFileImage from "@/components/Form/ShowFileImage";

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
        if(fileList&&fileList[0]){
            const url = URL.createObjectURL(fileList[0]);
            setImageFile({
                file: fileList[0],
                thumbnail: url,
                type: fileList[0].type.slice(0, 5),
                path:`/${fileList[0].name}`
            })
        }
    }

    const showImage = useMemo(()=>{
        if(!imageFile&&imageFile===null){
            return <img src={""} alt="사진 없음"/>
        }
        return <ShowFileImage scr={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput}/>
    },[imageFile]);

    const submitHandler = (event)=>{
        event.preventDefault();
        const uploadedImage = imageFile.file;
        const enteredContent = descriptionInputRef.current.value;
        const imagePath = imageFile.path;
        const postData = {
            img: uploadedImage,
            content: enteredContent,
            path : imagePath
        }
        props.onAddPost(postData);
    }

    return(
        <>
            <h1>이미지 업로드</h1>
            <form onSubmit={submitHandler} encType={"multipart/form-data"}>
                <div>
                    <h2><label htmlFor="description">Please enter a title for the image</label></h2>
                    <textarea id={"description"} rows={"1"} ref={descriptionInputRef}></textarea>
                </div>
                {showImage}
                <div>
                    <h2><label htmlFor="image">Please post a photo of your favorite celebrity or Idol.</label></h2>
                    <input id={"image"} name={"file"} type="file" accept={"image/jpg, image/jpeg, image/png"} ref={fileInputRef} onChange={uploadFile} />
                </div>
                <button>post!</button>
            </form>
        </>
    )
}
export default PostItForm;