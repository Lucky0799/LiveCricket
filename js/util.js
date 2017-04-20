 var util = new Object();

util.setBusyCursor = function _setBusyCursor()
{
	$('#loadingDiv').css('display','block');
};

util.clearBusyCursor = function _clearBusyCursor()
{
	$('#loadingDiv').css('display','none');
};