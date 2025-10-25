import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(400).json({ message: "Authorization header required" });

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer")
    return res
      .status(400)
      .json({ message: "Invalid authorization format. Use: Bearer <token>" });

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, "nuuts shu!");
    req.user = decoded.data;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
