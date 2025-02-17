const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, "secret", {
        expiresIn: "1h",
    });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, "secret");
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = { generateToken, verifyToken };
