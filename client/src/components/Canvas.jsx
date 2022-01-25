import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from '../tools/Brush';
import {Modal, Button} from 'react-bootstrap'

const Canvas = observer( () => {
  const canvasRef = React.useRef();
  const usernameRef = React.useRef();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  }

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
  }

  return (
    <div className='canvas'>
      <Modal show={true} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
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
