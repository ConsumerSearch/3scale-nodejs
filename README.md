# 3scale.js

Basic Node JS module to communicate with 3Scale. This module has minimum implementation
as needed by CONSUMERSEARCH


# usage
Include the threescale module and create a new ThreeScaleClient object. Execute the necesar calls 
on the client object that correspond with the API.

```javascript
    var ThreeScaleClient = require('3scale').ThreeScaleClient;
    
    var client = new ThreeScaleClient("APIKEY");
    // Build transactions array
    var transactions = [
      { 
        "app_id" : "ID of the application to report the transaction for",
        "usage" : "Array of usage values.",
        "timstamp" : "optional"  
      }
    ];
    
    var callback = function(err, data) {
      // Do something
    }
    client.report(transactions, callback);
```