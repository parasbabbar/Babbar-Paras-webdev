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
            model.pages = PageService.findPageByWebsiteId(model.wid);
        }

        init();
    }
    function NewPageController($routeParams, PageService, $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.createNewPage = createNewPage;

        function createNewPage(webId, userId, newpage) {
           // console.log(newpage);
            if (newpage === undefined || newpage.name === undefined) {
                model.message = "Please fill the name of the Page!!!";
            }
            else {
                var newCreatedPage = PageService.createPage(webId, newpage);
                if (newCreatedPage) {
                    $location.url("/user/" + userId + "/website/" + webId + "/page");
                }
                else {
                    model.message = "Something went wrong, Please try again..!"
                }

            }

        }
    }
    function EditPageController($routeParams, PageService, $location) {

        var model = this;
        model.uid = $routeParams.uid;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function updatePage(pid,npage) {

            if (npage === undefined || npage.name === undefined) {
                model.message = "Input is Undefined!!"
            }
            else {
                var oldpage = PageService.findPagebyId(pid);
                if (oldpage) {
                    var newPage = PageService.updatePage(oldpage, npage);
                    if (newPage) {
                        $location.url("/user/" + model.uid + "/website/" + model.wid + "/page")
                    }
                    else {
                        model.message = "Something Went Wrong, Please Try again!!"
                    }
                }

                else {
                    model.message = "Something Went Wrong, Please Try again!!"
                }


            }
        }
        function deletePage(pid) {
            var dPage = PageService.deletePage(pid);
            if (dPage) {
                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page");
            }
                else {
                model.message = "Something Went Wrong, Please Try again!!"
            }

        }
    }

})();
