import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to the request object
    req.userId = { id: decoded.id, role: decoded.role };

    next();
  } catch (error) {
    console.log(`Error in protect middleware: ${error.message}`);
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};
