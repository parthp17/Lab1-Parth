"use strict"
var ejs = require("ejs");
var mysql = require('./mysql');
var logging = require('./logging');

function getBoughtTransactions(req,res)
{
	if(req.session.username)
	{
		var getBoughtItems = "select * from transaction,orders where buyer = '"+req.session.username+"' and transaction.transactionId= orders.transactionId";
		var purchased = [];
		mysql.getData(function(error, response) {
			if(error)
			{
				throw error;
			}
			else
			{var i = 0;
				logging.logger.log('info', req.session.username + "  | getting bought items | "  + new Date().toString());
				for (i; i < response.length; i++) {
					var json = {
						"transactionId" : response[i].transactionId,
						"transactionDate" : new Date(response[i].transactionDate).toLocaleString(),
						"total" : response[i].total,
						"buyer" : response[i].buyer,
						"seller" : response[i].seller,
						"itemId" : response[i].itemId,
						"orderedquantity" : response[i].orderedquantity
					};
					purchased.push(json);
				}
				res.send(purchased);
			}
		},getBoughtItems);
		
		
	}
	else
	{
		res.redirect('/');
	}
}
function getSoldTransactions(req, res) {
	if (req.session.username) {
		var getSoldItems = "select * from orders where seller = '"+req.session.username+"'";
		var sold = [];
		mysql.getData(function(error, response) {
			if (error) {
				throw error;
			} else {
				var i =0;
				logging.logger.log('info', req.session.username	+ "  | getting bought items | "	+ new Date().toString());
				for (i; i < response.length; i++) {
					var json = {
						"transactionId" : response[i].transactionId,
						"seller" : response[i].seller,
						"itemId" : response[i].itemId,
						"orderedquantity" : response[i].orderedquantity
					};
					sold.push(json);
				}
				res.send(sold);
			}
		}, getSoldItems);
	} else {
		res.redirect('/');
	}
}

exports.getSoldTransactions = getSoldTransactions;
exports.getBoughtTransactions = getBoughtTransactions;