    module.exports = function () {
    var model = null;
    var mongoose = require("mongoose");
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        "createUser": createUser,
        "findUserById":findUserById,
        "findUserbyUsername":findUserbyUsername,
        "findUserByCredentials":findUserByCredentials,
        "deleteUser":deleteUser,
        "updateUser":updateUser,
        "findAllUsers": findAllUsers,
        "setModel":setModel,
        "findUserByGoogleId":findUserByGoogleId,
        "findUserByFacebookId": findUserByFacebookId

    };

    return api;

        function findUserByFacebookId(facebookId) {
            return UserModel.findOne({'facebook.id': facebookId});
        }
        function findUserByGoogleId(googleId) {
            return UserModel.findOne({'google.id': googleId});
        }

    function findAllUsers() {
        return UserModel.find().sort({dateCreated:-1});
    }

    function createUser(user) {
        delete user._id;
        return UserModel.create(user);
    }
    function findUserById(userId) {
        return UserModel.findById(userId);
    }
    function findUserbyUsername(username) {
        return UserModel.findOne({"username":username});
    }
    function findUserByCredentials(_username, _password) {
        return UserModel.find({username:_username, password: _password});
    }

    function deleteUser(userId) {
        return model.eventModel.findEventsbyCreator(userId)
            .then(function (events) {
                var eventsForUser = events;
                return deleteAll(eventsForUser, userId);
            }, function (err) {
                return err;
            });
    }

    function deleteAll(events, userId) {
        if(events.length == 0){
            return findUserById(userId)
                .then(function (user) {
                        return model.eventModel.findEventByPerticipants(user.username)
                            .then(function (participatedEvents) {
                                    console.log("Prticipated Events Array:"+ participatedEvents)
                                    return spliceUserFromEvents(participatedEvents, user);
                                },
                                function (err) {
                                    return err;
                                });
                    },
                    function (err) {
                        return err;
                    });
        }
        model.eventModel.deleteEvent(events.shift()._id)
            .then(function (res) {
                return deleteAll(events, userId);
            }, function (err) {
                return err;
            });
    }

    function spliceUserFromEvents(events, user) {
        if(events.length == 0){
            return UserModel.remove({_id:user._id})
                .then(function (response) {
                        return response;
                    },
                    function (err) {
                        return err;
                    });

        }
        model.eventModel.findEventById(events.shift()._id)
            .then(function (event) {
                event.participants.splice(event.participants.indexOf(user.username), 1);
                event.save();
                return spliceUserFromEvents(events, user);
            }, function (err) {
                return err;
            });
    }

    function updateUser(userId, updatedUser) {
        return UserModel.update({_id:userId},{$set:updatedUser});
    }
    function setModel(_model) {
        model = _model;
    }
};