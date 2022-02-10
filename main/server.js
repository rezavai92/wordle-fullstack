const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const schedule = require('node-schedule');
const port= process.env.PORT || 5000


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req, res) => {
  res.send('Hello World!')
})
 const words =["peril","skill","mount","count","sound","round"];
let i=0;
let wordOfTheDay =words[i];
 const job = schedule.scheduleJob('0 0 0 * * *', function(){
   
   i++;
      console.log('word of the day ',word[i]);
   });


app.get("/gtw",(req,res)=>{

    res.status(200).json({word: wordOfTheDay})
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


