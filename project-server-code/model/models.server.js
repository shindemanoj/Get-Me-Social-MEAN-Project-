module.exports = function () {

    var userModel       = require("./user/user.model.server")();
    var eventModel       = require("./event/event.model.server")();
    var commentModel    = require("./comments/commentBox.model.server")();

    var model = {
        userModel: userModel,
        eventModel: eventModel,
        commentModel: commentModel

    };

    userModel.setModel(model);
    eventModel.setModel(model);
    commentModel.setModel(model);

    return model;
};