const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    User.findAll({
        include: [Post, Comment]
    })
        .then(dbUsers => {
            res.json(dbUsers);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, { include: [Post, Comment] })
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.post("/", (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password,
        })
        .then((dbUserData) => {
            req.session.save(() => {
                req.session.user = {
                    id: dbUserData.id,
                    username: dbUserData.username
                }
                req.session.userId = dbUserData.id;
                req.session.username = dbUserData.username; 
                req.session.loggedIn = true;
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(400).json({ msg: "Wrong login credentials." })
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.save ((  ) => {
                req.session.user = {
                    id: foundUser.id,
                    username: foundUser.username
                }
                req.session.userId = foundUser.id;
                req.session.username = foundUser.username; 
                req.session.loggedIn = true;
                return res.json(foundUser);
            });
            // return res.json(foundUser)
        } else {
            return res.status(400).json({ msg: "Wrong login credentials." })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "An error occured", err });
    });
});

router.put("/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        },
        individualHooks: true
    }).then(updatedUser => {
        res.json(updatedUser);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(delUser => {
        res.json(delUser);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: "An error occured", err });
        });
});

module.exports = router;