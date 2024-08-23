import styled from 'styled-components';

export const HeaderConteiner = styled.div`
 position: fixed;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #DFDAEB;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 99;
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
height:60px;
width:60px;
border-right: 0.5px solid #DFDAEB;
display:flex;
justify-content: center;
align-items: center;
`;

export const HeaderIcon = styled.img`
width: 22px;
height: 24px;

`;


export const ChatsNameWrap = styled.div`
width:280px;
border-right: 0.5px solid #DFDAEB;
`;

export const HeaderNameWrap = styled.div`
width:800px;
padding-left:30px;
`;

export const HeaderInfoWrap = styled.div`
width:300px;
height:60px;
border-left: 0.5px solid #DFDAEB;
`;

export const HeaderName = styled.p`
font-family: 'Geologica';
font-size: 22px;
font-weight: 500;
line-height: 27.5px;


`;