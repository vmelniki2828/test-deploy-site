import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 91%;
  width: calc(100% - 650px);
  min-width: 500px;
  margin-left: 343px;
  position: fixed;
  box-sizing: border-box;
  z-index: 3;
`;

export const ChatMessages = styled.div`
  margin-top: 100px;
  margin-left: 5px;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const MessageBox = styled.div`
  padding: 10px;
  border-radius: 5px;
  border: ${({ isManager }) => (isManager ? 'none' : '1px solid #DFDAEB')};
  background-color: ${({ isManager }) =>
    isManager ? '#EFE9FF' : 'transparent'};
`;

export const ChatInput = styled.input`
  width: 742px;
  height: 190px;
  border-radius: 15px;
  box-shadow: 0px 2px 22.3px 0px #00000029;
  border: none;
`;

export const SendButton = styled.button`
  width: 49px;
  height: 20px;
  right: 15px;
  bottom: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #0a1019;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
export const IconButton = styled.img`
  width: 9px;
  height: 8px;
  padding-left: 5px;
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isManager }) => (isManager ? 'flex-end' : 'flex-start')};
`;

export const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin: 0 8px 0 10px;
  margin: ${({ isManager }) => (isManager ? '0 0 0 10px' : '0 10px 0 0')};
`;

export const ChatText = styled.p`
  font-family: 'Geologica';
  font-size: 12px;
  font-weight: 300;
  line-height: 15px;
  text-align: left;
  color: #0a1019;
  max-width: 355px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 0;
`;

export const MessageTime = styled.p`
  font-family: 'Geologica';
  font-size: 8px;
  font-weight: 400;
  line-height: 10px;
  text-align: right;
  margin: 0;
`;

export const MessageWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-direction: ${({ isManager }) => (isManager ? 'row-reverse' : 'row')};
`;

export const InfoWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const TextName = styled.h2`
  font-family: 'Geologica';
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  text-align: right;
  margin: 0;
  padding-right: 5px;
`;
