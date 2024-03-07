const authHeader = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export const HTTP_SERVICE_CALL = async (url, type = "GET", body) => {
  try {
    const response = await fetch(url, {
      method: type,
      headers: authHeader,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data && data.message) {
      return data.data;
    } else {
      throw new Error(data.error || "Unknown error occurred");
    }
  } catch (error) {
    throw new Error(error.message || "An error occurred while processing your request");
  }
};
