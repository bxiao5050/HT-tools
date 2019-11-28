var express = require('express');
var router = express.Router();
var freshPermJob = require('../quartzJob/freshPermJob');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/fresh/Perm',function(req,res){
  freshPermJob.initPerm(function(err,data){
    res.end(data);
  });
})
module.exports = router;
