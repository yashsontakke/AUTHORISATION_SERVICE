const UserController = require('../../controller/UserController');
const { authUserMiddleware } = require("../../middleware/index");

const express = require('express');
const app = express();

const router = express.Router();

router.post('/signup', authUserMiddleware.validateUser, UserController.createUser);
router.post('/signin', authUserMiddleware.validateUser, UserController.signIn);
router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
);
router.get('/isAdmin' ,authUserMiddleware.validateIsAdminRequest, UserController.isAdmin);


module.exports = router;
