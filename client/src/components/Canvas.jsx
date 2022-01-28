import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/canvas.scss';
import Brush from '../tools/Brush';
import {Modal, Button} from 'react-bootstrap'
import {useParams} from 'react-router-dom';
import Rect from '../tools/Rect';

const Canvas = observer( () => {
  const canvasRef = React.useRef();
  const usernameRef = React.useRef();
  const [modal, setModal] = React.useState(true);
  const params = useParams();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  React.useEffect(() => {
    if (canvasState.username){
      const socket = new WebSocket('ws://localhost:5000/');
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Brush(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        console.log("Connected to websocket");
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: "connection"
        }));
      }
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
              console.log(`User ${msg.username} connected!`);
            break;
          case "draw":
              drawHandler(msg);
            break;
        }
      }
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type){
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "rect":
        Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
        break;
      case "finish":
        ctx.beginPath();
        break;
    }
  }

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
