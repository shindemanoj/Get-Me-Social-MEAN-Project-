(function(){
    angular
        .module("WebAppMaker")
        .factory('EventService', eventService);

    function eventService($http) {

        var api = {
            "createEvent": createEvent,
            "deleteEvent": deleteEvent,
            "updateEvent": updateEvent,
            "findEventById": findEventById,
            "findNearByZipCodes": findNearByZipCodes,
            "findEventsByZip":findEventsByZip,
            "findNearByZipCodes": findNearByZipCodes,
            "addParticipant": addParticipant,
            "doLike": doLike,
            "findEvents": findEvents,
            "increaseViews": increaseViews
        };
        return api;

        function increaseViews(user, eventId) {
            return $http.put("/api/views?eventId="+eventId, user);
        }

        function doLike(user, eventId, op) {
            return $http.put("/api/like?eventId="+eventId+"&op="+op, user);
        }
        function deleteEvent(eventId) {
            return $http.delete('/api/event/'+eventId);
        }

        function createEvent(userId, event) {
            return $http.post("/api/user/"+userId+"/event", event);
        }

        function findEvents() {
            return $http.get("/api/events");
        }

        function updateEvent(eventId, event) {
            return $http.put("/api/updateEvent/"+eventId, event);
        }

        function findEventById(eid) {
            return $http.get("/api/event/"+eid);
        }
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

        function findEventsByZip(user){
            return $http.get("/api/event?zipcode="+user.zipcode+"&userId="+user._id);
        }

        function addParticipant(user, eventId) {
            return $http.put("/api/event/"+eventId, user);
        }

        function findNearByZipCodes(zipcode){
            var key = "O3YJD2jqQZTarMhaLf58moZsd064XipMmnvZqPqhOjrg6JrSYx1lV0N90UdYdCKz";
            var format = "json";
            var units = "mile";
            var distance = "2";
            var urlBase = "https://www.zipcodeapi.com/rest/<api_key>/radius.<format>/<zip_code>/<distance>/<units>";

            var url = urlBase.replace("<api_key>", key).replace("<format>", format).replace("<zip_code>", zipcode).replace("<distance>", distance).replace("<units>", units);
            return $http.get(url);
        }
    }
})();