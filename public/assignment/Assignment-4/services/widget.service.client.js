(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {

            createWidget : createWidget,
            findWidgetsByPageId : findAllWidgetsForPage,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            sort : sort
        };
        return api;


        function sort(pageId,startIndex,endIndex) {
            var url = "/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createWidget(pageId, widget){
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });


            // var nWidget = widget;
            //
            // nWidget._id = (new Date()).getTime()+"";
            // nWidget.pageId = pageId;
            //
            // widgets.push(nWidget);
            //
            // return nWidget;
        }

        function findAllWidgetsForPage(pageId) {

            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });



            // var widget_arr = [];
            // for(var w in widgets){
            //     if(widgets[w].pageId === pageId){
            //         widget_arr.push(widgets[w]);
            //     }
            // }
            // return widget_arr;

        }

        function findWidgetById(widgetId){

            var url = "/api/widget/"+widgetId+"";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            // for(var w in widgets){
            //     widget = widgets[w];
            //     if(widget._id === widgetId){
            //         return widget;
            //     }
            // }
            // return null;
        }

        function updateWidget(widgetId, newWidget) {
            var url = "/api/widget/"+widgetId+"";
            return $http.put(url, newWidget)
                .then(function (response) {
                    return response.data;
                });
            // for(var w in widgets){
            //     widget = widgets[w];
            //     if(widget._id === widgetId){
            //         widget[w] = newWidget;
            //         return true;
            //     }
            // }
            // return false;
        }

        function deleteWidget(widgetId) {


            var url = "/api/widget/"+widgetId+"";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });


            // for(var w in widgets){
            //     widget = widgets[w];
            //     if(widget._id === widId){
            //         widgets.splice(w,1);
            //         console.log(widgets);
            //         return widgets;
            //     }
            // }
            // return null;

        }
    }
})();
