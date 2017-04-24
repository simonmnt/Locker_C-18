function Labyrinthe(_mazes, _lvl) {
	var iciLab = this;
    this.cases = [];
    var triCases;
    this.pixelWidth = 0;
    this.pixelHeight = 0;

    this.caseEntree = null;

	this.image = new Image();
	if(true)
	{
		var matrice = _mazes["Niveau " + _lvl].matrice;

		this.pixelHeight = matrice.length * 32;
		this.pixelWidth = matrice[0].length * 32;
		for (var k =0; k<matrice.length;k++)
		{
			for (var i = 0; i < matrice[k].length; i++)
			{
				var maCase = new Case(i, k, matrice[k][i]);
				iciLab.cases.push(maCase);
				if (maCase.type === 'i') {
				    this.caseEntree = maCase;
                }
			}
		}
	}
	
	this.genererCarte = function() {
        for (var k = 0; k < this.cases.length; k++) {
            iciLab.cases[k].draw()
        }
        var canvasImg = document.getElementById('canvas');
        var dataURL = canvasImg.toDataURL("image/png");

        canvas.width = iciLab.pixelWidth;
        canvas.height = iciLab.pixelHeight;
        canvas.style.marginTop = 0;
        canvas.style.marginLeft = 0;

        iciLab.image.src = dataURL;
        // return image;
    };
	
	this.afficherCarte = function()
	{
		ctx.drawImage(iciLab.image,0,0,960,640);
	};

	this.draw = function () {
	    "use strict";
	    this.cases.map(function (uneCase) {
	        uneCase.draw();
        });
    };

    this.getStartPosX = function () {
        var k = 0;
        while (k < this.cases.length) {
            if (this.cases[k].type == 'i') {
                return this.cases[k].x;
            }
            else {
                k++;
            }
        }
        return false;
    };

    this.getStartPosY = function () {
        var k = 0;
        while (k < this.cases.length) {
            if (this.cases[k].type == 'i') {
                return this.cases[k].y;
            }
            else {
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
        triCases = {};
        for (var k = 0; k < this.cases.length; k++) {
            if (this.cases[k].getType() == "_") {
                triCases[k] = this.cases[k]
            }
        }

            //Créer un tableau des clés de l'objet triCases
            var clefs = Object.keys(triCases);

            //Récupère le nombre de monstre

        //Permet de récupérer le nombre à mettre dans le niveau
        this.nbMonstre = _mazes["Niveau " + _lvl].nbMonstre;

        for (var i = 0; i < this.nbMonstre; i++) {
            var randKey = Math.floor(Math.random() * clefs.length);
            this.cases[clefs[randKey]].setType('m');
        }
    };

    this.popAllumettes = function () {
        triCases = {};

        //Permet de créer un tableau de cases par rapport à un type
        for (var k = 0; k < this.cases.length; k++) {
            if (this.cases[k].getType() == "_" || this.cases[k].getType() == " ") {
                triCases[k] = this.cases[k]
            }
        }

        //Créer un tableau des clés de l'objet triCases
        var clefs = Object.keys(triCases);

        //Récupère le nombre de monstre
        this.nbAllumettes = _mazes["Niveau " + _lvl].nbAllumettes;

        for (var i = 0; i < this.nbAllumettes; i++) {
            var randKey = Math.floor(Math.random() * clefs.length);
            this.cases[clefs[randKey]].setType('l');
        }
    };

    this.getCase = function(x, y)
    {
        var maze = iciLab.cases;
        return maze.filter(function(lacase){
            return lacase.x == x && lacase.y ==y;
        })[0];
    };

    this.getExitCase = function () {
        var maze = iciLab.cases;
        return maze.filter(function (lacase) {
            return lacase.type === 's';
        })[0];
    }
}
