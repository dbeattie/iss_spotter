// const { fetchMyIP } = require('./iss1');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

const { fetchCoordsByIP } = require('./iss1');

fetchCoordsByIP(`66.207.199.230`, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned Coords:' , data);
});



// fetchCoordsByIP('162.245.144.188', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Coords:' , coords);
// });