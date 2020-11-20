var express = require('express');
var router = express.Router();

/* Paths */

router.use(express.static('assets'));
router.use(express.static('front_end'));
router.use(express.static('node_modules'));

/* Ruotes */

router.get("/",function(req,res){
    res.render("front_end/index.html");
});


router.use("*",function(req,res){
    res.redirect('/');
});

module.exports = {
    router
}
