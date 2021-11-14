import Mobile from "./mobile";
import MoveState from "./movestate";
import starshipSrc from "../assets/images/vaisseau-ballon-petit.png";


export default class Starship extends Mobile{
  static STARSHIP_WIDTH = 48;
  static STARSHIP_HEIGHT = 39;

  constructor(canvas){
    super(starshipSrc, Starship.STARSHIP_WIDTH, Starship.STARSHIP_HEIGHT, 40, canvas.height/2, 0, 8);
    this.moving = MoveState.NONE;
    this.width = Starship.STARSHIP_WIDTH;
    this.height = Starship.STARSHIP_HEIGHT;
  }

  get up(){
    return this.moving === MoveState.UP;
  }

  get down(){
    return this.moving === MoveState.DOWN;
  }


  moveUp() {
    this.deltaY = - Math.abs(this.deltaY);
    this.moving = MoveState.UP;
  }
  moveDown() {
    this.deltaY = Math.abs(this.deltaY) ;
    this.moving = MoveState.DOWN;
    }

    move(canvas){
    //  console.log(this);
      const tmp = this.y + this.deltaY;
      //console.log(tmp);
      if( (this.up && tmp > 0 )|| (this.down && tmp < canvas.height - Starship.STARSHIP_HEIGHT ) ){
        super.move(canvas);

      }
      else{
        if (this.up) {
          this.y = 0;
        }
        else if (this.down) {
          this.y = canvas.height - Starship.STARSHIP_HEIGHT;
        }
      }

/*
    if (this.moving === MoveState.UP) {
      this.y = Math.max(0 , this.y + this.deltaY);
    }
    if (this.moving === MoveState.DOWN) {
      this.y = Math.min(canvas.height- Starship.STARSHIP_HEIGHT, this.y + this.deltaY);
    }*/
    }

    stopMoving() {
      this.moving = MoveState.NONE;
  }




}
