var mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref:"pageModel"},
    type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
    name: String,
    text: String,
    placeholder : String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    order: Number,
    dateCreated: {type: Date, default: Date.now()}
},{collection: "widget"});

module.exports = WidgetSchema;