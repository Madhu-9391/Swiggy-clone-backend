import jwt from "jsonwebtoken";

// Verifies the user's access token from the cookie
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    // No token found, user is not authenticated
    return res.status(401).json({ success: false, message: "Access Denied: No token provided." });
  }

  try {
    // Decode the token and attach the user payload to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user= decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Token is invalid or expired
    return res.status(403).json({ success: false, message: "Access Denied: Invalid token." });
  }
};

// Verifies that the authenticated user has an 'admin' role
export const verifyAdmin = (req, res, next) => {
  // ✅ FIX: First, check if req.user even exists. If it doesn't,
  // it means verifyToken may have failed or this middleware was used incorrectly.
  // Then, check if the role is 'admin'.
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access Denied: Admin privileges required." });
  }
  
  // If both checks pass, proceed.
  next();
};

