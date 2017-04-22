var images = 
{
	'W':[x,y];
	' ':[x,y];
	'L':[x,y];
	'I':[x,y];
	'S':[x,y];
	'_':[x,y];
	'M':[x,y];
};

function Case(_x,_y,_type)
{
	var iciCase = this;
	this.x = _x;//number
	this.y = _y;//number
	this.img = {x = images[_type][0]; y = images[_type][1];} //Generés par la valeur de type
	this.type = _type; //MUR:'W',CHEMIN:' ',ALLUMETTE:'L',ENTREE:'I',SORTIE:'S',SOL:'_',MONSTRE:'M'
	//this.libre = (_type == '_')?true:false;
	//------------
	this.draw = function()
	{
		ctx.drawImage(tileset,this.img.x, this.img.y, 32,32,this.x*32, this.y*32,32,32);
	}
	
	this.setType(_type)
	{
		iciCase.type = _type;
		iciCase.img.x = images[_type][0];
		iciCase.img.y = images[_type][1];
	}
}

/**
 tileset correspond à l'ensemble des images du jeu réunies dans une seule image.
 */