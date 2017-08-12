var mongoose = require("mongoose");
var ProjectUserSchema = require("./user.schema.server");
var User= mongoose.model("ProjectUser", ProjectUserSchema);


User.findUserByCredentials = findUserByCredentials;
User.findGoogleUser = findGoogleUser;
User.findUserByUsername = findUserByUsername;
User.searchUsersByUsername = searchUsersByUsername;
User.createUser = createUser;
User.deleteUser = deleteUser;
User.updateUser = updateUser;
User.findUserByID = findUserByID;



module.exports = User;

    function findUserByCredentials(username , password){
        return User.findOne({username: username, password: password});
    }

    function findGoogleUser(id){
        return User.findOne({"google.id": id});
    }

    function findUserByUsername(username){
        return User.findOne({username: username});
    }

    function searchUsersByUsername(searchtext){
        return User.find({'$or':[
            {'username':{'$regex':searchtext, '$options':'i'}},
            {'firstName':{'$regex':searchtext, '$options':'i'}},
            {'lastName':{'$regex':searchtext, '$options':'i'}}]}).sort('-dateCreated');
    }

    function createUser(user){
        return User.create(user);
    }

    function updateUser(uid , newuser){
        delete newuser._id;

        return User
            .update({_id: uid},{
                $set: newuser
            });
    }

    function deleteUser(uid){
        return User.remove({_id: uid});
    }

    function findUserByID(uid){
        console.log(uid);
        return User.findById(uid);

}