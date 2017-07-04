var app = require('../../express');

var widgets =
    [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });
app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.put("/api/widget/:widgetId", updateWidget);
app.get("/api/widget/:widgetId", findWidgetById);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/page/:pageId/widget", sortWidget);


function sortWidget(req, res) {
    var start = req.query.initial;
    var end = req.query.final;
    widgets.splice(end, 0, widgets.splice(start, 1)[0]);
}


function findAllWidgetsForPage(req, res) {
    var user_widgets = [];
    for (var w in widgets) {
        if (widgets[w].pageId === req.params.pageId) {
            user_widgets.push(widgets[w]);
        }
    }
    res.json(user_widgets);
}


function createWidget(req, res) {
    var widget = req.body;
    var nWid = {
        _id :(new Date()).getTime()+"" ,
        pageId : widget.pageId,
        size : widget.size,
        width : widget.width,
        name: widget.name,
        text: widget.text,
        widgetType: widget.widgetType
    };
    widgets.push(nWid);
    res.json(nWid);
}

function findWidgetById(req, res) {
    for (var w in widgets) {
        if (widgets[w]._id === req.params.widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
}

function updateWidget(req, res) {
    var uWidget = req.body;
    for(var w in widgets){
        if (widgets[w]._id === uWidget._id){
            widgets[w] = uWidget;
            res.json(widgets[w]);
            return;
        }

    }
}

function deleteWidget(req, res) {

    for(var w in widgets){
        if(widgets[w]._id === req.params.widgetId) {
            widgets.splice(w, 1);
            res.sendStatus(200);
        }
    }
}

function uploadImage(req, res) {

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var myFile = req.file;
    var widgetId = req.body.widgetId ;
    var width = req.body.width ;
    var redirectUrl = "/assignment/Assignment-4/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"";

    console.log(redirectUrl);

    if(myFile === undefined){
        res.redirect(redirectUrl);
        return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename; // new file name in upload folder
    var path = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    for(var i in widgets){
        if(widgets[i]._id === widgetId){
            widgets[i].url = "/uploads/"+filename;
        }
    }
    console.log(req.body);
    res.redirect("/assignment/Assignment-4/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"");

}




