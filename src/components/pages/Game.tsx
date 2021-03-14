import React, { useState } from 'react';
import { DivRow, ButtonInterface, DivBoardContainer } from '../styles';

function Game() {
  const [dimension, setDimension] = useState<number>(3);
  const [condition, setCondition] = useState<number>(3);
  const [player, setPlayer] = useState<String>('player1');
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
  
  const [board, setBoard] = useState<Array<Array<string|null>>|undefined>();

  const handleChange = (data: string|null, rowIndex: number, colIndex: number) => {
    if (board) {
      if (!data) {
        let newBoard = [...board];
        let newRow = [...board[rowIndex]]
        if ( player === 'player1' ) {
          newRow[colIndex] = 'x';
          setPlayer('player2');
        } else {
          newRow[colIndex] = 'o';
          setPlayer('player1');
        }
        newBoard[rowIndex] = newRow;
        setBoard(newBoard);
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
      setDimension(number);
      if(dimension) {
        setBoard(boardGenerator(dimension))
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

  return (
    <div>
      {
        board ?
        layoutGenerator(board) :
        <form>
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
          <input type="submit" value="Submit" onClick={() => onSubmit(dimension)} />
        </form>
      }
    </div>
  );
}
 
export default Game;