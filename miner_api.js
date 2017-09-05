const request = require('request');

//request is a library that doesn't supprt promises,
// so has to go inside the promise ur requesting
//geocode as in city postcode...parse in 3199 to address for example
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
          //result: body.paymentsTotal   The bit at front is what parses into .then
          totalpayments: body.paymentsTotal
        });
      }
    });
  });
};

//changed geocode 00000 <<<simulates an error
//minerAddress('0xc6e9103d2faa3422dbc3016d9b85cf9617dfc4af').then((result) => {
    // console.log(JSON.stringify(result));
    minerAddress('0xc6e9103d2faa3422dbc3016d9b85cf9617dfc4af').then((totalpayments) => {
  console.log(JSON.stringify(totalpayments));
}, (errorMessage) => { 
  console.log(errorMessage);
});

/*
const request = require('request');


//endpoint https://ubiqpool.io/api/accounts/0xc6e9103d2faa3422dbc3016d9b85cf9617dfc4af
//request is a library that doesn't supprt promises,
// so has to go inside the promise
var minerAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);
    
//cld also run this with checker if paymentsTotal is there, or directly input var
    request({
        url: `https://ubiqpool.io/api/accounts/${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Ubiq miner servers.');
      } else if (body.paymentsTotal === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      } else if (body.paymentsTotal === 'OK') {
        resolve({
          payments: body.paymentsTotal
        });
      }
    });
  });
};

//
minerAddress('0xc6e9103d2faa3422dbc3016d9b85cf9617dfc4af').then((paymentsTotal) => {
  console.log(JSON.stringify(paymentsTotal));
}, (errorMessage) => {
  console.log(errorMessage);
});

*/