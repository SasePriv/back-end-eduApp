const {schema, model, Schema} = require('mongoose');

const CategorySchema = new Schema({
    title: {type: String, required: true},
    mainImage: {type: String, required: true},
},{
    timestamps:true
})

module.exports = model('Category', CategorySchema)