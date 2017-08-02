(function() {
    angular
        .module('WebAppMaker')
        .factory('PageService', PageService);

    function PageService($http) {

        var api = {

            "findAllPagesForWebsite": findAllPagesForWebsite,
            "createPage": createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage

        };
        return api;

        function findAllPagesForWebsite(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId){
            var url = "/api/page/"+pageId+"";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }







            // var web_page = [];
            // for (var p in pages) {
            //     if (pages[p].websiteId === websiteId) {
            //         web_page.push(pages[p]);
            //     }
            // }
            // return web_page;


        function createPage(websiteId, newPage) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, newPage)
                .then(function (response) {
                    return response.data;
                });

        }

        function updatePage(pageId, uPage) {
            var url = "/api/page/"+pageId+"";
            return $http.put(url, uPage)
                .then(function (response) {
                    return response.data;
                });


        }




        function deletePage(PageId) {
            var url = "/api/page/"+PageId+"";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }
    }

})();





