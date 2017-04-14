(function(){
    angular
        .module("WebAppMaker")
        .controller("HomeController", homeController);

    function homeController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .success(function (user) {
                    var loginUser = user;
                    if(loginUser != null) {
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = 'user not found';
                    }
                })
                .error(function(err) {
                    vm.error = 'user not found';
                });
        }
    }
})();
