function DeplacementHero(){

	var myKey = {};
	addEventListener('keydown', function(event){
		myKey[event.keyCode] = true;
		console.log('Keydown actif');
	})	
	addEventListener('keyup', function(event){
		myKey[event.keyCode] = false;
		console.log('keyup reactif');
	})
	function touch() {
		if(myKey[38]&& hero.y > 0){
				hero.y -= hero.speed;
				console.log('fleche haut');
		}
		if(myKey[40]&&hero.y < 960-hero.image.width){
				hero.y += hero.speed;
				console.log('fleche bas');
		}
		if(myKey[37]&&hero.x > 0){
				hero.x -= hero.speed;
				console.log('fleche droite');
		}
		if(myKey[39]&&hero.x < 640-hero.image.width){
				hero.x += hero.speed;
				console.log('fleche gauche');
		}
	}
}