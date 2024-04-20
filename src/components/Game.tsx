import React, { MouseEvent, useState } from 'react'

interface ICoordinates {
    x: number;
    y: number;
}

const Game = () => {

  //TODO 
  /**
    * 
    * 
    * <Logic>
    *   
    *   [{x: y:}] coordinates  
    * 
    *   click coordinates   
    *   
    *   Undo
    * 
    *   Redo
    * 
    * 
    * </Logic>
    * 
    * 
    *  UI
    * 
    *   компонент circle
    *   кнопки Redo, Undo
    * 
    * 
    * 
    * 
    * 
    **/

  const [coordinates, setCoordinates] = useState<ICoordinates[]>([]);
  const [undoElements, setUndoElements] = useState<ICoordinates[]>([]);

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e

    const newCircle = { x: clientX, y: clientY }
    
    setCoordinates([...coordinates, newCircle])
  }

  const handleUndoButtonClick = () => {
    const newUndoElements = coordinates.slice(0).pop();

    if (newUndoElements) {
        setUndoElements([...undoElements, newUndoElements]);
        setCoordinates(coordinates.slice(0, -1))
    }
  }

  const handleRedoButtonClick = () => {
    const lastUndo = undoElements.slice(0).pop();
   
    if (lastUndo) {
        setCoordinates([...coordinates, lastUndo]);
        setUndoElements(undoElements.slice(0, -1));
    }
  }

  const isUndoDisabled = coordinates.length === 0;
  const isRedoDisabled = undoElements.length === 0 || coordinates.length === 0;
  
  // reset
  // click on circle to remove ?
    
  return(
    <div>
      <button disabled={isUndoDisabled} onClick={handleUndoButtonClick}>Undo</button>
      <button disabled={isRedoDisabled} onClick={handleRedoButtonClick}>Redo</button>
      
      <div onClick={handleContainerClick} style={{ width: '80vh', height: '100vh' }}>

        {coordinates.length > 0 && coordinates.map(({x,y}) => (
            <div style={{
                borderRadius: '50%',
                backgroundColor: 'red',
                width: 10,
                height: 10,
                position: 'absolute',
                top: y, //
                left: x, //
              }}>
              </div>
        ))}
      </div>
    </div>
  )
}

export default Game