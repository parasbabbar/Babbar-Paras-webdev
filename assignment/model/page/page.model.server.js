var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPage = createPage;
pageModel.findAllPages = findAllPages;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        })
}

    function updatePage(pId , page){
        // delete nUser._id;

        return pageModel
            .update({_id: pId},{
                $set: page });
    }

    function deletePage(pid){
        return pageModel.remove({_id: pid});
    }

    function findPageById(pid){
        return pageModel.findById(pid);
    }

    function findAllPagesForWebsite(wid) {
        return pageModel.find({
            "_website": wid });
    }

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function addWidget(pageId,nwidget) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(nwidget);
            page.save();
            return nwidget;
        });
}


function findAllPages() {
    return pageModel.find();
}



