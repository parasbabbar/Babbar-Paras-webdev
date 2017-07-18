var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');


widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;
function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (nwidget) {
            return pageModel
                .addWidget(pageId,nwidget)
        })
}

    function updateWidget(wId , widget){
        // delete nUser._id;

        return widgetModel
            .update({_id: wId},{
                $set: widget });
    }

    function deleteWidget(wid){
       return widgetModel.remove({_id: wid})
    }

    function findWidgetById(wid){
        return widgetModel.findById(wid);
    }

    function findAllWidgetsForPage(pid) {
        return widgetModel.find({
            "_page": pid });
    }

    function reorderWidget(pageId, start, end) {

        return widgetModel
            .find({_page: pageId}, function (error, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                        else if (widget.order > start && widget.order <= end) {
                            widget.order = widget.order - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }

                        else if (widget.order < start && widget.order >= end) {
                            widget.order = widget.order + 1;
                            widget.save();
                        }
                    }
                });
            });
    }

    function findAllWidgets() {
        return widgetModel.find();
    }

