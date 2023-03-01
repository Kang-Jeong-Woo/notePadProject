import styled from "styled-components";

const SquareImg = styled.div`
  background-image: url("/doodlesquare3.png");
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: cursive;
  color: black;
`;

const DoodleSquare = (props) => {
    return(
        <div style={{width:props.width, height:props.height}}><SquareImg>{props.children}</SquareImg></div>
    )
}

export default DoodleSquare