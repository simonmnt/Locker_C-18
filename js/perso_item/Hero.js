function Hero(src, _x, _y) {
Animatable.call(this, src, 32, 32, 2, 3, 0, true, true);
    this.x = _x;
    this.y = _y;
    this.speed = 4;
    this.lastMove = Date.now();
    this.allumette = false;

    this.verticalOffset = 0;

    this.movement = [];
	this.onMove = false;
    this.image = new Image();
    this.image.src = src;
    this.image.parent = this;
    this.image.onload = function (){
    	this.pret = true;
    	console.log('hero chargé');
	};

	this.playDead = function () {
        "use strict";

        this.nbFrames = 8;
        this.loop = false;
        this.frameRate = 15;
    };

	this.reborn = function () {
	    "use strict";

	    this.nbFrames = 2;
	    this.frame = 0;
	    this.loop = true;
	    this.frameRate = 3;
	    this.play();
    };
}

function cheat(){
	tailleAllumette = 1800;
	hero.allumette = true;
}

var myKey = {};
addEventListener('keydown', function(event){
	if(!hero.onMove)
	{myKey[event.keyCode] = true;
	hero.onMove = true;}
});
addEventListener('keyup', function(event){
	myKey[event.keyCode] = false;
});
function touch() {
    if (pause === true) return;

    console.log(JSON.stringify(hero.movement));

	if(myKey[38] && hero.y > 0 && simonMove()){
		if(testCollision(heroi(), heroj())){
		hero.y -= hero.speed;
		hero.lastMove = Date.now();
		// console.log('fleche haut');
            if (hero.movement.indexOf("haut") === -1) hero.movement.push("haut");
            if (hero.movement.indexOf("bas") > 0) hero.movement.splice(hero.movement.indexOf("bas"), 1);
		}
	}
	if(myKey[40] && hero.y < (ctx.canvas.height - hero.image.naturalHeight/2) && simonMove())
	{
		if(testCollision(heroi(), heroj() + 1)){
		hero.y += hero.speed;
		hero.lastMove = Date.now();
        // console.log('fleche bas');
            if (hero.movement.indexOf("bas") === -1) hero.movement.push("bas");
            if (hero.movement.indexOf("haut") > 0) hero.movement.splice(hero.movement.indexOf("haut"), 1);
		}
	}
	if(myKey[37] && hero.x > 0 && simonMove())
	{
		if(testCollision(heroi(), heroj())){
		hero.x -= hero.speed;
		hero.verticalOffset = 32;

		hero.lastMove = Date.now();
		// console.log('fleche droite');
            if (hero.movement.indexOf("droite") === -1) hero.movement.push("droite");
            if (hero.movement.indexOf("gauche") > 0) hero.movement.splice(hero.movement.indexOf("gauche"), 1);
		}
	}
	if(myKey[39]&&hero.x < (ctx.canvas.width - hero.image.naturalHeight/2) && simonMove())
	{
		if(testCollision(heroi() + 1, heroj())){
		hero.x += hero.speed;
		hero.verticalOffset = 0;

		hero.lastMove = Date.now();
		// console.log('fleche gauche');
            if (hero.movement.indexOf("gauche") === -1) hero.movement.push("gauche");
            if (hero.movement.indexOf("droite") > 0) hero.movement.splice(hero.movement.indexOf("droite"), 1);
		}
	}

	if (hero.movement.indexOf("droite") >= 0 && !testCollision(heroi(), heroj())) {
	     hero.x += hero.speed;
     }

    if (hero.movement.indexOf("haut") >= 0 && !testCollision(heroi(), heroj())) {
	     hero.y += hero.speed;
     }

    if (hero.x % 32 === 0 && hero.y % 32 === 0) {
        hero.movement = [];
        myKey[37] = false;
        myKey[38] = false;
        myKey[39] = false;
        myKey[40] = false;
		hero.onMove = false;
    } else {
        myKey[37] = hero.movement.indexOf("droite") >= 0;
        myKey[38] = hero.movement.indexOf("haut") >= 0;
        myKey[39] = hero.movement.indexOf("gauche") >= 0;
        myKey[40] = hero.movement.indexOf("bas") >= 0;
    }
}

function simonMove(){
    if ((Date.now() - hero.lastMove) > 100 || hero.movement.length > 0) {
        return true;
    } else {
	    return false;
    }
}

// Recuperation position hero
function heroi(){
    return ((hero.x) - (hero.x) % 32) / 32;
}

function heroj(){
    return ((hero.y) - (hero.y) % 32) / 32;
}

function testCollision(x, y){
	console.log(x +" " + y);
	console.log(laby.getCase(x, y).type);
	var type = laby.getCase(x, y).getType();
	switch (type){
		case 'w':
		    return false;
		    break;

		case 'l':
		// function allumette
			audio['allumette'].play();
			console.log("J'ai touché une allumette");
            hero.allumette = true;
			return true;
		break;

		case 's':
		    //function sortie
            if (pause === false) {
                var event = new Event('success');
                document.dispatchEvent(event);
            }
		    return true;
		    break;

		case 'm':
			//function monster
			console.log("J'ai touché le monstre");
			var event = new Event('monster');
            document.dispatchEvent(event);
			return false;
		break;

		default:
		    return true;
		    break;
	}
}