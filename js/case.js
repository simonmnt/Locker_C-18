
function Case(_x,_y,_type)
{
	var iciCase = this;
	this.x = _x;//number
	this.y = _y;//number
	this.img = {x = /*Tileset*/.coordX(_type); y = /*Tileset*/.coordY(_type);} //Generés par la valeur de type
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
		iciCase.img.x = /*Tileset*/.coordX(_type);;
		iciCase.img.y = /*Tileset*/.coordY(_type);;
	}
}

/**
 tileset correspond à l'ensemble des images du jeu réunies dans une seule image.
 */