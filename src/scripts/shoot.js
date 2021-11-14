import MoveState from "./movestate.js";
import Mobile from "./mobile.js";
import shootSrc from "../assets/images/tir.png";


export default class Shoot extends Mobile{

  static SHOOT_WIDTH = 32;
  static SHOOT_HEIGHT = 8;

  constructor(x, y){
    super(shootSrc, Shoot.SHOOT_WIDTH, Shoot.SHOOT_HEIGHT, x, y, 8, 0);
    this.moving = MoveState.RIGHT;
    this.width = Shoot.SHOOT_WIDTH;
    this.height = Shoot.SHOOT_HEIGHT;
  }

  applyEffect(saucers){
    let touched = 0;
    saucers.filter(saucer => saucer.moving != MoveState.DOWN && this.collisionWith(saucer))
           .forEach(saucer =>{
                  saucer.deltaX = 0;
                  saucer.deltaY = 3;
                  saucer.moving = MoveState.DOWN;
                  this.moving = MoveState.NONE;
                  touched++;
               });
    return touched;

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
  /*  const collisionX = this.x + this.width >= mobile.x &&
          mobile.x + mobile.width >= this.x;

    const collisionY = this.y + this.width >= mobile.y &&
          mobile.y + mobile.height >= this.y;

          return collisionX && collisionY; */

}
//console.log(` ${this.x} ${mobile.x}`);


}
