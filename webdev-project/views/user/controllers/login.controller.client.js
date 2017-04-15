(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, EventService, $location, $rootScope) {
        var vm = this;
        vm.login = login;

        function init() {
            EventService.findEvents()
                .success(function(events){
                    if(events.length > 10){
                        events.splice(0,0+9);
                    }
                    vm.events = events;
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
        }

        init();

        function login(user) {

            if (user == null) {
                vm.registrationerror = "Please enter your details";
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .success(function (response) {
                    UserService
                        .login(user)
                        .then(function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            if(user.role == "ADMIN"){
                                $location.url("/admin/"+ user._id);
                            }
                            else{
                                $location.url("/user/"+user._id+"/events");
                            }
                        },function (err) {
                            vm.error = "Username/password does not match";
                        });
                })
                .error(function (err) {
                    vm.error = 'No user found';
                });



        }

    }

})();
