/*const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'drinkshop',
    port: 3306
});
db.connect(err=>{
    if(err){
        console.log(err, 'db error');
    }
    console.log('database connected...');
});
app.get('/drinkshop/:drink_id',(req,res)=>{
    let did = req.params.drink_id;
    let qr = 'select * from drinkshop where drink_id ='+did;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        if(result.length > 0){
            res.send({
                message:'get single data',
                data:result
            });
        }else{
            res.send({
                message:'data not found'
            });
        }
    });
    console.log(req.params.empid,'get drink_id=>');
})
// create data
app.post('/drinkshop',(req,res)=>{
    console.log(req.body,'createdata');

      let drink_id = req.params.drink_id;
    let drink_name = req.body.drink_name;
    let category = req.body.category;
    let price = req.body.price;
    let qr = "insert into drinkshop(drink_id,drink_name,category,price) values ('"+drink_id+"','"+drink_name+"','"+category+"','"+price+"')";
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message:'data inserted',
        });
    });
});
// update data
app.put('/drinkshop/:drink_id',(req,res)=>{
    console.log(req.body,'updatedata');
      let did = req.params.drink_id;
    let name = req.body.name;
    let category = req.body.category;
    let price = req.body.price;
    let qr ="update employee set name= '"+name+"', category='"+category+"', price='"+price+"', where drink_id = "+did;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:'data updated'
        });
    });
})

// delete single data
app.delete('/drinkshop/:drink_id',(req,res)=>{
    let did = req.params.drink_id;
    let qr ='delete from drinkshop where drink_id = '+did;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:'data deleted'
        });
    });
});

app.listen(3000, ()=>{
    console.log('Server Running..');
});*/
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'drinkshop',
    port: 3306
});

// check database connection
db.connect(err => {
    if (err) {
        console.log(err, 'db error');
    }
    console.log('database connected...');
});


// ======================================
// 1) GET ALL DATA
// ======================================
app.get('/drinkshop', (req, res) => {
    let qr = 'SELECT * FROM drink_id';

    db.query(qr, (err, result) => {
        if (err) return res.send({ error: err });

        res.send({
            message: 'all drink data',
            data: result
        });
    });
});


// ======================================
// 2) GET SINGLE DATA
// ======================================
app.get('/drinkshop/:drink_id', (req, res) => {
    let dID = req.params.drink_id;
    let qr = `SELECT * FROM drink_id WHERE drink_id = ${dID}`;

    db.query(qr, (err, result) => {
        if (err) return res.send({ error: err });

        if (result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    });
});


// ======================================
// 3) CREATE DATA
// ======================================
app.post('/drinkshop', (req, res) => {

    let drink_id = req.body.drink_id;
    let drink_name = req.body.drink_name;
    let category = req.body.category;
    let price = req.body.price;

    let qr = `
        INSERT INTO drink_id (drink_id, drink_name, category, price) 
        VALUES ('${drink_id}', '${drink_name}', '${category}', '${price}')
    `;

    db.query(qr, (err, result) => {
        if (err) return res.send({ error: err });

        res.send({
            message: 'data inserted'
        });
    });
});


// ======================================
// 4) UPDATE DATA
// ======================================
app.put('/drinkshop/:drink_id', (req, res) => {

    let drink_id = req.params.drink_id;

    let drink_name = req.body.drink_name;
    let category = req.body.category;
    let price = req.body.price;

    let qr = `
        UPDATE drink_id 
        SET drink_name='${drink_name}', category='${category}', price='${price}'
        WHERE drink_id = ${drink_id}
    `;

    db.query(qr, (err, result) => {
        if (err) return res.send({ error: err });

        res.send({
            message: 'data updated'
        });
    });
});


// ======================================
// 5) DELETE DATA
// ======================================
app.delete('/drinkshop/:drink_id', (req, res) => {
    let drink_id = req.params.drink_id;

    let qr = `DELETE FROM drink_id WHERE drink_id = ${drink_id}`;

    db.query(qr, (err, result) => {
        if (err) return res.send({ error: err });

        res.se
    })
});

app.listen(3000, () => {
    console.log('Server Running...');
});