const withAuth = (req, res, next) => {
    if (!req.session.userId) {
        console.log('About to redirect');
        res.redirect('/login');
    } else {
        console.log(req.session.userId);
        next();
    }
};

module.exports = withAuth;