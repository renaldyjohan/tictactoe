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
`

export const ButtonInterface = styled.button<IBoardButton>`
  width: calc(80vw/${(p: IBoardButton) => p.dimension});
  height: calc(80vw/${(p: IBoardButton) => p.dimension});
  font-size: calc(60vw/${(p: IBoardButton) => p.dimension});
`