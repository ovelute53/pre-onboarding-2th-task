import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <h1>React Page / Issue</h1>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  background-color: #282c34;
  padding: 1rem 0;
  color: #fff;
  text-align: center;
`;
