const {schema, model, Schema} = require('mongoose');

const CoursesSchema = new Schema({
    user_id: {type: String, required: true},
    title: {type: String, required: true, },
    typeService: {type: String, enum:['free', 'pay'], required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    hours: {type: String, required: true},
    status: {type: String, enum:['inactive','active'], default: 'active'},
    price: {type: Number, default: 0},
    mainImage: {type: String,}
},{
    timestamps:true
})

module.exports = model('Courses', CoursesSchema)