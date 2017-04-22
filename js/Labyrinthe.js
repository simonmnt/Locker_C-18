function Labyrinthe(_mazes, _lvl) {
	var iciLab = this;
    this.cases = [];
	if(_lvl<Object.keys(_mazes).length)
	{
		var matrice = _mazes["Niveau "+_lvl].matrice;
		for (var k =0; k<matrice.length;k++)
		{
			for (var i = 0; i<matrice[k].length;i++)
			{
				var maCase = new Case(k,i,matrice[k][i]);
				iciLab.cases.push(maCase);
			}
		}
	};
	
	this.afficheCarte()
	{
		for(var k=0; k<this.cases.length;k++)
		{
			cases[k].draw()
		}
	}
	
}