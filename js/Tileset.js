function Tileset(_src)
{
	
	var listCoordX =
	{
		'w':0,
		' ':32,
		'l':64,
		'i':96,
		's':128,
		'_':160,
		'm':192
	};
	
	var listCoordY =
	{
		'w':0,
		' ':0,
		'l':0,
		'i':0,
		's':0,
		'_':0,
		'm':0
	};
	
	this.img = new Image();
	this.img.src = _src;
	this.img.onload = function(){loading=true;};
	
	this.coordX = function(_type)
	{
		return listCoordX[_type];
	};
	
	this.coordY = function(_type)
	{
		return listCoordY[_type];
	};
}