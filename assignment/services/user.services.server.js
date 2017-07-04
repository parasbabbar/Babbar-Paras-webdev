var app = require('../../express');


var users = [{_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.get('/api/user/', findUser);
app.post('/api/user/', createUser);



function deleteUser(req, res) {
    for (var u in users) {
        if (users[u]._id === req.params.userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    return;

}

function updateUser(req, res) {
    var user = req.body;
    for (var u in users) {
        if (users[u]._id === req.params.userId) {
            users[u] = user;
            res.sendStatus(200);
            return;
        }
    }
    return;

}

function findUser(req, res) {
    var params = req.params;
    //res.send(users);
    var query = req.query;
    if(query.password && query.username) {
        findUserByCredentials(req, res);
    } else if(query.username) {
        findUserByUsername(req, res);
    }
}

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    for(var u in users) {
        if(users[u].username === username &&
            users[u].password === password) {
            res.send(users[u]);
            return;
        }
    }
    res.send("0");
    return;
}

function findUserByUsername(req, res) {
    var username = req.query.username;
    for(var u in users) {
        if(users[u].username === username) {
            res.send("0");
            return;
        }
    }
    res.send(username);
};

function findUserById(req, res) {
    var userId = req.params['userId'];
    for(var u in users) {
        user = users[u];
        if(user._id === userId) {
            res.send(user);
            return;
        }
    }
    return;
}
function createUser(req, res) {

    var user = req.body;
    var user1 = {
                    _id :(new Date()).getTime()+"" ,
                    username: user.username,
                    password: user.password
                };
    users.push(user1);

    res.send(user1);
}
