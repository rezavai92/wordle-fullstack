const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

if(process.env.NODE_ENV==="production"){


    app.use(express.static('client/build'));

    app.get("*",(req,res)=>{

        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    } )
}


app.listen(()=>{

	console.log("app is listening on port",port)
})