/**
 * Created by gaelph on 22/04/2017.
 */

/**
 * Module initial, lance l'intro, puis le jeu
 * les méthodes drawIntro et drawGame sont appelées au rafraichissement
 */
(function IntroMeca() {
    "use strict";
    // Le canevas principal
    var canvas = document.getElementById('canvas');
    var wrapper = document.getElementById('wrapper');
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
    // Un canevas temporaire
    // TODO: le supprimer après l'intro
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = 4000;
    tempCanvas.height = 4000;
    tempCanvas.style.display = 'none';
    tempCanvas.id = 'temp-canvas';
    document.body.appendChild(tempCanvas);

    window.ctx = tempCanvas.getContext('2d');

    // Le texte d'intro
    // TODO: Déplacer dans un fichier propre
    var paragraphs = [
        "Après un long et périlleux voyage. Gasnam et les habitants de Tafsum, passèrent les frontières de " +
        "la planète Terre.\n \n" +
        "Mais soudain… \nCrack ! Kabooom ! \nLe choc est brutal. Le vaisseau se brise en deux…",

        "Mais où notre petit Gasnam va-t-il atterrir ?\n"+
        "Et quel est ce monde si vaste et démesuré ?\n\n" +

        "Quelques temps plus tard, note jeune héro se réveille, mais l’obscurité l’entoure…\n" +
        "Seul un sursaut de lumière vient de temps en temps éclaircir sa prison…"
];

    var bulles = [
        "Message du premier niveau",
        "Message du deuxième niveau",
        "Message du troisième niveau",
        "Message du quatrième niveau",
        "Message du cinquième niveau",
        "Message du sixième niveau"
    ];

    // L'index du texte à afficher dans paragraphs
    var text = 0;

    // Les éléments déssinables pour l'intro
    var drawables = {
        "background" : new Drawable("img/galaxy.jpg", canvas.width, canvas.height),
        "introText" : new MultiLineText(1200, tempCanvas.width / 2, 24, "", 48, 1.25, "rgba(255, 255, 255, 0)", "center")
    };

    // Le temps d'affichage de chaque paragraphe
    var delay = 12000;
    // Timestamp du dernier rafraîchissement
    var lastupdate = -1;

    // l'opcité du texte
    var opacity = 0;
    // Facteur d'agrandissement du texte à chaque rafraîchissement
    var factor = 0.2;

    // Booléen indiquant si nous sommes dans l'intro ou non
    var isIntro = false;
    var newLevel = true;

    window.level = 1;
    window.hero = new Hero("img/fabworm.png", 50, 80);
    window.laby = null;
    window.tileset = new Tileset('./img/tileset.png');
    window.messageBul = new MessageBulle("", 0, 0);

    function initLaby (level) {
        console.log("init level " + level);
        window.laby = new Labyrinthe(mazes, level);
        laby.genererCarte();
        laby.popMonster();
        laby.popAllumettes();

        hero.x = laby.getStartPosX() * 32;
        hero.y = laby.getStartPosY() * 32;
    }

    /**
     * Méthode appelée au rafraîchissement pour l'intro
     */
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

    function success () {
        messageBul.text = bulles[level - 1];
        messageBul.state = "showing";

        setTimeout(function () {
            newLevel = true;
            level++;
        }, messageBul.showTime + 1000);
    }

    function fail() {
        messageBul.text = "Vous êtes mort.";
        messageBul.state = "showing";

        setTimeout(function () {
            newLevel = true;
        }, messageBul.showTime + 1000);
    }

    /**
     * Méthode appelée pour rafraîchir en phase de jeu
     */
    function drawGame () {
        window.ctx = canvas.getContext('2d');

        if (hero.image.pret) {
            touch();
            updateCanvasPosition();


            //laby.popMonster();
            if (typeof(laby) !== 'undefined') laby.draw();
            //AffichageText();
            hero.draw(ctx);
// appel à la fonction permettant d'agrandir la zone visible
            //mazemask.drawAllumette();

            messageBul.draw();
        }
    }

    /**
     * Méthode appelée pour rafraîchire l'affichage
     */
    function refresh() {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        if (isIntro)
            drawIntro();
        else {
            if (newLevel) {
                initLaby(level);
                newLevel = false;
            }
            drawGame();
        }

        window.requestAnimationFrame(refresh);
    }

    window.requestAnimationFrame(refresh);
})();