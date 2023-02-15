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
                type: fileList[0].type.slice(0, 5)
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
        const postData = {
            img: uploadedImage,
            content: enteredContent,
        }
        console.log("click!");
        console.log(uploadedImage);
        // props.onAddPost(postData);
    }

    return(
        <>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="description">내용을 입력해주세요! (ex.앨범 제목, 출시 날짜...)</label>
                    <textarea id={"description"} rows={"5"} ref={descriptionInputRef}></textarea>
                </div>
                {showImage}
                <div>
                    <label htmlFor="image">앨범 사진을 올려주세요!</label>
                    <input id={"image"} type="file" accept={"image/jpg, image/jpeg, image/png"} ref={fileInputRef} onChange={uploadFile}/>
                </div>
                <button>post!</button>
            </form>
        </>
    )
}
export default PostItForm;