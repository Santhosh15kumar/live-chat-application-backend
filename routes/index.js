const userController = require('../controllers/user');
const agentController = require('../controllers/agent');
const authenticateToken = require('../middleware/auth');

const router = require('express').Router();

router.post('/user/register', userController.create);
router.post('/agent/register', agentController.register);
router.post('/agent/login', authenticateToken, agentController.login);

module.exports = router;