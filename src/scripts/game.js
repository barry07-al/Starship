import Starship from "./starship.js";
import MoveState from "./movestate.js";
import Saucer from "./saucer.js";
import Shoot from "./shoot.js";

const doRandom = (func) => { if (Math.floor(Math.random()*2)) {func();}};
const f = () => console.log('in interval!');
class Game {

    constructor(){
      this.saucers = Array();
      this.shoots = Array();
      this.score = 0;
      this.lives = 3;
      this.request = null;
      this.launch = undefined;
      this.canvas = document.getElementById("stars");
      this.context = this.canvas.getContext("2d");
      this.starship = new Starship(this.canvas);
    }


    addSaucer(){
      this.saucers.push(new Saucer(this.canvas));
    }

    addShoot(){
      this.shoots.push(new Shoot(this.starship.x, this.starship.y+Starship.STARSHIP_HEIGHT/2 -6 ));
    }

    loseLife(){
      this.lives -= 1;
    }

    changeLaunch(){
      if (!this.launch){
        this.launch = setInterval(doRandom, 750, this.addSaucer.bind(this));
      }
      else{
        this.launch = clearInterval(this.launch);
      }
    }

    gameOver(){
      this.request = window.cancelAnimationFrame(this.request);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.style.backgroundImage = "url('./images/gameover.png')";
      this.canvas.style.animationDuration = "0s";

    }

    animate(elementScore, elementLife){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.starship.move(this.canvas);
      this.starship.draw(this.context);
/*
      this.shoots.forEach( shoot => shoot.applyEffect(this.saucers))  ;
      this.shoots.forEach(saucer => saucer.move(this.canvas));
      this.shoots.forEach(saucer => saucer.draw(this.context));

*/
      //console.log(this.score);
      this.score += this.shoots.reduce( (previous, shoot) => previous + shoot.applyEffect(this.saucers) , 0) * 200   ;  //tester les collisions et chute et score
      this.shoots = this.shoots.filter(shoot => shoot.moving != MoveState.NONE); // tir supprimer
                    this.shoots.forEach(shoot => shoot.move(this.canvas));  // deplacement
      this.shoots = this.shoots.filter(shoot => shoot.x < this.canvas.width); // supprime shoot si tir sort du canvas
                    this.shoots.forEach(shoot => shoot.draw(this.context)); // dessiner

      this.saucers.forEach(saucer => {saucer.move(this.canvas); if(saucer.collisionWith(this.starship)) {this.loseLife(); elementLife.innerHTML = this.lives; saucer.moving = MoveState.NONE;}});
      this.score -= this.saucers.filter(saucer => saucer.moving === MoveState.NONE).length * 1000;  // if saucer leaves canvas -1000 in score
      this.saucers = this.saucers.filter(saucer => saucer.moving !== MoveState.NONE);
      this.saucers.forEach(saucer => saucer.draw(this.context));

      elementScore.innerHTML = this.score;
      elementLife.innerHTML = this.lives;

      if(this.lives == 0){this.gameOver();}
      else { this.request = window.requestAnimationFrame(() => this.animate(elementScore, elementLife)); }

    }

    keyDownActionHandler(event){
      switch (event.key) {
          case "ArrowUp":
          case "Up":
               this.starship.moveUp();
               break;
          case "ArrowDown":
          case "Down":
               this.starship.moveDown();
               break;
          case " ":
              this.addShoot();
              break;
          default: return;
      }
      event.preventDefault();
    }

    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
            case " ":
            case "ArrowDown":
            case "Down":
                this.starship.stopMoving();
                break;
            default: return;
        }
        event.preventDefault();
    }


}


// crée et exporte l'instance unique de Game
const theGame = new Game();
export default theGame;
