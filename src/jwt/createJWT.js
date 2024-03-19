import jwt from "jsonwebtoken";

const createJWT = (tokenData, expire = "1h") => {
  console.log(expire)
  const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET, {
    expiresIn: `${expire}`,
  });
  return token;
};

export default createJWT;
