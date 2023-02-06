module.exports.loved=function(req,res){
    // res.end('<h1>Liked</h1>');

    return res.render('likes', {
        title:'likes'
    });
}