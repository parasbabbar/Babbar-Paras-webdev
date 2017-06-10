(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "123", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];
        var api = {
            "findWebsiteByUser": findWebsiteByUser,
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById": findWebsiteById
        };
        return api;

        function findWebsiteByUser(userId) {
            var user_website = [];
            for (var w in websites) {
                if (websites[w].developerId === userId)
                    user_website.push(websites[w]);
            }
            return user_website;
        }
        function findWebsiteById(webId){
                for(var w in websites) {
                    website = websites[w];
                    if(website._id === webId) {
                        return website;
                    }
                }
                return null;
        }


        function createWebsite(userId, nWebsite) {
            {
                var nWeb = {
                    _id :(new Date()).getTime()+"" ,
                    name: nWebsite.name,
                    developerId: userId,
                    description: nWebsite.description
                };
                websites.push(nWeb);
                return nWeb;
            }
        }

        function updateWebsite(webId, newWebsite) {
            for(var w in websites) {
                website = websites[w];
                if(website._id === webId){
                    website.name = newWebsite.name;
                    website.description = newWebsite.description;
                    return true;
                }
            }
            return false;

        }
        function deleteWebsite(webId) {
            for(var w in websites){
                website = websites[w];
                if(website._id === webId){
                    websites.splice(w,1);
                    console.log(websites);
                    return websites;
                }
            }
            return null;

        }
    }

    })();


