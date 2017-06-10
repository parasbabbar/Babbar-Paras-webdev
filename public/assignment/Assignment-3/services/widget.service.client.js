(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
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


        var api = {

            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageId, widget){
            var nWidget = widget;

            nWidget._id = (new Date()).getTime()+"";
            nWidget.pageId = pageId;

            widgets.push(nWidget);

            return nWidget;
        }

        function findWidgetsByPageId(pageId) {
            var widget_arr = [];
            for(var w in widgets){
                if(widgets[w].pageId === pageId){
                    widget_arr.push(widgets[w]);
                }
            }
            return widget_arr;

        }

        function findWidgetById(widgetId){
            for(var w in widgets){
                widget = widgets[w];
                if(widget._id === widgetId){
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, newWidget) {
            for(var w in widgets){
                widget = widgets[w];
                if(widget._id === widgetId){
                    widget[w] = newWidget;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widId) {
            for(var w in widgets){
                widget = widgets[w];
                if(widget._id === widId){
                    widgets.splice(w,1);
                    console.log(widgets);
                    return widgets;
                }
            }
            return null;

        }
    }
})();
