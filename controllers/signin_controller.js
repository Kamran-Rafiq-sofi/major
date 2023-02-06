module.exports.signIn=function(req,res){
    // res.end('<h1>Liked</h1>');

    return res.render('signin', {
        title:'signin'
    });
}