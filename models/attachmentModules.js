const {schema, model, Schema} = require('mongoose');

const AttachmentModulesSchema = new Schema({
    moduleId: {type: String, required: true},
    type_of_Attachment: {type: String, required: true ,enum: ['image', 'file']},
    attachment: {type: String, required: true},
    nameOfFile: {type: String}
},{
    timestamps:true
})

module.exports = model('AttachmentModules', AttachmentModulesSchema)