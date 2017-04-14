(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService, EventService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.unregisterUser = unregisterUser;
        vm.updateUser=updateUser;
        vm.userId = userId;
        vm.showEvent = showEvent;

        function init() {
            UserService
                .findUserById(userId)
                .success(renderUser);
        }
        init();

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }

        function renderUser(user) {
            vm.user = user;
            var events = user.events;
            console.log("Exy"+ events);
            vm.events = [];
            var final = [];
            findAllEvents(events, final);
        }

        function showEvent(event) {
            vm.event = event;
            $location.url("/user/"+vm.userId+"/event/"+event._id);
        }

        function findAllEvents(events, final) {
            if(events.length == 0){
                vm.events = final;
                console.log(vm.events);
                return final;
            }
            return EventService.findEventById(events.shift())
                .success(function (response) {
                    final.push(response);
                    findAllEvents(events, final);
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
         function updateUser(newUser) {
             if(newUser == null){
                 vm.registrationerror = "Please enter your details";
                 return;
             }
             if(newUser.username == null || newUser.email == null){
                 vm.registrationerror = "Please enter your username, email and password";
                 return;
             }
             if(newUser.address ==null || newUser.zipcode==null) {
                 vm.registrationerror = "Please enter your address and zipcode";
                 return;
             }
             if (!newUser.sports && !newUser.movies && !newUser.rest){
                 vm.registrationerror ="please add an interest";
                 return;
             }

             UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    $location.url("/user/" + userId+"/events");
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
    }
})();