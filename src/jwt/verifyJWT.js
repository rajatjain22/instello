import jwt from "jsonwebtoken";

const verifyJWT = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  return decodedToken;
};

export default verifyJWT;
