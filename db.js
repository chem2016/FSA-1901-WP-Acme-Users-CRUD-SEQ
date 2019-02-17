const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user',{
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
})

const syncAndSeed = () =>{
    conn.sync({force:true})   
        // .then(()=>{
        //     User.create({
        //         firstName: 'John',
        //         lastName: 'Eric',
        //     });
        //     User.create({
        //         firstName: 'Mike',
        //         lastName: 'Bibby',
        //     })
        // })
}


module.exports = { 
    User,
    syncAndSeed,
}