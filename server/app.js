const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express(); 

//middleware
app.use(bodyparser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts',posts);

// for production
if(process.env.NODE_ENV=='production'){
    //satatic folder
    app.use(express.static(__dirname,'/public'));

    //handle single page application
    app.get(/.*/ , (req,res) => res.sendFile(__dirname,'/public/index.html'));// will refer to any route but should be important to use it below app.use('/api/posts',posts);
}
const port = process.env.PORT || 3000; 

app.listen(port, () => console.log('(Vue)Server started at port: '+port));
