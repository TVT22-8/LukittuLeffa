const { expect } = require('chai');
const sinon = require('sinon');
const groupController = require('../controllers/groupController');

describe('Test User Review Functions', () => {
  

  it('should get all Groups', async () => {
    

    const req = { params: { } };
    const res = {
      json: sinon.spy(), // Using Sinon.js spy to track the method call
      status: () => ({ json: () => {} }), // Stub for status method
    };

    // Call the controller function directly with the request and response objects
    await groupController.getAllGroups(req, res);


    // Assert that res.json was called once
    expect(res.json.calledOnce).to.be.true;
    const result = res.json.firstCall.args[0];
    //console.log(result);
    expect(result).to.be.an('array');

    result.forEach(item => {
        expect(item).to.be.an('object');
        const movie = item;
        expect(movie).to.have.property('groupid');
        expect(movie).to.have.property('groupname');
        expect(movie).to.have.property('description');
        expect(movie).to.have.property('owner_userid');
        });  
    });

    it('should get a Groups info', async () => {
    
        const groupsId = '9';

        const req = { params: { groupId: groupsId } };
        const res = {
          json: sinon.spy(), // Using Sinon.js spy to track the method call
          status: () => ({ json: () => {} }), // Stub for status method
        };
    
        // Call the controller function directly with the request and response objects
        await groupController.getGroupInfoByID(req, res);
    
    
        // Assert that res.json was called once
        expect(res.json.calledOnce).to.be.true;
        const result = res.json.firstCall.args[0];
        //console.log(result);
        expect(result).to.be.an('array');
    
        result.forEach(item => {
            expect(item).to.be.an('object');
            const movie = item;
            expect(movie).to.have.property('groupid');
            expect(movie).to.have.property('groupname');
            expect(movie).to.have.property('description');
            expect(movie).to.have.property('owner');
            });  
        });

    it('should get a Groups Chat log', async () => {
    
        const groupsId = '9';
    
        const req = { params: { groupId: groupsId } };
        const res = {
            json: sinon.spy(), // Using Sinon.js spy to track the method call
          status: () => ({ json: () => {} }), // Stub for status method
        };
        
        // Call the controller function directly with the request and response objects
        await groupController.getGroupChatsByID(req, res);
        
        
        // Assert that res.json was called once
        expect(res.json.calledOnce).to.be.true;
        const result = res.json.firstCall.args[0];
        //console.log(result);
        expect(result).to.be.an('array');
        
    result.forEach(item => {
        expect(item).to.be.an('object');
        const movie = item;
        expect(movie).to.have.property('chat_id');
        expect(movie).to.have.property('username');
        expect(movie).to.have.property('message_text');
        expect(movie).to.have.property('timestamp');
        });  
    });

    it('should get Group Members Reviews', async () => {
    
        const groupsId = '9';
        
        const req = { params: { groupId: groupsId } };
        const res = {
          json: sinon.spy(), // Using Sinon.js spy to track the method call
          status: () => ({ json: () => {} }), // Stub for status method
        };
            
                // Call the controller function directly with the request and response objects
        await groupController.getGroupMembersReviews(req, res);
            
            
        // Assert that res.json was called once
        expect(res.json.calledOnce).to.be.true;
        const result = res.json.firstCall.args[0];
        //console.log(result);
        expect(result).to.be.an('array');
            
        result.forEach(item => {
            expect(item).to.be.an('object');
            const movie = item;
            expect(movie).to.have.property('reviewid');
            expect(movie).to.have.property('reviewtext');
            expect(movie).to.have.property('rating');
            expect(movie).to.have.property('reviewdate');
            expect(movie).to.have.property('watchhistory_movieid');
            expect(movie).to.have.property('userlukittu_userid');
            expect(movie).to.have.property('title');
        });  
    });
});