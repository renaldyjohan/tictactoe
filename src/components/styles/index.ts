import styled from 'styled-components';

interface IBoardButton {
  dimension: number;
}

export const DivRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const DivColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const DivBoardContainer = styled.div`
  width: 80vw;
  margin: 0 auto;
  overflow: scroll;
`

export const DivWinnerContainer = styled.div`
  width:100vw;
  font-size: calc(100vw * 20 / 375);
  margin: 10px auto;
  text-align: center;
`

export const ButtonInterface = styled.button<IBoardButton>`
  width: calc(80vw/${(p: IBoardButton) => p.dimension});
  height: calc(80vw/${(p: IBoardButton) => p.dimension});
  font-size: calc(60vw/${(p: IBoardButton) => p.dimension});
  min-height: 25px;
  min-width: 25px;
`
export const DivPlayAgainContainer = styled.button`
  width: 100vw;
  position: relative;
  margin-bottom: 10px;
  height: 30px;
  background: none;
  border: none;
`

export const ButtonPlayAgain = styled.button`
  width: calc(100vw * 100 / 375);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
`
