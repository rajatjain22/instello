const capitalizeWords = (inputString) => {
  return inputString
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const AllWordFirstChar = (inputString) => {
  return inputString
    ?.split(/\s+/)
    .map((word) => word[0])
    .join("");
};

const formatTimestamp = (timestamp) => {
  const now = new Date();
  const messageTime = new Date(timestamp);

  // Calculate the time difference in milliseconds
  const timeDifference = now - messageTime;

  // Check if the message was sent "just now"
  if (timeDifference < 60000) {
    return "Just now";
  }

  // Check if the message was sent less than an hour ago
  if (timeDifference < 3600000) {
    const minutesAgo = Math.floor(timeDifference / 60000);
    return `${minutesAgo} min ago`;
  }

  // Check if the message was sent today
  if (
    now.getDate() === messageTime.getDate() &&
    now.getMonth() === messageTime.getMonth() &&
    now.getFullYear() === messageTime.getFullYear()
  ) {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      hourCycle: "h12",
    };
    return messageTime.toLocaleTimeString("en-US", options);
  }

  // Check if the message was sent within the current year
  if (now.getFullYear() === messageTime.getFullYear()) {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      hourCycle: "h12",
    };
    return messageTime.toLocaleDateString("en-US", options);
  }

  // If none of the above conditions match, it's in a different year
  const optionsWithYear = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    hourCycle: "h12",
  };
  return messageTime.toLocaleDateString("en-US", optionsWithYear);
};

//Username Validation
const onValidUsername = (inputString) => {
  const usernameRegex = /^[a-z_][a-z0-9_.]{1,}$/;
  return usernameRegex.test(inputString);
}; 

//Email Validation
const onValidEmail = (inputString) => {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
    inputString
  );
};

//Password Validation
const onValidPassword = (inputString) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(inputString);
};

export {
  capitalizeWords,
  AllWordFirstChar,
  formatTimestamp,
  onValidUsername,
  onValidEmail,
  onValidPassword,
};
