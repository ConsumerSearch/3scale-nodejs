/**
 * ThreeScaleClient object, used to communicate with 3scale
 */

// requirements
var qs = require('qs'); // create querystring for multidimensional arrays
var http = require('http'); // http request

/**
 * Create a new ThreeScaleClient object
 *
 * @param {string} [providerKey] connection can never be reused.
 */
function ThreeScaleClient(providerKey, host){
  // Force providerKey
  if(typeof providerKey !== 'string') throw new Error("providerKey must be a string");

  this.providerKey = providerKey;
  this.host = host || "su1.3scale.net";

  // Get the 3Scale Host
  this.getHost = function (){
    return this.host;
  }
  
  // Get the provider key
  this.getProviderKey = function (){
    debugger;
    return this.providerKey;
  }
}

// TODO
ThreeScaleClient.prototype.authorize = function(app_id, app_key){
  if(typeof app_id !== 'string' || app_key !== 'string') throw new Error("missing app_id or app_key");
}

/**
 * Report transactios to 3scale
 * 
 * @param {array} [transactions] array of transcations to pass to 3scale
 * transactions elements have following keys:
 *   {
 *     app_id : <identifier of the app accessing the API>,
 *     usage  : array of usage values {'hits' : 1, 'transfer' : 1024},
 *     timestamp (optional) : timestamp of the operations
 *  }
 */
ThreeScaleClient.prototype.report = function(transactions, callback){
  if(typeof transactions !== 'object') throw new Error("transactions must be an array");

  var providerKey = this.getProviderKey();
  
  var data = {
    provider_key : providerKey, 
    transactions : transactions 
  };
  
  var post_data = qs.stringify(data);
  console.log(post_data);
  
  // Creating the call options
  var options = {
    host: this.getHost(),
    port: 80,
    path: '/transactions.xml',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': post_data.length
     }
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      // TODO call callback
      console.log(chunk);
      if (typeof callback == 'function'){
        callback(null, chunk);
      }
    });
  });

  // capture problems with the request and log
  req.on('error', function(e) {
    console.log('problem with 3scale loggin request: ' + e.message);
    if (typeof callback == 'function'){
      callback(e, null);
    }
  });

 // write data to request body
  req.write(post_data);
  req.end();
}

// Export so this can be used as a module
module.exports  = ThreeScaleClient;