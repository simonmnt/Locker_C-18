/**
 * La classe qui gere les cases
 * @param _x    position horizontale de la case dans la matrice
 * @param _y    position verticale de la case dans la matrice
 * @param _type type de la case
 * @class
 * @constructor
 */
function Case(_x,_y,_type)
{
	var iciCase = this;
	
	//position de la case dans la matrice
	this.x = _x;
	this.y = _y;
	
	//position de la frame dans le tileset
	this.img = {'x' : tileset.coordX(_type), 'y' : tileset.coordY(_type)} ;
	//type de la case
	this.type = _type;
	
	 /**
     * Affiche la frame correspondante au type dans le canvas.
     */
	this.draw = function()
	{
		console.log("tileset.img "+this.img.x+" "+this.img.y+" "+32+32+this.x*32+this.y*32+32+32);
		ctx.drawImage(tileset.img,this.img.x, this.img.y, 32,32,this.x*8, this.y*8,8,8);
	}
	
	 /**
	  * Change le type de la case, ainsi que les coordonnées de la frame correspondante
	  * @param _type   nouveau type de la case.
	  */
	this.setType = function(_type)
	{
		iciCase.type = _type;
		iciCase.img.x = tileset.coordX(_type);;
		iciCase.img.y = tileset.coordY(_type);;
	}
}