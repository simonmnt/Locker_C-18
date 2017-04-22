var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
console.log('chargé ctx');
var niveau = 1;

var hero = new Hero("img/fabwormtest.png", 50, 80);
var t = 0;
var canvasTextTime = new MultiLineText(100, 10, 10, "Temps : " + t++ + ".", 18, 1.25, 'white', 'left');

// var level = 1;
// var levelText = new MultiLineText(100, 10, 30, "Niveau : " + swapLevel() + "sur 6", 18, 1.25, 'white', 'left');

// function swapLevel(){

// };

// Augmenter le time de 1 toute les 1s
function time(){
	canvasTextTime.text = "Temps : " + t++ + ".";
}
var intervalTime = setInterval(time, 1000);


function background(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	console.log('background green');
}
	
function begin(){
	if(hero.image.pret){
	touch();
	console.log('hero ready');
	background();
	canvasTextTime.draw();
	hero.draw(ctx);		
	}			
}
var intervalConstante = setInterval(begin, 33);



