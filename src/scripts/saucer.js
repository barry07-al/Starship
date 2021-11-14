import Mobile from "./mobile.js";
import MoveState from "./movestate.js";
import saucerSrc from "../assets/images/flyingSaucer-petit.png";

const aleaInterval = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) +1)) + Math.ceil(min);
export default class Saucer extends Mobile{
      static SAUCER_WIDTH = 48;
      static SAUCER_HEIGHT = 36;
      constructor(canvas){
        super(saucerSrc, Saucer.SAUCER_WIDTH, Saucer.SAUCER_HEIGHT, canvas.width-100, aleaInterval(0, canvas.height-Saucer.SAUCER_HEIGHT ), -3, 0);
        this.moving = MoveState.LEFT;
        this.width = Saucer.SAUCER_WIDTH;
        this.height = Saucer.SAUCER_HEIGHT;
      }


      move(canvas){
        const tmpX = this.x + this.deltaX;
        const tmpY = this.y + this.deltaY;

        if( tmpX > 0 && tmpY > 0 ){
          super.move(canvas);

        }
        else{  // la secoupe sort du canvas

          this.moving = MoveState.NONE;
        }

      }

      collisionWith(mobile){
        const  A1 = {
            x: this.x,
            y: this.y
          };
          const A2 = {
            x: this.x + this.width,
            y: this.y + this.height
          };

          const A1p = {
            x: mobile.x,
            y: mobile.y
          };
          const A2p = {
            x: mobile.x + mobile.width,
            y: mobile.y + mobile.height
          };

          const max = (a, b) => a > b ? a:b;
          const min = (a, b) => a < b ? a:b;

          const P1 = {
            x: max(A1.x, A1p.x),
            y: max(A1.y, A1p.y)
          };
          const P2 = {
            x: min(A2.x, A2p.x),
            y: min(A2.y, A2p.y)
          }

          return (P1.x < P2.x && P1.y < P2.y);

    }
}
