import Tool from "./Tool";

export default class Rect extends Tool {
    constructor(canvas){
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHanderl.bind(this);
    }

    mouseUpHanderl(e) {
        this.mouseDown = false;
    }

    mouseDownHandler(e) {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            let widht = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, widht, height);
        }
    }

    draw(x, y, w, h) {
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
        this.ctx.stroke();
    }
}
