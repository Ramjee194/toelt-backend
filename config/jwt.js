
import jwt, { decode } from 'jsonwebtoken'
import user from '../models/userSchema'




 // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
//verify token

jwt.verify(token,"secretkey",(err,decoded)=>{
    if(err)
        return resizeBy.status(401).json({message:"Invalid token"});
    req.user = decoded;
    next();
})
