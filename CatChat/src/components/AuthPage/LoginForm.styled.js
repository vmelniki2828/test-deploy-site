import styled from 'styled-components';

export const LoginWrap = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoText = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 95%;
  color: #000000;
`;

export const LogoSpan = styled.span`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 95%;
  color: #1eaf69;
`;

export const FormInput = styled.input`
  outline: none;
  width: 425px;
  height: 26px;
  flex-shrink: 0;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #d3d3d3;
`;

export const FormButton = styled.button`
  margin-top: 45px;
  cursor: pointer;
  border-radius: 2px;
  background: #afffb7;
  color: #1eaf69;
  display: flex;
  align-items: center;
  font-family: 'Geologica';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-style: none;
  width: 69px;
  height: 24px;
  justify-content: center;
  flex-shrink: 0;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const LogForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ShowBtn = styled.button`
  position: absolute;
  right: 5px;
  top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;