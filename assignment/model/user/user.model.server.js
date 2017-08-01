var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.findUserByUsername = findUserByUsername;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.updateUser = updateUser;
    userModel.deleteUser = deleteUser;
    userModel.addWebsite = addWebsite;
    userModel.deleteWebsite = deleteWebsite;
    userModel.findFacebookUser = findFacebookUser;

module.exports = userModel;

    function findUserById(uid){
        return userModel.findById(uid);
    }

    function findUserByCredentials(username , password){
        return userModel.find({username: username, password: password});
    }

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}


function createUser(user){
        return userModel.create(user);
    }

    function deleteUser(uid){
        return userModel.remove({_id: uid});
    }

    function updateUser(userId , nUser){
        // delete nUser._id;

        return userModel
            .update({_id: userId},{
                $set: nUser });
    }

    function addWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}
    function deleteWebsite(userId, websiteId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function findFacebookUser(id){
    return userModel.findOne({"facebook.id": id});
}

