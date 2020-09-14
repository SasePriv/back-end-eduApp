const router = require('express').Router();
const controllers = require('../controllers/index.controller');

router.get('/test', controllers.test)

router.post('/test2', controllers.test2)

// router.post('/test3', controllers.test3)

//Login and register

router.post('/login', controllers.login)

router.post('/register', controllers.register)

//change password

router.post('/forgotPassword', controllers.forgotPassword)

router.get('/resetPassword/:token', controllers.resetPassword)

router.post('/changeForgetPassword', controllers.changeForgetPassword)

router.post('/emailValidation/:token', controllers.emailValidation)

router.post('/changePassword', controllers.changePassword)

//UpdateUser

router.post('/updateInfoUser', controllers.updateInfoUser)

//Eliminate User

router.post('/eliminateUser', controllers.eliminateUser)

//Cursos

router.post('/addCourse', controllers.addCourse)

router.post('/updateCourse', controllers.updateCourse)

router.post('/getSingleCourse', controllers.getSingleCourse)

router.post('/getAllTeacherCourses', controllers.getAllTeacherCourses)

router.get('/getAllCourses', controllers.getAllCourses)

router.get('/getLastestCourses', controllers.getLastestCourses)

router.post('/eliminateCourse', controllers.eliminateCourse)

router.post('/addAttachmentCourse', controllers.addAttachmentCourse)

router.post('/getAttachmentsOfCourse', controllers.getAttachmentsOfCourse)

router.post('/eliminateAttachmentCourse', controllers.eliminateAttachmentCourse)

router.post('/getNamesModulesOfCourse', controllers.getNamesModulesOfCourse)

router.post('/getCourseForEdit', controllers.getCourseForEdit)

//AcquireCourses

router.post('/acquireCourse', controllers.acquireCourse)

router.post('/getAcquiredCourses', controllers.getAcquiredCourses)

//Modulos

router.post('/addModule', controllers.addModule)

router.post('/updateModule', controllers.updateModule);

router.post('/getSingleModule', controllers.getSingleModule)

router.post('/getAllModulesOfCourse', controllers.getAllModulesOfCourse)

router.post('/getAttachmentsOfModule', controllers.getAttachmentsOfModule)

router.post('/addAttachmentsModule', controllers.addAttachmentsModule)

router.post('/eliminateAttachmentsModule', controllers.eliminateAttachmentsModule)

router.post('/eliminateModule', controllers.eliminateModule)

//Categorias

router.post('/getAllCoursesOfCategory', controllers.getAllCoursesOfCategory)

//Coins

router.post('/getUserWallet', controllers.getUserWallet)

router.post('/addCoin', controllers.addCoin)

//Admin

router.post('/registerAdmin', controllers.registerAdmin);

    //Teacher

router.get('/getAllUserTeacher', controllers.getAllUserTeacher);

router.post('/changeStatusTeacherUser', controllers.changeStatusTeacherUser);

    //Category

router.post('/addNewCategory', controllers.addNewCategory)

router.get('/getAllCategory', controllers.getAllCategory)

router.post('/eliminateOneCategory', controllers.eliminateOneCategory)


//Dev 
// router.post('/addWallet', controllers.addWallet)
router.post('/addAdminUser', controllers.addAdminUser)


module.exports = router;