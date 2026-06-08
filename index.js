import express from 'express'

const app = express()
const port = 4000 

app.get('/show', (req,res) => {
    res.send("You are using the jenkins ci and cd")
});

app.listen(port , (req,res)=>{
    console.log(`app is listening on the port ${port} `)
});

