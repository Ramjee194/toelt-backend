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
