var express = require('express');
var router = express.Router();
var { getuser, adduser, getUserByName } = require('../controller/usercontroller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getuser', getuser)

router.post('/adduser', adduser)

router.get('/getUserByName/:name', getUserByName)

module.exports = router;
