const request = require('request');

const url = "https://api.ipify.org?format=json";

//THIS IS THE OLD FUNCTION
const fetchMyIP = function(callback) {
  // use request to fetch users IP address from JSON API
  request(url, (error, response, body) => {
    // Returns an error(via Callback), if any (it's nullable), needs to be a string
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

//THIS IS FUNCTION #2
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

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  //http://api.open-notify.org/iss-pass.json?lat=45.0&lon=-122.3 -- didn't need this part: (&alt=20&n=5&callback=?)
  //check for basic error first and compare to null
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //That api address string is checked as an error check callback and compared to null
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    //parse to give us passTimes and duration of those passTimes
    const passTimes = JSON.parse(body).response;
    callback(null, passTimes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 

const nextISSTimesForMyLocation = function(callback) {
  //Calls on the first function that I uncommented and checks for errors
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    //Calls on the second function that I uncommented and checks for errors
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        callback(error, null);
        return;
      }
      //Calls on the third function that I uncommented and checks for errors
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          callback(error, null);
          return; 
        }
        //finally displays the fly over times in an array that needed to be pulled from a new function in index.js
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };