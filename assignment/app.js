var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds025459.mlab.com:25459/heroku_rw478k23'; // user yours
}


mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;

require("./services/user.service.server");
require("./services/website.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");
