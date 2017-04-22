var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
console.log('chargé ctx');
var niveau = 1;

var hero = new Hero("img/fabwormtest.png", 50, 80);

function background(){
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	console.log('background green');
}
	
function begin(){
	if(hero.image.pret){
	touch();
	console.log('hero ready');
	background();
	//AffichageText();
	hero.draw(ctx);		
	}			
}
var intervalConstante = setInterval(begin, 33);




