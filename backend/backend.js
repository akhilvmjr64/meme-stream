const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mysql = require('mysql')
dotenv.config()
let app = express()
app.use(morgan('dev'))
app.use(cors())
var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.send('Hello from the meme-stream backend! Meme-stream welcomes you')
})
app.get('/memes', (_, res) => {
    con.query('select * from xmeme order by id desc limit 100;', function(error, results){
        if ( error ){
            console.log(error)
            res.status(500).send('Error in database operation');
        } else {
            res.json(results.sort(function (a,b){return a.id-b.id}));
        }
    });
})

app.post('/memes', (req, res) => {
    console.log('Data received - ', req.body)
    if(req.body.name&&req.body.caption&&req.body.url){
        con.query('insert into xmeme (name,caption,url) values ("'+req.body.name+'","'+req.body.caption+'","'+req.body.url+'");', function(error, results){
            if ( error ){
                
                console.log(error)
                res.status(500).send('Error in database operation');
            }
            res.json({id : JSON.stringify(results.insertId)})
        });
        console.log('Stored successfully!')
    }else{
        let out="";
        if(req.body.name==null){
            out+="Bad user request name can't be empty\n"
        }
        if(req.body.caption==null){
            out+="Bad user request caption can't be empty\n"
        }
        if(req.body.url==null){
            out+="Bad user request url can't be empty\n"
        }
        res.status(400).send(out)
    }
})

app.param(['id'], function (req, res, next, value) {
    if(req.method=='GET'){
        con.query('select * from xmeme where id = '+'"'+value+'";', function(error, results){
            if ( error ){
                console.log(error)
                
                res.status(500).send('Error in database operation');
            } else {
                if(results.length==0){
                    res.status(404).send('No such meme ID');
                }
                else{
                    res.json(results[0]);
                }
            }
        });
    }
    if(req.method=='PATCH'){
        console.log(req.body)
        if(req.body.caption||req.body.url){
            con.query(req.body.caption?(req.body.url?"update xmeme set caption='"+req.body.caption+"', url='"+req.body.url+"' where id='"+value+"';":"update xmeme set caption='"+req.body.caption+"', where id='"+value+"';"):("update xmeme set url='"+req.body.url+"' where id='"+value+"';"), function(error, results){
                if ( error ){
                    console.log(error)
                    res.status(500).send('Error in database operation');
                } else {
                    var test = results.message
                    var first=test.indexOf("Rows matched:")
                    var second=test.indexOf("Changed:")
                    first = parseInt(test.slice(first+"Rows matched:".length,second))
                    if(first==0){
                        res.status(404).send('No such meme ID');
                    }
                    else{
                        res.status(200).send('Successfully changed!');
                    }
                }
            });
        }else{
            con.query('select * from xmeme where id = '+'"'+value+'";', function(error, results){
                if ( error ){
                    console.log(error)
                    res.status(500).send('Error in database operation');
                } else {
                    if(results.length==0){
                        res.status(404).send('No such meme ID');
                    }
                    else{
                        res.status(400).send("Bad request caption or url must be specified")
                    }
                }
            });
        }
    }
})

app.get('/memes/:id', (req, res,next) => {
})


app.patch('/memes/:id', (req, res,next) => {
})



app.listen(8081, '0.0.0.0', () => {
    console.log(`Backend running on port number 8081`)})