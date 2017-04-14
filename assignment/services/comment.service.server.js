module.exports = function (app,commentModel) {
    app.get("/api/comment/:eventId", findCommentsById);
    app.post("/api/comment/:eventId", createComment);

    // function deleteUser(req, res) {
    //     var userId = req.params.userId;
    //     userModel
    //         .deleteUser(userId)
    //         .then(function (response) {
    //             res.sendStatus(200);
    //         }, function (err) {
    //             res.sendStatus(404);
    //         });
    // }


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
        console.log(newComment);
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
    // function updateUser(req, res) {
    //     var userId = req.params['userId'];
    //     var newUser = req.body;
    //     userModel
    //         .updateUser(userId, newUser)
    //         .then(function (response) {
    //             if (response.nModified === 1) {
    //                 // Update was successful
    //                 userModel
    //                     .findUserById(userId)
    //                     .then(function (response) {
    //                         res.json(response);
    //                     }, function () {
    //                         res.sendStatus(404);
    //                     })
    //             }
    //             else {
    //                 res.sendStatus(404);
    //             }
    //         }, function () {
    //             res.sendStatus(404);
    //         });
    // }

    // function findUserByUserId(req, res) {
    //     var userId = req.params.userId;
    //     userModel
    //         .findUserById(userId)
    //         .then(function (user) {
    //             res.json(user);
    //         }, function (err) {
    //             res.sendStatus(500).send(err);
    //         });
    //
    // }

    // function findUser(req, res) {
    //     var username = req.query['username'];
    //     var password = req.query['password'];
    //     if (username && password) {
    //         findUserByCredentials(req, res);
    //     } else if (username) {
    //         findUserByUsername(req, res);
    //     }
    // }
    //
    // function findUserByUsername(req, res) {
    //     var username = req.query.username;
    //     userModel
    //         .findUserByUsername(username)
    //         .then(function (users) {
    //             if (users.length != 0) {
    //                 res.json(users[0]);
    //             }
    //             else {
    //                 res.sendStatus(404);
    //             }
    //         }, function (err) {
    //             res.sendStatus(404);
    //         });
    // }


}