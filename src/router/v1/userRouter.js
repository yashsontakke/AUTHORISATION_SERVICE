const UserController = require('../../controller/UserController');

const express = require('express');
const app = express();

const router = express.Router();

router.post('/signup', UserController.createUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
