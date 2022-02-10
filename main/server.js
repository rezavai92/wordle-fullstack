const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const schedule = require('node-schedule');
const port= process.env.PORT || 5000
const fs =require('fs')
const path = require('path')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

const read = fs.readFileSync(path.join(__dirname,"assets","wordFile.txt"), {encoding:'utf8', flag:'r'});
const wordList = read.split('\r\n');
console.log("wordList",wordList[0])
app.get('/', (req, res) => {
  res.send('Hello World!')
})

let i=0;
let wordOfTheDay =wordList[i];
 const job = schedule.scheduleJob('0 0 0 * * *', function(){
   
  wordList.shift();
  console.log("scheduled")
   });


app.get("/gtw",(req,res)=>{

    res.status(200).json({word: wordList[0]})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})



if(process.env.NODE_ENV==="production"){


    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{

        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    } )
}


