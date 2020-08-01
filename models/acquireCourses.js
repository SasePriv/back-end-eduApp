const {model, Schema} = require('mongoose');

const AcquireCoursesSchema = new Schema({
    user_Id: {type: String, required: true},
    coursesId: {type: String, required: true},
    typeService: {type: String, enum:['free', 'pay'], required: true},
    // billingumber: {type: Number, ref: "billing"}
},{
    timestamps:true
})

module.exports = model('AcquireCourses', AcquireCoursesSchema)