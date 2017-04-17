(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/loggedin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/login');
            }
        });
    };

    function configuration($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';

        $routeProvider

            .when("/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/about", {
                templateUrl: "views/user/templates/about-us.view.client.html"

            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve: { isAdmin: checkAdmin,
                    loggedin: checkLoggedIn}
            })
            .when("/admin/profile/:uid", {
                templateUrl: "views/admin/templates/admin.profile.edit.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: { isAdmin: checkAdmin,
                    loggedin: checkLoggedIn }
            })
            .when("/user/events", {
                templateUrl: "views/events/templates/main.view.client.html",
                controller: "EventsController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/sport", {
                templateUrl: "views/events/templates/sport.event.view.client.html",
                controller: "EventsController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/movie", {
                templateUrl: "views/events/templates/movie.event.view.client.html",
                controller: "EventsController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/restaurant", {
            templateUrl: "views/events/templates/restaurant.event.view.client.html",
            controller: "EventsController",
            controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/event/edit/:eid", {
                templateUrl: "views/events/templates/editors/event.edit.view.client.html",
                controller: "EventsController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .when("/user/event/:eid", {
                templateUrl: "views/events/templates/event.view.client.html",
                controller: "EventsController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedIn }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
    function checkAdmin($q, $timeout, $http, $location, $rootScope) {
        return $http.get('/api/isAdmin').success(function(user) {
            $rootScope.errorMessage = null;
            if (user !== '0') {
                $rootScope.currentUser = user;
            } else{
                $location.url('/login');
            }
        });
    }
})();