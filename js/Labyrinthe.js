function Labyrinthe(_mazes, _lvl) {
	var iciLab = this;
    var triCases = [];
    this.cases = [];

	this.image = new Image();
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
	
	this.genererCarte = function() {
        for (var k = 0; k < this.cases.length; k++) {
            iciLab.cases[k].draw()
        }
        var canvasImg = document.getElementById('canvas');
        var dataURL = canvasImg.toDataURL("image/png");
        iciLab.image.src = dataURL;
        return image;
    };
	
	this.afficherCarte = function()
	{
		ctx.drawImage(iciLab.image,0,0,960,640);
	};

	this.getStartPosX = function ()
	{
		var k = 0;
		while(k < cases.length)
		{
			if(cases[k].type == 'i')
			{
				return cases[k].x;
			}
			else
			{
				k++;
			}
		}
		return false;
	};
	
	this.getStartPosY = function ()
	{
		var k = 0;
		while(k<cases.length)
		{
			if(cases[k].type == 'i')
			{
				return cases[k].y;
			}
			else
			{
				k++;
			}
		}
		return false;
	};
    /**
     * this.afficheCarte = function()
     {
         for(var k=0; k < this.cases.length; k++)
         {
             console.log('test');
             iciLab.cases[k].draw()
     };
     */

    /**
     * Permet de faire appaître les monstres sur le labyrinthe de façon aléatoire et sur des types de cases données
     */
	this.popMonster = function () {
        this.img = new Image();
        this.img.src = 'img/epingle.png';
        this.img.onload = function(){
            loading = true;
        };

        //Permet de créer un tableau de cases par rapport à un type
        for(var k = 0; k < this.cases.length; k++){
            if (this.cases[k].getType() == "_"){
                triCases.push(this.cases[k]);
            }
        }

        //Permet de récupérer le nombre à mettre dans le niveau
        this.nbMonstre = _mazes["Niveau " + _lvl].nbMonstre;

        //Permet de faire apparaître de façon alétoire les monstres sur le labyrinthe
        for (var i = 0; i < this.nbMonstre; i++){
            var random = Math.floor(Math.random() * triCases.length);
            var randomX = triCases[random].x * 32;
            var randomY = triCases[random].y * 32;

            ctx.drawImage(this.img, randomX, randomY);
        }
        
        console.log("triCases > ", triCases);
        console.log("nbMonstre > ", this.nbMonstre);
        console.log("Type > ", this.cases[0].getType());
    };

    this.popAllumettes = function () {
        if (triCases.length){
            console.log("Je suis Undifined")
        }
    }
}
