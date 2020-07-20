const {schema, model, Schema} = require('mongoose');

const AttachmentCoursesSchema = new Schema({
    coursesId: {type: String, required: true},
    type_of_Attachment: {type: String, enum: ['image'], default: 'image'},
    attachment: {type: String, required: true},
},{
    timestamps:true
})

module.exports = model('AttachmentCourses', AttachmentCoursesSchema)