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
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.getSafeHtml = getSafeHtml;
        model.checkSafeURL = checkSafeURL;
        model.editWidget = editWidget;

        function init() {
            WidgetService
                .findWidgetsByPageId(model.pid)
                .then(function (widget) {
                if (widget != '0') {
                    model.widgets = widget;
                }
            });

        }
        init();


        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function checkSafeURL(widgetURL) {
            var parts = widgetURL.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;

            return $sce.trustAsResourceUrl(url);
        }

        function editWidget(w){
            // console.log(w);

            if (w.type === "YOUTUBE" || w.type === "IMAGE" || w.type === "HTML"|| w.type === "HEADING" || w.type === "TEXT"){
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + w._id);
            }
            else{
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
            }

        }

    }

    function NewWidgetController($location ,$routeParams, WidgetService){
        var model = this;
        model.createWidget = createWidget;


        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;

        model.createYoutube = {name: "Youtube Widget", type: "YOUTUBE", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E"};
        model.createHeader = {name: "Header Widget", type: "HEADING", size: 3, text: "Lorem ipsum"};
        model.createImage = {name: "Image Widget", type: "IMAGE", width: "100%", url: "http://lorempixel.com/400/200/"};
        model.createHTML = {name: "HTML Widget", type: "HTML", text: "New HTML Widget"};
        model.createText = {name: "Text Widget", type: "TEXT", formatted: false, rows: 1, placeholder: "", text: "new"};


        function createWidget(widget) {
            console.log(widget);
            WidgetService
                .createWidget(model.pid, widget)
                .then(function (widget) {
                    console.log(widget);
                    $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget/" + widget._id);
            });
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
