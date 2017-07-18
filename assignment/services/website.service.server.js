const app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

// var websites = [
    //     {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    //     {"_id": "234", "name": "Tweeter", "developerId": "123", "description": "Lorem"},
    //     {"_id": "456", "name": "Gizmodo", "developerId": "123", "description": "Lorem"},
    //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    //     {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    //     {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    // ];


    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsiteForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var userId = req.params.userId;
        websiteModel
            .deleteWebsite(userId, websiteId)
            .then(
                function(websiteId){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(404);
                }
            );
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                res.json(status);
            });
    }

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        websiteModel
            .createWebsite(userId, website)
            .then(function (website) {
                res.json(website);
            });
    }

    function findAllWebsiteForUser(req, res) {
        websiteModel
            .findAllWebsiteForUser(req.params.userId)
            .then(function (websites) {
                res.json(websites);
            })
    }


    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            })
    }

