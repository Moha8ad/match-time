import React from 'react';
import { useState } from 'react';

import { GridBoxContainer, GridBox, Pixel, BoardPanel, BoardBtn, BoardNum, BoardText, ButtonsPanel, CustomBtn, WinBtn} from './Main.styles.js';

const Main = () => {
  
  const numberOfPixels = Array(Math.pow(4, 2)).fill();
  const [signs, setSigns ] = useState(['a','a','b','b','c','c','d','d','e','e','f','f','g','g','h','h']);
  const random = () => 0.5 - Math.random();
  signs.sort(random)
  const randomArrPixel = numberOfPixels.map((i,itemIdx) => i = { ...i, id: itemIdx, sign: signs.filter((sign, signIdx) => itemIdx === signIdx && sign)[0], show: true, match: false } );
  const [ arrPixel, setArrPixel ] = useState(randomArrPixel)
  const [ hidePixels, setHidePixels ] = useState(true)
  const [ hintsNumber, setHintsNumber ] = useState(3)
  const [ moveNumber, setMoveNumber ] = useState(0)
  const [ points, setPoints ] = useState(0)
  const [ matchedPixelsNumber, setMatchedPixelsNumber ] = useState(0)
  const [ winner, setWinner ] = useState(false)

  const showPixelsUsingHints = () => {
    setArrPixel(arrPixel.map((pixel,idx) => 
      pixel.id === idx ? {...pixel, show: true} : pixel
    ))
    setHidePixels(true)
    setWait(true)
    setPoints(points-20)
    setHintsNumber(hintsNumber-1)
  }
  const handleHints = () => {
    !wait && hintsNumber > 0 && showPixelsUsingHints()

  }

  // at the start of each round of game pixels will be shown
  // after 5 seconds, they will be hidden automatically
  const autoHidePixels = () => {
    setArrPixel(arrPixel.map((pixel,idx) => 
      pixel.id === idx ? {...pixel, show: false} : pixel
    ))
    setHidePixels(false)
    setWait(false)
  }
  // at the start of each round of game pixels will be hidden after 5 seconds
  hidePixels && setTimeout(autoHidePixels, 5000)

  const handlePlay = () => {
    const random = () => 0.5 - Math.random();
    signs.sort(random)
    setArrPixel(randomArrPixel)
    setHidePixels(true)
    setSigns([...signs])
    setPrevPixel(null)
    setWait(false)
    setPoints(0)
    setMoveNumber(0)
    setMatchedPixelsNumber(0)
    setHintsNumber(3)
    setWinner(false)
  }

  const [ prevPixel, setPrevPixel ] = useState(null);
  const [ wait, setWait] = useState(true)

  const handleWin = () => {
    setMatchedPixelsNumber(matchedPixelsNumber+1)
    setWinner(true)
    setWait(true)
    console.log('handleWin')

  }
  const handleContinue = () => {
    setMatchedPixelsNumber(matchedPixelsNumber+1)
    console.log('handleContinue')

  }

  const showPixel = (selectedPixel) => {
    setArrPixel(arrPixel.map(pixel => 
      pixel.id === selectedPixel.id ? {...pixel, show: true} : pixel
    ))
    console.log('showPixel')
  }
  const hidePixel = (selectedPixel) => {
    setArrPixel(arrPixel.map(pixel => 
      pixel.id === selectedPixel.id ? 
      {...pixel, show: false} : 
      pixel
    ))
    console.log('hidePixel')
  }
  const matchedPixels = (selectedPixel) => {
    setArrPixel(arrPixel.map(pixel => 
      pixel.id === selectedPixel.id || pixel.id === prevPixel.id
      ? 
        {...pixel, show: false, match: true}
      :
        pixel
    ))
    // remove first pixel
    setPrevPixel(null)
    setPoints(points+20)

    matchedPixelsNumber+1 === signs.length/2 ? handleWin() : handleContinue()

    console.log('matchedPixels')
  }
  const hideNotMatchedPixels = (selectedPixel) => {
    // remove first pixel
    setPrevPixel(null);
    setArrPixel(arrPixel.map(pixel => 
      pixel.id === selectedPixel.id || pixel.id === prevPixel.id
      ? 
        {...pixel, show: false}
      :
        pixel
    ))
    console.log("hideNotMatchedPixels")
  }

  const notMatchedPixels = (selectedPixel) => {
    //show the selected pixel
    showPixel(selectedPixel)
    setTimeout(function(){
      hideNotMatchedPixels(selectedPixel)
      setWait(false)
    }, 500)
    setWait(true)
    setPoints(points-10)
    console.log('notMatchedPixels')
  }
  const matchPixel = (selectedPixel) => {
    prevPixel.sign === selectedPixel.sign ? matchedPixels(selectedPixel) : notMatchedPixels(selectedPixel)

    console.log('matchPixel')
  }
  const noMove = (selectedPixel) => {
    // remove first pixel
    setPrevPixel(null)
    //hide selected pixel
    hidePixel(selectedPixel)
    setPoints(points-5)
    console.log('noMove')
  }

  const secondMove = (selectedPixel) => {
    // if selected pixel is not same as the prevPixel continue
    prevPixel?.id !== selectedPixel.id ? matchPixel(selectedPixel) : noMove(selectedPixel)
    console.log('secondMove')
  }
  
  const firstMove = (selectedPixel) => {
    //show the selected pixel
    showPixel(selectedPixel)
    console.log('firstMove')
    setPrevPixel(selectedPixel)


  }
  // add second pixel if prev pixel exists
  const checkMove = (selectedPixel) => {
    !prevPixel ? firstMove(selectedPixel) : secondMove(selectedPixel)
    console.log('checkMove')
  }
  
  // add first pixel if it is not already matched 
  const handleSelect = (selectedPixel) => {
    !wait && !selectedPixel.match && checkMove(selectedPixel)
    !wait && !selectedPixel.match && setMoveNumber(moveNumber+1)
    console.log('handleSelect')
  }

  return (
    <>
      <BoardPanel>
        <BoardBtn onClick={() => handleHints()} style={{cursor: 'pointer'}}>
          <BoardNum>{hintsNumber}</BoardNum>
          <BoardText>Hints</BoardText>
        </BoardBtn>
        <BoardBtn>
          <BoardNum>{moveNumber}</BoardNum>
          <BoardText>Moves</BoardText>
        </BoardBtn>
        <BoardBtn>
          <BoardNum>{matchedPixelsNumber}</BoardNum>
          <BoardText>Matched</BoardText>
        </BoardBtn>
        <BoardBtn>
          <BoardNum>{points}</BoardNum>
          <BoardText>Points</BoardText>
        </BoardBtn>
      </BoardPanel>
      <GridBoxContainer>
        <GridBox>
          {arrPixel.map((pixel, idx) => 
            <Pixel key={idx} match={pixel.match} wait={wait} onClick={() => handleSelect(pixel)} >
              {pixel.show || pixel.match ? pixel.sign : null}
            </Pixel>
          )}
        </GridBox>
      </GridBoxContainer>
      <ButtonsPanel>
        <CustomBtn  onClick={handlePlay}>
          Play Again
        </CustomBtn>
        <WinBtn winner={winner}>
          {winner && 'You Win!'}
        </WinBtn>
      </ButtonsPanel>
    </>
  )
}

export default Main;