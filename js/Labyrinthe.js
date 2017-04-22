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
	}
}