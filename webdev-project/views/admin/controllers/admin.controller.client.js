(function () {
    angular
        .module('WebAppMaker')
        .controller('AdminController', adminController);
    
    function adminController($location, UserService, EventService, $routeParams) {
        var model = this;

        model.deleteUser = deleteUser;
        model.editUser = editUser;
        model.deleteEvent = deleteEvent;
        model.updateEvent = updateEvent;
        model.updateUser = updateUser;

        function init() {

        }
        init();

        function init() {
            var userId = $routeParams['uid'];
            model.adminId = $routeParams['aid'];
            if(userId != undefined){
                model.userId = userId;
                UserService
                    .findUserById(userId)
                    .success(renderUser);
            }
            findAllUsers();
            findAllEvents();
        }
        init();

        function renderUser(user) {
            model.user = user;
        }

        function findAllEvents() {
            EventService.findEvents()
                .success(function(events){
                    console.log(events);
                    model.events = events;
                })
                .error(function (err) {
                    model.error = 'sorry could not create event';
                });
        }
        function editUser(userId) {
            $location.url("/admin/"+model.adminId+"/profile/"+userId);
        }

        function updateEvent(eventId) {
            $location.url("/user/"+model.adminId+"/event/edit/"+eventId);
        }

        function findAllUsers() {
            UserService.
                findAllUser()
                .then(renderUsers);
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .success(function(events){
                    findAllUsers();
                    findAllEvents();
                })
                .error(function (err) {
                    model.error = 'sorry could not create event';
                });
        }
        
        function renderUsers(users) {
            console.log(users);
            model.users = users.data;
        }
        function deleteEvent(event) {
            EventService.deleteEvent(event._id)
                .success(function(res){
                    findAllEvents();
                })
                .error(function (err) {
                    model.error = 'sorry could not delete event';
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
                .updateUser(newUser._id, newUser)
                .success(function (response) {
                    $location.url("/admin/" + model.adminId);
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }
    }
})();