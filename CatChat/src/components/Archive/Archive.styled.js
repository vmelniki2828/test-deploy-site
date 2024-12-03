import styled from 'styled-components';

export const ArchiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  min-width: 800px;
  margin-left: 343px;
  position: fixed;
  box-sizing: border-box;

  @media (min-width: 1300px) {
    width: 900px;
  }
  @media (min-width: 1400px) {
    width: 1000px;
  }
  @media (min-width: 1500px) {
    width: 1150px;
  }
  @media (min-width: 1600px) {
    width: 1225px;
  }
  @media (min-width: 1800px) {
    width: 1275px;
  }
`;

export const ChatMessages = styled.div`
  margin-top: 50px;
  margin-left: 30px;
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

export const StartText = styled.h2`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 28px;
  text-align: center;

  color: #0a1019;
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

export const TextItem = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 28px;

  color: #0a1019;
`;
