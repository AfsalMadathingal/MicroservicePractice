const express = require('express')
const app = express();
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser');
const cors = require('cors')
const posts ={

}

app.use(cors())

app.use(bodyParser.json())

app.get('/posts',(req,res)=>{

    res.send(posts)

})

app.post('/posts',(req,res)=>{

const id = randomBytes(4).toString('hex')

const {title} = req.body;

posts[id]={
    id,title
}

res.status(201).send(posts[id])

})


app.listen(4000,()=>{

    console.log('====================================');
    console.log("listening on 4000");
    console.log('====================================');
})