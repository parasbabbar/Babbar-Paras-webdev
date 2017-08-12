var mongoose = require("mongoose");
var ProjectUserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: Number,
        dob: Date,
        about: String,
        skill: String,
        ProjectType:  {type: String, default: true},
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        google: {
            token: String,
            id: String,
            displayName: String
        },
        followed_by:[{type: mongoose.Schema.ObjectId, ref:"ProjectUser"}],
        following:[{type: mongoose.Schema.ObjectId, ref:"ProjectUser"}],
        is_admin: {type: Boolean, required: true,default: false},
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project1"});

module.exports = ProjectUserSchema;