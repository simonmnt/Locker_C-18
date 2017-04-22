
function Case(_x,_y,_type)
{
	var iciCase = this;
	this.x = _x;//number
	this.y = _y;//number
	this.img = {'x' : tileset.coordX(_type), 'y' : tileset.coordY(_type)} ;//Generés par la valeur de type
	this.type = _type; //MUR:'W',CHEMIN:' ',ALLUMETTE:'L',ENTREE:'I',SORTIE:'S',SOL:'_',MONSTRE:'M'
	//this.libre = (_type == '_')?true:false;
	//------------
	this.draw = function()
	{
		console.log("tileset.img "+this.img.x+" "+this.img.y+" "+32+32+this.x*32+this.y*32+32+32);
		ctx.drawImage(tileset.img, this.img.x, this.img.y, 32, 32,this.x*8, this.y*8, 8, 8);
	};
	
	this.setType = function(_type)
	{
		iciCase.type = _type;
		iciCase.img.x = tileset.coordX(_type);
		iciCase.img.y = tileset.coordY(_type);
	}
}

/**
 tileset correspond à l'ensemble des images du jeu réunies dans une seule image.
 */