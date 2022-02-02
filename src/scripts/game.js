import Saucer from "./saucer";
import Shoot from "./shoot";
import Starship from "./starship";

class Game {

    constructor() {
        this.canvas = document.getElementById("stars");
        this.context = this.canvas.getContext("2d");
        this.starship = new Starship(Math.abs(this.canvas.height/2));
        this.soucoupes = [];
        this.score = 0;
        this.requete = null;
        this.tirs = [];
        this.borneSup = 750;
        this.ajoutsSoucoupes = null;
        this.moveAndDraw = this.moveAndDraw.bind(this);
        this.addSoucoupe = this.addSoucoupe.bind(this);
    }

    keyDownActionHandler(event) {
        switch (event.key) {
            case " " :
                this.addTir();
                break;
            case "ArrowUp":
            case "Up":
                this.starship.moveUp();
                break;
            case "ArrowDown":
            case "Down":
                this.starship.moveDown();
                break
            case "ArrowDown":
            case "Down":
            case "ArrowUp":
            case "Up":
                this.starship.stopMoving();
                break;
            default: return;
        }
    }

    getScore() {
        return this.score;
    }

    addScore(value) {
        this.score = this.score + value;
    }

    addTir() {
        this.tirs.push(new Shoot (this.starship.x + 38, this.starship.y + 10));
    }

    diminueScore(value) {
        this.score = this.score - value;
    }

    nbreAleaY(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    addSoucoupe() {
        this.soucoupes.push(new Saucer(this.canvas.width, this.nbreAleaY(0, this.canvas.height-30)));
    }

    sortieCanvas(soucoupe) {
        return soucoupe.x < 0 ;
    }

    addSoucoupes() {
        if (this.ajoutsSoucoupes === null) {
            this.ajoutsSoucoupes = setInterval(this.addSoucoupe, this.borneSup);
        }else {
            clearInterval(this.ajoutsSoucoupes);
            this.ajoutsSoucoupes = null ;
        }
    }

    consequences() {
        this.tirs.forEach(elt => elt.collisionsWith(this.soucoupes));
        this.tirs.forEach(elt => {if (elt.touche) { this.addScore(200);}});
        this.tirs = this.tirs.filter(elt => !elt.touche);
        this.soucoupes.forEach(elt => {
            if (this.sortieCanvas(elt)) {
                this.diminueScore(200);
        }});
        this.soucoupes = this.soucoupes.filter(elt => !this.sortieCanvas(elt));
        document.getElementById("score").innerHTML = theGame.getScore();
    }

    moveAndDraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.starship.move(this.canvas);
        this.starship.draw(this.context);
        this.consequences();
        this.tirs.map(elt => elt.move());
        this.tirs.map(elt => elt.draw(this.context));
        this.soucoupes.map(elt => elt.move(this.canvas));
        this.soucoupes.map(elt => elt.draw(this.context));
        this.requete = window.requestAnimationFrame(this.moveAndDraw);
    }
}
// crée et exporte l'instance unique de Game
const theGame = new Game();
export default theGame;