import styled from 'styled-components';

export const ArchiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width:1275px;
  min-width: 800px;
  margin-left: 343px;
position:fixed;
  box-sizing: border-box;
`;


export const ChatMessages = styled.div`
 
  margin-top:100px;
  margin-left:5px;
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

 export const IconButton = styled.img`
 width: 9px;
height: 8px;
padding-left:5px;
 `;

 export const InputWrap = styled.div`
 position:relative;
 `;

 export const ChatDiv = styled.div`
 display:flex;
  flex-direction: column;
  align-items: ${({ isManager }) => (isManager ? 'flex-end' : 'flex-start')};
 `

 export const UserImg = styled.img`
 width: 30px;
height: 30px;
border-radius: 10px;
margin:${({ isManager }) => (isManager ? '0 0 0 10px' : '0 10px 0 0')};
 `;

 export const ChatText = styled.p`
 font-family: 'Geologica';
font-size: 12px;
font-weight: 300;
line-height: 15px;
text-align: left;
color: #0A1019;
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

export const StartText = styled.h2`
font-family: 'Geologica';
 font-size: 24px;
 font-weight: 700;
 line-height: 10px;
 text-align: center;
 
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
