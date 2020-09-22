const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const UsersModel = require('../models/usersModel');


router.get('/', (req, res) => {
    res.redirect("/users/login");
});

router.get('/login', (req, res) => {
    res.render ('template', {
        locals: {
            title: 'Login'
            
        },
        partials: {
            partial: "partial-login"
        },
    });
});

router.get('/signup', (req, res) => {
    res.render ('template', {
        locals: {
            title: "signup"
            
        },
        partials: {
            partial: 'partial-signup'
        },
    });
});


router.post('/signup', (req, res) => {
    const { reviewer_name, reviewer_email, password } = req.body;
    
    // SALT AND HASH OUR PASSWORD!
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new UsersModel(null, reviewer_name, reviewer_email, hash);

    userInstance.save().then(response => {
        if (response.id !== undefined) {
            res.redirect('/users/login');
        } else {
            res.redirect('/users/signup');
        }
    })
})

router.post('/login', (req, res) => {
    const { reviewer_email, password } = req.body;
    const userInstance = new UsersModel(null, null, reviewer_email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            const { reviewer_name, user_id } = response;
            req.session.reviewer_name = reviewer_name;
            req.session.user_id = user_id;
            res.redirect('/')
        } else {
            res.sendStatus(401);
        }
    })
    
})

module.exports = router;