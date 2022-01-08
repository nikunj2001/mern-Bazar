const {validationResult} =require("express-validator");
const UserModel = require("../../models/user");
const bcrypt = require("bcrypt")
const {hashedPassword,createToken,comparePassword } = require("../../services/authServices");
// @route POST /api/register
// @access Public
// @desc Create user and returna token
module.exports.register =async (req,res)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {name,email,password} = req.body;
        try {
            const emailExist = await UserModel.findOne({email});
            console.log(emailExist);
            if(!emailExist){
                const hashed=await hashedPassword(password);
                const user = await UserModel.create({
                    name,email,password:hashed
                });
                const token = createToken({
                    id:user._id,name:user.name   
                });
                // userCreated  
                return res.status(201).json({msg:"Account Created",token})
            }else{
                // Unauthorised Request
            return res.status(401).json({errors:[{msg:`${email} is already taken`}]});
            }
        } catch (error) {
            // Server Error
            console.log(error.message);
            return res.status(500).json("Server internal error!");
        }
    }else{
        // Validations Failed
        return res.status(400).json({errors:errors.array()})        
        
    }
}
// @route POST /api/login
// @access Public
// @desc Create user and return a token
module.exports.login =async (req,res)=>{
        const  {email,password} = req.body;
        const errors = validationResult(req);
        if(errors.isEmpty()){
                try {
                    const user = await UserModel.findOne({email});
                    if(user){
                                if(await comparePassword(password,user.password)){
                                    const token = createToken({id:user._id,name:user.name});
                                    if(user.admin){
                                     return res.status(201).json({token,admin:true});
                                    }else{
                                     return res.status(201).json({token,admin:false});
                                    }
                                }else{
                                    return res.status(401).json({errors:[{'msg':"Password not matched"}]})
                                }
                    }else{
                        return res.status(401).json({errors:[{'msg':"Email is not Found"}]})
                    }
                } catch (error) {
                    console.log(error.message);
                    return res.status(500).json("Server intenal error")
                }
        }else{
            // validation failed
            return res.status(401).json({errors:errors.array()})
        }
}