module.exports = function () {
    var api = {
        createComment: createComment,
        findCommentsById: findCommentsById,
        findComments: findComments,
        deleteComment: deleteComment,
        setModel: setModel,
    };

    var mongoose = require('mongoose');

    var CommentSchema = require('./commentBox.schema.server')();
    var CommentModel = mongoose.model('CommentModel', CommentSchema);

    return api;

    function findCommentsById(eventId) {
        return CommentModel.find({eventId:eventId}).sort({dateCreated:-1});
    }

    function createComment(newComment){
        return CommentModel
            .create(newComment)
            .then(function (newComment) {
                return findCommentsById(newComment.eventId)
                    .then(function (comments) {
                        return comments;
                    }, function (err) {
                        return err;
                    });
            }, function (err) {
                return err;
            });
    }
    function findComments(userId){
        return EventModel.find({_event:userId});
    }
    function findEventById(eventId){
        return EventModel.findOne({_id:eventId});
    }
    function findEventsByZip(zipcode, userId){
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
                    { $and: [ { type: { $in: [type1, type2, type3] } }, { nearByZipcodes: zipcode, eventDate: {"$gte": Date.now()}} ] }
                ).then(function (events) {
                    return events;
                }, function (err) {
                    return err;
                });
            }, function (err) {
                return err;
            });
    }

    function deleteComment(eventId) {
        return CommentModel.remove({eventId:eventId}).then(function (response) {
            return response;
        }, function (err) {
            return err;
        });
    }

    function setModel(_model) {
        model = _model;
    }
};