const {schema, model, Schema} = require('mongoose');

const ModuleCoursesSchema = new Schema({
    coursesId: {type: String, required: true},
    contentText: {type: String, required: true},
    title: {type: String, required: true},
    // type_of_video_source: {type: String, enum:['url', 'upload']},
    attachmentVideo: {type: String, required: true},
    files_for_donwload: {type: String, required: true, enum:['no', 'yes']},    
},{
    timestamps:true
})

module.exports = model('ModuleCourses', ModuleCoursesSchema)