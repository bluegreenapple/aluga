String.prototype.addZero = function(){
	var out = this;

	var i = out.indexOf('.'); // point is not present
	if (i === -1) {
		return out + '.00';
	}
	else
	{
		var l = this.length;

		if (i == l-1) //point is last character eg: 232.
		{
			return out + '00';
		}
		else if (i == l-2) // point is just before last character eg: 232.1
		{
			return out + '0';
		}
	}
	
    return out;
}