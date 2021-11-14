
// importation de l'instance de Game créée dans Game.js
import theGame from './game.js';




// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le starship
const init = () => {

        //console.log();
      document.getElementById("flotteSoucoupes").addEventListener('click', event =>  {theGame.changeLaunch.bind(theGame)();
                                                                                      document.activeElement.blur();
                                                                                      document.querySelector("#flotteSoucoupes span").innerHTML = document.querySelector("#flotteSoucoupes span").innerHTML == "OFF" ? "ON": "OFF";


                                                                                    });
      document.getElementById("nouvelleSoucoupe").addEventListener('click', event => {theGame.addSaucer.bind(theGame)(); document.activeElement.blur();} );
      window.requestAnimationFrame(() => theGame.animate(document.getElementById("score"), document.getElementById("vies")));
      window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
      window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));

      // lifeBlur c'est juste pour l'esthètique et pour ne pas gener l'appui sur l'espace pouur tirer !!!!
      document.getElementById("lifeBlur").addEventListener('click', () => document.activeElement.blur());
}

window.addEventListener("load",init);

//
console.log('le bundle a été généré');
