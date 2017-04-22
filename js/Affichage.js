function Affichage() {
    if(this.hero.pret)
	ctx.drawImage(hero.Image, 0, 0, 32, 32, hero.x, hero.y, 32, 32);
	animationHero();
}

var interval = SetInterval(Affichage(), 30);