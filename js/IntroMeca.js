/**
 * Created by gaelph on 22/04/2017.
 */
(function IntroMeca() {
    "use strict";
    var canvas = document.getElementById('canvas');
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = 4000;
    tempCanvas.height = 4000;
    tempCanvas.style.display = 'none';
    tempCanvas.id = 'temp-canvas';
    document.body.appendChild(tempCanvas);
    window.ctx = tempCanvas.getContext('2d');

    var paragraphs = [
        "Après un long et périlleux voyage. Gasnam et les habitants de Tafsum, passèrent les frontières de " +
        "la planète Terre.\n \n" +
        "Mais soudain… \nCrack ! Kabooom ! \nLe choc est brutal. Le vaisseau se brise en deux…",

        "Mais où notre petit Gasnam va-t-il atterrir ?\n"+
        "Et quel est ce monde si vaste et démesuré ?\n\n" +

        "Quelques temps plus tard, note jeune héro se réveille, mais l’obscurité l’entoure…\n" +
        "Seul un sursaut de lumière vient de temps en temps éclaircir sa prison…"
];

    var text = 0;

    var drawables = {
        "background" : new Drawable("img/galaxy.jpg", canvas.width, canvas.height),
        "introText" : new MultiLineText(1200, tempCanvas.width / 2, 24, "", 48, 1.25, "rgba(255, 255, 255, 0)", "center")
    };

    var delay = 12000;
    var lastupdate = -1;

    var opacity = 0;
    var factor = 0.2;

    var isIntro = true;

    function drawIntro() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        var now = Date.now();

        drawables.introText.color = "rgba(255, 255, 255, " + opacity + ")";

        var textHeight = drawables.introText.totalHeight();
        var textVerticalPosition = (canvas.height - textHeight) / 2;
        drawables.introText.y = textVerticalPosition;

        var textW = factor * (drawables.introText.contentWidth);
        var textH = factor * textHeight;
        var textX = (canvas.width - textW) / 2;
        var textY = (canvas.height - textH) / 2;

        if (now - lastupdate < 1000)
            opacity += 0.05;

        if (opacity > 1) opacity = 1;

        if (now - lastupdate > delay - 1000)
            opacity -= 0.05;

        if (lastupdate < 0 || now > lastupdate + delay) {
            opacity = 0;
            drawables.introText.text = paragraphs[text];
            lastupdate = now;
            text++;
            if (text === paragraphs.length + 1) isIntro = false;
            factor = 0.2;
        }

        drawables.background.draw(canvas.getContext('2d'));

        drawables.introText.draw();

        var cw = drawables.introText.contentWidth + 400;
        canvas.getContext('2d').drawImage(tempCanvas,
            drawables.introText.x - cw / 2,
            drawables.introText.y,
            cw,
            textHeight,
            textX - (factor * 200), textY, textW + (factor * 400), textH);

        factor *= 1.002;
    }

    function drawGame () {
        window.ctx = canvas.getContext('2d');

        ctx.fillText("JEU", 0, 48);

    }

    function refresh() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        if (isIntro)
            drawIntro();
        else
            drawGame();

        window.requestAnimationFrame(refresh);
    }

    window.requestAnimationFrame(refresh);
})();