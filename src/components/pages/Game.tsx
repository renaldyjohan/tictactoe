import React, { useState } from 'react';
import {
  DivRow,
  ButtonInterface,
  DivBoardContainer,
  DivWinnerContainer,
  ButtonPlayAgain,
  DivPlayAgainContainer,
} from '../styles';

function Game() {
  const [dimension, setDimension] = useState<number>(8);
  const [condition, setCondition] = useState<number>(3);
  const [player, setPlayer] = useState<String>('player1');
  const [winning, setWinning] = useState<number>(0);
  const [board, setBoard] = useState<Array<Array<string|null>>|undefined>();
  
  const boardGenerator = (dimension:number) => {
    let boardArray = [];
    for(let i = 0; i< dimension ; i++) {
      let boardRow = [];
      for(let j = 0; j< dimension ; j++) {
        boardRow.push(null);
      }
      boardArray.push(boardRow)
    }
    return boardArray;
  };
  

  const handleChange = (data: string|null, rowIndex: number, colIndex: number) => {
    if (board) {
      if (!data) {
        if (winning === 0) {
          let newBoard = [...board];
          let newRow = [...board[rowIndex]]
          if ( player === 'player1' ) {
            newRow[colIndex] = 'X';
            setPlayer('player2');
          } else {
            newRow[colIndex] = 'O';
            setPlayer('player1');
          }
          newBoard[rowIndex] = newRow;
          setBoard(newBoard);
          winningGenerator(newBoard, dimension, condition);
        }
      }
    }
  }
    
  const columnGenerator = (data: string|null, rowIndex: number, colIndex: number) => {
    if (board && dimension) {
      if (data) {
        return (
          <ButtonInterface  key={`col${colIndex}`} id={`${colIndex}-${rowIndex}`} onClick={() => handleChange(data, rowIndex, colIndex)} dimension={dimension} >
            {data}
          </ButtonInterface>
        )
      } else {
        return (
          <ButtonInterface key={`col${colIndex}`} id={`${colIndex}-${rowIndex}`} onClick={() => handleChange(data, rowIndex, colIndex)} dimension={dimension} />
          )
        }
      }
    }
    
  const winningGenerator = (data:Array<Array<string|null>> , boardDimension: number, winningCondition: number) => {
    let count: number = 0;
    let row: number, col: number;
    // horizontal check
    for (row = 0; row < boardDimension; row++) {
      count = 0;
      for(col = 0; col < boardDimension; col++) {
        if (data[row][col] === 'X') {
          for(let i=col,j=0; i< col+winningCondition; i++, j++) {
            if(data[row][col+j] === 'X') {
              count+=1;
              if (count === winningCondition) {
                setWinning(1);
              }
            } else {
              count = 0;
              break;
            }
          }              
          count=0;
        } else if (data[row][col] === 'O') {
          for(let i=col,j=0; i< col+winningCondition; i++, j++) {
            if(data[row][col+j] === 'O') {
              count+=1;
              if (count === winningCondition) {
                setWinning(2);
              }
            } else {
              count = 0;
              break;
            }
          }              
          count=0;
        }
      }
    }
    // vertical check
    for(col = 0; col < boardDimension; col++) {
      count = 0;
      for (row = 0; row < boardDimension; row++) {
        if (data[row][col] === 'X') {
          for(let i=row,j=0; i< row+winningCondition; i++, j++) {
            if (row <= boardDimension-winningCondition) {
              if(data[row+j][col] === 'X') {
                count+=1;
                if (count === winningCondition) {
                  setWinning(1);
                }
              } else {
                count = 0;
                break;
              }
            }
          }              
          count=0;
        } else if (data[row][col] === 'O') {
          for (let i=row,j=0; i< row+winningCondition; i++, j++) {
            if (row <= boardDimension-winningCondition) {
              if (data[row+j][col] === 'O') {
                count+=1;
                if (count === winningCondition) {
                  setWinning(2);
                }
              } else {
                count = 0;
                break;
              }
            }
          }              
          count=0;
        }
      }
    }
    // diagonal check
    for (row = 0; row < boardDimension; row++) {
      count = 0;  
      for(col = 0; col < boardDimension; col++) {
        if (data[row][col] === 'X') {
          for(let i=row,j=0; i< row+winningCondition; i++, j++) {
            if (row < boardDimension-winningCondition) {
              if(data[row+j][col+j] === 'X') {
                count+=1;
                if (count === winningCondition) {
                  setWinning(1);
                }
              } else {
                count = 0;
                break;
              }
            }
          }              
          count=0;
        } else if (data[row][col] === 'O') {
          for(let i=row,j=0; i< row+winningCondition; i++, j++) {
            if (row < boardDimension-winningCondition) {
              if(data[row+j][col+j] === 'O') {
                count+=1;
                if (count === winningCondition) {
                  setWinning(2);
                }
              } else {
                count = 0;
                break;
              }
            }
          }              
          count=0;
        } 
      }
    }

    // anti-diagonal check
    for (row = 0; row < boardDimension; row++) {
      count = 0;  
      for(col = 0; col < boardDimension; col++) {
        if (data[row][col] === 'X') {
          for(let i=row,j=0; i< row+winningCondition; i++, j++) {
            if (row <= boardDimension-winningCondition) {
              if (col-j>=0) {
                if(data[row+j][col-j] === 'X') {
                  count+=1;
                  if (count === winningCondition) {
                    setWinning(1);
                  }
                } else {
                  count = 0;
                  break;
                }
              }
            }
          }              
          count=0;
        } else if (data[row][col] === 'O') {
          for(let i=row,j=0; i< row+winningCondition; i++, j++) {
            if (row <= boardDimension-winningCondition) {
              if (col-j>=0) {
                if(data[row+j][col-j] === 'O') {
                  count+=1;
                  if (count === winningCondition) {
                    setWinning(2);
                  }
                } else {
                  count = 0;
                  break;
                }
              }
            }
          }              
          count=0;
        } 
      }
    }
  }  

  const layoutGenerator = (data:Array<Array<string|null>>) => {
    return (
      <DivBoardContainer>
        {
          data.map((row, rowIndex) => {
            return (
              <DivRow key={`row${rowIndex}`} >
                {
                  row.map((column, columnIndex) => {
                    return columnGenerator(column, rowIndex, columnIndex);
                  })
                }
              </DivRow>
            )    
          })
        }
      </DivBoardContainer>
    )
  }
  
  const onSubmit = (number: number | undefined) => {
    if(number) {
      if (condition === 3 && dimension>3){
        alert('winning condition have to be more than 3 if board dimension is more than 3')
      } else {
        setDimension(number);
        if(dimension) {
          setBoard(boardGenerator(dimension))
        }
      }
    }
  }

  const onDimensionChange = (value: number) => {
    if (value < 3) {
      setDimension(3);
    } else if (value < condition) {
      setDimension(condition);
    } else {
      setDimension(value);
    }
  }

  const onConditionChange = (value: number) => {
    if (value > dimension) {
      setCondition(dimension);
    } else if (value < 3) {
      setCondition(3);
    } else {
      setCondition(value);
    }
  }
  
  const onReset = () => {
    setBoard(undefined);
    setDimension(8);
    setCondition(3);
    setPlayer('player1');
    setWinning(0);
  }

  return (
    <div>
      { winning === 0
        ?
          board
          ? 
            (player === 'player1') ?
            <>
              <DivWinnerContainer>Player 1</DivWinnerContainer>
              <DivPlayAgainContainer>
                <ButtonPlayAgain onClick={() => onReset()} >Reset</ButtonPlayAgain>
              </DivPlayAgainContainer>
            </>
            :
            <>
              <DivWinnerContainer>Player 2</DivWinnerContainer>
              <DivPlayAgainContainer>
                <ButtonPlayAgain onClick={() => onReset()} >Reset</ButtonPlayAgain>
              </DivPlayAgainContainer>
            </>
          :
          null
        :
          winning === 1
          ?
          <>
            <DivWinnerContainer>The Winner is Player 1</DivWinnerContainer>
            <DivPlayAgainContainer>
              <ButtonPlayAgain onClick={() => onReset()} >play again</ButtonPlayAgain>
            </DivPlayAgainContainer>
          </>
          :
          <>
            <DivWinnerContainer>The Winner is Player 2</DivWinnerContainer>
            <DivPlayAgainContainer>
              <ButtonPlayAgain onClick={() => onReset()} >play again</ButtonPlayAgain>
            </DivPlayAgainContainer>
          </>
      }
      {
        board ?
        layoutGenerator(board) :
        <>
          <div>
            <label>
              Dimension:
              <input type="number" name="dimensionValue" value={dimension} onChange={e => onDimensionChange(parseInt(e.target.value))} />
            </label>
          </div>
          <div>
            <label>
              Winning Condition:
              <input type="number" name="condition" value={condition} onChange={e => onConditionChange(parseInt(e.target.value))} />
            </label>
          </div>
          <input type="submit" value="Start" onClick={() => onSubmit(dimension)} />
        </>
      }
    </div>
  );
}
 
export default Game;