const express=require('express');
const cors=require('cors');
const app=express();
const mysql=require('mysql2');
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'todo',
})
db.connect((err)=>{
    if(err){
        console.log("error connecting to the database");
        return;
    }
    console.log("connected with database");
})
let port=3000;

app.get('/', (req, res) => {
    db.query('SELECT * FROM todoItems', (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).send("Database error");
        }

        console.log("Fetched Records:", results); // ✅ This prints to the terminal
        res.json(results); // ✅ Send data to the frontend
    });
});

app.post('/add-item',(req,res)=>{
    console.log(req.body);
        // res.send("item added successfully"); 
 //i am creating this route for getting an output from frontend page and displays the output                   //in this route
    db.query(`insert into todoItems(itemDescription) values('${req.body.inputVal}')`,(err,results)=>{
            if(err){
        console.log("error occurred",err);
        return;
           } 
    console.log("created successfully");

    })
    res.send("added successfully");
});

app.listen(port,(req,res)=>{
    console.log(`server running on port no${port}`);
})