import Mobile from "./mobile";
import imgSrc from "../assets/images/flyingSaucer-petit.png";

export default class Saucer extends Mobile {

    constructor(x, y) {
        super(x, y, -3, 0, imgSrc, 48);
        this.chute = false;
    }

    move() {
        if (this.y + this.deltaY >= 0) {
            super.move();
        }
    }
}