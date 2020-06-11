const express = require('express');
// const app = express();

const listjobs  =require('../controllers/listjobs.controller');


var router = express.Router();

router.put('/updatehomework',listjobs.updatehomework);
router.get('/gethomework', listjobs.gethomework);
router.post('/homeworkRegistration', listjobs.homeworkRegistration);
router.get('/deletehomework/:homeworkid', listjobs.deletehomework);

module.exports = router;