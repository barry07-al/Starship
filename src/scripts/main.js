
// importation de l'instance de Game créée dans Game.js
import theGame from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {
    document.getElementById("nouvelleSoucoupe")
            .addEventListener("click", () => {
                theGame.addSoucoupe(); 
                document.getElementById("nouvelleSoucoupe").blur();
            });
    document.getElementById("flotteSoucoupes")
            .addEventListener("click", () => {
                theGame.addSoucoupes();
                document.getElementById("flotteSoucoupes").blur();
            });
    theGame.moveAndDraw();
    window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
}

window.addEventListener("load",init);

//
console.log('le bundle a été généré');
