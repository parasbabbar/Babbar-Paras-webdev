(function () {
    angular
        .module('WebAppMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/assignment/Assignment-3/views/home.html'
            })

            .when('/login', {
                templateUrl: '/assignment/Assignment-3/views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: '/assignment/Assignment-3/views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/user/:uid', {
                templateUrl: '/assignment/Assignment-3/views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website", {
                templateUrl: '/assignment/Assignment-3/views/website/templates/website-list.view.client.html',
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: '/assignment/Assignment-3/views/website/templates/website-new.view.client.html',
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: '/assignment/Assignment-3/views/website/templates/website-edit.view.client.html',
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "/assignment/Assignment-3/views/page/templates/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "/assignment/Assignment-3/views/page/templates/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "/assignment/Assignment-3/views/page/templates/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "/assignment/Assignment-3/views/widget/templates/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "/assignment/Assignment-3/views/widget/templates/widget-chooser.view.client.html",
                controller:"NewWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl:"/assignment/Assignment-3/views/widget/templates/widget-edit.view.client.html",
                controller:"EditWidgetController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
