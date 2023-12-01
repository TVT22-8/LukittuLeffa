//Barebones GET and POST requests for user data
//Sends only as JSON currently
//In POSTMAN -> BODY -> RAW -> JSON for POST

const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/users/:uId', userController.getUserbyId);
router.post('/users', userController.createUser);
router.delete('/users/:uId', userController.deleteUser);

router.get('/groups', groupController.getAllGroups);
router.post('/groups', groupController.createGroup);
router.delete('/groups/:groupId/:adminId/:deletedId', groupController.removeMember);
router.delete('/groups/:groupId/:adminId', groupController.deleteGroup);
router.post('/groups/add-member', groupController.addMember);

module.exports = router;