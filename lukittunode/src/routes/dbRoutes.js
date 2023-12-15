//Responses only as JSON currently
//In POSTMAN -> BODY -> RAW -> JSON for POST bodies Queries

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviesController');//Users Watch history and Watch list
const reviewController = require('../controllers/reviewsController');//Users reviews
const groupController = require('../controllers/groupController');//Group related queries
const userController = require('../controllers/userController');//For User creation and what groups the user is in
const watchListController = require('../controllers/watchListController');//Managing users Watchlists

//WATCH LIST
router.get('/users/watchlist/:uId', watchListController.getUsersWatchlist);//Get Users Movies in their Watchlist
router.post('/users/watchlist', watchListController.addMovieToUsersWatchlist);//Add a Movie to Users watchlist
router.delete('/users/watchlist/:uId/:movieId', watchListController.removeMovieFromUsersWatchlist);//Remove a movie from Users Watchlist



//REVIEWS
router.get('/users/watchreviews/:uId', reviewController.getUsersReviews);//What reviews a certain user has posted
router.get('/movies/watchreviews/:movieId', reviewController.getMovieReviews);//ALL the reviews a certain movie has
router.delete('/users/watchreviews/:uId/:reviewId', reviewController.removeReview);//Delete a certain review by ID
router.post('/users/watchreviews', reviewController.postMovieReview);//Create a new review for user
router.get('/users/group/reviews/:uId', reviewController.getTwoLatestReviewsFromUsersGroups);//Get two of your groups latest reviews
router.get('/watchreviews', reviewController.getFiveLatestReviews);//For mainpage get the Five Latest Reviews

//WATCH HISTORY
router.get('/users/watchhistory/:uId', movieController.getUserWatchHistory);//Get a spesific users watchhistory
router.post('/users/watchhistory', movieController.addMovieToWatchHistory);//Add a new movie to a users history
router.delete('/users/watchhistory/:uId/:movieId', movieController.removeMovieFromHistory);//Remove a movie from users history by userID and movieID
router.get('/users/similar/:uId', movieController.getUsersSimilars);//Get 9 Recommended movies for the users from their 3 lates Movies in History

//USERS
router.get('/users', userController.getUsers);//Get all users IDs Names and Passwords
router.get('/users/groups/:uId', userController.getUsersGroups);//Get all the groups an user is in
router.get('/users/:uId', userController.getUserById);//Get user by ID
router.get('/users/name/:uName', userController.getUserByUsername);//Get user by Username
router.post('/users', userController.createUser);//Create a new user (SIGN UP)
router.delete('/users/:uId', userController.deleteUser);//Delete an user by userID

//GROUPS
router.get('/groups', groupController.getAllGroups);//Get all groups and the ownersID
router.get('/groups/:groupId', groupController.getGroupInfoByID)//Gets a groups details by its ID
router.get('/groups/members/:groupId', groupController.getAllMembersByID);//Get all members of a group by groupID
router.post('/groups', groupController.createGroup);//Create a group, insert the owners ID
router.post('/groups/add-member', groupController.addMember);//Add a member to group, determines admin rights
router.delete('/groups/:groupId/:deletedId', groupController.removeMember);//Delete a member from a group, Insert the ADMINs ID and the userID you want to remove
router.delete('/groups/:groupId', groupController.deleteGroup);//Delete a group by a groups ID and admins ID
router.get('/groups/chat/:groupId', groupController.getGroupChatsByID);//Get a Groups all Chats
router.post('/groups/chat', groupController.postGroupChat);//Post a Group Chat
router.get('/groups/members/reviews/:groupId', groupController.getGroupMembersReviews);//Get All reviews of Groupmembers

router.post('/groups/member/joinrequest', groupController.insertJoinRequest);//Request to join a group
router.get('/groups/admin/joinrequests/:adminId', groupController.viewAdminsJoinRequests);//See Admins all Join requests
router.post('/groups/admin/joinrequests/accept', groupController.acceptJoinRequest);//Accept a join request and insert user into group
router.post('/groups/admin/joinrequests/reject', groupController.rejectJoinRequest);//Reject a join request


module.exports = router;
