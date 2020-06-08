'use strict';

module.exports.setResponse = function setResponse(data = {}, msg = '', code = 200) {
  return {
    code, data, msg,
  };
};
