/**
 * Created by gaelph on 24/04/2017.
 */

function ExitIndicator() {
    "use strict";
    Drawable.call(this, "img/indicator.png", 8, 8);
    this.angle = 0;

    this.draw = function () {
        var exitCase = laby.getExitCase();
        this.angle = Math.atan((exitCase.y * 32 - hero.y) / (exitCase.x * 32 - hero.x));

        if (hero.x > exitCase.x * 32) {
            this.angle += Math.PI;
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        var x = (24 * Math.cos(this.angle));
        var y = (24 * Math.sin(this.angle));
        ctx.drawImage(this.img, 0, 0, 8, 8, 24, 0, 8, 8);

        ctx.restore();
    }

}