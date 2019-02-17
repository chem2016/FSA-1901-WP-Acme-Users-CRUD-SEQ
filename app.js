const express = require('express');
const app = express();
const { User } = require('./db');
// const ejs = require('ejs');
// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);
const renderPage = require('./views');
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
// app.use(express.json());
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/',(req, res, next)=>{
    res.redirect('/users');
    next();
})

app.get('/users',(req, res, next)=>{
    User.findAll()
        .then((users)=> res.send(renderPage(users, req.params.id)))
        .catch(next);
})

app.get('/users/:id',(req, res, next)=>{
    User.findAll()
        .then((users)=>res.send(renderPage(users, req.params.id)))
        .catch(next)
})


app.post('/users/:id',  (req, res, next)=>{
    //console.log('------------debug-----------')
    //console.log(req.body)
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    .then((user)=>{user.save()})
    .then(()=> res.redirect('/users'))
    .catch(next)
})

// app.delete('')

app.delete('/users/:id', (req, res, next)=>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(()=>res.redirect('/users'))
    .catch(next)
})

app.put('/users/:id',(req, res, next)=>{
    
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    },{
        where: {id: req.params.id}
    })
    .then(validationId =>{
        if(validationId[0]){
            res.redirect('/users')
        }else{
            res.send(`
                <!DOCTYPE html>
                <html>
                    <body>
                        <h1>
                        Acme Users Seq CRUD
                        </h1>
                        <p>
                        Cannot read property update of 'null'.
                        <a href="/users"> try again</a>
                        </p>
                    </body>
                </html>
            
            `)
        }
    })
    .catch(next)
})


module.exports = { app };