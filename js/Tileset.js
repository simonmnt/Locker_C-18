/** La classe qui gere les tilesets
 * @param _src    source de l'image tileset
 * @class
 * @constructor
 */
function Tileset(_src)
{
	//Liste des coordonnéesX des tiles sur le tileset
	var listCoordX =
	{
		'w':0,
		' ':32,
		'l':64,
		'i':96,
		's':128,
		'_':160,
<<<<<<< HEAD
		'm':192,
		'feuille':224,
		'panneau':256,
		'coffre':288,
		'cle':320,
		'gemme':352,
		'pompeabite':384
	}
=======
		'm':192
	};
>>>>>>> origin/master
	
	//Liste des coordonnéesX des tiles sur le tileset
	var listCoordY =
	{
		'w':0,
		' ':0,
		'l':0,
		'i':0,
		's':0,
		'_':0,
<<<<<<< HEAD
		'm':0,
		'feuille':0,
		'panneau':0,
		'coffre':0,
		'cle':0,
		'gemme':0,
		'pompeabite':0
	}
=======
		'm':0
	};
>>>>>>> origin/master
	
	this.img = new Image();
	this.img.src = _src;
	this.img.onload = function(){loading=true;};
	
	/**
	  * retourne la coordonnee en X de la tuile
	  * @param _type   type de la case.
	  */
	this.coordX = function(_type)
	{
		return listCoordX[_type];
	};
	
	/**
	  * retourne la coordonnee en Y de la tuile
	  * @param _type   type de la case.
	  */
	this.coordY = function(_type)
	{
		return listCoordY[_type];
	};
}