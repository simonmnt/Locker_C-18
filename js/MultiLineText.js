/**
 * Created by gaelph on 22/04/2017.
 */

/**
 *
 * @param contentWidth  La largeur du contenu
 * @param x             La coordonnée horizontale
 * @param y             La coordonnée vericale
 * @param text          Le texte à afficher
 * @param fontSize      La taille de la police en pixel
 * @param lineHeight    La hauteur de la ligne
 * @param color         La couleur du texte
 * @param align         Alignement du texte
 * @constructor
 */
function MultiLineText(contentWidth, x, y, text, fontSize, lineHeight, color, align) {
    "use strict";
    this.text = text || "";
    this.fontSize = fontSize || 18;
    this.lineHeight = lineHeight || 1.25;
    this.contentWidth = contentWidth;
    this.x = x || 0;
    this.y = y || 0;
    this.color = color || "#000000";
    this.align = align || "left";

    this.draw = function () {
        var styleBackup = {
            font : ctx.font,
            fillStyle: ctx.fillStyle,
            textAlign: ctx.textAlign
        };

        var instance = this;

        ctx.font = this.fontSize + "px sans-serif";
        ctx.fillStyle = this.color;
        ctx.textAlign = this.align;

        var li = 0;
        this.lines().map(function (line) {
            var y = instance.y + (li * (instance.fontSize * instance.lineHeight)) + instance.fontSize;
            ctx.fillText(line, instance.x, y);
            li++;
        });


        for (var key in styleBackup) ctx[key] = styleBackup[key];
    };

    this.lines = function () {
        var lines = [];
        var curLine = "";

        var styleBackup = {
            font : ctx.font,
            fillStyle: ctx.fillStyle
        };

        if (typeof (this.text) === 'undefined') return lines;

        var brLines = this.text.split('\n');

        ctx.font = this.fontSize + "px sans-serif";
        ctx.fillStyle = this.color;

        var instance = this;

        brLines.map(function (brLine) {
            var words = brLine.split(' ');

            words.map(function (word) {
                var futureLine = curLine + " " + word;

                var futureWidth = ctx.measureText(futureLine);
                if (futureWidth.width < instance.contentWidth) {
                    curLine = futureLine;
                } else {
                    lines.push(futureLine.substring(1, futureLine.length));
                    curLine = "";
                }
            });

            curLine = "";
        });

        ctx.font = styleBackup.font;
        ctx.fillStyle = styleBackup.fillStyle;

        return lines;
    };
}