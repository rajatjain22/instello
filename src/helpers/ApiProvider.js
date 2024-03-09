export const HTTP_SERVICE_CALL = (url, method = "GET", body) => {
  const authHeader = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: authHeader,
        body: JSON.stringify(body),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to perform action");
      }

      if (responseData && responseData.message) {
        resolve(responseData.data);
      } else {
        throw new Error(responseData.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("HTTP_SERVICE_CALL Error:", error);
      reject(new Error("An error occurred while processing your request"));
    }
  });
};
