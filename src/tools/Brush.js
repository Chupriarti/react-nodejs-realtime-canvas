import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas){
        super();
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHanderl.bind(this);
    }

    mouseUpHanderl(e) {

    }

    mouseDownHandler(e) {

    }

    mouseMoveHandler(e) {

    }
}
