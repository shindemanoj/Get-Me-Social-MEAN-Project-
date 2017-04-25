module.exports = function (app,eventModel) {
    app.get("/api/event/:eventId", findEventById);
    app.put("/api/updateEvent/:eventId", updateEvent);
    app.delete("/api/event/:eventId", deleteEvent);
    app.get("/api/event", findEventsByZip);
    app.post("/api/user/:userId/event", createEvent);
    app.put("/api/event/:eventId", addParticipant);
    app.put("/api/like", updateLike);
    app.put("/api/views", updateViews);
    app.get("/api/events", findEvents);

    function findEvents(req, res) {
        eventModel
            .findEvents()
            .then(function (events) {
                res.json(events);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateViews(req, res) {
        var eventId = req.query['eventId'];
        var user = req.body;
        eventModel
            .updateViews(user, eventId)
            .then(function (event) {
                res.json(event);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function updateLike(req, res) {
        var op = req.query['op'];
        var eventId = req.query['eventId'];
        var user = req.body;
        eventModel
            .updateLike(user, eventId, op)
            .then(function (event) {
                res.json(event);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function deleteEvent(req, res) {
        var eventId = req.params.eventId;
        eventModel
            .deleteEvent(eventId)
            .then(function (response) {
                if(response.result.n==1 && response.result.ok==1){
                    res.sendStatus(200);
                }
                else
                {
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });

    }

    function addParticipant(req, res){
        var eventId = req.params.eventId;
        var user = req.body;
        eventModel
            .addParticipant(eventId, user)
            .then(function (response) {
                res.json(response);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function createEvent(req, res) {
        var event = req.body;
        event.dateCreated = Date.now();
        var userId = req.params['userId'];
        eventModel
            .createEvent(userId,event)
            .then(function (event) {
                res.json(event);
            },function (err) {
                res.sendStatus(404);
            });
    }

    function updateEvent(req, res) {
        var eventId = req.params.eventId;
        var event = req.body;
        eventModel
            .updateEvent(eventId,event)
            .then(function (response) {
                if (response.ok == 1 && response.n == 1) {
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            },function (err) {
                res.sendStatus(404);
            });

    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);

            },function (err) {
                res.sendStatus(404);
            });
    }

    function findEventById(req, res) {
        var eventId = req.params['eventId'];
        eventModel
            .findEventById(eventId)
            .then(function (event) {
                res.json(event);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function findEventsByZip(req, res) {
        var zipcode = req.query['zipcode'];
        var userId = req.query['userId'];
        eventModel
            .findEventsByZip(zipcode, userId)
            .then(function (events) {
                if(events[0]){
                    // res.json(events);
                    res.send(events);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

};