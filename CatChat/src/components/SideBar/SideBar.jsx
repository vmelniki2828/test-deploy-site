import { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import {
  SideBarConteiner,
  ListConteiner,
  ListSideBar,
  ItemSideBar,
  NavLinkStyled,
  SideBarImg,
  TimeConteiner,
  LogOutBtn,
  LogOutIcon,
  EndConteiner,
} from './SideBar.styled';
import SideBarIcon from '../../images/UnionGrey.png';
import { persistor } from '../../redux/store';

const SideBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const location = useLocation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedTime = currentTime.toLocaleTimeString('default', {
    timeZone: resolvedTimeZone,
    timeStyle: 'short',
  });

  const handleLogout = () => {
    persistor.purge();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <SideBarConteiner>
      <ListConteiner>
        <ListSideBar>
          <ItemSideBar>
            <NavLinkStyled to="/main">
              <SideBarImg src={SideBarIcon} alt="SideBarIcon" />
              Chats
            </NavLinkStyled>
          </ItemSideBar>
          <ItemSideBar>
            <NavLinkStyled to="/archive">
              <SideBarImg src={SideBarIcon} alt="SideBarIcon" />
              Archive
            </NavLinkStyled>
          </ItemSideBar>
          <ItemSideBar>
            <NavLinkStyled to="/tickets">
              <SideBarImg src={SideBarIcon} alt="SideBarIcon" />
              Tickets
            </NavLinkStyled>
          </ItemSideBar>
          <ItemSideBar>
            <NavLinkStyled to="/team">
              <SideBarImg src={SideBarIcon} alt="SideBarIcon" />
              Team
            </NavLinkStyled>
          </ItemSideBar>
        </ListSideBar>
      </ListConteiner>
      <EndConteiner>
        <LogOutBtn onClick={handleLogout}>
          <LogOutIcon />
        </LogOutBtn>
        <TimeConteiner>{formattedTime}</TimeConteiner>
      </EndConteiner>
    </SideBarConteiner>
  );
};

export default SideBar;
