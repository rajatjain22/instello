import crypto from "crypto";

const generateRandomUsername = (fullName) => {
  const nameParts = fullName.toLowerCase().trim().split(" ");
  const username = nameParts.join(""); // Join name parts without spaces

  // Append a random number
  const randomNumber = Math.floor(Math.random() * 10000); // You can adjust the range of random numbers as needed
  const finalUsername = `${username}${randomNumber}`;

  return finalUsername;
};

const generateRandomPassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export { generateRandomUsername, generateRandomPassword };
