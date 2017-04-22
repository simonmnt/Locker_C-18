function AffichageText() {

	function writeTemps(){
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
		ctx.fillText("Niveau : " + niveau + " sur 5.", 50, 40);
		ctx.restore();
		console.log('calcule du niveau');
	}
}

//var interval = SetInterval(Affichage(), 30);