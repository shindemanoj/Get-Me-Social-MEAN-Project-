(function(){
    angular
        .module("WebAppMaker")
        .factory('CommentService', commentService);

    function commentService($http) {

        var api = {
            "addComment": addComment,
            // "deleteUser": deleteUser,
            //"updateUser": updateUser,
            // "findEventByCredentials": findEventByCredentials,
            // "findEventById": findEventById,
            // "findEventByUsername": findEventByUsername,
            "findComments": findComments,
            "findCommentsById": findCommentsById
            // "findEventsByZip":findEventsByZip,
            // "findNearByZipCodes": findNearByZipCodes,
            // addParticipant: addParticipant
        };
        return api;

        // function deleteUser(userId) {
        //     return $http.delete('/api/user/'+userId);
        // }
        function findCommentsById(eventId) {
            return $http.get("/api/comment/"+eventId);
        }
        function addComment(user, eventId) {
            return $http.post("/api/comment/"+eventId, user);
        }

        // function findEventByUsername(username) {
        //     return $http.get("/api/user?username="+username);
        // }
        //
        // function findEventByCredentials(username, password) {
        //     return $http.get("/api/user?username="+username+"&password="+password);
        // }
        //
        // // function updateUser(userId, newUser) {
        // //     return $http.put("/api/user/"+userId, newUser);
        // // }
        //
        // function findEventById(uid) {
        //     return $http.get("/api/user/"+uid);
        // }
        // function findNearByZipCodes(zipcode){
        //     var key = "js-rqggQX3IUkKVa0ZHDqFQjkn6iUqtNcofCEwtBzcvUWr5XrMARrrbMOh4JIxxVVMx";
        //     var format = "json";
        //     var units = "mile";
        //     var distance = "1";
        //     var urlBase = "https://www.zipcodeapi.com/rest/<api_key>/radius.<format>/<zip_code>/<distance>/<units>";
        //
        //     var url = urlBase.replace("<api_key>", key).replace("<format>", format).replace("<zip_code>", zipcode).replace("<distance>", distance).replace("<units>", units);
        //     return $http.get(url);
        // }

        function findComments(user){
            return $http.get("/api/comment");
        }

    }
})();