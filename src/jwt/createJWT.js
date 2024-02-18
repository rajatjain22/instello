import jwt from "jsonwebtoken";

const createJWT = (tokenData) => {
    const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET);
    return token;
}

export default createJWT;