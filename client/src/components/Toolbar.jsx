import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import Rect from '../tools/Rect';

const Toolbar = () => {

  const changeColor = e => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  }

  return (
    <div className='toolbar'>
      <button className='toolbar__btn brush' onClick={() => toolState(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid))} />
      <button className='toolbar__btn rect' onClick={() => toolState(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid))} />
      <button className='toolbar__btn circle' onClick={() => toolState(new Circle(canvasState.canvas))} />
      <button className='toolbar__btn eraser' onClick={() => toolState(new Eraser(canvasState.canvas))}  />
      <button className='toolbar__btn line'  onClick={() => toolState(new Line(canvasState.canvas))} />
      <input onChange={e => changeColor(e)} type="color" />
      <button className='toolbar__btn undo' onClick={() => canvasState.undo()} />
      <button className='toolbar__btn redo' onClick={() => canvasState.redo()} />
      <button className='toolbar__btn save' />
    </div>
  )
}

export default Toolbar;
