var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const api_call = require('./api_call');
const db = require('./db');
 
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const port = 3000;
 
app.post('/get-result', async(req, res) => {
    var requestData=req.body;
    var stateprov_id=(requestData.stateprov_id !== undefined)?(requestData.stateprov_id).toUpperCase():''
    console.log(stateprov_id);
    var updatedAt = new Date().toISOString().slice(0, 10);
    var response= await db.getLotteryResult(stateprov_id,updatedAt);
    console.log(response);
    res.send(JSON.stringify(response));
});

app.get('/', async(req, res) => {
    var result=  await api_call.getLotteryData();
    var apiData=result.data;
    var updatedAt = new Date().toISOString().slice(0, 10);

    var respoinseData=[];
    for(let i of apiData){
         for(let game of i.results){

            game.updatedAt= updatedAt;
            respoinseData.push(game)
         }
    }
    await db.deleteResult(updatedAt);
    await db.insertResults(respoinseData);
    res.send(JSON.stringify(respoinseData));
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
