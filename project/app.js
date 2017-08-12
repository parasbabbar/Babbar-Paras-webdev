var mongoose2 = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev123'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds025459.mlab.com:25459/heroku_rw478k23'; // user yours
}


mongoose2.connect(connectionString);


require("./services/result.service.server");
require("./services/search.service.server");
require("./services/user.service.server");
