/**
 * Created by paras on 8/3/17.
 */
(function () {
    angular
        .module('CodeOverFlow')
        .config(config);

    function config($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "/project/views/home/templates/homePage.view.client.html",
                controller: "HomePageController",
                controllerAs: "model"
                // resolve: {
                //     loggedIn: checkCurrentUser
                // }
            })
            .when("/result/:qid", {
                templateUrl: "/project/views/home/templates/homeQues.view.client.html",
                controller: "HomeQuesController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "/project/views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "/project/views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/register", {
                templateUrl: "/project/views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/search/:uid", {

                templateUrl: "/project/views/user/templates/user-search.view.client.html",
                controller: "UserSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/public/:uid", {
                templateUrl: "/project/views/user/templates/my-profile.view.client.html",
                controller: "MyProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/user", {
                templateUrl: "/project/views/admin/templates/admin-user.view.client.html",
                controller: "UserSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/answer", {
                templateUrl: "/project/views/admin/templates/admin-answer.view.client.html",
                controller: "AdminAnswerController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/question", {
                templateUrl: "/project/views/admin/templates/admin-home.view.client.html",
                controller: "AdminHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/question/new", {
                templateUrl: "/project/views/search/templates/search-new.view.client.html",
                controller: "SearchNewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/question/:qid", {
                templateUrl: "/project/views/search/templates/search-interact.view.client.html",
                controller: "SearchInteractController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/question", {
                templateUrl: "/project/views/search/templates/search-home.view.client.html",
                controller: "SearchHomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid/admin/question/:qid", {
                templateUrl: "/project/views/admin/templates/admin-question.view.client.html",
                controller: "AdminQuestionController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:uid", {
                templateUrl: "/project/views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user", {
                templateUrl: "/project/views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedIn(UserService,$location,$q,$rootScope,$window){
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(res){
                        var user = res.data;
                        console.log(user);
                        if(user ==='0'){
                            $rootScope.currentUser = null;
                            $window.sessionStorage.setItem("currentUser",'0');
                            $window.sessionStorage.setItem("currentUsername",'0');
                            $window.sessionStorage.clear();
                            deferred.reject();
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            $window.sessionStorage.setItem("currentUser",user._id);
                            $window.sessionStorage.setItem("currentUsername",user.username);
                            deferred.resolve();
                        }
                    },
                    function(err){
                        $location.url("#!");
                    }
                );
            return deferred.promise;
        }


    }


})();