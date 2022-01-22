import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas = null;
    undoList = [];
    redoList = [];

    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }
}

export default new CanvasState();
