(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "findAllWebsiteForUser": findAllWebsiteForUser,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById": findWebsiteById
        };
        return api;

        function findAllWebsiteForUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                return response.data;
            });
        }

        function findWebsiteById(websiteId){
            var url = "/api/website/"+websiteId+"";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }


        function createWebsite(userId, nWebsite) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, nWebsite)
                .then(function (response) {
                return response.data;
            });


        }

        function updateWebsite(webId, newWebsite) {
            var url = "/api/website/"+webId+"";
            return $http.put(url, newWebsite)
                .then(function (response) {
                    return response.data;
                });


        }
        function deleteWebsite(websiteId) {

            var url = "/api/website/"+websiteId+"";
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }
    }

    })();


