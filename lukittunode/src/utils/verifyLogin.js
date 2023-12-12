const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');

async function checkPassword(inputPassword, hashedPassword) {
    try {
      const match = await bcrypt.compare(inputPassword, hashedPassword);
      return match; // Returns true if passwords match, false otherwise
    } catch (error) {
      console.error('Error checking password:', error);
      throw new Error('Error checking password');
    }
  };

  async function authenticateUser(username, inputPassword) {
    try {
      // Introduce a 2-second delay using setTimeout
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
  
      const userData = await userController.getUserByUsername({ params: { uName: username } });
  
      if (userData && userData.length > 0) {
        const hashedPassword = userData[0].pwd; // Assuming 'pwd' is the column name for hashed password
  
        // Check if the provided password matches the hashed password retrieved from the database
        const isPasswordValid = await checkPassword(inputPassword, hashedPassword);
  
        if (isPasswordValid) {
          console.log('Authentication successful');
          return { authenticated: true, user: userData[0] };
        } else {
          console.log('Invalid password');
          return { authenticated: false, error: 'Invalid password' };
        }
      } else {
        console.log('User not found');
        return { authenticated: false, error: 'User not found' };
      }
    } catch (error) {
      console.error('Error:', error.message);
      return { authenticated: false, error: 'Server error during authentication' };
    }
  }

  module.exports = authenticateUser;