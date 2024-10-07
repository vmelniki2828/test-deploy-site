import styled from 'styled-components';
import { HiDotsHorizontal } from 'react-icons/hi';

export const GroupsConteiner = styled.div``;

export const SearchBlock = styled.div`
  padding-left: 44px;
  border-bottom: 1px solid #dfdaeb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchItemBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const GropsText = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 19px;

  margin-right: 12px;

  color: #0a1019;
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  font-size: 16px;
  padding: 5px;
  width: 189px;
  height: 13px;

  border-radius: 5px;
  border-color: #dfdaeb;

  padding-left: 28px;

  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #b7b0c7;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  width: 13px;
  height: 13px;
`;

export const GroupButton = styled.button`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #1eaf69;

  width: 75px;
  height: 23px;
  padding: 0;

  background-color: #fff;

  border: 1px solid #1eaf69;
  border-radius: 5px;

  margin-right: 420px;

  cursor: pointer;
`;

export const ListBlock = styled.div``;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;

  border-bottom: 1px solid #dfdaeb;

  padding-left: 45px;
`;

export const ColumnItem = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #b7b0c7;

  margin-right: ${props => props.marginRight};
`;

export const List = styled.ul`
  list-style: none;

  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  border-bottom: 1px solid #dfdaeb;
  display: flex;
  align-items: center;
  height: 50px;

}
`;

export const GroupInfoBlock = styled.div`
  margin-left: 45px;
  display: flex;
  align-items: center;
`;

export const StatsPageItem = styled.li`
  border-bottom: 1px solid #dfdaeb;
  height: 48px;
  display: flex;
  align-items: center;
`;

export const GroupName = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;

  color: #0a1019;

  padding: 0;
  margin: 0;

  color: #0a1019;

  margin-left: 5px;
`;

export const GroupMember = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;

  color: #8a8a8a;

  margin-left: 5px;
  margin-top: 0;
  margin-bottom: 0;
`;

export const GroupImg = styled.img`
  height: 30px;
  width: 30px;
`;

export const QuantityMembers = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;

  color: #0a1019;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0;

  width: 39px;
  height: 20px;

  border: 1px solid #8a8a8a;
  border-radius: 3px;
`;

export const GroupBlock = styled.div`
  margin-right: 260px;
`;

export const StatInformationBlock = styled.div`
  display: flex;
  align-items: center;

  margin-left: 105px;
`;

export const StatusInfo = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  color: #8a8a8a;
  padding: 5px;
  margin: 0;

  background-color: #f7f4fe;
  border-radius: 8px;
`;

export const InfoChats = styled.p`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  color: #0a1019;

  position: relative;
  padding-left: 15px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background-color: #1eaf69;
    border-radius: 50%;
  }
`;

export const Dots = styled(HiDotsHorizontal)`
  height: 22px;
  width: 22px;
  margin-left: 258px;

  cursor: pointer;
`;
