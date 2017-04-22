function AffichageText() {

	function writeTemps(temps){
		ctx.save();
		ctx.font = "15px courier, sans-serif";
		ctx.fillStyle = '#FFF';
		ctx.fillText("Temps restant : " + temps + ".", 750, 40);
		ctx.restore();
		console.log('calcule du temps');
	}


	function writeNiveau() {
		ctx.save();
		ctx.font = "15px courier, sans-serif";
		ctx.fillStyle = '#FFF';
		ctx.fillText("Niveau : " + niveau + ".", 50, 40);
		ctx.restore();
		console.log('calcule du niveau');
	}

	function writeKillMonster() {
		ctx.save();
		ctx.font = "15px courier, sans-serif";
		ctx.fillStyle = '#FFF';
		ctx.fillText("Niveau : " + niveau + ".", 50, 40);
		ctx.restore();
		console.log('calcule du niveau');
	}

 
}

var interval = SetInterval(Affichage(), 30);