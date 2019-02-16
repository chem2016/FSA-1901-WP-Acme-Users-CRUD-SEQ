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
        .then((users)=> res.send(renderPage(users)))
        .catch(next);
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


module.exports = { app };