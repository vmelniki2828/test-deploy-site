import styled from 'styled-components';

export const GroupSideBarConteiner = styled.div`
  background-color: #fff;
  width: 400px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99;

  border-left: 1px solid #dfdaeb;
`;

export const GroupMainText = styled.h1`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  margin: 20px 15px 15px;

  color: #0a1019;
`;

export const GroupInfoBlock = styled.div`
  width: 270px;
  height: 80px;

  border: 1px solid #dfdaeb;
  border-radius: 5px;
  margin-left: 15px;
  display: flex;
  align-items: center;
`;

export const GroupMainInfo = styled.div`
  margin-left: 15px;

  display: flex;
  align-items: center;
`;

export const GroupImg = styled.img`
  height: 30px;
  width: 30px;
`;

export const GroupIcon = styled.img`
  height: 14px;
  width: 14px;

  margin-left: 5px;
`;

export const GroupBlock = styled.div`
  margin-right: 10px;

  border-right: 1px solid #dfdaeb;
  padding-right: 10px;
`;

export const GroupBlockItem = styled.div`
  border: 0;
`;

export const GroupName = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;

  color: #0a1019;

  padding: 0;
  margin: 0;

  margin-left: 10px;
`;

export const GroupMember = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;

  color: #b7b0c7;

  margin-left: 10px;
  margin-top: 0;
  margin-bottom: 0;

  display: flex;
  align-items: center;
`;

export const GroupText = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  padding: 0;
  margin: 0;

  color: #1eaf69;
`;

export const GroupTextItem = styled.p`
  width: 99px;

  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  padding: 0;
  margin: 0;

  color: #b7b0c7;
`;

export const MembersInfoBlock = styled.div`
  width: 270px;
  height: 152px;

  margin-top: 15px;

  border: 1px solid #dfdaeb;
  border-radius: 5px;
  margin-left: 15px;
`;

export const MainMembersText = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;

  display: flex;
  align-items: center;

  margin: 15px 15px 0 15px;

  color: #0a1019;
`;

export const MembersNumber = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;

  margin: 0 5px;

  color: #b7b0c7;
`;

export const MembersList = styled.ul`
    padding: 0;
    margin-left: 15px;
    list-style: none;
    margin-top: 10px;
    margin-bottom: 0;
    width: 90%;
    height: 80px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #ccc #f1f1f1;
}

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const MembersListItem = styled.li`
  margin: 5px 0;
  font-size: 14px;
  color: #333;

  display: flex;
  align-items: center;
`;

export const ShowAllButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-top: 6px;

  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  color: #ae8cff;

  padding: 0;
  margin-left: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserImg = styled.img`
  height: 20px;
  width: 20px;

  margin-right: 5px;
`;

export const PerfomanceInfoBlock = styled.div`
  width: 270px;
  height: 253px;

  margin-top: 15px;

  border: 1px solid #dfdaeb;
  border-radius: 5px;
  margin-left: 15px;
`;

export const PerfomanceMainText = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;

  margin-left: 15px;

  color: #0a1019;
`;

export const PerfomanceList = styled.ul`
  list-style: none;
  padding: 0;
  margin-left: 15px;
  margin-bottom: 10px;
`;

export const PerfomanceItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const PerfomanceIcon = styled.img`
  height: 14px;
  width: 14px;

  margin-right: 10px;
`;

export const PerfomanceNumber = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #1eaf69;

  margin: 0;
  margin-right: 15px;
`;

export const PerfomanceText = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  display: flex;
  align-items: center;

  color: #000000;

  margin: 0;
`;

export const PerfomanceButton = styled.button`
  margin-left: 15px;

  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #ff4f4f;

  background-color: #fff;
  border: 1px solid #ff4f4f;
  border-radius: 3px;

  cursor: pointer;
`;
