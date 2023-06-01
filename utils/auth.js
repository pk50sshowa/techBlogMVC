const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        console.log('About to redirect');
        res.redirect('/login');
    } else {
        console.log(req.session.user_id);
        next();
    }
};

module.exports = withAuth;