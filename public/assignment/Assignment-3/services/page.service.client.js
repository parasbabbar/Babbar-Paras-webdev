(function() {
    angular
        .module('WebAppMaker')
        .factory('PageService', PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "123", "description": "Lorem"},
            {"_id": "322", "name": "Post 4", "websiteId": "123", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "234", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {

            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPagebyId": findPagebyId,
            "updatePage": updatePage,
            "deletePage": deletePage

        };
        return api;

        function findPageByWebsiteId(websiteId) {
            var web_page = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    web_page.push(pages[p]);
                }
            }
            return web_page;

        }

        function createPage(webId, newPage) {
            {
                var nPage = {
                    _id: (new Date()).getTime() + "",
                    name: newPage.name,
                    websiteId: webId,
                    description: newPage.description
                };
                pages.push(nPage);
                return nPage;
            }
        }

        function findPagebyId(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;
        }

        function updatePage(editpage, npage) {
            editpage.name = npage.name;
            editpage.description = npage.description;
            return editpage;
        }

        function deletePage(PageId) {
            for (var p in pages) {
                page = pages[p];
                if (page._id === PageId) {
                    pages.splice(p, 1);
                    console.log(pages);
                    return pages;
                }
            }
            return null;

        }



    }
})();


