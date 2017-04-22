function Labyrinthe(_mazes, _lvl) {
	var iciLab = this;
    this.cases = [];

	if(true)
	{
		var matrice = _mazes["Niveau " + _lvl].matrice;
		for (var k =0; k<matrice.length;k++)
		{
			for (var i = 0; i < matrice[k].length; i++)
			{
				var maCase = new Case(i, k, matrice[k][i]);
				iciLab.cases.push(maCase);
			}
		}
	}
	
	this.afficheCarte = function()
	{
		for(var k=0; k < this.cases.length; k++)
		{
			console.log('test');
			iciLab.cases[k].draw()
		}
	};

	this.popMonster = function () {
        var triCases = [];

        this.img = new Image();
        this.img.src = 'img/epingle.png';
        this.img.onload = function(){
            loading = true;
        };

        for(var k = 0; k < this.cases.length; k++){
            if (this.cases[k].getType() == "_"){
                triCases.push(this.cases[k]);
            }
        }

        this.nbMonstre = _mazes["Niveau " + _lvl].nbMonstre;

        for (var i = 0; i < this.nbMonstre; i++){
            var random = Math.floor(Math.random() * triCases.length);
            var randomX = triCases[random].x * 32;
            var randomY = triCases[random].y * 32;

            ctx.drawImage(this.img, randomX, randomY);
        }
        
        console.log("triCases > ", triCases);
        console.log("nbMonstre > ", this.nbMonstre);
        console.log("Type > ", this.cases[0].getType());
    }
}