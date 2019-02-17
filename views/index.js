module.exports = (users, userId) => 
{   
    if(userId){
        const _user = users.find((user)=>{
            return user.id === userId*1;
        })

        var form = `
        <form method='post' action='/users/${userId}/?_method=put'>
            <input type="text" name="firstName" placeholder="first name" value="${_user.firstName}">
            <input type="text" name="lastName" placeholder="last name" value="${_user.lastName}">
            <button>Update</button>
            <a href="/users">Cancel</a>
        </form>`
    }else{
        var form = `
        <form method='post' action='/users/user.id'>
            <input type="text" name="firstName" placeholder="first name">
            <input type="text" name="lastName" placeholder="last name">
            <button>Create</button>
            <a href="/users">Cancel</a>
        </form> 
        `  
    }

    return `
    <!DOCTYPE HTML>
    <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" type="text/css"/>
        <title>Acme Users Seq CRUD</title>
        </head>
        <body>
            <div class="container">
                <h1>
                        Acme Users CRUD-SEQ
                </h1>
                <ul class="list-group">
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
                ${form}
              </div>
        </body>
    </html>
    `
}


