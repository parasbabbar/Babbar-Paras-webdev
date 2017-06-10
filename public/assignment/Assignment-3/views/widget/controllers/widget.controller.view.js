(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController);

    function WidgetListController($sce, $routeParams, WidgetService, $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.pid = $routeParams.pid;
        model.wid = $routeParams.wid;
        model.trustThisContent = trustThisContent;
        model.getYoutubeUrl = getYoutubeUrl;
        model.editWidget = editWidget;

        function init() {
            model.widgets = WidgetService.findWidgetsByPageId(model.pid);
            console.log(model.widgets);
        }
        init();

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

        function getYoutubeUrl(widgetURL) {
            var parts = widgetURL.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            console.log(url);

            return $sce.trustAsResourceUrl(url);
        }

        function editWidget(w) {

            if (w.widgetType === "YOUTUBE" || w.widgetType === "IMAGE" || w.widgetType === "HEADING") {
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + w._id);
            }
            else {
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
            }

        }

        
    }
    function NewWidgetController($location ,$routeParams, WidgetService){
        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;
        model.createYoutubeWidget = {"widgetType": "YOUTUBE", "pageId": model.pid, "width": "" , "url": "" };
        model.createHeaderWidget ={ "_id": "", "widgetType": "HEADER", "pageId": model.pid, "size": "", "text": ""};
        model.createImageWidget= { "_id": "", "widgetType": "IMAGE", "pageId": model.pid, "width":"", "url": ""};
        model.createWidget = createWidget;

        function createWidget(newWidgetType) {

            var newCreatedWidget = WidgetService.createWidget(model.pid, newWidgetType);

            if (newCreatedWidget) {
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + newCreatedWidget._id);
            }
            else {
                model.message = "OOPS!! Something went wrong.. Please try again..";
            }

        }
    }

    function EditWidgetController($location, $routeParams, WidgetService){
        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        // model.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
            model.widget = WidgetService.findWidgetById(model.wgid);


        }
        init();

        function updateWidget(newWidget){
            var res = WidgetService.updateWidget(model.wgid,newWidget);
            if(res){
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
            }
            else{
                model.message ="OOPS!! Something went wrong.. Please try again..";
            }

        }

        function deleteWidget(widget) {
            var res = WidgetService.deleteWidget(widget._id);
            if (res) {
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
            } else {
                model.message = "OOPS!! Something went wrong.. Please try again..";
            }
        }

        // function getWidgetUrlForType(Type) {
        //     return '/assignment/Assignment-3/views/widget/templates/widget-'+Type.toLowerCase()+'.view.client.html';
        // }

    }

})();
