import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from '../tools/Brush';

const Canvas = observer( () => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataUrl());
  }

  return (
    <div className='canvas'>
      <canvas
        onMouseDown ={() => mouseDownHandler()}
        ref={canvasRef} 
        width={400} 
        height={400}
      />
    </div>
  )
});

export default Canvas;
