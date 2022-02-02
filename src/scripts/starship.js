import MoveState from "./enumeration";
import Mobile from "./mobile";
import imgSrc from "../assets/images/vaisseau-ballon-petit.png";

export default class Starship extends Mobile {

    constructor (y) {
        super (40, y, 0, 2, imgSrc, 48);
        this.moving = null;
    }

    getUp() {
        return this.moving === MoveState.UP;
    }

    getDown() {
        return this.moving === MoveState.DOWN;
    }

    moveUp() {
        this.deltaY = -Math.abs(this.deltaY);
        this.moving = MoveState.UP;
    }

    moveDown() {
        this.deltaY = Math.abs(this.deltaY);
        this.moving = MoveState.DOWN;
    }

    move(canvas) {
        if (this.getUp()) {
            this.y = Math.max(0, this.y + this.deltaY);
        }
        if (this.getDown()) {
            this.y = Math.min(canvas.height - this.imageWidht+6, this.y + this.deltaY);
        }
    }

    stopMoving() {
        this.moving = MoveState.NONE;
    }

}