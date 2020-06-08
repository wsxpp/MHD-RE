'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const keyPath = path.join(__dirname, '../appConfig/jwt.key');
const privateKey = fs.readFileSync(keyPath);

module.exports.setJwt = function setJwt(payload) {
  return jwt.sign(payload, privateKey, { expiresIn: '1d' });
};

module.exports.getJwt = function getJwt(token) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return { success: true, info: decoded };
  } catch (err) {
    return { success: false, info: err.message };
  }
};
