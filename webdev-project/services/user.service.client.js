(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

        var api = {
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "login":login,
            "logout":logout,
            "register":register,

            "isAdmin": isAdmin,
            "findAllUser": findAllUser
        };
        return api;

        function findAllUser() {
            return $http.get("/api/allUsers");
        }

        function isAdmin() {
            return $http.get('/api/isAdmin')
                .then(function (response) {
                    return response.data;
                });
        }


        function login(user) {
            return $http.post("/api/login", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
        }
    }
})();