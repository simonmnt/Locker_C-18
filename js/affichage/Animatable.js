/**
 * Drawable qui peut s'animer
 * @param {string} imgSrc        Le chemin vers le fichier d'animation, une image
 * @param {number} frameWidth    La largeur d'une frame
 * @param {number} frameHeight   La hauteur d'une frame
 * @param {number} nbFrames      Le nombre de frames dans l'animation
 * @param {?number} [frameRate=15] - La fréquence de rafraichissement en nombre d'images par seconde.
 * @param {?number} [startFrame=0] - La frame de départ
 * @param {?boolean} [autoplay=true] - Si on doit lancer la lecture automatiquement
 * @param {?boolean} [loop=true] - Si la lecture doit boucler
 * @constructor
 * @class
 * @extends Drawable
 */
function Animatable(imgSrc, frameWidth, frameHeight, nbFrames, frameRate, startFrame, autoplay, loop) {
    "use strict";
    Drawable.call(this, imgSrc, frameWidth, frameHeight);

    /**
     * Indique si l'animation se lance toute seule
     * @type {boolean}
     * @default false
     */
    this.autoplay = autoplay || false;
    /**
     * Indique si la lecture est bouclée
     * @type {boolean}
     * @default false
     */
    this.loop = loop || false;
    /**
     * Indice de l'image à afficher au prochain rafraïchissement
     * @type {number}
     * @default 0
     */
    this.frame = startFrame || 0;
    /**
     * Le nombre d'images par secondes
     * @type {number}
     * @default 15
     */
    this.frameRate = frameRate || 15;

    /**
     * Le nombre totale d'images dans l'animation
     * @type {number}
     */
    this.nbFrames = nbFrames;

    // timestamp de la dernière mise à jour de l'image
    this.lastFrameUpdate = -1;

    /**
     * Indique si l'animation est en cours de lecture ou pas
     * @type {boolean}
     */
    this.playing = this.autoplay;

    this.verticalOffset = 0;

    /**
     * Lance la lecture
     */
    this.play = function () {
        this.playing = true;
    };

    /**
     * Arrête la lecture
     */
    this.stop = function () {
        this.playing = false;
        this.lastFrameUpdate = -1;
    };

    /**
     * Dessine l'image animée
     * @param context le context dans lequelle dessiner
     * @override
     */
    this.draw = function (context) {
        // si l'image doit être affichée
        if (this.display) {
            // Coordonnées en x de la frame
            var sx = this.frame * frameWidth;
            var sy = this.verticalOffset;

            // Si on est en lecture
            if (this.playing) {
                // Si on n'a pas de timestamp
                if (this.lastFrameUpdate < 0) {
                    this.lastFrameUpdate = Date.now();
                } else {
                    // S'il est temps d'afficher la prochaine image
                    if (Date.now() - this.lastFrameUpdate > 1000 / this.frameRate) {
                        this.frame++; // On incrémente l'image à afficher
                        this.lastFrameUpdate = Date.now(); // nouveau timestamp

                        // Si on a dépassé la dernière frame
                        if (this.frame >= this.nbFrames) {
                            // Si on doit boucler la lecture
                            if (this.loop)
                                this.frame = 0;
                            else
                                this.stop();
                        } // end if frame > nbFrame
                    } // end if
                } // end if else
            } // end if playing

            // Affichage de l'image
            context.drawImage(this.img, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height);
        }
    }
}