// npm init -y
// npm i express, mysql, ..
// npm i --save-dev nodemon
// Scripts : "start" : "nodemon app.js"


const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.json())
//app.use(express.json);
//app.use(express.urlencoded({extended:true}));
const db = require("./db");

app.get("/get", (req, res) =>{
    
    db.query("SELECT * FROM urheilijat", function (error, results, fields) {
        console.log(results)
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

app.post("/post", (req, res) =>{
    const arr = req.body.itemInput;
    console.log(arr);

    db.query('INSERT INTO urheilijat SET ?', [{enimi : arr.enimi, snimi : arr.snimi, laji : arr.laji, syntymaika : arr.syntymaika}], (err, results, fields) => {});
    
});

app.put("/put", (req, res) => {
    const arr = req.body.itemInput;
    console.log(arr);
    
    db.query('UPDATE urheilijat SET enimi = ?, snimi = ?, laji = ?, syntymaika = ? Where ID = ?',[ arr.enimi, arr.snimi, arr.laji, arr.syntymaika, arr.id],(err, result) => {
        if (err) throw err;
        console.log(`Changed ${result.changedRows} row(s)`);
        ress = "päivitetty: " + result.changedRows;
        return res.send({res1 : ress});
        });

  });

app.delete("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    db.query('DELETE FROM urheilijat WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        console.log(`Deleted ${result.affectedRows} row(s)`);
        ress = "poistettu: " + result.affectedRows + ", id: " + id;
        return res.send({res1 : ress});
        }
        );
        
});

app.listen(3000, () => console.log("kunnellaan 3000"));