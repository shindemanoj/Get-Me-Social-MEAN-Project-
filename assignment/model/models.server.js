module.exports = function () {
    // var mongoose = require('mongoose');
    // // var connectionString = 'mongodb://127.0.0.1:27017/test';
    // var connectionString = 'mongodb://127.0.0.1:27017/assignment';
    // if(process.env.MLAB_USERNAME) {
    //     connectionString = process.env.MLAB_USERNAME + ":" +
    //         process.env.MLAB_PASSWORD + "@" +
    //         process.env.MLAB_HOST + ':' +
    //         process.env.MLAB_PORT + '/' +
    //         process.env.MLAB_APP_NAME;
    // }
    // mongoose.connect(connectionString);
    //
    var userModel       = require("./user/user.model.server")();
    var eventModel       = require("./event/event.model.server")();
    var commentModel    = require("./comments/commentBox.model.server")();
    // var pageModel       = require("./page/page.model.server")();
    // var widgetModel     = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        eventModel: eventModel,
        commentModel: commentModel
        // websiteModel: websiteModel,
        // pageModel:pageModel,
        // widgetModel:widgetModel
    };

    userModel.setModel(model);
    eventModel.setModel(model);
    commentModel.setModel(model);
    // websiteModel.setModel(model);
    // pageModel.setModel(model);
    // widgetModel.setModel(model);

    return model;
};