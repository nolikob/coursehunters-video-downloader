import posed from 'react-pose';
import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.background.dark};
`;

export const SchoolImage = styled.img`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 5%;
  right: 5%;
`;

export const StudyImage = styled.img`
  position: absolute;
  width: 300px;
  height: 300px;
  bottom: 5%;
  left: 5%;
`;

export const Row = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  align-item: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background: ${(props) => props.theme.background.dark};
`;

export const Input = styled.input`
  outline: none;
  border: none;
  width: 300px;
  height: 80px;
  border-radius: 50px;
  font-family: 'Signika', sans-serif;
  text-align: center;
  font-size: 1.2em;
  transition: all 0.5s ease;
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
  background: ${(props) => props.theme.background.light};
  box-shadow: 0 2px 20px ${(props) => props.theme.shadow.main};
  color: #fff;
  &:hover {
    box-shadow: 0 8px 30px ${(props) => props.theme.shadow.secondary};
  }
`;

export const FormInput = posed(Input)({
  open: {
    width: '300px',
    opacity: 1,
  },
  close: {
    width: 60,
    opacity: 0,
    transition: { width: { duration: 400 } },
  },
});

export const ErrorMessage = styled.div`
  margin-top: 20px;
  color: ${(props) => props.theme.color.secondary};
`;

export const Title = styled.div`
  font-family: Raleway, cursive;
  font-size: 48px;
  position: absolute;
  top: 20%;
  left: 5%;
  z-index: 5;
`;

export const Footer = styled.div`
  font-family: Raleway, cursive;
  position: absolute;
  font-weight: 700;
  bottom: 5%;
  right: 5%;
`;
