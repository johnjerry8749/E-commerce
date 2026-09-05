import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, No Token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();

  }catch (error) {
  console.error("JWT ERROR:", error.message);

  return res.status(401).json({
    success: false,
    message: "Not Authorized, Token failed",
    error: error.message,
  });
}
};