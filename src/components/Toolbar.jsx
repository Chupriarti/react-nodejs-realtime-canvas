import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss';
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Rect from '../tools/Rect';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <button className='toolbar__btn brush' onClick={() => toolState(new Brush(canvasState.canvas))} />
      <button className='toolbar__btn rect' onClick={() => toolState(new Rect(canvasState.canvas))} />
      <button className='toolbar__btn circle' onClick={() => toolState(new Circle(canvasState.canvas))} />
      <button className='toolbar__btn eraser' onClick={() => toolState(new Eraser(canvasState.canvas))}  />
      <button className='toolbar__btn line' />
      <input type="color" />
      <button className='toolbar__btn undo' />
      <button className='toolbar__btn redo' />
      <button className='toolbar__btn save' />
    </div>
  )
}

export default Toolbar;
