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

    // Skip Intro
      canvas.addEventListener('click', function(event){
        isIntro = false;
    })

    // Le texte d'intro
    // TODO: Déplacer dans un fichier propre
    var paragraphs = [
        "After a long and dangerous journey. Gasnam and the people of Tafsum, passed the borders of" +
        "planet Earth.\n \n" +
        "When suddently… \nCrack ! Kabooom ! \nThe shock is brutal. The ship breaks apart…",

        "Where is our little Gasnam going to land ?\n"+
        "And what is the gigantique world ?\n\n" +

        "Moments later, our young hero wakes up, but he is surrounded by darkness…\n" +
        "An only faint ray of light comes to light up his prison from time to time…"
];

    var bulles = [
        "You found a message !\n\"Get the heck out of here !\"" ,
        "A sign ? \n\"This way ! Quick !\"",
        "you found a chest. It is locked down…",
        "you found a key !\n It can open the chest !\n It's empty ! Cool !",
        "you found a gemstone ! It's beautiful !",
        "Cool ! A dickpump !"
    ];

    // L'index du texte à afficher dans paragraphs
    var text = 0;

    // Les éléments déssinables pour l'intro
    var drawables = {
        "background" : new Drawable("img/galaxy.jpg", canvas.width, canvas.height),
        "introText" : new MultiLineText(1200, tempCanvas.width / 2, 24, "", 48, 1.25, "rgba(255, 255, 255, 0)", "center")
    };

    // Le temps d'affichage de chaque paragraphe
    var delay = 14000;
    // Timestamp du dernier rafraîchissement
    var lastupdate = -1;

    // l'opcité du texte
    var opacity = 0;
    // Facteur d'agrandissement du texte à chaque rafraîchissement
    var factor = 0.2;

    // Booléen indiquant si nous sommes dans l'intro ou non
    var isIntro = true;
    var isEnd = false;
    var newLevel = true;

    window.level = 1;
    window.hero = new Hero("img/fabworm.png", 50, 80);
    window.laby = null;
    window.tileset = new Tileset('./img/tileset.png');
    window.messageBul = new MessageBulle("", 0, 0);
    window.pause = false;

     // Variable temps
    var t = 0;

	// Variable Audio
	window.audio = {
	"allumette": new Audio(),
	"monstre": new Audio(),
	"objet" : new Audio()
	};
	audio['allumette'].src = "./audio/allumette.ogg";
	audio['monstre'].src = "./audio/monstre.ogg";
	audio['objet'].src = "./audio/objet.ogg";
	
    // agrémenter le chrono
    function chrono(){
        t++;
    }
    setInterval(chrono, 1000);

    // on créer une nouvelle ligne de text
    var textChrono = new MultiLineText(100, 20, 8, text, 18, 1.25, 'white');

    function initLaby (level) {
        if (level <= Object.keys(mazes).length) {
            console.log("init level " + level);
            window.laby = new Labyrinthe(mazes, level);
            laby.genererCarte();
            laby.popMonster();
            laby.popAllumettes();

            hero.x = laby.getStartPosX() * 32;
            hero.y = laby.getStartPosY() * 32;

            hero.reborn();
        }
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

        // facteur agrandissement texte
        factor *= 1.0015;

    }

    function success () {
		if(sonAutorise) {audio['objet'].play()};
        messageBul.text = bulles[level - 1];
        messageBul.state = "showing";
        window.pause = true;

        setTimeout(function () {
            window.pause = false;
            newLevel = true;
            level++;
            if (level >= 7) {
                theEnd();
            }
        }, messageBul.showTime + 1000);
    }

    function fail() {
        if(sonAutorise) {audio['monstre'].play()};
        messageBul.text = "You died.";
        messageBul.state = "showing";
        window.pause = true;

        hero.playDead();

        setTimeout(function () {
            newLevel = true;
            window.pause = false;
        }, messageBul.showTime + 1000);
    }

    function theEnd() {
        var wrapper = document.getElementById("wrapper");
        ctx.canvas.width = wrapper.clientWidth;
        ctx.canvas.height = wrapper.clientHeight;
        ctx.canvas.style.marginTop = 0;
        ctx.canvas.style.marginLeft = 0;

        var endTitle = "You came out of the C18 locker.\nYou meet J";
        var credits = "Mickaël BROISAT, Alexandre DONAZZAN, Simon MINET, Stephen MORA, Gaël PHILIPPE, Tahar SADEKI";
        var remerciements = "Thanks Gerald ABBADIE and Victorien PESTRE for their teeching, to Olivier and" +
            " Sylvie DONAZZAN for their warm welcoming.";

        var endTitleMText = new MultiLineText(wrapper.clientWidth, canvas.width / 2, 0, endTitle, 48, 1.25, "white", "center");
        var creditsText = new MultiLineText(wrapper.clientWidth, wrapper.clientWidth / 2, 0, credits, 24, 1.25, "white", "center");
        var remerciementsText = new MultiLineText(wrapper.clientWidth, wrapper.clientWidth / 2, 0, remerciements, 18, 1.25, "white", "center");

        var totalHeight = endTitleMText.totalHeight() + creditsText.totalHeight() + remerciementsText.totalHeight();
        endTitleMText.y = (ctx.canvas.height - totalHeight) / 2;
        creditsText.y = endTitleMText.y + endTitleMText.totalHeight();
        remerciementsText.y = creditsText.y + creditsText.totalHeight();

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        endTitleMText.draw();
        creditsText.draw();
        remerciementsText.draw();

        isEnd = true;

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
            //mazemask.drawAllumette();



            var timeX = textChrono.x;
            var timeY = textChrono.y;
            // Suivi du wrap, si canvas est plus grand
            if (canvas.width > wrapper.clientWidth) {
                timeX = Math.abs(parseInt(canvas.style.marginLeft.replace("px", "")));
            }
            if (canvas.height > wrapper.clientHeight) {
                timeY = Math.abs(parseInt(canvas.style.marginTop.replace("px", "")));
            }

            textChrono.x = timeX;
            textChrono.y = timeY;
            mazemask.drawAllumette();
            textChrono.text = "Time : " + t + "s";

            messageBul.draw();
            textChrono.draw(ctx);
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

        if (!isEnd) {
            window.requestAnimationFrame(refresh);
        } else {
            theEnd();
        }
    }

    document.addEventListener('success', success);
    document.addEventListener('monster', fail);

    window.requestAnimationFrame(refresh);
})();