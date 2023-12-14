const bcrypt = require('bcrypt');
const chai = require('chai');
const {describe, it} = require('mocha');


async function verifyLogin(credentials) {
    try {
      console.log('Received authentication request');
  
      const mockUser = {
        username: 'mockman',
        pwd: 'mockpwd',
        mockHash: '$2b$10$MlYwhZ4TO58SZcS1CX4MIuNYmbJcO99BTSpWN.i4gU1mJc1LvJEFC'
      }; // Mock user with hashed password
  
      if (credentials.username !== mockUser.username) {
        // User not found
        console.log('User not found');
        return { authenticated: false, error: 'User not found' };
      }
  
      const hashedPassword = mockUser.mockHash;
  
      const match = await bcrypt.compare(credentials.password, hashedPassword);
  
      if (match) {
        // Passwords match - User authenticated
        return { authenticated: true, message: 'User authenticated' };
      } else {
        // Passwords don't match
        console.log('Incorrect password');
        return { authenticated: false, error: 'Incorrect password' };
      }
    } catch (error) {
      console.log('Server error during authentication');
      return { authenticated: false, error: 'Server error during authentication' };
    }
  }
  
 describe('verifyLogin', () => {
    it('should login with correct username and password', async () => {
      const correctUser = { username: 'mockman', password: 'mockpwd' };
  
      const result = await verifyLogin(correctUser);
  
      chai.expect(result).to.be.an('object').that.deep.equals({
        authenticated: true, 
        message: 'User authenticated'}
      );
    });

    it('should not login with false username', async ()=> {
        const falseusernamecorrectpwd = { username: 'mockwoman', password: 'mockpwd' };
        const result = await verifyLogin(falseusernamecorrectpwd);
        chai.expect(result).to.be.an('object').that.deep.equals({
            authenticated: false,
            error: 'User not found'
    })
    
  });

  it('should not login with incorrect password', async()=>{
    const userwrongpwd = { username: 'mockman', password: 'mockwrongpwd' };
    const result = await verifyLogin(userwrongpwd);
   

    chai.expect(result).to.be.an('object').that.deep.equals({ 
        authenticated: false, 
        error: 'Incorrect password'
    })
})
})
