const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host: 'localhost',
    password: 'password',
    database: 'taskManagement',
});

app.post('/create', (req, res) => {
    const name = req.body.Name
    const title = req.body.title
    const task = req.body.task
    const ddl = req.body.ddl

    db.query(
            "INSERT INTO tasks (name, taskRank, task, ddl) VALUES (?,?,?,?)", 
            [name, title, task, ddl], 
            (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send("value inserted");
                }
    })
})

app.get('/tasklist', (req, res) => {
    db.query("SELECT * FROM tasks", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id
    const name = req.body.Name
    const title = req.body.title
    const task = req.body.task
    const ddl = req.body.ddl

    db.query("UPDATE tasks SET name=?, taskRank$=?, task=?, ddl=? WHERE id=?", 
    [name, title, task, ddl, id], (err, result) => {
        if (err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
});

// const express = require('express');
// const mysql = require('mysql');
// const app = express();
// const cors = require('cors');

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'customers'
// })

// app.post('/create', (req, res) => {
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const email = req.body.email;
//     const address = req.body.address;

//     db.query('INSERT INTO customer (FirstName, LastName, Email, Address) VALUES (?,?,?,?)', 
//     [firstName, lastName, email, address], 
//     (err, result) => {
//         if (err){
//             console.log(err)
//         }else {
//             res.send('values inserted')
//         }

//     }
//     );
// })

// app.get('/tasklist', (req, res) => {
//     db.query('SELECT * FROM customer', (err, result) => {
//         if (err){
//             console.log(err)
//         }else{
//             res.send(result)
//         }
//     })
// })

// app.delete('/delete/:id', (req, res) => {
//     const id = req.params.id
//     db.query('DELETE FROM customer WHERE id = ?', [id], (err, result) => {
//         if (err){
//             console.log(err)
//         }else{
//             res.send(result)
//         }
//     })
// })

// app.listen(3001, () => {
//     console.log('your server is running on port 3001')
// })