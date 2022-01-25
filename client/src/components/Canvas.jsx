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
  const [modal, setModal] = React.useState(true);

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  React.useEffect(() => {
    const socket = WebSocket('ws://localhost:5000/');
    socket.onopen = () => {
      console.log("Connected to websocket");
    }
  }, []);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  }

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  }

  return (
    <div className='canvas'>
      <Modal show={modal} onHide={() => {}}>
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
