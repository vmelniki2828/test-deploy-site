import styled from 'styled-components';
import { RxBorderDotted } from 'react-icons/rx';
import { GrUserManager } from 'react-icons/gr';
import { FaRegFolderOpen } from 'react-icons/fa';
import { TbMailCancel } from 'react-icons/tb';

export const HeaderConteiner = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #dfdaeb;
  width: 100%;
  background-color: #fff;
`;

export const AllChatsName = styled.h2`
  font-family: 'Geologica';
  font-size: 22px;
  font-weight: 500;
  line-height: 27.5px;
  text-align: left;
  margin-left: 60px;
`;

export const HeaderIconWrap = styled.div`
  height: 60px;
  width: 60px;
  border-right: 0.5px solid #dfdaeb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderIcon = styled.img`
  width: 22px;
  height: 24px;
`;

export const ChatsNameWrap = styled.div`
  width: 280px;
  border-right: 0.5px solid #dfdaeb;
`;

export const HeaderNameWrap = styled.div`
  width: 800px;
  padding-left: 30px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1200px) {
    width: 560px;
  }
  @media (min-width: 1400px) {
    width: 730px;
  }
  @media (min-width: 1600px) {
    width: 931px;
  }
  @media (min-width: 1800px) {
    width: 1131px;
  }
  @media (min-width: 2000px) {
    width: 1332px;
  }
  @media (min-width: 2500px) {
    width: 1837px;
  }
  @media (min-width: 3000px) {
    width: 2335px;
  }
`;

export const HeaderInfoWrap = styled.div`
  width: 300px;
  height: 60px;
  border-left: 0.5px solid #dfdaeb;
`;

export const HeaderName = styled.p`
  font-family: 'Geologica';
  font-size: 22px;
  font-weight: 500;
  line-height: 27.5px;
`;

export const Settings = styled(RxBorderDotted)`
  width: 20px;
  height: 20px;

  padding-right: 20px;

  cursor: pointer;
`;

export const ModalWindow = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 202px;
  max-width: 80%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  top: 90px;
  z-index: 99;
  left: 340px;

  display: flex;
  align-items: baseline;
  flex-direction: column;
  @media (min-width: 1200px) {
    left: 155px;
  }
  @media (min-width: 1400px) {
    left: 238px;
  }
  @media (min-width: 1600px) {
    left: 340px;
  }
  @media (min-width: 1800px) {
    left: 436px;
  }
  @media (min-width: 2000px) {
    left: 545px;
  }
  @media (min-width: 2500px) {
    left: 795px;
  }
  @media (min-width: 3000px) {
    left: 1040px;
  }
`;

export const SettingsStyle = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  display: flex;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ManagerIcon = styled(GrUserManager)`
  width: 20px;
  height: 20px;

  margin-right: 5px;
`;

export const OpenModal = styled(FaRegFolderOpen)`
  width: 20px;
  height: 20px;

  margin-right: 5px;
`;

export const CloseChat = styled(TbMailCancel)`
  width: 20px;
  height: 20px;

  margin-right: 5px;
`;
