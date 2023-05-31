const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (req, res) => {
    Comment.findAll({ include: [User, Post] })
        .then(dbComments => {
            res.json(dbComments);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.get("/:id", (req, res) => {
    Comment.findByPk(req.params.id, { include: [User, Post] })
        .then(dbComment => {
            res.json(dbComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.post("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login first!" });
    }
    console.log(req.body);
    Comment.create({
        body: req.body.body,
        userId: req.session.user.id,
        blogId: req.body.blogId
    })
        .then(newComment => {
            console.log(newComment);
            res.json(newComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.put("/:id", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login first!" });
    }
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then(updatedComment => {
        res.json(updatedComment);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.delete("/", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: "Please login first!" });
    }
    Comment.destroy(req.body, {
        where: {
            id: req.params.id
        }
    }).then(delComment => {
        res.json(delComment);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

module.exports = router;