const request = require('request');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const url = "https://api.ipify.org?format=json";

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

module.exports = { fetchMyIP };