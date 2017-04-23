/**
 * Created by gaelph on 23/04/2017.
 */

/**
 * Classe gérant le masque du labyrinth
 * @constructor
 * @todo implémenter la possibilité d'augementer la taille de l'image de masque avec une animation
 */
function MazeMask() {
    "use strict";

    // Variable pour pouvoir avoir un agrandissement progressif de la zone
    var zone = 0;
    /**
     * Coordonnée horizontale
     * @type {number}
     */
    this.x = 0;

    /**
     * Coordonnée verticale
     * @type {number}
     */
    this.y = 0;

    /**
     * L'image de masque
     * @type {Image}
     */
    this.mask = new Image();
    this.mask.loaded = false;
    this.mask.onload = function () {
        this.loaded = true;
    };
    this.mask.src = 'img/MazeMask.png';

    /**
     * Méthode appelée pour dessiner le masque
     */
    this.draw = function () {
        // Efface tout le canevas sauf ce qui est couvert par le masque
        ctx.globalCompositeOperation = 'destination-in';

        // On ne tente de dessiner que si l'image est chargée
        if (this.mask.loaded) {
            ctx.drawImage(this.mask,
                0, 0, // Coord Source
                this.mask.naturalWidth, this.mask.naturalHeight, // Dimension source
                this.x, this.y, // Coord Destination
                this.mask.naturalWidth, this.mask.naturalHeight // Dimension destination
            );
        }

        // Rétablit le mode de composition par défaut
        ctx.globalCompositeOperation = 'source-over';
    };
// Permet d'agrandir la vision de la carte
    this.drawAllumette = function () {
        date = new Date();
        console.log(hero.allumette);
        console.log(arretdutemps);
        console.log(date.getTime());
        ctx.globalCompositeOperation = 'destination-in';
        // Si la zone n'est pas assez grande et si l'allumette est craqué depuis peu de temps on augmente la zone visible
        if(hero.allumette && zone <= tailleAllumette) {
            zone = zone + 4;
        }
        // Si la zone visible et à fond et l'allumette consumé, on met l'allumette a false
        if(zone >= tailleAllumette && arretdutemps < date.getTime()-5000){
            hero.allumette = false;
            arretdutemps = date.getTime();
        }
        // Si l'allumette est consummé et si la zone visible n'est pas minimal, on réduit la zone
        if(!hero.allumette && zone >= 0){
            zone = zone - 4;
        }
        // Si on touche une allumette, on la craque pour voir plus loin
        if(zone <= 1 && arretdutemps < date.getTime() - 5000) {
            hero.allumette = true;
            arretdutemps = date.getTime();
        }
        if(this.mask.loaded) {
            ctx.drawImage(this.mask,
                0, 0,
                this.mask.naturalWidth, this.mask.naturalHeight,
                // On centre la zone visible sur le hero
                hero.x - 32 - zone/2, hero.y - 32 - zone/2,
                // C'est ici que l'on définit la taille de la vue du héro
                (this.mask.naturalWidth*2 + zone), this.mask.naturalHeight*2 + zone
            );
        }

        // Rétablit le mode de composition par défaut
        ctx.globalCompositeOperation = 'source-over';

    }
}