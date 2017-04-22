function Labyrinthe(_mazes, _lvl) {
	var iciLab = this;
    this.cases = [];
	this.image = new Image();
	if(true)
	{
		var matrice = _mazes["Niveau "+_lvl].matrice;
		for (var k =0; k<matrice.length;k++)
		{
			for (var i = 0; i<matrice[k].length;i++)
			{
				var maCase = new Case(i,k,matrice[k][i]);
				iciLab.cases.push(maCase);
			}
		}
	};
	
	this.genererCarte = function()
	{
		for(var k=0; k<this.cases.length;k++)
		{
			iciLab.cases[k].draw()
		}
		var canvasImg = document.getElementById('canvas');
		var dataURL = canvasImg.toDataURL("image/png");
		iciLab.image.src = dataURL;
		return image;	
	}
	
	this.afficherCarte = function()
	{
		ctx.drawImage(iciLab.image,0,0,960,640);
	}
	
}