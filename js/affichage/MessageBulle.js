/**
 * Created by gaelph on 23/04/2017.
 */

function MessageBulle (text, x, y) {
    "use strict";
    this.text = text;
    this.x = x;
    this.y = y;

    this.multiline = new MultiLineText(300, ctx.canvas.width / 2, 0, this.text, 18, 1.25, "white", "center");

    // values : hidden, showing, visible, hiding
    this.state = "hidden";

    this.opacity = 0;
    this.backgroundOpacity = 0.7;
    this.opacityIncrement = 0.05;
    this.showTime = 6000;

    this.lastFrameUpdate = Date.now();

    this.draw = function () {
        this.multiline.text = this.text;
        var rectW = this.multiline.contentWidth + 20;
        var rectH = this.multiline.totalHeight() + 20;

        var rectX = 0;
        var rectY = hero.y;
        if (hero.x > rectW) {
            rectX = hero.x - rectW - 5;
        } else {
            rectX = hero.x + 32 + 5;
        }

        this.multiline.x = rectX + (rectW / 2);
        this.multiline.y = rectY + 10;

        var rectColor = "rgba(41, 41, 41, " + this.opacity * this.backgroundOpacity + ")";
        var textColor = "rgba(255, 255, 255, " + this.opacity + ")";

        if (this.state !== "hidden") {
            if (this.state === "showing") {
                this.opacity += this.opacityIncrement;
                if (this.opacity > 1) {
                    this.opacity = 1;
                    this.state = "visible";
                    this.lastFrameUpdate = Date.now();
                }
            }

            if (this.state === "hiding") {
                this.opacity -= this.opacityIncrement;
                if (this.opacity < 0) {
                    this.opacity = 0;
                    this.state = "hidden";
                }
            }

            var timedelta = Date.now() - this.lastFrameUpdate;
            if (this.state === "visible" && timedelta > this.showTime) {
                this.state = "hiding";
            }

            var styleBackup = {
                fillStyle : ctx.fillStyle
            };

            ctx.fillStyle = rectColor;

            roundRect(ctx, rectX, rectY, rectW, rectH, 4, true, false);

            this.multiline.color = textColor;

            this.multiline.draw();

            for (var key in styleBackup) ctx[key] = styleBackup[key];
        }
    };

    function roundRect(context, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        context.beginPath();
        context.moveTo(x + radius.tl, y);
        context.lineTo(x + width - radius.tr, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        context.lineTo(x + width, y + height - radius.br);
        context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        context.lineTo(x + radius.bl, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        context.lineTo(x, y + radius.tl);
        context.quadraticCurveTo(x, y, x + radius.tl, y);
        context.closePath();
        if (fill) {
            context.fill();
        }
        if (stroke) {
            context.stroke();
        }

    }
}