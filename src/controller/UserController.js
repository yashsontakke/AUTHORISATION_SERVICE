const UserService = require('../services/UserService');

class UserController {
    static async createUser(req, res) {

        try {
            const userService = new UserService();
            const newUser = await userService.createUser(req.body);

            // Return a success response
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            // Return an error response
            res.status(500).json({ message: 'Failed to create user', error: error.message });
        }
    }

    static async deleteUser(req, res) {
        const userId = req.params.id;

        try {
            const userService = new UserService();
            const deletedUserCount = await userService.deleteUser(userId);

            // Return a success response
            res.status(200).json({ message: 'User deleted successfully', deletedUserCount });
        } catch (error) {
            // Return an error response
            res.status(500).json({ message: 'Failed to delete user', error: error.message });
        }
    }
    static async signIn(req, res) {
        const { email, password } = req.body;
        try {
            const userService = new UserService();
            const token = await userService.signIn(email, password);
            res.json({ token: token, message: "Successfully Signed in" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static isAuthenticated = async (req, res) => {
        try {
            const userService = new UserService();
            const token = req.headers['x-access-token'];
            const response = await userService.isAuthenticated(token);
            return res.status(200).json({
                success: true,
                err: {},
                data: response,
                message: 'user is authenticated and token is valid'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something went wrong',
                data: {},
                success: false,
                err: error
            });
        }
    }


    static isAdmin = async (req, res) => {
        try {
            const userId = req.body.id;
            const userService = new UserService();
            const isAdmin = await userService.isAdmin(userId);

            if (!isAdmin) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            // User is an admin, proceed with the controller logic
            // ...
        } catch (error) {
            return res.status(500).json({ error: 'Failed to check admin status' });
        }
    };




}

module.exports = UserController;
