const request = require('request');

const url = "https://api.ipify.org?format=json";

//GETS COMPUTER'S IP ADDDRESS
const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//GETS COMPUTER'S LOCATION COORDINATES BASED ON THE IP ADDRESS
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg1 = `Status code ${response.statusCode} when fetching coordinates of IP. Response: ${body}`;
      return callback(Error(msg1), null);
    }

    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude});
  });
};

//GETS THE ISS FLYOVER TIMES OF DURATION AND RISETIME
const fetchISSFlyOverTimes = function(coords, callback) {
  const url1 = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url1, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg2 = `Status code ${response.statusCode} when fetching coordinates of ISS PassTimes. Response: ${body}`;
      return callback(Error(msg2), null);
    }

    const passTimes = JSON.parse(body).response;
    callback(null, passTimes);
  });
};

//CALLS ON ALL USING CALLBACKS TO index3.js
const nextISSTimesForMyLocation = function(callback) {
  //FIRST FUNCTION CALL
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    //NESTED CALLBACK #2
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        callback(error, null);
        return;
      }
      //NESTED CALLBACK #3
      fetchISSFlyOverTimes(loc, (error, nextPassTimes) => {
        if (error) {
          callback(error, null);
          return; 
        }
        //FINAL CALLBACK
        callback(null, nextPassTimes);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
