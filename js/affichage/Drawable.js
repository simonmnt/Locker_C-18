/**
 * Classe définissant un élément image pour un canvas
 * @param {string} imgSrc    L'image source
 * @param {?number} width    La largeur de l'image à afficher
 * @param {?number} height   La hauteur de l'image à afficher
 * @constructor
 * @class
 */
function Drawable(imgSrc, width, height) {
    // La position de l'image dans le canvas
    /**
     * La position horizontale de l'image
     * @type {number}
     * @default 0
     */
    this.x = this.x || 0;
    /**
     * La position verticale de l'image
     * @type {number}
     * @default 0
     */
    this.y = this.y || 0;

    /**
     * La largeur à afficher de l'image
     * @type {number}
     * @default -1
     */
    this.width = width || -1;
    /**
     * La hauteur à afficher de l'image
     * @type {number}
     * @default -1
     */
    this.height = height || -1;

    /**
     * Indique si l'image doit être affichée ou non
     * @type {boolean}
     * @default true;
     */
    this.display = true;

    /**
     * L'image à afficher
     * @type {Image}
     */
    this.img = new Image();

    // Chargement de l'image
    this.img.loaded = false;
    var img = this.img;
    this.img.onload = function () {
        img.loaded = true;
    };
    this.img.src = imgSrc;

    /**
     * Dessine l'image sur le canevas
     * @param context   Le Context dans lequel dessiner l'image
     */
    this.draw = function (context) {
        // L'image doit être affichée
        if (this.display) {
            // Si les dimensions ne sont pas définies, on les calcul à partir de celles de l'image
            if (this.width < 0 && this.height < 0) {
                this.width = this.img.naturalWidth;
                this.height = this.img.naturalHeight;
            }

            // Dessin
            context.drawImage(this.img, // L'image
                0, 0, // Position du clipping à la source
                this.img.naturalWidth, this.img.naturalHeight, // Dimension du clipping à la source
                this.x, this.y, // Position dans le canvas
                this.width, this.height); // Dimensions du dessin
        }
    }
}