// const request = require('request-promise-native');

// const fetchMyIP = function() {
//   return request(`https://api.ipify.org?format=json`);
// };

// const fetchCoordsByIP = function(body) {
//   const ip = JSON.parse(body).ip;
//   return request(`https://ipvigilante.com/json/${ip}`);
// };

// const fetchISSFlyOverTimes = function(body) {
//   const { latitude, longitude } = JSON.parse(body).data;
//   const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
//   return request(url);
// };

// const nextISSTimesForMyLocation = function() {
//   return fetchMyIP()
//     .then(fetchCoordsByIP)
//     .then(fetchISSFlyOverTimes)
//     .then((data) => {
//       const { response } = JSON.parse(data);
//       return response;
//     });
// };



const request = require('request-promise-native');

//GETS COMPUTER'S IP ADDDRESS FROM IPIFY API
const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);
};

//GETS COMPUTER'S LOCATION COORDINATES BASED ON THE IP ADDRESS
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

//GETS THE ISS FLYOVER TIMES OF DURATION AND RISETIME
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

//CALLS ON ALL USING PROMISES TO index3.js
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
