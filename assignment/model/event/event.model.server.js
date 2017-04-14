module.exports = function () {
    var api = {
        createEvent: createEvent,
        findEventById: findEventById,
        findAllEventsForUser: findAllEventsForUser,
        findEventsByZip: findEventsByZip,
        updateEvent: updateEvent,
        deleteEvent: deleteEvent,
        setModel: setModel,
        addParticipant: addParticipant,
        updateLike: updateLike,
        findEvents: findEvents,
        findEventsbyCreator: findEventsbyCreator,
        findEventByPerticipants: findEventByPerticipants
    };

    var mongoose = require('mongoose');

    var EventSchema = require('./event.schema.server')();
    var EventModel = mongoose.model('EventModel', EventSchema);

    return api;

    function findEventByPerticipants(userName) {
        return EventModel.find({participants:userName});
    }
    function findEventsbyCreator(userId) {
        return EventModel.find({_user:userId});
    }
    function updateLike(user, eventId, op) {
        return model.userModel
            .findUserById(user._id)
            .then(function (user) {
                return EventModel.findOne({_id:eventId})
                    .then(function (event) {
                        if(op == 'sub'){
                            event.likes -= 1;
                            user.likedEvents.splice(user.likedEvents.indexOf(eventId), 1);
                        }
                        else{
                            event.likes += 1;
                            user.likedEvents.push(eventId);
                        }
                        event.save();
                        user.save();
                        return event;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function addParticipant(eventId, user){
     return model.userModel
            .findUserById(user._id)
            .then(function (user) {
                return EventModel.update(
                    { _id: eventId },
                    { $addToSet: {participants: user.username } })
                    .then(function (event) {
                    user.events.push(eventId);
                    user.save();
                    return event;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }

    function createEvent(userId, newEvent){
        return EventModel
            .create(newEvent)
            .then(function (event) {
                return model
                    .userModel
                    .findUserById(userId)
                    .then(function (user) {
                        user.events.push(event);
                        event._user = user._id;
                        event.eventCreator = user.username;
                        user.save();
                        event.save();
                        return event;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }
    function findAllEventsForUser(userId){
        return EventModel.find({_event:userId});
    }
    function findEventById(eventId){
        return EventModel.findOne({_id:eventId});
    }
    function findEvents() {
        return EventModel.find({eventDate: {"$gte": Date.now()}}).sort({dateCreated:-1});
    }
    function findEventsByZip(zipcode, userId){
        console.log(userId);
        return model.userModel
            .findUserById(userId)
            .then(function (user) {
                var type1 = "INTEREST";
                var type2 = "INTEREST";
                var type3 = "INTEREST";
                if(user.sports){
                    type1 = "SPORT";
                }
                if(user.movies){
                    type2 = "MOVIE";
                }
                if(user.rest){
                    type3 = "REST";
                }
                return EventModel.find(
                    { $and: [ { type: { $in: [type1, type3] } }, { nearByZipcodes: zipcode, eventDate: {"$gte": Date.now()}} ] }
                    ).then(function (events) {
                        console.log(events);
                    return EventModel.find({ type: type2, eventDate: {"$gte": Date.now()}})
                        .then(function (movieEvents) {
                            console.log(movieEvents);
                        if(movieEvents[0]){
                            events = events.concat(movieEvents);
                        }
                        return events;
                    }, function (err) {
                        return err;
                    });
                }, function (err) {
                    return err;
                });
            }, function (err) {
                return err;
            });
    }
    function updateEvent(eventId, updatedEvent){
        return EventModel.update({_id:eventId},{$set: updatedEvent});
    }
    function deleteEvent(eventId) {
        return EventModel.findById(eventId).populate('_user').then(function (event) {
            event._user.events.splice(event._user.events.indexOf(eventId),1);
            event._user.save();
            var participants = event.participants;
            return deleteParticipantsAndComment(participants, eventId);
        }, function (err) {
            return err;
        });
    }

    function deleteParticipantsAndComment(participants, eventId) {
        if(participants.length == 0){
            return model.commentModel.deleteComment(eventId)
                .then(function (response) {
                    return EventModel.remove({_id:eventId})
                        .then(function (response) {
                            return response;
                        },
                        function (err) {
                            return err;
                        });
                }, function (err) {
                    return err;
                });
        }
        return model.userModel.findUserbyUsername(participants.shift())
            .then(function (user) {
                user.events.splice(user.events.indexOf(eventId), 1);
                user.save();
                return deleteParticipantsAndComment(participants,eventId);
            }, function (err) {
                return err;
            });
    }

    function setModel(_model) {
        model = _model;
    }
};