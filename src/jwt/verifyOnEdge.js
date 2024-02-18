import { jwtVerify } from "jose";

const verifyOnJWT = async (token) => {
  const encodedKey = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
  const decoded = await jwtVerify(token, encodedKey);
  return decoded;
};

export default verifyOnJWT;