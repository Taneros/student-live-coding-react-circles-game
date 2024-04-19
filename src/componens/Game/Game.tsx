import { MouseEvent, useState } from 'react';

interface IPoints {
  x: number;
  y: number;
}

const Game = () => {
  const [circles, setCircles] = useState<IPoints[]>([]);
  const [undoneCircles, setUndoneCircles] = useState<IPoints[]>([]);

  const handleUndo = () => {
    const lastCircle = [...circles].pop();
    if (lastCircle) {
      setCircles(circles.slice(0, -1));
      setUndoneCircles([...undoneCircles, lastCircle]);
    }
  };

  const handleRedo = () => {
    const lastUndoneCircle = [...undoneCircles].pop();
    if (lastUndoneCircle) {
      setCircles([...circles, lastUndoneCircle]);
      setUndoneCircles(undoneCircles.slice(0, -1));
    }
  };

  const handleCircleClick = (event: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const newCircle = { x: clientX, y: clientY };
    setCircles([...circles, newCircle]);
    setUndoneCircles([]);
  };

  return (
    <div>
      <button disabled={circles.length === 0} onClick={handleUndo}>Undo</button>
      <button disabled={undoneCircles.length === 0}  onClick={handleRedo}>Redo</button>
      <div
        style={{ width: '100vw', height: '100vh' }}
        onClick={handleCircleClick}
      >
        {circles.map((circle, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: circle.x - 5,
              top: circle.y - 5,
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: 'red',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Game;
