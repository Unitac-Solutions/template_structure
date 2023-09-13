const { json } = require("express");
const { verify } =  require("jsonwebtoken");

module.exports = {
    checkToken: (req,res,next) => {
        const token = req.cookies.accessToken;
       // console.log(req.cookies)
         if(token){
          //  token = token.slice(7);
            verify(token, process.env.TOKEN_KEY, (err, decoded) =>{
                if(err){
                    res.json({
                        success:0,
                        message:"invalid token !"
                    })
                }else{
                    req.body.userInfo  = decoded.result;
                             
                    next(); 
                }
            })
         }else{
            res.json({
                success:0,
                message:"Access denied! unauthorized user"
            })
         }
    },
    checkTokenAndAdmin: (req, res, next) => {
 
        let token =req.cookies.accessToken;
        if (token) {
          //  token = token.slice(7);
            verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        
                        success: 0,
                        message: "Invalid token!"
                    });
                } else {
                    // Set the decoded user data in the request object
                    req.body.userInfo  = decoded.result;
      
                    if ((decoded.result.type == "Admin" || decoded.result.type == "triageAdmin") && decoded.result.is_activated) {
                        next();
                    } else {
                        res.json({
                            success: 0,
                            message: "Access denied! User does not have required access permission."
                        });
                    }
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied! Unauthorized user 4."
            });
        }
    },
    
    checkTokenASuperdAdmin: (req, res, next) => {
      
        let token = req.cookies.accessToken;
        if (token) {
            
            verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid token!"
                    });
                } else {
                    // Set the decoded user data in the request object 
                    req.body.userInfo  = decoded.result;
                    // Check if the user is an admin
                    if (decoded.result.type == "triageAdmin"  && decoded.result.is_activated) {
                        next();
                    } else {
                        res.json({
                            success: 0,
                            message: "Access denied!"
                        });
                    }
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied! Unauthorized user."
            });
        }
    },

    checkAUser: (req,res,next) => {
        const token = req.cookies.accessToken;
           if(token){
          
            verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if(err){
                    res.json({
                        success:0,
                        message:"invalid token !"
                    })
                }else{
                    //console.log(decoded.result.first_name)
                    req.name= decoded.result.first_name; 
                    req.type= decoded.result.type; 
                    req.user_id = decoded.result.user_id; 
                    next();
                }
            })
         }else{
            res.json({
                success:0,
                message:"Access denied! unauthorized user"
            })
         }
    },
    


 
}

 