// const { fetchMyIP } = require('./iss1');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const { fetchCoordsByIP } = require('./iss1');

// fetchCoordsByIP(`66.207.199.230`, (error, coordsData) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Coords:' , coordsData);
// });

const { fetchISSFlyOverTimes } = require('./iss1');
const exampleCoords = { latitude: '43.6', longitude: '-79.4' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned passover times:' , passTimes);
});