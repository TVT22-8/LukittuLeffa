const bcrypt = require('bcrypt');
const express = require('express');
const userController = require('../controllers/userController');
const app = express();
const bodyParser = require('body-parser');

//app.use(express.json());
app.use(bodyParser.json());

app.post('http://localhost:3002/verifylogin', (req, res) => {
  
  const receivedData = req.body;
  const { username, password } = receivedData;
  console.log('Received data on the backend:', username, password);

  // You can perform additional processing here

  // Sending a response back to the frontend
  res.json({ message: 'Data received successfully on the backend!' });
});

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