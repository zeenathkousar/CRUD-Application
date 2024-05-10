const express=require('express');
const  app=express();

const mongoose=require('mongoose')

const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());



const connectDB = async () =>{
    try{
        const conn=await mongoose.connect("mongodb+srv://apidbpractice:apidbpractice@cluster0.tlhi6ze.mongodb.net/dbapi?retryWrites=true&w=majority");
        console.log(`MongoDB Connected `);
    } catch(error){
        console.log(error);
    }
}
connectDB();


//requiring model
const stumodel=require('./model.js')


app.post('/addstud',async(req,res)=>{
    const studentname=req.body.StudentName;
    const rollno=req.body.Rollno;
    const marks=req.body.Marks;

    console.log(`details : ${req.body.Rollno}`)
    try{
        const newstud=await new stumodel({StudentName:studentname,
            Rollno:rollno,
            Marks:marks
        });
        await newstud.save();
        const all=await stumodel.find();
        return res.json(all)
    }
    catch(err){
        console.log('err in adding stud data',err)
    }
})

app.get('/getallStud',async(req,res)=>{
    try{
        const allData=await stumodel.find();
        return res.json(allData);
    }
    catch(err){
        console.log(err.message);
    }
})

app.get('/getallStudbyid/:id',async(req,res)=>{
    try{
        const Data=await stumodel.findById(req.params.id);
        return res.json(Data);
    }
    catch(err){
        console.log(err.message);
    } 
})
app.delete('/deletestud/:id', async(req,res)=>{
    try{
        await stumodel.findByIdAndDelete(req.params.id);
        return res.json(await stumodel.find())
    }
    catch(err){
        console.log(err);
    } 
})

//update
app.patch('/update/:id',async(req,res)=>{
    try{
        const updatedone=await stumodel.findByIdAndUpdate(req.params.id,req.body);
        return res.json(await stumodel.find())
    }
    catch(err){
        console.log(err)
    }
})


app.get('/',(req,res)=>{
    res.send('hello app at ')
})
app.listen(3000,()=>{
    console.log('server started')

})