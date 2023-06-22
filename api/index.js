const connectToMongo= require('./db')
const express= require('express');
const cors= require('cors');
connectToMongo();
const app= express()
const User= require('./models/User')

const PORT=4000;

app.use(cors());
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads' ))
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/auth'));
app.use('/api/allposts', require('./routes/feed'));
app.use('/edit', require('./routes/feed'));
app.use('/remove', require('./routes/feed'));
app.use('/api/feed', require('./routes/feed'));
app.use('/posts', require('./routes/feed'));
app.get('/', (req,res)=>{
    res.json("Hello World")
})





app.listen(PORT, ()=>{
    console.log(`Lumos Backend is running at port ${PORT}`);
});