const express = require('express');
// const app = express();

const teachers  =require('../controllers/teachers.controller');


var router = express.Router();

router.put('/updateteachers',teachers.updateteachers);
router.get('/getteachers', teachers.getteachers);
router.post('/filterSearchTeachers', teachers.filterSearchTeachers);
router.post('/teachersRegistration', teachers.teachersRegistration);
router.delete('/deleteteachers/:teachersid', teachers.deleteteachers);

module.exports = router;