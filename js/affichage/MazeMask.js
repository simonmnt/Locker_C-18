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
}