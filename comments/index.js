const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors')
const axios = require('axios')

const app = express();

app.use(cors())
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {

    console.log('====================================');
    console.log(req.params.id);
    console.log('====================================');

    console.log('====================================');
    console.log(commentsByPostId);
    console.log('====================================');

    res.send(commentsByPostId[req.params.id] || []);

    

})


app.post('/posts/:id/comments',async (req, res) => {

    const comentId = randomBytes(4).toString('hex');

    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];



    comments.push({id: comentId, content});

    commentsByPostId[req.params.id] = comments;


    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: comentId,
            content,
            postId: req.params.id
        }
    })


    res.status(201).send(comments)


})

app.post('/events', (req,res)=>{
    console.log('Received Event',req.body.type)

    res.send({})
})


app.listen(4001, () => {
    console.log('====================================');
    console.log("listening on 4001");
    console.log('====================================');
})