import React from 'react';
import {
  ButtonMenu,
  HeaderTeamPage,
  TeamPageConteiner,
} from './TeamPage.styled';
import Groups from 'components/Groups/Groups';

const TeamPage = () => {
  return (
    <TeamPageConteiner>
      <HeaderTeamPage>
        <ButtonMenu>Agents</ButtonMenu>
        <ButtonMenu>Chatbots</ButtonMenu>
        <ButtonMenu>Groups</ButtonMenu>
      </HeaderTeamPage>
      <Groups />
    </TeamPageConteiner>
  );
};

export default TeamPage;
