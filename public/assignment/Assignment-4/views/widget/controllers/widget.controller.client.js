(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController)
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function WidgetListController($sce, $routeParams, WidgetService, $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.pid = $routeParams.pid;
        model.wid = $routeParams.wid;
        model.trustThisContent = trustThisContent;
        model.getYoutubeUrl = getYoutubeUrl;
        model.editWidget = editWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pid)
                .then(renderwidgets);

        }
        init();

        function renderwidgets(widgets) {
            model.widgets = widgets;

        }

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

            if (w.widgetType === "YOUTUBE" || w.widgetType === "IMAGE" || w.widgetType === "HEADING" || w.widgetType === "HTML") {
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
        model.createYoutube = {"_id": "","widgetType": "YOUTUBE", "pageId": model.pid, "width": "100%" , "url": "" };
        model.createHeader ={ "_id": "", "widgetType": "HEADING", "pageId": model.pid, "size": "", "text": ""};
        model.createImage= { "_id": "", "widgetType": "IMAGE", "pageId": model.pid, "width":"100%", "url": ""};
        model.createhtml= { "_id": "", "widgetType": "HTML", "pageId": model.pid, "text": ""};
        model.createWidget = createWidget;

        function createWidget(newWidgetType) {

            WidgetService
                .createWidget(model.pid, newWidgetType)
                .then(function(newCreateWidget){

            if (newCreateWidget) {
                console.log(newCreateWidget);
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + newCreateWidget._id);
            }
            else {
                model.message = "OOPS!! Something went wrong.. Please try again..";
            }

        });
    }}

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
            WidgetService
                .findWidgetById(model.wgid)
                .then(renderwidget);


        }
        init();

        function renderwidget(widget){
            model.widget = widget;
        }

        function updateWidget(newWidget) {
            WidgetService
                .updateWidget(model.wgid, newWidget)
                .then(function (res) {
                    if (res) {
                        $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                    }
                    else {
                        model.message = "OOPS!! Something went wrong.. Please try again..";
                    }

                });
        }

        function deleteWidget(widget) {
            WidgetService
                .deleteWidget(widget._id)
                .then(function(res){
            if (res) {
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
            } else {
                model.message = "OOPS!! Something went wrong.. Please try again..";
            }
        });

        // function getWidgetUrlForType(Type) {
        //     return '/assignment/Assignment-4/views/widget/templates/widget-'+Type.toLowerCase()+'.view.client.html';
        // }

    }}

    function FlickrImageSearchController($location ,$routeParams, FlickrService, WidgetService){
        var model = this;
        model.uid=$routeParams.uid;
        model.wid=$routeParams.wid;
        model.pid=$routeParams.pid;
        model.wgid=$routeParams.wgid;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response){
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        model.photos = data.photos;
                    });
        }

        function selectPhoto(photo) {
            console.log(photo);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                _id : model.wgid,
                widgetType : 'IMAGE',
                pageId : model.pid,
                url : url,
                width: "100%"
            };

            WidgetService
                .updateWidget(model.wgid,widget)
                .then(function(response){
                    var url = "/user/"+model.uid+"/website/"+model.wid+"/page/"+model.pid+"/widget/"+model.wgid;
                    $location.url(url);
                });
        }

    }

})();
