const express=require('express');
const app=express();

const mongoose=require('mongoose');

const cors=require('cors');
app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173',
}))
app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})
// app.use(express)

const connectdb=async ()=>{
    try{
        const dbconn=await mongoose.connect("mongodb+srv://apidbpractice:apidbpractice@cluster0.tlhi6ze.mongodb.net/dbapi?retryWrites=true&w=majority");
        console.log('mongodb connected')
    }
    catch(err){
        console.log(`err in connecting mongodb ${err}`)
    }
}

connectdb();


//rewuiring model

const model=require('./model1.js')

app.post('/adddata',async(req,res)=>{
    const {studname,rollno,marks}=req.body;
    try{
        const row=await new model({studname,rollno,marks});
        await row.save();
        const all=await model.find();
        return res.json(all)
    }
    catch(err){
        console.log(err)
    }
})

app.get('/getalldata',async(req,res)=>{
    const data=await model.find();
    return res.json(data)
})

app.get('/getbyid/:id',async(req,res)=>{
    const data=await model.findById(req.params.id);
    return res.json(data)
})

app.delete('/deletebyid/:id',async(req,res)=>{
    const data=await model.findByIdAndDelete(req.params.id);
    return res.json(data)
})

app.patch('/update/:id',async(req,res)=>{
    const data=await model.findByIdAndUpdate(req.params.id,req.body);
    return res.json(data)
})

app.get('/',(req,res)=>{
    res.send('hello app')
})

app.listen(3001,()=>{
    console.log('server started')
})