function validateUser(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // You can add additional validation logic here if needed

    // Pass the validated user data to the next middleware or route handler
    req.user = { email, password };
    next();
}

const validateIsAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User id not given',
            message: 'Something went wrong'
        })
    }
    next();
}

module.exports = {
    validateUser,
    validateIsAdminRequest
}