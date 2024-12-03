import styled from 'styled-components';

export const TeamPageConteiner = styled.div`
  margin-left: 60px;
`;

export const HeaderTeamPage = styled.div`
  display: flex;
  align-items: center;
  height: 50px;

  padding-left: 45px;

  border-bottom: 1px solid #dfdaeb;
`;

export const ButtonMenu = styled.button`
  font-family: 'Geologica';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 15px;

  margin-right: 40px;
  padding: 0;

  cursor: pointer;

  border: 0;
  background-color: #fff;

  width: 62px;
  height: 32px;

  color: #0a1019;

  &:hover {
    border: 1px solid #dfdaeb;
    border-radius: 5px;
  }
`;
