module.exports = function (app) {

    var models=require('./model/models.server')();
    require('./services/user.service.server')(app,models.userModel);
    require('./services/event.service.server')(app,models.eventModel);
    require('./services/comment.service.server')(app,models.commentModel);
    // require('./services/page.service.server')(app,models.pageModel);
    // require('./services/widget.service.server')(app,models.widgetModel);
};