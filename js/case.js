function Case(_x,_y,_imgx,_imgy,_type)
{
	this.x = _x;//number
	this.y = _y;//number
	this.img = {x=_imgx; y=_imgy;}
	this.type = _type; //MUR:'W',CHEMIN:' ',ALLUMETTE:'L',ENTREE:'I',SORTIE:'S',SOL:'_',MONSTRE:'M'
	this.libre;
	//------------
	this.draw = function()
	{
		ctx.drawImage(tileset,this.img.x*32, this.img.y*32, 32,32,this.x*32, this.y*32,32,32);
	}
}

