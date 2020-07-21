const router = require('express').Router();
const controllers = require('../controllers/index.controller');

router.get('/test', controllers.test)

router.post('/test2', controllers.test2)

router.post('/login', controllers.login)

router.post('/register', controllers.register)

router.post('/addCourse', controllers.addCourse)

router.post('/getSingleCourse', controllers.getSingleCourse)

router.post('/getAllTeacherCourses', controllers.getAllTeacherCourses)

router.get('/getAllCourses', controllers.getAllCourses)

router.post('/addModule', controllers.addModule)

router.post('/getSingleModule', controllers.getSingleModule)

router.get('/getLastestCourses', controllers.getLastestCourses)

router.post('/eliminateCourse', controllers.eliminateCourse)

module.exports = router;