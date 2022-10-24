import styled from 'styled-components';



export const GridBoxContainer = styled.div`

`

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 240px;
  height: 240px;
  overflow: hidden;
  @media only screen and (min-width: 576px) {
    width: 400px;
    height: 400px;
  }
`

export const Pixel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
  border: 1px solid rgba(255,69,58,.3);
  background-color: rgba(0,0,0,.7);
  color: white;
  font-size: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
  border-radius: 10px;
  transition: opacity .3s ease-out;
  opacity: 1;
  &:hover{
    opacity: .8;
  }
  @media only screen and (min-width: 576px) {
    width: 100px;
    height: 100px;
    font-size: 2rem;
  }
`
export const BoardPanel = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-between;
  @media only screen and (min-width: 576px) {
    width: 400px;
  }
`
export const BoardBtn = styled(Pixel)`
  display: flex;
  flex-direction: column;
  height: 50px;
  width: 60px;
  cursor: default;
  @media only screen and (min-width: 576px) {
    width: 100px;
  }
`
export const BoardNum = styled.div`
  font-size: 1.2rem;
  @media only screen and (min-width: 576px) {
    font-size: 1.5rem;
  }
`
export const BoardText = styled.div`
  font-size: .6rem;
`

export const ButtonsPanel = styled(BoardPanel)`
  justify-content: center;
`
export const CustomBtn = styled(Pixel)`
  height: 50px;
  width: 120px;
  font-size: 1rem;
  cursor: default;
  @media only screen and (min-width: 576px) {
    width: 200px;
  }
`

export const WinBtn = styled(CustomBtn)`
  width: ${props => props.winner ? '120px' : 0};
  font-size: ${props => props.winner ? '1.5rem' : 0};
  opacity: ${props => props.winner ? 1 : 0};
  color: gold;
  transition: opacity .5s, width .5s, font-size .8s;

  @media only screen and (min-width: 576px) {
    width: ${props => props.winner ? '200px' : 0};
    font-size: ${props => props.winner ? '2rem' : 0};
  }
`