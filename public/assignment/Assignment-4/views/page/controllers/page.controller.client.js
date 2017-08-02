(function() {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController)
        .controller('NewPageController', NewPageController)
        .controller('EditPageController', EditPageController);




    function PageListController($routeParams, PageService) {

        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;

        function init() {
            PageService
                .findAllPagesForWebsite(model.wid)
                .then(renderPages);
        }
        init();

        function renderPages(Pages){
            model.pages = Pages;
        }
    }

    function NewPageController($routeParams, PageService, $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.createNewPage = createNewPage;

        function init() {
            PageService
                .findAllPagesForWebsite(model.wid)
                .then(renderPages);
        }
        init();

        function renderPages(Pages){
            model.pages = Pages;
        }

        function createNewPage(webId, userId, newpage) {
           // console.log(newpage);
            if (newpage === undefined || newpage.name === undefined) {
                model.message = "Please fill the name of the Page!!!";
            }
            else {
               PageService
                   .createPage(webId, newpage)
                   .then(CreateNewPage);
               function CreateNewPage(newPage){
                   if (newPage) {
                    $location.url("/user/" + userId + "/website/" + webId + "/page");
                }
                else {
                    model.message = "Something went wrong, Please try again..!"
                }

            }

        }
    }}
    function EditPageController($routeParams, PageService, $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.updatePage = updatePage;
        model.deletePage = deletePage;


        function renderPages(Pages) {
            model.pages = Pages;
        }

        function updatePage(pageId, newPage) {
            if (newPage === undefined || newPage.name === undefined) {
                model.message = "Input is Undefined!!"
            }
            else {
                PageService
                    .updatePage(pageId, newPage)
                    .then(function (uPage) {
                        if (uPage) {
                            model.page = uPage;
                            $location.url("/user/" + model.uid + "/website/" + model.wid + "/page");
                        }
                        else {
                            model.message = "Page id does not match"
                        }
                    });
            }
        }

        PageService
            .findPageById(model.pid)
            .then(function (page) {
                if (page !== null) {
                    model.page = page;
                }
            });


        function deletePage(pid) {
            PageService
                .deletePage(pid)
                .then(function (dPage) {

                    if (dPage) {
                        $location.url("/user/" + model.uid + "/website/" + model.wid + "/page");
                    }
                    else {
                        model.message = "Something Went Wrong, Please Try again!!"
                    }

                });
        }
    }

})();
