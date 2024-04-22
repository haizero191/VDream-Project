const bcrypt = require('bcrypt');

const saltRounds = 10; // Số lượng vòng lặp băm

const hashPassword = (plainPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
}

const verifyPassword = async (plainPassword, storedHash) => {
    try {
      return await bcrypt.compare(plainPassword, storedHash);
    } catch (error) {
      return false;
    }
}

module.exports = {hashPassword, verifyPassword};