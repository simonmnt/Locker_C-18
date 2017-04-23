function Hero(src, _x, _y) {
Animatable.call(this, src, 32, 32, 2, 3, 0, true, true);
    this.x = _x;
    this.y = _y;
    this.speed = 32;
    this.lastMove = Date.now();

    this.image = new Image();
    this.image.src = src;
    this.image.parent = this;
    this.image.onload = function (){
    	this.pret = true;
    	console.log('hero chargé');
	}
}

var myKey = {};
addEventListener('keydown', function(event){
	myKey[event.keyCode] = true;
});
addEventListener('keyup', function(event){
	myKey[event.keyCode] = false;
});
function touch() {
	if(myKey[38] && hero.y > 0  && testCollision(heroi(), heroj() - 1) && simonMove()){
		hero.y -= hero.speed;
		hero.lastMove = Date.now();
		// console.log('fleche haut');
	}
	if(myKey[40] && hero.y < ctx.canvas.height - hero.image.naturalHeight && testCollision(heroi(), heroj() + 1) && simonMove())
	{
		hero.y += hero.speed;
		hero.lastMove = Date.now();
        // console.log('fleche bas');
	}
	if(myKey[37] && hero.x > 0 && testCollision(heroi() - 1, heroj()) && simonMove())
	{
		hero.x -= hero.speed;
		hero.lastMove = Date.now();
		// console.log('fleche droite');
	}
	if(myKey[39]&&hero.x < ctx.canvas.width - hero.image.naturalHeight && testCollision(heroi() + 1, heroj()) && simonMove())
	{
		hero.x += hero.speed;
		hero.lastMove = Date.now();
		// console.log('fleche gauche');
	}
}

function simonMove(){
if((Date.now() - hero.lastMove) > 200){
return true;
}else{
	return false;
}
}

// Recuperation position hero
function heroi(){

return ((hero.x) - (hero.x) % 32)/32;

}

function heroj(){

 return ((hero.y) - (hero.y) % 32)/32;

}
// Tester la collision
function coordCanvasToMat(){

	var cols = hero.x - (hero.x % 32);
	var rows = hero.y - (hero.y % 32);

var canvToMatRowCOl = { cols , rows };

return CanvasToMatRowCOl;
}


function coordCanvasToMat(cols, rows){

	var x = 32*cols;
	var y = 32*rows;

var matTocanvRowCOl = {'col' : x,'row': y};

return matTocanvRowCOl;

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
			return true;
		break;

		case 's':
			//function sortie
			return true;
		break;

		case 'm':
			//function monster
			console.log("J'ai touché le monstre");
			return false;
		break;

		default:
			return true;
		break;
	}
}