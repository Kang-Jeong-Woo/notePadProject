import styled from "styled-components";

const PostItMoal = styled.div`
  background-image: url("/postItModal.png");
  background-size: cover;
  background-repeat: round;
  position: fixed;
  top: 10vh;
  left: 15%;
  width: 70%;
  height: 80vh;
  padding: 6em;
  z-index: 100000;
`

const Modal2 = () => {
    return(
        <PostItMoal></PostItMoal>
    )
}

export default Modal2;