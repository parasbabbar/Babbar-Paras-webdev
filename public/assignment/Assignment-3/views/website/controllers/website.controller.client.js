(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {

        var model = this;
        model.uid = $routeParams.uid;

        function init() {
            model.websites = WebsiteService.findWebsiteByUser(model.uid);
            console.log(model.websites);
        }

        init();

    }
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;
        model.uid = $routeParams.uid;
        model.createWebsite = createWebsite;

        function init(){
            model.websites = WebsiteService.findWebsiteByUser(model.uid);
        }
        init();

        function createWebsite(newWebsite) {
            if(newWebsite === undefined || newWebsite.name === undefined){
                model.message="Please fill the Website Name";
            }
            else
                {
                var newWeb = WebsiteService.createWebsite(model.uid, newWebsite);
                console.log(newWeb);
                if (newWeb) {
                    $location.url("/user/" + model.uid +"/website");
                }
                else {
                    model.message = "OOPS!! Something went wrong.. Please try again..!"
                }

            }
        }
    }
    
    function EditWebsiteController($routeParams, WebsiteService, $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.deleteWebsite = deleteWebsite;
        model.updateWebsite = updateWebsite;

        function init() {
            model.websites = WebsiteService.findWebsiteByUser(model.uid);
        }

        init();

        var web = WebsiteService.findWebsiteById(model.wid);
        if (web !== null) {
            model.website = web;
        }
        function updateWebsite(webId, newWebsite) {
            if (newWebsite === undefined || newWebsite.name === undefined) {
                model.message = "Input is Undefined!!"
            }
            else {
            var nWebsite = WebsiteService.updateWebsite(webId, newWebsite);
            console.log(nWebsite);
            if (nWebsite) {
                $location.url("/user/" + model.uid + "/website");
            }
            else {
                model.message = "Website id does not match"
            }
          }}

        function deleteWebsite(webId) {
            var nWebsite = WebsiteService.deleteWebsite(webId);
            console.log(nWebsite);
            if (nWebsite === null) {
                model.message = "Something went wrong..Please try again..!"

            }
            else {
                $location.url("/user/" + $routeParams.uid + "/website");
            }
        }
    }
})();
