var app = require('../../express');

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "123", "description": "Lorem"},
    {"_id": "322", "name": "Post 4", "websiteId": "123", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "234", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.get("/api/page/:pageId", findPageById);
app.delete("/api/page/:pageId", deletePage);

function findAllPagesForWebsite(req, res) {
    var user_Page = [];
    for (var p in pages) {
        if (pages[p].websiteId === req.params.websiteId) {
            user_Page.push(pages[p]);
        }
    }
    res.json(user_Page);
}

function createPage(req, res) {
    var nPage = req.body;
    var new_page = {
        _id: (new Date()).getTime() + "",
        name: nPage.name,
        websiteId: req.params.websiteId,
        description: nPage.description
    };
    pages.push(new_page);
    res.json(pages);
}

function updatePage(req, res) {
    var uPage = req.body;
    for(var p in pages){
        if (pages[p]._id === req.params.pageId){
            pages[p] = uPage;
            res.json(uPage);
            return;
        }

    }
    res.sendStatus(404);
    return;
}

function findPageById(req, res) {
    for (var p in pages) {
        if (pages[p]._id === req.params.pageId) {
            res.json(pages[p]);
            return;
        }
    }
}

function deletePage(req, res) {

    for(var p in pages){
        if(pages[p]._id === req.params.pageId) {
            pages.splice(p, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    return;
}




