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

    pushToUndo (data) {
        this.undoList.push(data);
    }

    pushToRedo (data) {
        this.redoList.push(data);
    }
}

export default new CanvasState();
