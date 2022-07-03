const url = 'mongodb://lotteryresults-expert-work-8073:GCG5iZpzt8lk27SObtMmKohoJAzQX9@db-lotteryresults-expert-work-8073.nodechef.com:5362/lotteryresults-expert-work';
var MongoClient = require('mongodb').MongoClient;
const database='lotteryresults-expert-work';
const resultsCollection='results';
module.exports = {
    
    
    
   
    getLotteryResult: async (stateprov_id,updatedAt) => {
                    let result={};
                    let client = await MongoClient.connect(url,{ useNewUrlParser: true });
                    try {
                        var dbo = client.db(database);
                        query= {stateprov_id:stateprov_id, updatedAt:updatedAt}
                        result= await dbo.collection(resultsCollection).find(query).toArray();
                        console .log(result)
                    }
                    finally {
                        client.close();
                        return result;  
                    }   
      },

    insertResults: async(respoinseData) => await MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        var myobj = respoinseData;
        dbo.collection(resultsCollection).insertMany(myobj, function(err, res) {
          if (err) throw err;
          console.log(res);
          db.close();
        });
      }),
      deleteResult:async(updatedAt) => await MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(database);
        var myquery = { updatedAt: updatedAt };
        dbo.collection(resultsCollection).deleteMany(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          db.close();
        });
      })





}

 