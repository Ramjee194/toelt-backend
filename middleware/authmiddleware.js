import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Check if authorization header exists
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

 
  
    // Verify token
    const decoded = jwt.verify(token, "secretkey");
    console.log(decoded)

  

    // Attach user data to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

//optional admin check middleware
export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Admin access required" });
  }
};