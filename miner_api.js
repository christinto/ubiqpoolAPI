const request = require('request');

//request is a library that doesn't supprt promises,
// so has to go inside the promise 
//like geocode as in city postcode...parse in a postcode to address for example
//aud endpoint - https://blockchain.info/ticker
var minerAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request({
      url: `https://ubiqpool.io/api/accounts/${encodedAddress}`,  
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Ubiq miner servers.');
      } else if (body.paymentsTotal != '') {
        resolve({
          //result: body.paymentsTotal   Key at start parses into .then
          totalpayments: body.paymentsTotal
        });
      }
    });
  });
};

//<<<simulate errors here
//minerAddress('0xc6e9103d2faa3422dbc3016d9b85cf9617dfc4af').then((result) => {
    // console.log(JSON.stringify(result));
    minerAddress('0xc6e9103d2faa3422dbc3016d9b85cf9617dfc4af').then((totalpayments) => {
  console.log(JSON.stringify(totalpayments));
}, (errorMessage) => { 
  console.log(errorMessage);
});
