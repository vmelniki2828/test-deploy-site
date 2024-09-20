import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

export const SideBarConteiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  position: fixed;
  height: 100%;
  border-right: 1px solid #ccc;
  padding-top: 20px;
`;

export const ListConteiner = styled.div`
  /* margin-bottom: 270px; */
`;

export const TimeConteiner = styled.div`
  width: 37px;
  height: 32px;
  color: #b1b1b1;
  position: relative;
  padding-bottom: 90px;

  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: 5px;
    width: 26px;
    height: 1px;
    background-color: #b1b1b1;
  }
`;

export const ListSideBar = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ItemSideBar = styled.li`
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const NavLinkStyled = styled(NavLink)`
  color: #b1b1b1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 50px;
  height: 50px;
  position: relative;

  &.active {
    box-shadow: 0px 4px 3.7px
      rgba(${props => (props.switcher ? '255, 255, 255' : '0, 0, 0')}, 0.06);
    border-radius: 6px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
  }
`;

export const SideBarImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const EndConteiner = styled.div``;

export const LogOutBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  margin-bottom: 20px;
`;

export const LogOutIcon = styled(FiLogOut)`
  width: 25px;
  height: 25px;
  color: #b1b1b1;
`;
