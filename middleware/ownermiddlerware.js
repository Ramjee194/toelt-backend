export const ownerMiddleware = async (req, res, next) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Access denied. Owner only." });
    }

    next();

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
