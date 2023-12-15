// GET USER GET USER BY ID USER GROUPS
const { expect } = require('chai');
const sinon = require('sinon');
const userController = require('../controllers/userController');

describe('Test userController Functions', () => {

    it('Should get all users', async () => {
        const res = {
          json: sinon.spy(),
          status: () => ({ json: () => {} }),
        };
      
        try {
          await userController.getUsers({}, res);
          expect(res.json.calledOnce).to.be.true;
          const result = res.json.firstCall.args[0];
          //console.log('Result:', result); NOTE: if console log on test will be over 2sec and have a timeout error
          expect(result).to.be.an('array');
        } catch (error) {
          console.error('Test failed with error:', error); // Log any errors that occur
          throw error; // Rethrow the error to fail the test and display details
        }
      });
      
    it('Should get user by id', async () => {
        const userId = '21';
    

        const req = { params: { uId: userId } };
        const res = {
           json: sinon.spy(), // Using Sinon.js spy to track the method call
           status: () => ({ json: () => {} }), // Stub for status method
        };

    // Call the controller function directly with the request and response objects
         await userController.getUserById(req, res);


    // Assert that res.json was called once
         expect(res.json.calledOnce).to.be.true;
         const result = res.json.firstCall.args[0];
    //console.log(result);
         expect(result).to.be.an('array');
         result.forEach(item => {
          expect(item).to.be.an('object');
          const info = item;
          expect(info).to.have.property('username');
          expect(info).to.have.property('userid');
          expect(info).to.have.property('pwd');
        });

    

    });

    it('Should get users groups by id', async () => {
        const userId = '21';
    

        const req = { params: { uId: userId } };
        const res = {
           json: sinon.spy(), // Using Sinon.js spy to track the method call
           status: () => ({ json: () => {} }), // Stub for status method
        };

    // Call the controller function directly with the request and response objects
         await userController.getUsersGroups(req, res);


    // Assert that res.json was called once
         expect(res.json.calledOnce).to.be.true;
         const result = res.json.firstCall.args[0];
    //console.log(result);
         expect(result).to.be.an('array');
         result.forEach(item => {
          expect(item).to.be.an('object');
          const info = item;
          expect(info).to.have.property('username');
          expect(info).to.have.property('groupid');
          expect(info).to.have.property('groupname');
          expect(info).to.have.property('description');
          expect(info).to.have.property('is_admin');
        });

    

    });

});