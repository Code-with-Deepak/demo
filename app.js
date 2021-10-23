const { json } = require('express');
var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/insert',function(req,res){
    var add = {
        "name":req.body.name,
        "release":req.body.release,
        "rating":req.body.rating
    }
    var obj = fs.readFileSync('movies.json');
    var data = JSON.parse(obj);
    data['movie'+req.body.n] = add;
    fs.writeFile(__dirname+'/'+'movies.json',JSON.stringify(data),(err)=>{
        if(err)
        throw err;
        console.log("Inserted");
        res.send("Inserted Success");
    })
})

app.get('/:id',function(req,res){
    
    fs.readFile(__dirname+"/"+'movies.json','utf8',function(err,result){
        var id = req.params.id;
        var movie = JSON.parse(result);
        var disp = movie["movie"+id];
        console.log(disp);
        res.end(JSON.stringify(disp));
    });
})

app.listen(3000,console.log('Started at http://localhost:3000'));