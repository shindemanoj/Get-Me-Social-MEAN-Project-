module.exports = function() {
    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
        eventId: {type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'},
        description: String,
        imageUrl: String,
        userName: {type: String},
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "gms.comments"});
    return CommentSchema;
};