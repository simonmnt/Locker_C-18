/**
 * Created by gaelph on 23/04/2017.
 */

function MazeMask() {
    "use strict";

    this.x = 0;
    this.y = 0;

    this.mask = new Image();
    this.mask.loaded = false;
    this.mask.onload = function () {
        this.loaded = true;
    };
    this.mask.src = 'img/MazeMask.png';

    this.draw = function () {
        ctx.globalCompositeOperation = 'destination-in';

        if (this.mask.loaded) {
            ctx.drawImage(this.mask,
                0, 0,
                this.mask.naturalWidth, this.mask.naturalHeight,
                this.x, this.y,
                this.mask.naturalWidth, this.mask.naturalHeight);
        }

        ctx.globalCompositeOperation = 'source-over';
    };
}