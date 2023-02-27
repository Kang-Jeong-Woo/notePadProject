import Image from "next/image";

const ShowFileImage = (props) => {
    return(
        <div>
            <Image src={props.src} alt={props.alt}/>
        </div>
    )
}

export default ShowFileImage;