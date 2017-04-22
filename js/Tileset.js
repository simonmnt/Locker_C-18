function Tileset(_src)
{
	
	var listCoordX =
	{
		'W':0;
		' ':32;
		'L':64;
		'I':96;
		'S':128;
		'_':160;
		'M':192;
	}
	
	var listCoordY =
	{
		'W':0;
		' ':0;
		'L':0;
		'I':0;
		'S':0;
		'_':0;
		'M':0;
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