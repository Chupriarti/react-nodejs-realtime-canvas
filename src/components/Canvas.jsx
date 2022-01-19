import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../store/canvasState';
import '../styles/canvas.scss';

const Canvas = observer( () => {
  const canvasRef = React.useRef();

  React.useEffect(() => {
    console.log(canvasRef);
    canvasState.setCanvas(canvasRef.current);
  }, []);

  return (
    <div className='canvas'>
      <canvas ref={canvasRef} width={400} height={400}></canvas>
    </div>
  )
});

export default Canvas;
