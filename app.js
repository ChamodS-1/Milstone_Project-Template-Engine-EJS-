const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static('Public'));
app.use(express.urlencoded({extended:false}));

app.get('/index',function(req , res){

    res.render('index');
    });

app.get('/recommended',function(req , res){

    const data = path.join(__dirname,'data','details.json');
       const readFile = fs.readFileSync(data);
         const newRead=JSON.parse(readFile);
   
    res.render('recommended',{numberOfRestaurent:newRead.length, keys:newRead});
    });
    
app.get('/shareRestaurent',function(req , res){

   
    res.render('shareRestaurent');
    });

    app.post('/shareRestaurent',function(req , res){

        const userData=req.body;

        const data = path.join(__dirname,'data','details.json');
       const readFile = fs.readFileSync(data);
         const newRead=JSON.parse(readFile);

         newRead.push(userData);

         fs.writeFileSync(data,JSON.stringify(newRead));

         res.redirect('/confirm');


        });

    app.get('/confirm',function(req , res){

       
        res.render('confirm');
        });

    app.get('/about',function(req , res){

 
    res.render('about');
    });

   

app.listen(3000);