function Hero(src, _x, _y) {
    this.x = _x;
    this.y = _y;
    this.speed = 10;

    this.image = new Image();
    this.image.src = src;
    this.image.onload = function (){
    	this.pret;
    	console.log('hero chargé');
    }
}
var hero = new Hero(src, _x, _y)

// Position start hero
var startPositionHeroX;
var startPositionHeroY;
hero.x = _x - hero.Image.width / 2;
hero.y = _y - hero.Image.height / 2;

function animationHero(){
		if(_y == 1 && _x == 1){
			_y = 0;
			_x = 0;
			console.log('Si arriver au bout, on reviens a début');
		}else{
			ctx.drawImage(hero.Image, _x*32, _y*32, 32, 32, hero.x, hero.y, 32, 32);
			if(_x == 1){
				_x = 0;
				_y++;
			console.log('Si au début, on augment Y de 1');
		}
				_x++;
			console.log('puis on augment X de 1');
		}
}