function Hero(src, _x, _y) {
Animatable.call(this, src, 32, 32, 2, 3, 0, true, true);
    this.x = _x;
    this.y = _y;
    this.speed = 32;
    this.lastMove = Date.now();
    this.allumette = false;

    this.verticalOffset = 0;

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
    };

	this.reborn = function () {
	    "use strict";

	    this.nbFrames = 2;
	    this.frame = 0;
	    this.loop = true;
	    this.play();
    };
}

var myKey = {};
addEventListener('keydown', function(event){
	myKey[event.keyCode] = true;
});
addEventListener('keyup', function(event){
	myKey[event.keyCode] = false;
});
function touch() {
    if (pause === true) return;

	if(myKey[38] && hero.y > 0 && simonMove()){
		if(testCollision(heroi(), heroj() - 1)){
		hero.y -= hero.speed;
		hero.lastMove = Date.now();
		// console.log('fleche haut');
		}
	}
	if(myKey[40] && hero.y < ctx.canvas.height - hero.image.naturalHeight && simonMove())
	{
		if(testCollision(heroi(), heroj() + 1)){
		hero.y += hero.speed;
		hero.lastMove = Date.now();
        // console.log('fleche bas');
		}
	}
	if(myKey[37] && hero.x > 0 && simonMove())
	{
		if(testCollision(heroi() - 1, heroj())){
		hero.x -= hero.speed;
		hero.verticalOffset = 32;
		console.log("Vartical Offset : " + hero.verticalOffset);
		hero.lastMove = Date.now();
		// console.log('fleche droite');
		}
	}
	if(myKey[39]&&hero.x < ctx.canvas.width - hero.image.naturalHeight && simonMove())
	{
		if(testCollision(heroi() + 1, heroj())){
		hero.x += hero.speed;
		hero.verticalOffset = 0;
		hero.lastMove = Date.now();
		// console.log('fleche gauche');
		}
	}
}

function simonMove(){
    if ((Date.now() - hero.lastMove) > 200) {
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