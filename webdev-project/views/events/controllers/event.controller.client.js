(function(){
    angular
        .module("WebAppMaker")
        .controller("EventsController", eventController);

    function eventController($sce, $routeParams, EventService, UserService, CommentService, $location,$rootScope,FlickrService) {
        var vm = this;
        vm.registerEvent = registerEvent;
        vm.participateUser = participateUser;
        vm.addComment = addComment;
        vm.showEvent = showEvent;
        vm.editEvent = editEvent;
        vm.deleteEvent = deleteEvent;
        vm.updateEvent = updateEvent;
        vm.doLike = doLike;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto  = selectPhoto;
        vm.getUserData = getUserData;

        vm.logout = logout;

        function init() {

            var userId = $routeParams['uid'];
            var eventId= $routeParams['eid'];
            vm.eventId = eventId;
            vm.userId=userId;
            UserService
                .findUserById(userId)
                .success(renderUser);
        }
        init();

        function getUserData(userName) {
            UserService.findUserByUsername(userName)
                .success(function(user){
                    vm.partiUser = user;
                })
                .error(function (err) {
                    vm.error = 'sorry could not find participant.';
                });
        }

        function searchPhotos(searchTerm, event) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            if(vm.event == undefined){
                vm.event = {};
            }
            vm.event.url = url;


        }

        function logout() {
            UserService
                .logout()
                .then(function (response) {
                    $rootScope.currentUser = null;
                    $location.url("/home");
                });
        }


        function renderUser(user) {
            vm.user = user;
            if(user.sports){
                vm.eventHref = "#/user/"+user._id+"/sport";
            }
            else if(user.movies){
                vm.eventHref = "#/user/"+user._id+"/movie";
            }
            else{
                vm.eventHref = "#/user/"+user._id+"/restaurant";
            }
            getEventDetails();
            EventService.findEventsByZip(user)
                .success(function(events){
                    vm.events = events;
                })
                .error(function (err) {
                    vm.error = 'sorry could not create event';
                });
        }

        function getEventDetails() {
            if(vm.eventId != undefined){
                EventService
                    .findEventById(vm.eventId)
                    .success(function(event){
                        vm.event = event;
                        var eventAdress = "";
                        if(event.type == 'REST'){
                            eventAdress = event.eventName+" ";
                        }
                        eventAdress += event.address + " " + event.zipcode;
                        var userAdress = vm.user.address +" "+vm.user.zipcode;
                        // vm.source = $sce.trustAsResourceUrl("//www.google.com/maps/embed/v1/place?q="+adress+"&zoom=13&attribution_source=Google+Maps+Embed+API&attribution_web_url=https://developers.google.com/maps/documentation/embed/ &key=AIzaSyC2hDsxuScggdqETcFmGCk4HC_16W5zv7A");
                        vm.source = $sce.trustAsResourceUrl("//www.google.com/maps/embed/v1/directions?origin="+userAdress+"&destination="+eventAdress+"&key=AIzaSyANw0wlspxQEEv2GUhEXe-gZ78kHx64OtE");
                        vm.event.eventDate = new Date(event.eventDate);
                        if(vm.user.likedEvents.indexOf(vm.event._id) !== -1) {
                            vm.userLiked = 1;
                        }
                        else{
                            vm.userLiked = 0;
                        }
                        CommentService.findCommentsById(vm.event._id)
                            .success(function(comments){
                                vm.event.comments = comments;
                            })
                            .error(function (err) {
                                vm.error = 'sorry error in Comments';
                            });
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            }
        }
        function doLike(user, eventId) {
            if (vm.userLiked == 1) {
                delete vm.userLiked;
                EventService.doLike(user, eventId, 'sub')
                    .success(function(event){
                        vm.event.likes = event.likes;
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            } else {
                vm.userLiked = 1;
                EventService.doLike(user, eventId, 'add')
                    .success(function(event){
                        vm.event.likes = event.likes;
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            }
        }

        function updateEvent(event) {
            if(event.type == 'MOVIE'){
                EventService.updateEvent(event._id, event)
                    .success(function(response){
                        $location.url("/user/"+vm.userId+"/events");
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not update event';
                    });
            }
            else{
                EventService.findNearByZipCodes(event.zipcode)
                    .success(function(result){
                        var zipcodes = [];
                        var zipcodesArr = result.zip_codes;
                        for(var index in zipcodesArr){
                            zipcodes.push(zipcodesArr[index].zip_code);
                        }
                        event.nearByZipcodes = zipcodes;
                        EventService.updateEvent(event._id, event)
                            .success(function(response){
                                $location.url("/user/"+vm.userId+"/events");
                            })
                            .error(function (err) {
                                vm.error = 'sorry could not update event';
                            });
                    })
                    .error(function (err) {
                        vm.error = 'something went wrong';
                    });
            }
        }

        function deleteEvent(eventId) {
            var answer = confirm("Are you sure?");
            if(answer){
                EventService.deleteEvent(eventId)
                    .success(function(response){
                        $location.url("/user/"+vm.userId+"/events");
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not delete event';
                    });
            }
        }
        function editEvent(eventId) {
            $location.url("/user/"+vm.userId+"/event/edit/"+eventId);
        }

        function showEvent(event) {
            vm.event = event;
            $location.url("/user/"+vm.userId+"/event/"+event._id);
        }

        function addComment(user, eventId) {
            CommentService.addComment(user, eventId)
                .success(function(comments){
                    vm.user.comment = "";
                    vm.event.comments = comments;
                })
                .error(function (err) {
                    vm.error = 'sorry could not add comment';
                });
        }

        function registerEvent(event, type) {
            event.dateCreated = Date.now();
            event.type = type;
            if(type == "MOVIE"){
                event.eventDate = new Date();
                event.eventDate.setDate(event.eventDate.getDate() + 30);
                EventService
                    .createEvent(vm.userId, event)
                    .success(function(events){
                        $location.url("/user/"+vm.userId+"/events");
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            }
            else{
                if(event.eventDate == undefined){
                    event.eventDate = new Date();
                    event.eventDate.setDate(event.eventDate.getDate() + 30);
                }
                EventService.findNearByZipCodes(event.zipcode)
                    .success(function(result){
                        var zipcodes = [];
                        var zipcodesArr = result.zip_codes;
                        for(var index in zipcodesArr){
                            zipcodes.push(zipcodesArr[index].zip_code);
                        }
                        event.nearByZipcodes = zipcodes;
                        EventService
                            .createEvent(vm.userId, event)
                            .success(function(events){
                                $location.url("/user/"+vm.userId+"/events");
                            })
                            .error(function (err) {
                                vm.error = 'sorry could not create event';
                            });

                    })
                    .error(function (err) {
                        vm.error = 'Please enter valid zipcode';
                    });
                }

        }

        function participateUser(user, eventId) {
            var events = user.events;
            if(events.indexOf(eventId) !== -1) {
                return;
            }
            else{
                EventService.addParticipant(user, eventId)
                    .success(function(res){
                        vm.message = "You have successfully registered for this event";
                        EventService.findEventById(eventId)
                            .success(function(event){
                                vm.event = event;
                            })
                            .error(function (err) {
                                vm.error = 'sorry something went wrong';
                            });
                    })
                    .error(function (err) {
                        vm.error = 'sorry could not create event';
                    });
            }

        }
    }
})();
