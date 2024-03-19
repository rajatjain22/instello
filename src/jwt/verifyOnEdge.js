import { jwtVerify } from "jose";

const verifyOnJWT = async (token) => {
  try {
    const encodedKey = new TextEncoder().encode(process.env.JWT_TOKEN_SECRET);
    const decoded = await jwtVerify(token, encodedKey);
    return decoded;
  } catch {
    (error) => {
      throw Error("Invalid token");
    };
  }
};

export default verifyOnJWT;
