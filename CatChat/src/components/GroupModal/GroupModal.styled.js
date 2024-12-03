import styled from 'styled-components';

export const GroupModalConteiner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  z-index: 100;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(2px);
  z-index: 99;
`;

export const HeaderModalBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainModalText = styled.h2`
  font-size: 18px;
  color: #333;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const InputConteiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const PositionBox = styled.div`
  position: relative;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 5px;

  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;

  color: #8a8a8a;
`;

export const TextInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
`;

export const SelectInput = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  color: #333;
  cursor: pointer;
  outline: none;
`;

export const DeafaultOption = styled.option`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;

  color: #b7b0c7;

  cursor: pointer;
`;

export const ItemOption = styled.option`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;

  color: #0a1019;

  cursor: pointer;
`;

export const OptionSpan = styled.span`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;

  margin-right: 8px;

  color: #8a8a8a;
`;

export const ItemBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;

  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;

  color: #0a1019;
`;

export const InputButton = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: left;
`;

export const LabelName = styled.label`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;

  color: #1eaf69;

  margin-left: 10px;
`;

export const InputBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
`;

export const RoundCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #1eaf69;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #fff;
    border-color: #1eaf69;
  }

  &:checked::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #1eaf69;
  }
`;

export const CreateButton = styled.button`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;

  color: #1eaf69;

  border: 1px solid #1eaf69;

  width: 89px;
  height: 27px;
  background-color: #fff;

  border-radius: 5px;
  margin-top: 30px;

  cursor: pointer;

  margin-left: 310px;
  
`;
