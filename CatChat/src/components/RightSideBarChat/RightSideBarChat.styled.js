import styled from 'styled-components';
import { BsPersonCircle } from 'react-icons/bs';
import { LuTicket } from 'react-icons/lu';

export const HeaderInfoWrap = styled.div`
  width: 300px;
  height: 60px;
  z-index: 101;
  display: flex;
  align-items: center;
`;
export const InfoCon = styled.div`
  width: 300px;
  height: 100%;
  border-left: 0.5px solid #dfdaeb;
  z-index: 101;
  display: flex;
  flex-direction: column;
  right: 0;
  position: fixed;
`;

export const PersonIcon = styled(BsPersonCircle)`
  width: 25px;
  height: 25px;
  color: #0a1019;
  border: 1px solid #0a1019;
  border-radius: 5px;
  position: relative;

 
`;

export const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
margin-left: 21px;
cursor:pointer;
${({ isActive }) =>
    isActive &&
    `
    &:after {
      content: '';
      display: block;
      width: 43px;
      height: 3px;
      position: absolute;
      top: 43px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #94e170;
      border-radius: 1px 1px 0px 0px;
    }
  `}
`;
export const TicketIcon = styled(LuTicket)`
  width: 25px;
  height: 25px;
  color: #0a1019;
  border: 1px solid #0a1019;
  border-radius: 5px;
  position: relative;
 
`;

export const InfoWrap = styled.div`
padding-top: 20px;
padding-left: 30px;
`;

export const TicketName = styled.p`
  font-family: 'Geologica';
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  text-align: left;
  margin: 0;
`;

export const UserImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 10px;
`;

export const UserCon = styled.div`
display: flex;
`;

export const UserName = styled.h2`
font-family: 'Geologica';
font-size: 12px;
font-weight: 400;
line-height: 15px;
text-align: left;
margin: 0;
`;

export const UserMail = styled.h3`
font-family: 'Geologica';
font-size: 12px;
font-weight: 300;
line-height: 15px;
text-align: left;
margin: 0;
`;

export const UserWrap = styled.div`
padding-left:10px;`;