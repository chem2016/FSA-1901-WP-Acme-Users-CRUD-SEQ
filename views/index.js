module.exports = (users) => 
{
    return `
    <!DOCTYPE HTML>
    <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" type="text/css"/>
        <title>Acme Users Seq CRUD</title>
        </head>
        <body>
            <h1>
                    Acme Users CRUD-SEQ
            </h1>
            <ul>
                ${users.map((user)=>{
                    return `
                    <li class="list-group-item">
                    <a href="/users/${user.id}">${user.firstName} ${user.lastName}</a>
                    <form method='post' action='/users/${user.id}/?_method=delete'>
                    <button class="btn btn-danger">Delete</button>
                    </form>
                    </li>
                    `
                }).join('')
                }
                
            </ul>
            <form method='post' action='/users/user.id'>
                <input type="text" name="firstName" placeholder="first name">
                <input type="text" name="lastName" placeholder="last name">
                <button>Create</button>
            </form>
            
        </body>
    </html>
    `
}


