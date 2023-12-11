import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();

// Create connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'heymaxDB'
});

// to send from html body
app.use(express.json())
app.use(cors())


// API
app.get('/product', (req, res) => {
    let sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});


app.listen(8000,()=>{
    console.log("Connect to backend port 8000.")
})

//run app with nodemon use: npm run dev