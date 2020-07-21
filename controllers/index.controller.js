const indexCtrl = {}
const User = require('../models/user');
const Course = require('../models/courses')
const AttachmentCourses = require('../models/attachmentCourses')
const ModuleCourses = require('../models/moduleCourses')
const AttachmentModules = require('../models/attachmentModules')
const jwt = require('jsonwebtoken')

//Variables de ayuda
var imagePath = "/var/www/html/hifive-rest-api/public/"
const {SECRET_TOKEN} = process.env;

indexCtrl.test = async (req, res) => {

    const token = jwt.sign({id: "5151"}, SECRET_TOKEN,{
        expiresIn: 60
    })

    console.log(token)

    res.json({
        token,
    })

}

indexCtrl.test2 = async (req, res) => {

    const token = req.body.token

    const decoded = jwt.verify(token, SECRET_TOKEN)

    // console.log(token)
    console.log(decoded)

    res.json({
        decoded
    })

}

indexCtrl.test3 = async (req, res) => {
    console.log(req.body)
}


/* Aqui es la ruta de registro que necesita los siguientes variables:
    @email, @name, @date_birth, @gender, @type_of_user, @password
*/
indexCtrl.register = async (req, res) => {
    const errors = []
    const {email, name, date_birth, gender, type_of_user, password} = req.body;
    if (email != "" && name != "" && date_birth != "" && gender != "" && type_of_user != "" && password != "") {
        if (password.length < 6) {
            errors.push({message: "La contraseña tiene que ser mayor de 6 caracteres"})
        }
        const emailUser = await User.findOne({email});
        if (emailUser) {
            errors.push({message: "El correo ya esta en uso"})
        }
        
        if (!errors.length > 0) {
            const newUser = new User({email, name, date_birth, gender, type_of_user, password});
            newUser.password = await newUser.encryptPassword(password);
            const data = await newUser.save();

            const token = jwt.sign({id: newUser._id}, SECRET_TOKEN,{
                expiresIn: 60 * 60 * 24 * 30
            })
            //Respuesta del servidor que manda los datos del usuario registrado
            res.json({
                response: true,
                message: "Se ha registrado un nuevo usuario",
                data: {
                    _id: data._id,
                    name: data.name,
                    typeOfUser: data.type_of_user,  
                    status_teacher: data.status_teacher,
                    token,
                }
                
                
            })
        }else{
            res.json({
                response: false,
                message: errors[0].message
            })
        }
    }else{
        res.json({
            response: false,
            message: "Por favor envie todos los datos requeridos"
        })
    }
}

indexCtrl.login = async (req, res) => {

    // console.log(req.body)
    const errors = [];
    const {email, password} = req.body;

    if (email != "" && password != "") {
        const userFind = await User.findOne({email});
        console.log(userFind)
        if (userFind) {
            const match = await userFind.matchPassword(password);
            if (match) {
                res.json({
                    response: true,
                    message: "Credenciales Correctas",
                    data: {
                            _id: userFind._id,
                            name: userFind.name,
                            typeOfUser: userFind.type_of_user,  
                            status_teacher: userFind.status_teacher,
                            token: "asdas"
                        }
                })
            } else {
                errors.push({message: "La contraseña no conincide"})    
                res.json({
                    response: false,
                    message: "La contraseña no conincide"
                })
            }
        }else{
            errors.push({message: "El usuario no se encuentra registrado"})
            res.json({
                response: false,
                message: "El usuario no se encuentra registrado"
            })
        }
    } else {
        res.json({
            response: false,
            message: "Por favor envie las credenciales necesarias"
        })
    }
}

indexCtrl.addCourse = async (req, res) => {
    const {title, description, category, typeService, hours, price, contador, user_id} = req.body

    if (title != "" && description != "" && category != "" && typeService != "" && hours != "" && user_id != "") {
        if (req.files.imageUnique) {
            if (typeService == "pay" && price != "" || typeService == "free") {

                let filename1 = Date.now() + Math.floor(1000 + Math.random() * 9000) + '.' + req.files.imageUnique.mimetype.split('/')[1];
                let fileImage = req.files.imageUnique;

                fileImage.mv(process.cwd() + "/public/coursesImages/"  + filename1, function(err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                })

                let mainImage = filename1;

                const newCourses = new Course({user_id,title, description, category, typeService, hours, price, mainImage})
                const data = await newCourses.save()
                
                if (contador > 0) {
                    let coursesId = data._id
                    for (let index = 0; index < contador; index++) {
                        let fileEach = req.files[`image${index}`]
                        let filename = Date.now() + Math.floor(1000 + Math.random() * 9000) + '.' + fileEach.mimetype.split('/')[1];

                        fileEach.mv(process.cwd() + "/public/coursesImages/" + filename, function(err) {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        })

                        let attachment = filename

                        const newAttachmentCourses = new AttachmentCourses({coursesId, attachment})
                        await newAttachmentCourses.save()
                    }

                    res.json({
                        response: true,
                        data : {
                            coursesId
                        }
                    })

                }else{
                    res.json({
                        response: true,
                        data : {
                            coursesId: data._id
                        }
                    })
                }

            }else{
                res.json({
                    response: false,
                    message: "Por favor introduzca un precio si es de pago"
                })
            }
        }else{
            res.json({
                response: false,
                message: "por favor envia una foto principal para el curso"
            })
        }
    }else{
        res.json({
            response: false,
            message: "por favor envie toda la informacion necesaria"
        })
    }
}

indexCtrl.getSingleCourse = async (req, res) => {
    console.log(req.body)
    const {idCourse} = req.body
    if (idCourse != "") {
        const course = await Course.findById(idCourse)
        const modules = await ModuleCourses.find({coursesId: course._id})
        const user = await User.findById(course.user_id)
        if (course) {
            res.json({
                response: true,
                data: {
                    course,
                    modules,
                    userInfo: user,                    
                },
            })
        }else{
            res.json({
                response: false,
                message: "no se ha encontrado ningun curso"
            })
        }
    }else{
        res.json({
            response: false,
            message: "enviar el id del curso a solicitar"
        })
    }
}

indexCtrl.getAllCourses = async (req, res) => {
    const allCourses = await Course.find()
    const coursesGoodOrder = allCourses.reverse()

    let vectorCourses = []

    allCourses.forEach(async (each) => {
        const modules = await ModuleCourses.find({coursesId: each._id}) 
        const user = await User.find({_id: each.user_id})

        vectorCourses.push({
            course: each,
            modulesCourse: modules,
            userCourse: user
        })
    });

    if (allCourses) {
        res.json({
            response: true,
            data: vectorCourses
        })
    } else {
        res.json({
            response: false,
            message: "No hay cursos"
        })
    }
}

indexCtrl.getLastestCourses = async (req, res) => {
    const allCourses = await Course.find().sort({_id: -1}).limit(10)

    let vectorCourses = []

    allCourses.forEach(async (each) => {
        console.log(each)
        const modules = await ModuleCourses.find({coursesId: each._id}) 
        const user = await User.find({_id: each.user_id})

        
        vectorCourses.push({
            course: each,
            modulesCourse: modules,
            userCourse: user
        })
    });

    console.log(vectorCourses)
    
    if (allCourses) {
        res.json({
            response: true,
            data: vectorCourses
        })
    }else{
        res.json({
            response: true,
            message: "No hay curso disponible"
        })
    }
}

indexCtrl.getAllTeacherCourses = async (req, res) => {
    const { user_id } = req.body;
    
    const coursesTeacher = await Course.find({user_id: user_id})
    const user = await User.findById(user_id)

    if (coursesTeacher) {
        res.json({
            response: true,
            data: {
                coursesTeacher: coursesTeacher,
                userInfo: user
            }
        })
    }else{
        res.json({
            response: false,
            message: "No hay cursos"
        })
    }
}

indexCtrl.eliminateCourse = async (req, res) => {
    const { courseId } = req.body
    if (courseId != "") {
        const eliminateCourse = await Course.findOneAndDelete({_id: courseId})      
        if (eliminateCourse) {
            res.json({
                response: true, 
                message: "Se ha eliminado el curso"
            })
        }else{
            res.json({
                response: false,
                message: "No se encontro el curso"
            })
        }
    }else{
        res.json({
            response: false,
            message: "Por favor enviar el id del curso"
        })
    }

}

indexCtrl.addModule = async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    const {coursesId, title, contentText, type_of_video_source, files_for_donwload, contadorImage, contadorFiles} = req.body;
    if(coursesId != "" && title != "" && contentText != "" && type_of_video_source != ""  && files_for_donwload != ""){

        let attachmentVideo;

        if (type_of_video_source == "upload") {
            if (req.files.attachmentVideo) {
            
                let videoFileName = Date.now() + Math.floor(1000 + Math.random() * 9000) + '.' + req.files.attachmentVideo.mimetype.split('/')[1];
                let videoFile = req.files.attachmentVideo

                videoFile.mv(process.cwd() + "/public/moduleVideos/" + videoFileName, function(err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                })

                attachmentVideo = videoFileName;

            } else {
                res.json({
                    response: false,
                    message: "Por favor envie el video del modulo"
                })
            }
        }else{
            attachmentVideo = req.body.attachmentVideo
        }

        const newModule = new ModuleCourses({coursesId, title, contentText, type_of_video_source, files_for_donwload,attachmentVideo})
        const moduleData = await newModule.save()

        if (contadorImage > 0) {
            let moduleId = moduleData._id

            for (let index = 0; index < contadorImage; index++) {
                let fileEach = req.files[`image${index}`]
                let filename = Date.now() + Math.floor(1000 + Math.random() * 9000) + '.' + fileEach.mimetype.split('/')[1];

                fileEach.mv(process.cwd() + "/public/moduleImages/" + filename, function(err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                })

                let attachment = filename

                const newAttachmentModules = new AttachmentModules({moduleId, attachment, type_of_Attachment: 'image'})
                await newAttachmentModules.save()
            }
        }

        if (contadorFiles > 0) {
            let moduleId = moduleData._id

            for (let index = 0; index < contadorFiles; index++) {
                let fileEach = req.files[`file${index}`]
                let filename = Date.now() + Math.floor(1000 + Math.random() * 9000) + '.' + fileEach.mimetype.split('/')[1];

                fileEach.mv(process.cwd() + "/public/moduleFiles/" + filename, function(err) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                })

                let attachment = filename

                const newAttachmentModules = new AttachmentModules({moduleId, attachment, nameOfFile: fileEach.name ,type_of_Attachment: 'file'})
                await newAttachmentModules.save()
            }
        }

        res.json({
            response: true,
            data: {
                moduleId: moduleData._id
            }
        })

        
    }else{
        res.json({
            response: false, 
            message: "Por favor envie todo la informacion necesaria"
        })
    }
}

indexCtrl.getSingleModule = async (req, res) => {
    console.log( req.body)
    const { moduleId } = req.body

    const module = await ModuleCourses.findById(moduleId)
    const attachmentModule = await AttachmentModules.find({moduleId: moduleId})

    if (module) {
        res.json({
            response: true,
            data: {
                module,
                attachmentModule
            }
        })
    } else {
        res.json({
            response: false,
            message: "No se encontro ningun modulo "
        })
    }
}

module.exports = indexCtrl;