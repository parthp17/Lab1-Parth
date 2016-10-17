"use strict"
var ejs = require("ejs");
function add(req,res)
{
	var operand1 = req.param("operand1");
	var operand2 = req.param("operand2");
	
	if(isNaN(operand1) || isNaN(operand2))
	{
		res.send({"result":"Invalid Input"});
	}
	else
	{
		var result;
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		result = operand1 + operand2;
		res.send({"result":result});
	}
}
function sub(req,res)
{
	var operand1 = req.param("operand1");
	var operand2 = req.param("operand2");
	
	if(isNaN(operand1) || isNaN(operand2))
	{
		res.send({"result":"Invalid Input"});
		
	}
	else
	{
		var result;
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		result = operand1 - operand2;
		res.send({"result":result});
	}
		
		
}
function mul(req,res)
{
	var operand1 = req.param("operand1");
	var operand2 = req.param("operand2");
	
	if(isNaN(operand1) || isNaN(operand2))
	{
		res.send({"result":"Invalid Input"});
	}
	else
	{
		var result;
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		result = operand1 * operand2;
		res.send({"result":result});
	}
}
function div(req,res)
{
	var operand1 = req.param("operand1");
	var operand2 = req.param("operand2");
	
	if(isNaN(operand1) || isNaN(operand2))
	{
		res.send({"result":"Invalid Input"});
	}
	else
	{
		var result;
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		if (operand2 != 0)
		{
			result = operand1 / operand2;
		}
		else
		{
			result = "Cannot divide by Zero";
		}
		res.send(
		{
			"result" : result
		});
	}

}




function display(req,res)
{

	ejs.renderFile('./views/Calculator.ejs',{"title":"Calculator"},function(err,result){
		if(!err){
			res.end(result);
		}else
		{
				res.end("An error occured");
		}
	});
}

exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.div = div;
exports.display = display;