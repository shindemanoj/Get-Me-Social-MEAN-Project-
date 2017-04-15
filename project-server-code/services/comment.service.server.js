module.exports = function (app,commentModel) {
    app.get("/api/comment/:eventId", findCommentsById);
    app.post("/api/comment/:eventId", createComment);

    function createComment(req, res) {
        var user = req.body;
        var eventId = req.params['eventId'];
        var newComment = {
            eventId: eventId,
            description: user.comment,
            imageUrl: user.imageUrl,
            userName: user.username,
            dateCreated: Date.now()
        };
        commentModel
            .createComment(newComment)
            .then(function (comments) {
                res.json(comments);
            }, function (err) {
                res.sendStatus(404).send(err);
            });

    }

    function findCommentsById(req, res) {
        var eventId = req.params['eventId'];
        commentModel
            .findCommentsById(eventId)
            .then(function (comments) {
                res.json(comments);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
}