import styled from 'styled-components';

export const HeaderContainer = styled.div`
  max-height: 15vh;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  font-family: Cinzel;
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
  background-color: rgba(255,159,10,.5);
  box-shadow: 0 2px 10px rgba(0,0,0,.2);

  @media only screen and (min-width: 576px) {
  }
`