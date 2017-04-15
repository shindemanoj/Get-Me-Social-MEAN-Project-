(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location,$rootScope) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(user) {
            if(user == null){
                vm.registrationerror = "Please enter your details";
                return;
            }
            if(user.username == null || user.email == null || user.password == null ){
                vm.registrationerror = "Please enter your username, email and password";
                return;
            }
            if(user.address ==null || user.zipcode==null) {
                vm.registrationerror = "Please enter your address and zipcode";
                return;
            }
            if (user.password != user.passwordverification){
                vm.registrationerror ="";
                vm.passwordmismatch = "Passwords do not match";
                return;
            }
            if (!user.sports && !user.movies && !user.rest){
                vm.registrationerror ="please add an interest";
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "sorry that username is taken";
                })

                .error(function (err) {
                    UserService
                        .register(user)
                        .then(function(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id+"/events");
                        });
            });

        }
    }
})();