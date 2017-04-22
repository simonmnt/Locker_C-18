function Tileset(_src)
{
	
	var listCoordX =
	{
		'W':x;
		' ':x;
		'L':x;
		'I':x;
		'S':x;
		'_':x;
		'M':x;
	}
	
	var listCoordY =
	{
		'W':y;
		' ':y;
		'L':y;
		'I':y;
		'S':y;
		'_':y;
		'M':y;
	}
	
	this.img = new Image();
	this.img.src = _src;
	this.img.onload = function(){loading++;};
	
	this.coordX = function(_type)
	{
		return listCoordX[_type];
	}
	
	this.coordY = function(_type)
	{
		return listCoordY[_type];
	}
}