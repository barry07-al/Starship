import Mobile from "./mobile";
import imgSrc from "../assets/images/tir.png";

export default class Shoot extends Mobile {

    constructor(x, y) {
        super(x, y, 8, 0, imgSrc, 25);
        this.touche = false ;
    }

    collisionWith(mobile) {
        const x1 = mobile.x;
        const y1 = mobile.y;
        const x1_1 = this.x;
        const y1_1 = this.y;
        const xP1 = Math.max(x1, x1_1);
        const yP1 = Math.max(y1, y1_1);
        const x2 = x1 + mobile.imageWidht;
        const y2 = y1 + mobile.image.height;
        const x2_1 = x1_1 + this.imageWidht;
        const y2_1 = y1_1 + this.image.height;
        const xP2 = Math.min(x2, x2_1);
        const yP2 = Math.min(y2, y2_1);
        return xP1 < xP2 && yP1 < yP2;
    }

    filtrer(soucoupe) {
        if (!soucoupe.chute && this.collisionWith(soucoupe)) {
            soucoupe.chute = true;
            this.touche = true;
            soucoupe.deltaX = 0;
            soucoupe.deltaY = 3;
        }
        return soucoupe ;
    }
    
    collisionsWith(soucoupes) {
        soucoupes.map(elt => this.filtrer(elt));
    }
}