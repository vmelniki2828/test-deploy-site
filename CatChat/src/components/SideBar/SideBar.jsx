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
} from './SideBar.styled';
import SideBarIcon from '../../images/UnionGrey.png';

const SideBar = ({ setChangePage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const targetRoute = '/fraudPage';
  const isOnTargetRoute = location.pathname === targetRoute;

  const handleFraudClick = () => {
    if (isOnTargetRoute) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // const handleClickOutside = event => {
  //   if (
  //     menuRef.current &&
  //     !menuRef.current.contains(event.target) &&
  //     !event.target.closest('.modal')
  //   ) {
  //     setOpen(false);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedTime = currentTime.toLocaleTimeString('default', {
    timeZone: resolvedTimeZone,
    timeStyle: 'short',
  });

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
        </ListSideBar>
      </ListConteiner>
      <TimeConteiner>{formattedTime}</TimeConteiner>
    </SideBarConteiner>
  );
};

export default SideBar;
