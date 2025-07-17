import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        // ✅ Add logging to inspect cookies
        console.log("Cookies received in isAuth:", req.cookies);

        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        console.error("isAuth error:", error);
        return res.status(500).json({ message: "Authentication failed" });
    }
};

export default isAuth;
