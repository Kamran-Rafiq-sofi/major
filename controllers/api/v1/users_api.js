const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment');
module.exports.createSession=async function(req,res){
    try{
        let user=await User.findOne({email:req.body.email});
        
        if(!user || user.password!=req.body.password){
            // console.log("error in connectings");
            // return res.json(422,{
            //     message:"Invalid email or password"
            // });

            return res.status(422).json({
                message:"Invalid email or password"
            })
        }
        // return res.json(200,{
        //     message:"sign in successful",
        //     data:{
        //         token:jwt.sign(user.toJSON(),'Socialmedia',{expiresIn:'10000'})
        //     }
        // });

        return res.status(200).json({
                 message:"sign in successful",
            data:{
                // token:jwt.sign(user.toJSON(),'Socialmedia',{expiresIn:'100000'})
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'100000'})
            }
        })
    }catch{
        console.log("error in connecting");
        // return res.json(500,{
        //     message:"Internal server error"
        // });


        return res.status(500).json({
            message:"Internal server error"
        })

    }
};