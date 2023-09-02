import styled from 'styled-components';

function Header({ children }) {
  return (
    <StyledHeader>
      <Title>React Page / Issue</Title>
      {children}
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  background-color: #2a2f38;
  padding: 1.5rem 0;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
