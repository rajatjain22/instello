import jwt from "jsonwebtoken";

const createJWT = (tokenData, expiresIn='1h') => {
  const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
    expiresIn: expiresIn, // Provide the expiresIn option with a numerical value
  });
  return token;
};

export default createJWT;
