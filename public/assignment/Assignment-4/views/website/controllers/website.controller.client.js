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
            // model.websites = WebsiteService.findWebsiteByUser(model.uid);
            WebsiteService
                .findAllWebsiteForUser(model.uid)
                .then(renderWebsites);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }
    }
    function NewWebsiteController($routeParams, WebsiteService, $location) {
        var model = this;
        model.uid = $routeParams.uid;
        model.createWebsite = createWebsite;

        function init() {
            // model.websites = WebsiteService.findWebsiteByUser(model.uid);
            WebsiteService
                .findAllWebsiteForUser(model.uid)
                .then(renderWebsites);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }


        function createWebsite(newWebsite) {

            if(newWebsite === undefined || newWebsite.name === undefined){
                model.message="Please fill the Website Name";
            }
            else
                {
                WebsiteService
                    .createWebsite(model.uid, newWebsite)
                    .then(function(newWeb){
                        if (newWeb) {
                            $location.url("/user/" + model.uid +"/website");
                        }
                        else {
                            model.message = "OOPS!! Something went wrong.. Please try again..!";
                        }
                    });

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
            // model.websites = WebsiteService.findWebsiteByUser(model.uid);
            WebsiteService
                .findAllWebsiteForUser(model.uid)
                .then(renderWebsites);
        }

        init();

        function renderWebsites(websites) {
            model.websites = websites;
        }


        function updateWebsite(webId, newWebsite) {
            if (newWebsite === undefined || newWebsite.name === undefined) {
                model.message = "Input is Undefined!!"
            }
            else {
                WebsiteService
                    .updateWebsite(webId, newWebsite)
                    .then(function(uWebsite){
            if (uWebsite) {
                $location.url("/user/" + model.uid + "/website");
            }
            else {
                model.message = "Website id does not match"
            }
          });
            }}

        WebsiteService
            .findWebsiteById(model.wid)
            .then(function(website){
                if (website !== null) {
                    model.website = website;
                }});

        function deleteWebsite(webId) {
            WebsiteService
                .deleteWebsite(webId)
                .then(function (webId) {
                    if (webId === null) {
                        model.message = "Something went wrong..Please try again..!"

                    }
                    else {
                        $location.url("/user/" + $routeParams.uid + "/website");
                    }
                });
        }
}})();
