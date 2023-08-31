import styled from 'styled-components';

function AdImage() {
  return (
    <StyledAdImage href="https://www.wanted.co.kr/" target="_blank" rel="noopener noreferrer">
      <img
        src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
        alt="Wanted"
      />
    </StyledAdImage>
  );
}

export default AdImage;

const StyledAdImage = styled.a`
  diplay: block;
  margin: 1rem 0;
  img {
    max-width: 100%;
  }
`;
