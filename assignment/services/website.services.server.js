var app = require('../../express');
var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "123", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);
app.get("/api/website/:websiteId", findWebsiteById);
app.delete("/api/website/:websiteId", deleteWebsite);


function findAllWebsitesForUser(req, res) {
    var user_website = [];
    for (var w in websites) {
        if (websites[w].developerId === req.params.userId) {
            user_website.push(websites[w]);
        }
    }
    res.json(user_website);
}

function findWebsiteById(req, res) {
    for (var w in websites) {
        if (websites[w]._id === req.params.websiteId) {
            res.json(websites[w]);
            return;
        }
    }
}

function createWebsite(req, res) {
    var nWebsite = req.body;
            var nWeb = {
            _id: (new Date()).getTime() + "",
            name: nWebsite.name,
            developerId: req.params.userId,
            description: nWebsite.description
        };
        websites.push(nWeb);
        res.json(websites);
}



function updateWebsite(req, res) {
    var uWebsite = req.body;
    for (var w in websites) {
        if (websites[w]._id === uWebsite._id) {
            websites[w] = uWebsite;
            res.json(websites[w]);
            return;
        }

    }
}

function deleteWebsite(req, res) {

    for(var w in websites){
        website = websites[w];
        if(website._id === req.params.websiteId) {
            websites.splice(w, 1);
           res.sendStatus(200);
        }
    }
 }
