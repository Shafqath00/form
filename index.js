import pg from "pg";
import express from "express"
import bodyParser from "body-parser"
import path from "path";
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
let name,number,city,email,text,date;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const db = new pg.Client({
    // user:'postgres',
    // host:'database-2.c5eios8ae6ab.us-east-1.rds.amazonaws.com',
    // database:"testdb",
    // password:"postgres123",
    // port:5432,
    // ssl: true,
    connectionString:process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized:false
    },
});


app.get("/", async (req,res)=>{
    await res.sendFile(__dirname+"/public/index.html");
})

app.post("/submit", async (req,res)=>{
    name=req.body.name;
    number=req.body.number;
    city=req.body.city;
    email=req.body.mail;
    text=req.body.texts;
    date= new Date;
    console.log(name,number,city,email,text,date.g);
    await db.connect((err)=>{
        if (err) {
            console.error("DataBase is connect to failed!!!",err.stack);
        }else{
            console.log("DataBase is connected successfully...");
        }
    });
    // http://localhost:3000/
        db.query("INSERT INTO infos (name,email,city,text,number) VALUES ($1,$2,$3,$4,$5)",[name,email,city,text,number]);
        console.log("Data insert successfully");
        
    // } catch (error) {
    //     console.error("error",error);
    // }
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})

// db.query("",(err,res)=>{
//     if (err) {
//         console.error("QUERY IS NOT EXECUTE !!!", err.stack);
//     } else {
//         console.log(res);
//     }
// })
