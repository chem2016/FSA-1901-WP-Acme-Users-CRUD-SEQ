const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user',{
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
})

const syncAndSeed = () =>{
    conn.sync({force:true})   
        .then((conn)=>{
            console.log(conn);
        })
}

syncAndSeed()