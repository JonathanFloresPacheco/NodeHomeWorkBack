const express = require('express');
// const app = express();

const matery  =require('../controllers/matery.controller');


var router = express.Router();

router.put('/updatematery',matery.updatematery);
router.get('/getmatery', matery.getmatery);
router.post('/materyRegistration', matery.materyRegistration);
router.delete('/deletematery/:materyid', matery.deletematery);

module.exports = router;