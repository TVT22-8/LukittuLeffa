// Mocha & Chai Testaus
const bcrypt = require('bcrypt');
async function verifyPassword(plainPassword, hashedPasswordFromDB) {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
      console.log(match); // Returns true if passwords match, false otherwise
      return match;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false; // Return false in case of an error
    }
  }

  verifyPassword('canuseemen','$2b$10$wpg7W5YiRA8I9I6pSnQHi.OHbjhYxfAyr2ynqr2xnugIE3ZbPzmWW');