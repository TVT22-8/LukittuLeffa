//Barebones GET and POST requests for user data
//Sends only as JSON currently
//In POSTMAN -> BODY -> RAW -> JSON for POST

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');
const reviewController = require('../controllers/reviewsController');
const groupController = require('../controllers/groupController');
const userController = require('../controllers/userController');

router.get('/users/watchreviews/:uId', reviewController.getUsersReviews);
router.delete('/users/watchreviews/:uId/:reviewId', reviewController.removeReview);
router.post('/users/watchreviews', reviewController.postMovieReview);

router.get('/users/watchhistory/:uId', movieController.getUserWatchHistory);
router.post('/users/watchhistory', movieController.addMovieToWatchHistory);
router.delete('/users/watchhistory/:uId/:movieId', movieController.removeMovieFromHistory);

router.get('/users', userController.getUsers);
router.get('/users/:uId', userController.getUsersById);
router.get('/users/groups/:uId', userController.getUsersGroups);
router.post('/users', userController.createUser);
router.delete('/users/:uId', userController.deleteUser);

router.get('/groups', groupController.getAllGroups);
router.get('/groups/members/:groupId', groupController.getAllMembersByID);
router.post('/groups', groupController.createGroup);
router.post('/groups/add-member', groupController.addMember);
router.delete('/groups/:groupId/:adminId/:deletedId', groupController.removeMember);
router.delete('/groups/:groupId/:adminId', groupController.deleteGroup);


module.exports = router;