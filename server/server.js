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
app.get('/getAllProduct', (req, res) => {
    let sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

app.get('/getAllUser', (req, res) => {
    let sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

app.post('/addProduct', (req, res) => {
    let sql = 'INSERT INTO product (name, description, price) VALUES (?, ?, ?)';
    db.query(sql, [req.body.name, req.body.description, req.body.price], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

app.delete('/deleteProduct/:id', (req, res) => {
    let sql = 'DELETE FROM product WHERE productID = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });

});

app.listen(8000,()=>{
    console.log("Connect to backend port 8000.")
})

//run app with nodemon use: npm run dev