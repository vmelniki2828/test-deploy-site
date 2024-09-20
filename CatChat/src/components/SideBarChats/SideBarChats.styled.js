import styled from 'styled-components';

export const SideBarChatsConteiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 61px;
  width: 280px;
  position: fixed;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #ccc;
`;

export const MainSideBarInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  width: 250px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const ChatsList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatConteiner = styled.div`
  background-color: #f2f2f2;
  width: 250px;
  height: 70px;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #efe9ff;
  }
`;

export const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 10px;
`;

export const ChatText = styled.p`
  font-family: 'Geologica';
  font-size: 12px;
  font-weight: 300;
  line-height: 15px;
  text-align: left;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: #8a8a8a;
`;

export const UserNameText = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;

  margin: 0;
  margin-left: 8px;

  color: #0a1019;
`;

export const MessageTime = styled.p`
  font-size: 10px;
  color: #888;
  display: block;
  margin-top: 5px;
`;

export const ChatInfoWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;
