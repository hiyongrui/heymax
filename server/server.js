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


// API below
app.get('/getAllUser', (req, res) => {
    let sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// get all product
app.get('/getAllProduct', (req, res) => {
    let sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// get one product
app.get('/getProduct/:id', (req, res) => {
    let sql = 'SELECT * FROM product WHERE productID = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// adding one product
app.post('/addProduct', (req, res) => {
    let sql = 'INSERT INTO product (name, description, price, quantity) VALUES (?, ?, ?, ?)';
    db.query(sql, [req.body.name, req.body.description, req.body.price, req.body.quantity], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// deleting one product
app.delete('/deleteProduct/:id', (req, res) => {
    let sql = 'DELETE FROM product WHERE productID = ?';
    db.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// updating one product
app.put('/updateProduct/:id', (req, res) => {
    let sql = 'UPDATE product SET name = ?, description = ?, price = ?, quantity = ? WHERE productID = ?';
    db.query(sql, [req.body.name, req.body.description, req.body.price, req.body.quantity, req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

// checkout products from cart
app.post('/checkout', (req, res) => {
    let sql = 'INSERT INTO orderTable (totalPrice, address, userID) VALUES (?, ?, ?)';
    // due to lack of time... suppose to think of how to checkout to different table of individual products+quantity
    db.query(sql, [req.body.totalPrice, req.body.address, req.body.id], (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });
});

app.listen(8000,()=>{
    console.log("Connect to backend port 8000.")
})

//run app with nodemon use: npm run dev