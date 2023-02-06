module.exports.home = function(req,res){
// return res.end('<h1> Express is up to Use</h1>');

return res.render('home', {
    title:'Home'
});
}


// module.exports.Actionname=function(req,res);