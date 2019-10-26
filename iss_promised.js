const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

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

// OLD FUNCTION USING CALLBACKS
//  // use request to fetch users IP address from JSON API
//  request(url, (error, response, body) => {
//   // Returns an error(via Callback), if any (it's nullable), needs to be a string
//   if (error) {
//     return callback(error, null);
//   }
//   // if non-200 status, assume server error
//   if (response.statusCode !== 200) {
//     const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//     callback(Error(msg), null);
//     return;
//   }
//   // inside the request callback ...
//   // error can be set if invalid domain, user is offline, etc.
//   const ip = JSON.parse(body).ip;
//   callback(null, ip);
// });