var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
console.log('chargé ctx');
var niveau = 1;
var t = 0;

var hero = new Hero("img/fabworm.png", 50, 80);

var mazemask = new MazeMask();

// création et initialisation de la variable date
var date = new Date();

// création de la variable qui va définir la taille maxi lorsque l'on touche une allumette
var tailleAllumette = 300;
var arretdutemps = date.getTime();

// Offset des objets dans le tileset
var OBJECTS_TILESET_OFFSET = 7 * 32;

function background () {
    ctx.fillStyle = "#0b680f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
// text a afficher
// var TextLine = new MultiLineText(100, 10, 10, "Temps :" + t++ + ".", 18, 1.25, 'white', 'left');


function updateCanvasPosition () {
    var wrapper = document.getElementById('wrapper');
    if (canvas.width < wrapper.clientWidth) {
        canvas.style.marginLeft = ((wrapper.clientWidth - canvas.width) / 2) + "px";
    }

    if (canvas.height < wrapper.clientHeight) {
        canvas.style.marginTop = ((wrapper.clientHeight - canvas.height) / 2) + "px";
    }

    var marginTop = parseInt(canvas.style.marginTop.replace('px', ''));
    var marginLeft = parseInt(canvas.style.marginLeft.replace('px', ''));

    var heroXinWindow = hero.x + marginLeft;
    var heroYinWindow = hero.y + marginTop;


    if (heroYinWindow < 200 && marginTop < 0 && canvas.height > wrapper.clientHeight) {
        newMarginTop = marginTop + hero.speed;
        if (newMarginTop > 0) newMarginTop = 0;
        canvas.style.marginTop = newMarginTop + "px";
    }

    if (heroXinWindow < 200 && marginLeft < 0 && canvas.width > wrapper.clientWidth) {
        newMarginLeft = marginLeft + hero.speed;
        if (newMarginLeft > 0) newMarginLeft = 0;
        canvas.style.marginLeft = newMarginLeft + "px";
    }

    if (heroYinWindow > wrapper.clientHeight - 200 && canvas.height > wrapper.clientHeight) {
        var newMarginTop = marginTop - hero.speed;

        if (newMarginTop < 0 - (canvas.height - wrapper.clientHeight)) newMarginTop = 0 - (canvas.height - wrapper.clientHeight);

        canvas.style.marginTop = newMarginTop + "px";
    }

    if (heroXinWindow > wrapper.clientWidth - 200 && canvas.width > wrapper.clientWidth) {
        var newMarginLeft = marginLeft - hero.speed;

        if (newMarginLeft < 0 - (canvas.width - wrapper.clientWidth)) newMarginLeft = 0 - (canvas.width - wrapper.clientWidth);

        canvas.style.marginLeft = newMarginLeft + "px";
    }
}

//var text = new MultiLineText(100, 20, 20, heroi() + " " + heroj());

function begin () {
    if (hero.image.pret) {
        touch();
        updateCanvasPosition();


        //laby.popMonster();
        if (typeof(laby) !== 'undefined') laby.draw();
        //AffichageText();
        hero.draw(ctx);
    }
}
// var intervalConstante = setInterval(begin, 33);




