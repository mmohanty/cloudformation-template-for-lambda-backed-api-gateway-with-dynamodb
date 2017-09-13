//lambda-local -l fetch_dynamo.js -h handler -r ap-southeast-1 -p default -e sample.js
//https://www.npmjs.com/package/lambda-local
var AWS = require('aws-sdk');
var DOC = require('dynamodb-doc');
var crypto = require('crypto');
var docClient = new AWS.DynamoDB.DocumentClient();

var encryption_key = "Ahch,eejaiPhoh3.Air3naiNgoh;4yooZushei-9okee4iox#a$h2Dee";

exports.handler = function(event, context) {
    console.log("inside getCardTransactions...");
    var cipher = crypto.createCipher('aes-128-ecb', encryption_key);
    var encrypted = cipher.update(event.cardNumber.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');

  var params = {
    TableName: "CardTransaction",
    IndexName: 'cardNumber-transactionDate-index',
    KeyConditionExpression: "#cardnum = :cardnumber and #yr between :start_date and :end_date",
    ExpressionAttributeNames: {
        "#yr": "transactionDate",
        "#cardnum": "cardNumber",
    },
    ExpressionAttributeValues: {
         ":start_date": event.startDate,
         ":end_date": event.endDate,
         ":cardnumber":encrypted
    }
  };

  var callback = function(err, data) {
    if (err) {
      console.log('error on getCreditCardTransationInfo: ', err);
      context.done('Unable to retrieve credit card transaction information', null);
    } else {
         if(data.Items) {
            var txList = [];
            data.Items.forEach(function(item) {
              if((typeof event.type === 'undefined') || item.transactionType === event.type){

                decipher = crypto.createDecipher('aes-128-ecb', encryption_key);
                console.log("****"+item.transactionDetl.transactionAmount);
                result = decipher.update(item.transactionDetl.transactionAmount, 'hex', 'utf8') + decipher.final('utf8');
                item.transactionDetl.transactionAmount=JSON.parse(result)

                decipher = crypto.createDecipher('aes-128-ecb', encryption_key);
                result = decipher.update(item.cardNumber.toString(), 'hex', 'utf8') + decipher.final('utf8');
                item.cardNumber=JSON.parse(result).toString();

                txList.push(item)
              }
            });
            data.Items.length = 0;
            data.Items = txList
            context.done(null, data.Items);
         }else{
            context.done(null, {});
         }
    }
  };
  console.log('going to fetch transation data');
  docClient.query(params, callback);
};
