const request = require('request');

// const url = "https://api.ipify.org?format=json";
// THIS IS THE OLD FUNCTION 
// const fetchMyIP = function(callback) {
//   // use request to fetch users IP address from JSON API
//   request(url, (error, response, body) => {
//     // Returns an error(via Callback), if any (it's nullable), needs to be a string
//     if (error) {
//       return callback(error, null);
//     }
//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }
//     // inside the request callback ...
//     // error can be set if invalid domain, user is offline, etc.
//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    //Makes a single API request to retrieve the lat/lng for a given IPv4 address.
    if (error) {
      callback(error, null);
      return;
    }
    //That ip (ipv4) address string is checked as a callback for error check
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }
    //this doublechecks to see if a 200 code is present, throws error if it isn't
    const { latitude, longitude } = JSON.parse(body).data;
    //this is actually doing what we want to do, check null against latitude/longitude
    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchCoordsByIP };