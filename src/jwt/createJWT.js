import jwt from "jsonwebtoken";

const createJWT = (tokenData) => {
  const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export default createJWT;
